<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	import { PUBLIC_NOCO_TOKEN_KEY } from '$env/static/public';

	import { PROVINCES } from 'data/provinces';

	import ProvinceDropdown from 'components/ProvinceDropdown.svelte';
	import SchoolList from 'components/SchoolList.svelte';

	import { show_search, search_string } from 'stores/search';

	const SCHOOL_PER_REQUEST = 10;

	const PROVINCES_CHOICE = ['เลือกจังหวัด', ...PROVINCES];
	let selected_province = PROVINCES_CHOICE[0];

	let show_all_province = false;
	let province_query: string[] = [];

	$: province_display_list = show_all_province ? province_query : province_query.slice(0, 5);

	let school_result_count = 0;
	let school_index = SCHOOL_PER_REQUEST;
	let school_result: { schoolId: string; nameTh: string; province: string }[] = [];

	const setProvince = (province: string) => () => {
		if (PROVINCES.includes(province)) {
			selected_province = province;
			$search_string = '';
		}
	};

	// https://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
	const escapeRegExp = (string: string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

	let formatted_search_string: string;
	const search = async (search_string: string) => {
		formatted_search_string = search_string.trim();
		if (!formatted_search_string || formatted_search_string.length < 2) {
			province_query = school_result = [];
			return;
		}

		province_query = PROVINCES.filter((p) => p.match(escapeRegExp(formatted_search_string)));
		province_display_list = province_query.slice(0, 5);
		show_all_province = false;

		try {
			const school_count_resp = await fetch(
				`https://sheets.wevis.info/api/v1/db/data/v1/Open-School-Test/SchoolIndex/count?where=${encodeURIComponent(
					`(nameTh,like,%${formatted_search_string}%)`
				)}`,
				{
					method: 'GET',
					headers: {
						'xc-token': PUBLIC_NOCO_TOKEN_KEY
					}
				}
			);
			const school_count_json = await school_count_resp.json();
			school_result_count = +school_count_json?.count ?? 0;
		} catch (e) {
			console.error(e);
			school_result_count = 0;
		}

		if (!school_result_count) return;
		school_index = 10;

		try {
			const school_data_resp = await fetch(
				`https://sheets.wevis.info/api/v1/db/data/v1/Open-School-Test/SchoolIndex?where=${encodeURIComponent(
					`(nameTh,like,%${formatted_search_string}%)`
				)}&limit=${SCHOOL_PER_REQUEST}`,
				{
					method: 'GET',
					headers: {
						'xc-token': PUBLIC_NOCO_TOKEN_KEY
					}
				}
			);
			const school_data_json = await school_data_resp.json();
			school_result = school_data_json?.list ?? [];
		} catch (e) {
			console.error(e);
			school_result_count = 0;
			school_result = [];
		}
	};

	const appendSchool = async () => {
		if (school_index >= school_result_count) return;

		try {
			const school_resp = await fetch(
				`https://sheets.wevis.info/api/v1/db/data/v1/Open-School-Test/SchoolIndex?where=${encodeURIComponent(
					`(nameTh,like,%${formatted_search_string}%)`
				)}&limit=${SCHOOL_PER_REQUEST}&offset=${school_index}`,
				{
					method: 'GET',
					headers: {
						'xc-token': PUBLIC_NOCO_TOKEN_KEY
					}
				}
			);
			const school_json = await school_resp.json();
			school_result = [...school_result, ...(school_json?.list ?? [])];
			school_index += 10;
		} catch (e) {
			console.error(e);
		}
	};

	$: search($search_string);

	onMount(() => {
		$show_search = true;
	});

	onDestroy(() => {
		$show_search = false;
	});

	let school_by_province: { schoolId: string; nameTh: string; province: string }[] = [];
	const getSchoolByProvince = async (event: any) => {
		const province = event.detail;
		if (province === 'เลือกจังหวัด') return (school_by_province = []);

		try {
			const school_resp = await fetch(
				`https://sheets.wevis.info/api/v1/db/data/v1/Open-School-Test/SchoolIndex?where=${encodeURIComponent(
					`(province,like,${province})`
				)}&limit=9999`,
				{
					method: 'GET',
					headers: {
						'xc-token': PUBLIC_NOCO_TOKEN_KEY
					}
				}
			);
			const school_json = await school_resp.json();
			school_by_province = school_json?.list ?? [];
		} catch (e) {
			console.error(e);
		}
	};

	// TODO: Implement แบ่งเขต
</script>

<div class="search-container">
	<a class="f" href="/school/1010720001">โรงเรียนพญาไท (Debug) </a>
	<a class="f" href="/school/1010720002">โรงเรียนโฆสิตสโมสร (Debug) </a>
	<a class="f" href="/school/1010720003">โรงเรียนราชวินิต (Debug) </a>
	<a class="f" href="/school/1010720004"
		>โรงเรียนทีปังกรวิทยาพัฒน์ (วัดโบสถ์) ในพระราชูปถัมภ์ฯ (Debug)
	</a>
	<a class="f" href="/school/1010720005">โรงเรียนวัดโสมนัส (Debug) </a>

	<ProvinceDropdown
		options={PROVINCES_CHOICE}
		selected_option={selected_province}
		on:change={getSchoolByProvince}
	/>

	{#if school_by_province.length}
		<section class="search-result inline">
			<!-- <h2 class="f">
				<span>จังหวัด</span>
				<small>พบ {province_query.length} จังหวัด</small>
			</h2> -->
			<ul>
				{#each school_by_province as { schoolId, nameTh } (schoolId)}
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
		</section>
	{/if}
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
					{#each province_display_list as p}
						<li>
							<button type="button" on:click={setProvince(p)}>
								{p}
							</button>
						</li>
					{/each}
					{#if province_query.length > 5 && !show_all_province}
						<li>
							<span class="f jcc more-button">
								<button
									type="button"
									on:click={() => {
										show_all_province = true;
									}}>ดูทั้งหมด</button
								>
							</span>
						</li>
					{/if}
				</ul>
			{/if}
			{#if school_result.length}
				<h2 class="f">
					<span>โรงเรียน</span>
					<small>พบ {school_result_count.toLocaleString()} โรงเรียน</small>
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
					{#if school_index < school_result_count}
						<li>
							<span class="f jcc more-button">
								<button type="button" on:click={appendSchool}>ดูเพิ่มเติม...</button>
							</span>
						</li>
					{/if}
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
		background: #fff;

		&:not(.inline) {
			position: fixed;
			inset: var(--navbar-height) 0 0;
			overflow: hidden auto;
		}

		&.inline {
			margin: 16px -16px 0;
		}

		h2,
		ul > li > a,
		ul > li > button {
			height: 50px;
			padding: 0 16px;
		}

		h2,
		ul {
			margin: 0;
			list-style: none;
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
				width: 100%;
				text-align: start;
			}
		}

		.more-button {
			height: 50px;

			> button {
				padding: 10px 20px;
				gap: 10px;

				border: 1px solid #3c55ab;
				box-shadow: 0 1px 4px rgba(12, 22, 107, 0.2);
				border-radius: 20px;
			}
		}
	}
</style>
