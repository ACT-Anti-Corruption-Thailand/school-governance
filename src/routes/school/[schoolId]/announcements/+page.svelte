<script lang="ts">
	import { PUBLIC_API_HOST, PUBLIC_SITE_HOST } from '$env/static/public';

	import linkifyHtml from 'linkify-html';
	import sanitizeHtml from 'sanitize-html';
	import { onMount } from 'svelte';

	import {
		Dialog,
		DialogDescription,
		DialogOverlay,
		DialogTitle
	} from '@rgossiaux/svelte-headlessui';
	import ContactOfficer from 'components/ContactOfficer.svelte';
	import Dropdown from 'components/Dropdown.svelte';
	import SchoolHeader from 'components/school/SchoolHeader.svelte';

	import { page } from '$app/stores';
	import { computed_years, currentSchool } from 'stores/school';

	const MONTHS = [
		'ธันวาคม',
		'พฤศจิกายน',
		'ตุลาคม',
		'กันยายน',
		'สิงหาคม',
		'กรกฎาคม',
		'มิถุนายน',
		'พฤษภาคม',
		'เมษายน',
		'มีนาคม',
		'กุมภาพันธ์',
		'มกราคม'
	];

	const DROPDOWN_DATA = $computed_years?.map((y) => ({ label: y + 543, value: y })) ?? [];
	let dropdown_choice = DROPDOWN_DATA[0];

	$: schoolId = $page.params.schoolId;

	type AnnouncementData = {
		announceTitle: string;
		announcePerson: string;
		announceContent: string;
		announceDate: string;
		announceExternalLink: string;
		announceImage: any;
	};

	let has_data = false;
	let data: Record<string, AnnouncementData[]>;

	const fetchAnnouncements = async () => {
		const resp = await fetch(
			`${PUBLIC_API_HOST}/schools/${schoolId}/annoucements?schoolYear=${dropdown_choice.value}`
		);
		const json = await resp.json();

		has_data = json.has_data;
		data = json.data;
	};

	let mounted = false;
	onMount(() => {
		mounted = true;
	});

	$: if (mounted && dropdown_choice) fetchAnnouncements();

	let contact_modal_isopen = false;

	const parseImagesVal = (images: any): null | string => {
		let _imgs = images;
		if (typeof images === 'string') {
			_imgs = JSON.parse(images);
		}
		if (Array.isArray(_imgs)) {
			const res = _imgs.find((i) => i.mimetype && i.mimetype.includes('image'));
			if (res) {
				if ('url' in res) return res.url;
				return PUBLIC_SITE_HOST + '/' + res.path;
			}
		}
		return null;
	};

	let lightbox_open = false;
	let lightbox_url = '';
	const openLightbox = (url: string) => {
		lightbox_url = url;
		lightbox_open = true;
	};
</script>

<svelte:head>
	<title>ประกาศโรงเรียน{$currentSchool?.name_th ?? ' (ไม่พบชื่อ)'} — โรงเรียนโปร่งใส</title>
	<meta
		property="og:title"
		content="ประกาศโรงเรียน{$currentSchool?.name_th ?? ' (ไม่พบชื่อ)'} — โรงเรียนโปร่งใส"
	/>
	<meta
		name="twitter:title"
		content="ประกาศโรงเรียน{$currentSchool?.name_th ?? ' (ไม่พบชื่อ)'} — โรงเรียนโปร่งใส"
	/>
</svelte:head>

<SchoolHeader pageData={{ name: 'ประกาศ', color: '#FC5858' }}>
	<Dropdown
		options={DROPDOWN_DATA}
		bind:selected_option={dropdown_choice}
		explaination="ปีการศึกษา"
	/>
