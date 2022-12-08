<script lang="ts">
	import { PUBLIC_NOCO_AUTH_KEY } from '$env/static/public';
	import { PROVINCES } from 'data/provinces';
	import ProvinceDropdown from 'components/ProvinceDropdown.svelte';
	import SchoolList from 'components/SchoolList.svelte';

	let selected_province = PROVINCES[0];

	let query = '';
	let result: { schoolId: string; nameTh: string }[] = [];
	const search = () => {
		let trimmed = query.trim();
		if (!trimmed) return;
		fetch(
			`https://sheets.wevis.info/api/v1/db/data/v1/Open-School-Test/SchoolIndex?where=%28nameTh%2Clike%2C%25${trimmed}%25%29&limit=25&shuffle=0&offset=0`,
			{
				method: 'GET',
				headers: {
					'xc-auth': PUBLIC_NOCO_AUTH_KEY
				}
			}
		)
			.then((response) => response.json())
			.then((response) => (result = response?.list))
			.catch((err) => console.error(err));
	};
</script>

<div class="search-container">
	<ProvinceDropdown selectedOption={selected_province} />
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
</style>
