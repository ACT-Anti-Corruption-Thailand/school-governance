<script lang="ts">
	import ScoreStat from './StarStat.svelte';
	import CommentStat from './CommentStat.svelte';

	export let rating = 0;
	export let comment = 0;
</script>

<div class="f header-score">
	<ScoreStat {rating} />
	<div class="spacer" />
	<CommentStat {comment} />
</div>

<style lang="scss">
	.header-score {
		margin-left: auto;
		gap: 4px;

		> .spacer {
			width: 4px;
		}
	}
</style>
