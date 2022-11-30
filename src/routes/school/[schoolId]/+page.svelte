<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	let data: object | null = null;

	onMount(() => {
		fetch(`/data/schools/${$page.params.schoolId}.json`)
			.then((resp) => resp.json())
			.then((d) => (data = d));
	});
</script>

<h1>School</h1>
{#if data}
	<pre>{JSON.stringify(data, null, 1)}</pre>
{/if}
