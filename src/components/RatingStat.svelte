<script lang="ts">
	export let noFormat = false;
	export let rating: number | undefined;
</script>

<img
	loading="lazy"
	decoding="async"
	src="/icons/star.svg"
	alt="คะแนนเฉลี่ย"
	width="16"
	height="16"
/>
{#if rating === null || rating === undefined || Number.isNaN(rating) || typeof rating !== 'number'}
	<span class="header-score-text">—</span>
{:else if noFormat}
	<span class="header-score-text">{rating || 0}</span>
{:else}
	<span class="header-score-text">{(rating || 0).toFixed(1)}</span>
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
