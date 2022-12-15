<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { PUBLIC_NOCO_TOKEN_KEY } from '$env/static/public';

	import SchoolHeader from 'components/SchoolHeader.svelte';
	import Dropdown from 'components/Dropdown.svelte';

	const DROPDOWN_DATA = [
		{ value: 'ธันวาคม', monthValue: 12 },
		{ value: 'พฤศจิกายน', monthValue: 11 },
		{ value: 'ตุลาคม', monthValue: 10 },
		{ value: 'กันยายน', monthValue: 9 },
		{ value: 'สิงหาคม', monthValue: 8 },
		{ value: 'กรกฎาคม', monthValue: 7 },
		{ value: 'มิถุนายน', monthValue: 6 },
		{ value: 'พฤษภาคม', monthValue: 5 },
		{ value: 'เมษายน', monthValue: 4 },
		{ value: 'มีนาคม', monthValue: 3 },
		{ value: 'กุมภาพันธ์', monthValue: 2 },
		{ value: 'มกราคม', monthValue: 1 }
	];

	let dropdown_choice = DROPDOWN_DATA[0];

	$: pageData = $page.params.schoolId;

	let data: {
		Id: number;
		schoolId: string;
		announceTitle: string;
		announcePerson: string;
		announceContent: string;
		announceDate: string;
	}[];
	onMount(() => {
		fetch(
			`https://sheets.wevis.info/api/v1/db/data/noco/p_l3i1x0puw6u28y/Announcements/views/Announcements?limit=999&where=(schoolId,eq,${pageData})`,
			{
				method: 'GET',
				headers: {
					'xc-token': PUBLIC_NOCO_TOKEN_KEY
				}
			}
		)
			.then((response) => response.json())
			.then((response) => (data = response?.list))
			.catch((err) => console.error(err));
	});

	$: filtered_data = data?.filter(
		(e) => new Date(e.announceDate).getMonth() === dropdown_choice.monthValue
	);
</script>

<SchoolHeader pageData={{ name: 'ประกาศ', color: '#FC5858' }}>
	<Dropdown options={DROPDOWN_DATA} bind:selected_option={dropdown_choice} />
</SchoolHeader>
<section class="f">
	{#if Array.isArray(filtered_data) && filtered_data.length}
		{#each filtered_data as news}
			<article>
				<header>
					<h2>{news.announceTitle}</h2>
					<p>โพสต์โดย: <span class="author">{news.announcePerson}</span></p>
				</header>
				<p>{news.announceContent}</p>
			</article>
		{/each}
	{:else}
		<div class="contact f">
			<h2>ยังไม่มีประกาศ</h2>
			<p>หากโรงเรียนต้องการเพิ่มประกาศ</p>
			<a href="#a">ติดต่อเจ้าหน้าที่</a>
		</div>
	{/if}
</section>

<!-- <pre><code>{data ? JSON.stringify(filtered_data, null, 2) : ''}</code></pre> -->
<style lang="scss">
	section {
		min-height: 70vh;
		flex-direction: column;
		justify-content: center;
		padding: 16px;
	}

	.contact {
		text-align: center;
		flex-direction: column;
		gap: 4px;

		> a {
			font-weight: 500;
			color: #fc5858;
		}
	}

	h2 {
		font-family: 'Mitr';
		font-weight: 500;
		font-size: 1.125rem;
		line-height: 125%;
		letter-spacing: 0.02em;
	}

	article {
		padding: 16px;
		background: #ffffff;
		box-shadow: 0px 0px 4px rgba(12, 22, 107, 0.2);
		border-radius: 5px;
		width: 100%;

		> header {
			> p {
				color: #f5a2a2;
				margin: 8px 0;

				> .author {
					font-weight: 500;
				}
			}
		}
	}
</style>
