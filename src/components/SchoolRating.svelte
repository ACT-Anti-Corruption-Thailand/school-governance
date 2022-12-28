<script lang="ts">
	export let rating = 0;
	export let comment = 0;
</script>

<div class="f header-score">
	<img src="/icons/star.svg" alt="คะแนนเฉลี่ย" width="16" height="16" />
	<span class="header-score-text more-right-space">{rating.toFixed(1)}</span>
	<img src="/icons/comment.svg" alt="คะแนนเฉลี่ย" width="16" height="16" />
	<span class="header-score-text">{comment}</span>
</div>

<style lang="scss">
	.header-score {
		margin-left: auto;
		gap: 4px;

		> .header-score-text {
			font-family: 'Mitr';
			font-weight: 500;
			line-height: 1.25;
			text-align: center;
			letter-spacing: 0.02em;
			color: #3c55ab;

			&.more-right-space {
				margin-right: 4px;
			}
		}
	}
</style>
