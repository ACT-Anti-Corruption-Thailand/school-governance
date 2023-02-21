<script lang="ts">
	export let comment: number;
</script>

<img
	src="/icons/comment.svg"
	alt="จำนวนคอมเมนต์"
	width="16"
	height="16"
	loading="lazy"
	decoding="async"
/>
<span class="header-score-text">{comment}</span>

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
