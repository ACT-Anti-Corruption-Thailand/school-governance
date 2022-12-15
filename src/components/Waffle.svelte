<script lang="ts">
	export let number: number;

	$: group = Math.floor(number / 25);
	$: remaining = number % 25;
</script>

<div class="waffle-container">
	{#each Array(group) as _}
		<div class="waffle-group">
			<div class="waffle" />
			<div class="waffle" />
			<div class="waffle" />
			<div class="waffle" />
			<div class="waffle" />
			<div class="waffle" />
			<div class="waffle" />
			<div class="waffle" />
			<div class="waffle" />
			<div class="waffle" />
			<div class="waffle" />
			<div class="waffle" />
			<div class="waffle" />
			<div class="waffle" />
			<div class="waffle" />
			<div class="waffle" />
			<div class="waffle" />
			<div class="waffle" />
			<div class="waffle" />
			<div class="waffle" />
			<div class="waffle" />
			<div class="waffle" />
			<div class="waffle" />
			<div class="waffle" />
			<div class="waffle" />
		</div>
	{/each}
	<div class="waffle-group">
		{#each Array(remaining) as _}
			<div class="waffle" />
		{/each}
	</div>
</div>

<style lang="scss">
	.waffle-container {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: 4px;
		margin: 8px 0;
	}

	.waffle-group {
		display: grid;
		grid-template-columns: repeat(5, 4px);
		gap: 1px;
		align-content: start;
	}

	.waffle {
		background: var(--std-color);
		border-radius: 1px;
		width: 4px;
		height: 4px;
	}
</style>
