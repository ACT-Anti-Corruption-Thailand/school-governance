<script lang="ts">
	import { PUBLIC_API_HOST } from '$env/static/public';

	import { onMount } from 'svelte';

	import SchoolHeader from 'components/school/SchoolHeader.svelte';
	import Dropdown from 'components/Dropdown.svelte';
	import ContactOfficer from 'components/ContactOfficer.svelte';

	import { page } from '$app/stores';
	import { computed_years } from 'stores/school';

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
</script>

<svelte:head>
	<title>ประกาศโรงเรียน — โปร่งใสวิทยาคม</title>
	<meta property="og:title" content="ประกาศโรงเรียน — โปร่งใสวิทยาคม" />
	<meta name="twitter:title" content="ประกาศโรงเรียน — โปร่งใสวิทยาคม" />
</svelte:head>

<SchoolHeader pageData={{ name: 'ประกาศ', color: '#FC5858' }}>
	<Dropdown options={DROPDOWN_DATA} bind:selected_option={dropdown_choice} />
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
							<p>{news.announceContent}</p>
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
</style>
