<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	import { PUBLIC_API_HOST } from '$env/static/public';

	import { PROVINCES } from 'data/provinces';

	import ProvinceDropdown from 'components/search/ProvinceDropdown.svelte';
	import SchoolList from 'components/SchoolList.svelte';
	import type { SchoolData } from 'components/SchoolList.svelte';

	import { show_search, search_string } from 'stores/search';
	import { currentSchool, currentSchoolId } from 'stores/school';

	import { getLatestActivityList, getStatsList } from 'utils/data_fetching';

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
	let search_stats: 'blur' | 'searching' | 'showing_results' | 'error' = 'blur';
	let search_controller = new AbortController();
	const search = async (search_string: string) => {
		search_controller.abort(); // abort all previous fetch

		formatted_search_string = search_string.trim();
		if (!formatted_search_string || formatted_search_string.length < 2) {
			province_query = school_result = [];
			school_result_count = 0;
			search_stats = 'blur';
			return;
		}

		search_controller = new AbortController();
		search_stats = 'searching';
		province_query = PROVINCES.filter((p) => p.match(escapeRegExp(formatted_search_string)));
		province_display_list = province_query.slice(0, 5);
		show_all_province = false;

		try {
			// ที่ต้องใช้ตัวนี้ เพราะต้องลิสต์ออกมาทั้งหมดก่อนเลย แต่ไม่ต้องการทุกตัวออกมาในเวลาเดียวกัน
			const school_count_resp = await fetch(
				`${PUBLIC_API_HOST}/schools/count?name=${encodeURIComponent(formatted_search_string)}`,
				{ signal: search_controller.signal }
			);
			const school_count_json = await school_count_resp.json();
			school_result_count = +school_count_json?.count ?? 0;
		} catch (e: any) {
			if ((e?.name ?? '') === 'AbortError') return;
			console.error(e);
			school_result_count = 0;
			school_result = [];
			search_stats = 'error';
			return;
		}

		if (!school_result_count) {
			school_result = [];
			search_stats = 'showing_results';
			return;
		}
		school_index = 10;

		try {
			const school_data_resp = await fetch(
				`${PUBLIC_API_HOST}/schools?name=${encodeURIComponent(
					formatted_search_string
				)}&limit=${SCHOOL_PER_REQUEST}`,
				{ signal: search_controller.signal }
			);
			const school_data_json = await school_data_resp.json();
			school_result = school_data_json?.list ?? [];
			search_stats = 'showing_results';
		} catch (e: any) {
			if ((e?.name ?? '') === 'AbortError') return;
			console.error(e);
			school_result_count = 0;
			school_result = [];
			search_stats = 'error';
		}
	};

	const appendSchool = async () => {
		if (school_index >= school_result_count) return;

		try {
			const school_resp = await fetch(
				`${PUBLIC_API_HOST}/schools?name=${encodeURIComponent(
					formatted_search_string
				)}&limit=${SCHOOL_PER_REQUEST}&offset=${school_index}`
			);
			const school_json = await school_resp.json();
			school_result = [...school_result, ...(school_json?.list ?? [])];
			school_index += 10;
		} catch (e) {
			console.error(e);
		}
	};

	$: search($search_string);

	const fetchRelatedSchool = async (school_id: number, district: string, province: string) => {
		try {
			let related_school_list_tmp = [];

			let school_resp = await fetch(
				`${PUBLIC_API_HOST}/schools?district=${encodeURIComponent(
					district
				)}&province=${encodeURIComponent(province)}&exclude_school_id=${encodeURIComponent(
					school_id
				)}&limit=5`
			);
			let school_json = await school_resp.json();
			related_school_list_tmp = school_json.list ?? [];

			if (related_school_list.length < 5) {
				school_resp = await fetch(
					`${PUBLIC_API_HOST}/schools?exclude_district=${encodeURIComponent(
						district
					)}&province=${encodeURIComponent(province)}&exclude_school_id=${encodeURIComponent(
						school_id
					)}&limit=${5 - related_school_list.length}`
				);
				school_json = await school_resp.json();
				related_school_list_tmp = related_school_list.concat(school_json.list ?? []);
				related_school_list = related_school_list_tmp;
			} else {
				related_school_list = related_school_list_tmp;
			}
		} catch (e) {
			console.error(e);
		}
	};

	let related_school_list: any[] = [];
	$: related_school_listdata = related_school_list.map((e) => ({
		id: e.schoolId,
		name: e.nameTh,
		date: 0,
		rating: 0,
		comment: 0
	})) as SchoolData[];

	const groupBy = <T, K extends keyof any>(arr: T[], groupFn: (element: T) => K): Record<K, T[]> =>
		arr.reduce(
			(r, v, _i, _a, k = groupFn(v)) => ((r[k] || (r[k] = [])).push(v), r),
			{} as Record<K, T[]>
		);

	type SchoolMetadataType = {
		schoolId: string;
		nameTh: string;
		province: string;
		district: string;
	};
	let school_by_province: [string, SchoolMetadataType[]][] = [];
	let school_by_province_stats: 'blur' | 'searching' | 'showing_results' | 'error' = 'blur';
	let school_province_controller: AbortController = new AbortController();
	const getSchoolByProvince = async (province: any) => {
		school_province_controller.abort();

		if (province === 'เลือกจังหวัด') {
			school_by_province = [];
			school_by_province_stats = 'blur';
			return;
		}

		school_province_controller = new AbortController();
		school_by_province_stats = 'searching';
		try {
			const school_resp = await fetch(
				`${PUBLIC_API_HOST}/schools?province=${encodeURIComponent(province)}&limit=1000`,
				{ signal: school_province_controller.signal }
			);
			const school_json = await school_resp.json();
			if (school_json.list?.length) {
				const school_by_district_obj = groupBy(school_json.list, (s: any) => s?.district);
				const school_entries = Object.entries(school_by_district_obj);
				school_by_province = school_entries.sort((a, z) => a[0].localeCompare(z[0]));
				school_by_province.forEach((e) => e[1].sort((a, z) => a.nameTh.localeCompare(z.nameTh)));
			} else {
				school_by_province = [];
			}
			school_by_province_stats = 'showing_results';
		} catch (e: any) {
			if ((e?.name ?? '') === 'AbortError') return;
			console.error(e);
			school_by_province_stats = 'error';
		}
	};

	$: getSchoolByProvince(selected_province);

	const DEBUG_SCHOOL_LIST = [
		{ id: '1010720001', name: 'พญาไท' },
		{ id: '1010720002', name: 'โฆสิตสโมสร' },
		{ id: '1010720003', name: 'ราชวินิต' },
		{ id: '1010720004', name: 'ทีปังกรวิทยาพัฒน์ (วัดโบสถ์) ในพระราชูปถัมภ์ฯ' },
		{ id: '1010720005', name: 'วัดโสมนัส' }
	];
	let latestActivityList: any[] = [];
	let mostCommentList: any[] = [];
	let mostRatingList: any[] = [];

	const _getLatestActivityList = async () => {
		latestActivityList = await getLatestActivityList();
	};

	const _getStatsList = async () => {
		const a = await getStatsList();
		mostCommentList = a.mostCommentList;
		mostRatingList = a.mostRatingList;
	};

	onMount(() => {
		$show_search = true;
		if ($currentSchool && $currentSchoolId) {
			const { district, province } = $currentSchool;
			fetchRelatedSchool($currentSchoolId, district, province);
		}
		_getLatestActivityList();
		_getStatsList();
	});

	onDestroy(() => {
		$show_search = false;
	});

	const formatDistrict = (district: string | null): string => {
		if (!district || district === 'null') return '(ไม่ทราบอำเภอ)';
		if (!district.includes('เขต') && !district.includes('อำเภอ')) return `อำเภอ${district}`;
		return district;
	};
