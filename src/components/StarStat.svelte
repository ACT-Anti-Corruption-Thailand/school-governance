<script lang="ts">
	export let rating: number;
</script>

<img src="/icons/star.svg" alt="คะแนนเฉลี่ย" width="16" height="16" />
<span class="header-score-text">{rating.toFixed(1)}</span>

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