</SchoolHeader>
<div class="desktop-margin">
	{#if has_data}
		<section class="f news-body">
			{#each MONTHS as m}
				{#if data[m]?.length}
					<header class="month-title">{m}</header>
					{#each data[m] as news}
						<article>
							<header>
								<h2>{news.announceTitle}</h2>
								<div class="f">
									<p>โพสต์โดย: <span class="author">{news.announcePerson}</span></p>
									<small>{new Date(news.announceDate).toLocaleDateString('th-TH')}</small>
								</div>
							</header>
							<p>
								{@html linkifyHtml(
									sanitizeHtml(news.announceContent, {
										allowedTags: ['br'],
										allowedAttributes: {}
									}),
									{
										className: 'announce-link',
										rel: 'nofollow noopener noreferrer',
										target: '_blank'
									}
								)}
							</p>
							{#if news.announceExternalLink}
								<a
									class="news-external"
									href={news.announceExternalLink}
									target="_blank"
									rel="nofollow noopener noreferrer">ดูรายละเอียดเพิ่มเติม</a
								>
							{/if}
							{#if parseImagesVal(news.announceImage)}
								<button
									class="news-img-btn"
									type="button"
									on:click={() => openLightbox(parseImagesVal(news.announceImage) ?? '')}
								>
									<img
										class="news-img"
										loading="lazy"
										decoding="async"
										src={parseImagesVal(news.announceImage)}
										alt=""
										width="64"
										height="64"
									/>
								</button>
							{/if}
						</article>
					{/each}
				{/if}
			{/each}
		</section>
	{:else}
		<section class="f no-news-body">
			<div class="contact f">
				<h2>ยังไม่มีประกาศ</h2>
				<p>หากโรงเรียนต้องการเพิ่มประกาศ</p>
				<button
					type="button"
					on:click={() => {
						contact_modal_isopen = true;
					}}>ติดต่อเจ้าหน้าที่</button
				>
			</div>
		</section>
	{/if}
</div>

<ContactOfficer bind:contact_modal_isopen />
<Dialog open={lightbox_open} on:close={() => (lightbox_open = false)}>
	<DialogOverlay class="lightbox-backdrop" />

	<DialogTitle class="sr-only">ภาพประกอบประกาศ</DialogTitle>
	<DialogDescription>URL: {lightbox_url}</DialogDescription>

	<button class="lightbox-close" type="button" on:click={() => (lightbox_open = false)}>
		<img
			loading="lazy"
			decoding="async"
			src="/icons/close-w.svg"
			alt="ปิด"
			width="32"
			height="32"
		/>
	</button>
	<img loading="lazy" decoding="async" src={lightbox_url} alt="" class="lightbox-image" />
</Dialog>

<style lang="scss">
	@media screen and (min-width: 768px) {
		.desktop-margin {
			width: 100%;
			max-width: 640px;
			margin: auto;
		}
	}

	.news-body,
	.no-news-body {
		flex-direction: column;
		padding: 16px;
		gap: 16px;
	}

	.no-news-body {
		justify-content: center;
		min-height: calc(100vh - 60px - 64px - var(--navbar-height));

		@media screen and (min-width: 768px) {
			min-height: calc(100vh - 64px - var(--navbar-height));
		}
	}

	.contact {
		text-align: center;
		flex-direction: column;
		gap: 4px;

		> button {
			font-weight: 500;
			color: #fc5858;
			text-decoration: underline;
		}
	}

	.month-title,
	h2 {
		font-family: 'Mitr';
		font-weight: 500;
		font-size: 1.125rem;
		line-height: 125%;
		letter-spacing: 0.02em;
	}

	article {
		padding: 16px;
		background: #fff;
		box-shadow: 0 0 4px rgba(12, 22, 107, 0.2);
		border-radius: 5px;
		width: 100%;

		> header {
			> .f {
				color: #f5a2a2;

				> p {
					margin: 8px 0;

					> .author {
						font-weight: 500;
					}
				}

				> small {
					margin-left: auto;
				}
			}
		}
	}

	.month-title {
		padding: 8px 16px;
		border-bottom: 1px solid #ced5ea;
		width: 100%;
	}

	:global(.announce-link) {
		color: inherit;
	}

	.news-external {
		color: inherit;
		display: block;
		margin-top: 8px;
		font-size: 0.625rem;
	}

	@media screen and (min-width: 768px) {
		.news-external {
			font-size: 0.8125rem;
		}
	}

	.news-img-btn {
		width: 100%;
		height: auto;
		aspect-ratio: 4/3;
		cursor: zoom-in;
		margin-top: 8px;
		display: block;
	}

	.news-img {
		width: 100%;
		height: 100%;
		object-fit: contain;
		display: block;
	}

	:global(.lightbox-backdrop) {
		position: fixed;
		inset: 0;
		background: rgb(0, 0, 0);
		cursor: zoom-out;

		z-index: 20;
	}

	.lightbox-close {
		position: fixed;
		top: 8px;
		left: 8px;
		z-index: 20;
	}

	.lightbox-image {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: 20;

		object-fit: contain;
		object-position: center;

		cursor: zoom-out;
		pointer-events: none;
	}

	@media screen and (min-width: 768px) {
		.lightbox-close {
			top: 32px;
			left: 32px;
		}

		.lightbox-image {
			top: 10vh;
			left: 10vw;
			width: 80vw;
			height: 80vh;
		}
	}
</style>
