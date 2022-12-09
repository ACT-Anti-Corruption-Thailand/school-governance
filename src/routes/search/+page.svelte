<script lang="ts">
	import { PUBLIC_NOCO_TOKEN_KEY } from '$env/static/public';
	import { PROVINCES } from 'data/provinces';
	import ProvinceDropdown from 'components/ProvinceDropdown.svelte';
	import SchoolList from 'components/SchoolList.svelte';
	import { show_search, search_string } from 'stores/search';

	const PROVINCES_CHOICE = ['เลือกจังหวัด', ...PROVINCES];
	let selected_province = PROVINCES_CHOICE[0];

	let province_query: string[] = [];
	let school_result_count = 0;
	let school_result: { schoolId: string; nameTh: string }[] = [];

	const setProvince = (province: string) => () => {
		if (PROVINCES.includes(province)) {
			selected_province = province;
			$search_string = '';
		}
	};

	const search = (search_string: string) => {
		let trimmed = search_string.trim();
		if (!trimmed || trimmed.length < 2) {
			province_query = school_result = [];
			return;
		}
		province_query = PROVINCES.filter((p) => p.match(trimmed));

		fetch(
			`https://sheets.wevis.info/api/v1/db/data/v1/Open-School-Test/SchoolIndex/count?where=${encodeURIComponent(
				`(nameTh,like,%${trimmed}%)`
			)}`,
			{
				method: 'GET',
				headers: {
					'xc-token': PUBLIC_NOCO_TOKEN_KEY
				}
			}
		)
			.then((response) => response.json())
			.then((response) => (school_result_count = response?.count ?? 0))
			.catch((err) => {
				console.error(err);
				school_result_count = 0;
			});

		if (!school_result_count) return;
		fetch(
			`https://sheets.wevis.info/api/v1/db/data/v1/Open-School-Test/SchoolIndex?where=${encodeURIComponent(
				`(nameTh,like,%${trimmed}%)`
			)}&limit=10&shuffle=0&offset=0`,
			{
				method: 'GET',
				headers: {
					'xc-token': PUBLIC_NOCO_TOKEN_KEY
				}
			}
		)
			.then((response) => response.json())
			.then((response) => (school_result = response?.list ?? []))
			.catch((err) => {
				console.error(err);
				school_result = [];
			});
	};

	$: search($search_string);
</script>

<div class="search-container">
	<ProvinceDropdown options={PROVINCES_CHOICE} selected_option={selected_province} />
	<!-- <input type="text" bind:value={query} /> -->
	<!-- <button type="button" on:click={search}>ค้นหา</button> -->
	<!-- <ul>
		<li>
			<a href="/school/1010720003">ราชวินิต (ทดสอบ)</a>
		</li>
		{#if Array.isArray(result)}
			{#each result as { schoolId, nameTh } (schoolId)}
				<li><a href="/school/{schoolId}">โรงเรียน{nameTh}</a></li>
			{/each}
		{/if}
	</ul> -->
	<h2>โรงเรียนที่มีส่วนร่วมล่าสุด</h2>
	<SchoolList />
	<h2>โรงเรียนที่มีคะแนนเฉลี่ยสูงสุด</h2>
	<SchoolList />
	<h2>โรงเรียนที่แสดงความเห็นมากที่สุด</h2>
	<SchoolList />

	{#if school_result.length || province_query.length}
		<section class="search-result">
			{#if province_query.length}
				<h2 class="f">
					<span>จังหวัด</span>
					<small>พบ {province_query.length} จังหวัด</small>
				</h2>
				<ul>
					{#each province_query as p (p)}
						<li>
							<button type="button" on:click={setProvince(p)}>
								{p}
							</button>
						</li>
					{/each}
				</ul>
			{/if}
			{#if school_result.length}
				<h2 class="f">
					<span>โรงเรียน</span>
					<small>พบ {school_result_count} โรงเรียน</small>
				</h2>
				<ul>
					{#each school_result as { schoolId, nameTh } (schoolId)}
						<li>
							<a
								class="f"
								href="/school/{schoolId}"
								on:click={() => (($show_search = false), ($search_string = ''))}
							>
								{nameTh}
							</a>
						</li>
					{/each}
				</ul>
			{/if}
		</section>
	{/if}
</div>

<style lang="scss">
	.search-container {
		padding: 16px;
		color: #3c55ab;
		font-size: 0.8125rem;
		line-height: 136%;

		h2 {
			font-size: inherit;
			line-height: inherit;
			font-weight: 400;

			margin: 24px 0 16px;
		}

		@media screen and (min-width: 992px) {
			font-size: 1rem;
		}
	}

	.search-result {
		position: fixed;
		inset: var(--navbar-height) 0 0;

		background: #fff;
		overflow: hidden auto;

		h2,
		ul > li > a,
		ul > li > button {
			height: 50px;
			padding: 0 16px;
		}

		h2,
		ul {
			margin: 0;
		}

		h2 {
			gap: 8px;
			border-bottom: 1px solid #ced5ea;

			> span {
				font-weight: 500;
				font-size: 0.8125rem;
				line-height: 136%;
				color: #0c166b;
			}

			> small {
				font-size: 0.625rem;
				line-height: 136%;
				color: #9daad5;
			}
		}

		ul > li {
			border-bottom: 1px solid #ecf7f7;

			> a,
			> button {
				font-size: 0.8125rem;
				line-height: 136%;
				color: #3c55ab;
				text-decoration: none;
			}
		}
	}
</style>
