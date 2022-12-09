<script lang="ts">
	import { PUBLIC_NOCO_AUTH_KEY } from '$env/static/public';
	import { PROVINCES } from 'data/provinces';
	import ProvinceDropdown from 'components/ProvinceDropdown.svelte';
	import SchoolList from 'components/SchoolList.svelte';

	let selected_province = PROVINCES[1];

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

	{#if Array.isArray(result) && result.length}
		<section class="search-result">
			<h2 class="f">
				<span>จังหวัด</span>
				<small>พบ 10 จังหวัด</small>
			</h2>
			<ul>
				<li>
					<a class="f" href="#a">กรุงเทพ</a>
				</li>
				<li>
					<a class="f" href="#a">กรุงเทพ</a>
				</li>
				<li>
					<a class="f" href="#a">กรุงเทพ</a>
				</li>
			</ul>
			<h2 class="f">
				<span>โรงเรียน</span>
				<small>พบ 100 โรงเรียน</small>
			</h2>
			<ul>
				<li>
					<a class="f" href="#a">กรุงเทพ</a>
				</li>
				<li>
					<a class="f" href="#a">กรุงเทพธนบุรี</a>
				</li>
				<li>
					<a class="f" href="#a">กรุงเทพมหานครอมรรัตนโกสินทร์มหินทราอยุธยามหาดิลกนพรัตนราชธานี</a>
				</li>
				<li>
					<a class="f" href="#a">กรุงเทพพัฒนา</a>
				</li>
				<li>
					<a class="f" href="#a">กรุงเทพ</a>
				</li>
				<li>
					<a class="f" href="#a">กรุงเทพธนบุรี</a>
				</li>
				<li>
					<a class="f" href="#a">กรุงเทพมหานครอมรรัตนโกสินทร์มหินทราอยุธยามหาดิลกนพรัตนราชธานี</a>
				</li>
				<li>
					<a class="f" href="#a">กรุงเทพพัฒนา</a>
				</li>
				<li>
					<a class="f" href="#a">กรุงเทพ</a>
				</li>
				<li>
					<a class="f" href="#a">กรุงเทพธนบุรี</a>
				</li>
				<li>
					<a class="f" href="#a">กรุงเทพมหานครอมรรัตนโกสินทร์มหินทราอยุธยามหาดิลกนพรัตนราชธานี</a>
				</li>
				<li>
					<a class="f" href="#a">กรุงเทพพัฒนา</a>
				</li>
			</ul>
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
		ul > li > a {
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

			> a {
				font-size: 0.8125rem;
				line-height: 136%;
				color: #3c55ab;
				text-decoration: none;
			}
		}
	}
</style>
