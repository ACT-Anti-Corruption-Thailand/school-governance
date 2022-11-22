<script lang="ts">
	let count = 0;
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<hr />
<div>{count}</div>
<button
	type="button"
	on:click={() => {
		count++;
	}}
>
	Increment
</button>
