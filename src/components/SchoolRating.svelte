<script lang="ts">
	export let rating = 0;
	export let comment = 0;
</script>

<div class="f header-score">
	<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" width="16" height="16"
		><path
			fill="#FA7CC7"
			stroke="#FA7CC7"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="1.5"
			d="M10 1.667l2.575 5.216 5.759.842-4.167 4.058.983 5.734L10 14.808l-5.15 2.709.984-5.734-4.167-4.058 5.758-.842L10 1.667z"
		/></svg
	>
	<span class="header-score-text more-right-space">{rating.toFixed(1)}</span>
	<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" width="16" height="16"
		><path
			fill="#6BC9FF"
			stroke="#6BC9FF"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="1.5"
			d="M17.5 9.583a6.983 6.983 0 01-.75 3.167 7.084 7.084 0 01-6.333 3.917 6.983 6.983 0 01-3.167-.75L2.5 17.5l1.583-4.75a6.983 6.983 0 01-.75-3.167A7.083 7.083 0 017.25 3.25a6.983 6.983 0 013.167-.75h.416A7.067 7.067 0 0117.5 9.167v.416z"
		/></svg
	>
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
