<script lang="ts">
	import { PUBLIC_NOCO_AUTH_KEY } from '$env/static/public';

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

<h1>Search</h1>
<input type="text" bind:value={query} />
<button type="button" on:click={search}>ค้นหา</button>
<ul>
	<li>
		<a href="/school/1010720003">ราชวินิต (ทดสอบ)</a>
	</li>
	{#each result as { schoolId, nameTh } (schoolId)}
		<li><a href="/school/{schoolId}">โรงเรียน{nameTh}</a></li>
	{/each}
</ul>
