<script lang="ts">
	export let comment: number | undefined;
</script>

<img
	src="/icons/comment.svg"
	alt="จำนวนคอมเมนต์"
	width="16"
	height="16"
	loading="lazy"
	decoding="async"
/>
{#if comment === null || comment === undefined || Number.isNaN(comment) || typeof comment !== 'number'}
	<span class="header-score-text">...</span>
{:else}
	<span class="header-score-text">{comment}</span>
{/if}

<style lang="scss">
	.header-score-text {
		font-family: 'Mitr';
		font-weight: 500;
		line-height: 1.25;
		text-align: center;
		letter-spacing: 0.02em;
		color: #3c55ab;
	}
</style>
