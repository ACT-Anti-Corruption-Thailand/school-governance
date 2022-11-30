<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { PUBLIC_NOCO_AUTH_KEY } from '$env/static/public';
	import SchoolHeader from 'components/SchoolHeader.svelte';

	$: pageData = $page.params.schoolId;

	let data: object;
	onMount(() => {
		fetch(
			`https://sheets.wevis.info/api/v1/db/data/noco/p_l3i1x0puw6u28y/Announcements/views/Announcements?offset=0&limit=100&where=(schoolId,eq,${pageData})`,
			{
				method: 'GET',
				headers: {
					'xc-auth': PUBLIC_NOCO_AUTH_KEY
				}
			}
		)
			.then((response) => response.json())
			.then((response) => (data = response?.list))
			.catch((err) => console.error(err));
	});
</script>

<SchoolHeader pageData={{ name: 'ประกาศ', color: '#FC5858' }} />
<pre><code>{data ? JSON.stringify(data, null, 2) : ''}</code></pre>