</script>

<svelte:head>
	<title>ค้นหาโรงเรียน — โปร่งใสวิทยาคม</title>
	<meta property="og:title" content="ค้นหาโรงเรียน — โปร่งใสวิทยาคม" />
	<meta name="twitter:title" content="ค้นหาโรงเรียน — โปร่งใสวิทยาคม" />
</svelte:head>

<div class="search-container">
	<div class="province-dropdown-wrapper" class:white-bg={school_by_province.length}>
		<ProvinceDropdown options={PROVINCES_CHOICE} bind:selected_option={selected_province} />
	</div>

	{#if school_by_province_stats === 'showing_results'}
		{#if school_by_province.length}
			<section class="search-result inline">
				{#each school_by_province as [district, school_data] (district)}
					<details>
						<summary>
							<h2 class="f">
								<span>{formatDistrict(district)}</span>
								<small>พบ {school_data.length} โรงเรียน</small>
								<img
									class="summary-chevron"
									loading="lazy"
									decoding="async"
									src="/chevrons/bottom.svg"
									alt=""
									width="20"
									height="20"
								/>
							</h2>
						</summary>
						<ul>
							{#each school_data as { schoolId, nameTh } (schoolId)}
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
					</details>
				{/each}
			</section>
		{:else}
			<section style="text-align:center;padding-top:32px">
				<p style="font-size:1.2em;font-weight:700;margin-bottom:8px">
					ไม่พบโรงเรียนในจังหวัด{selected_province}
				</p>
			</section>
		{/if}
	{:else if school_by_province_stats === 'searching'}
		<section style="text-align:center;padding-top:32px">
			<p style="font-size:1.2em;font-weight:700;margin-bottom:8px">
				กำลังโหลดข้อมูลโรงเรียนในจังหวัด{selected_province}...
			</p>
		</section>
	{:else if school_by_province_stats === 'error'}
		<section style="text-align:center;padding-top:32px">
			<p style="font-size:1.2em;font-weight:700;margin-bottom:8px">
				เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง
			</p>
		</section>
	{:else}
		<div class="desktop-grid" class:four={$currentSchool}>
			{#if $currentSchool}
				<section>
					<h2>โรงเรียนใน{formatDistrict($currentSchool.district)}และใกล้เคียง</h2>
					<SchoolList school_list={related_school_listdata} />
				</section>
			{/if}
			<section>
				<h2>โรงเรียนที่มีส่วนร่วมล่าสุด</h2>
				<SchoolList school_list={latestActivityList} />
			</section>
			<section>
				<h2>โรงเรียนที่มีจำนวนรีวิวมากที่สุด</h2>
				<SchoolList school_list={mostRatingList} is_count_rating />
			</section>
			<section>
				<h2>โรงเรียนที่แสดงความเห็นมากที่สุด</h2>
				<SchoolList school_list={mostCommentList} />
			</section>
			<!-- <section>
				<h2>โรงเรียนที่เอาไว้ Debug</h2>
				<SchoolList school_list={DEBUG_SCHOOL_LIST} />
			</section> -->
		</div>
	{/if}

	{#if search_stats === 'showing_results'}
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
		{:else}
			<section class="search-result" style="text-align:center;padding-top:32px">
				<p style="font-size:1.2em;font-weight:700;margin-bottom:8px">
					ไม่พบโรงเรียน/จังหวัด "{formatted_search_string}"
				</p>
				<p>กรุณาลองค้นหาด้วยคำค้นหาอื่น</p>
			</section>
		{/if}
	{:else if search_stats === 'searching'}
		<section class="search-result" style="text-align:center;padding-top:32px">
			<p style="font-size:1.2em;font-weight:700;margin-bottom:8px">
				กำลังค้นหา "{formatted_search_string}"...
			</p>
		</section>
	{:else if search_stats === 'error'}
		<section class="search-result" style="text-align:center;padding-top:32px">
			<p style="font-size:1.2em;font-weight:700;margin-bottom:8px">
				เกิดข้อผิดพลาด กรุณาลองค้นหาด้วยคำค้นหาอื่น
			</p>
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

		@media screen and (min-width: 768px) {
			font-size: 1rem;
			padding: 16px 10%;
		}
	}

	.search-result {
		background: #fff;

		&:not(.inline) {
			position: fixed;
			inset: var(--navbar-height) 0 0;
			overflow: hidden auto;

			@media screen and (min-width: 768px) {
				padding: 0 10%;
				background: #ecf7f7;
			}
		}

		&.inline {
			margin: 0 -16px;
		}

		summary {
			cursor: pointer;
			list-style: none;

			&::-webkit-details-marker {
				display: none;
			}

			.summary-chevron {
				margin-left: auto;
			}
		}

		details[open] summary .summary-chevron {
			transform: rotate(180deg);
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
			background: #fff;
		}

		h2 {
			gap: 8px;
			border-bottom: 1px solid #ced5ea;
			background: #ecf7f7;

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
				box-sizing: border-box;
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

	@media screen and (min-width: 768px) {
		.desktop-grid {
			display: grid;
			grid-template-columns: 1fr 1fr;
			grid-template-rows: 1fr 1fr;
			gap: 40px;
		}
	}

	@media screen and (min-width: 992px) {
		.desktop-grid {
			grid-template-columns: 1fr 1fr 1fr;
			grid-template-rows: unset;

			&.four {
				grid-template-columns: 1fr 1fr;
			}
		}
	}

	.province-dropdown-wrapper {
		margin: -16px;
		margin-bottom: 0;
		padding: 16px;

		background: #fff;
		box-shadow: -80vw 0 0 #fff, 80vw 0 0 #fff;
	}
</style>
