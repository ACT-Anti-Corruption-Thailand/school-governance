<script lang="ts">
	import { onMount } from 'svelte';

	import CommentStat from './CommentStat.svelte';
	import RatingStat from './RatingStat.svelte';

	import { fetchSchoolStats, schoolStatsCache } from 'stores/school_stats_cache';

	export let schoolId = '';
	export let noFetch = false;
	export let count_score = false;
	export let count_comment = false;

	export let comment = 0;
	export let allComment = 0;
	export let ratingCount = 0;
	export let rating = 0;

	let _comment: undefined | number = undefined;
	let _allComment: undefined | number = undefined;
	let _ratingCount: undefined | number = undefined;
	let _rating: undefined | number = undefined;

	const fetchScore = async () => {
		if (!schoolId) return;
		if (schoolId in $schoolStatsCache) {
			_comment = $schoolStatsCache[schoolId].comment;
			_allComment = $schoolStatsCache[schoolId].allComment;
			_ratingCount = $schoolStatsCache[schoolId].ratingCount;
			_rating = $schoolStatsCache[schoolId].rating;
			return;
		}

		[_comment, _allComment, _ratingCount, _rating] = await fetchSchoolStats(schoolId);

		if (
			_comment === undefined ||
			_allComment === undefined ||
			_ratingCount === undefined ||
			_rating === undefined
		)
			return;
		$schoolStatsCache = {
			...$schoolStatsCache,
			[schoolId]: {
				comment: _comment,
				allComment: _allComment,
				ratingCount: _ratingCount,
				rating: _rating
			}
		};
	};

	onMount(() => {
		if (noFetch) {
			_comment = comment;
			_allComment = allComment;
			_ratingCount = ratingCount;
			_rating = rating;
		} else {
			fetchScore();
		}
	});
</script>

<div class="f header-score" data-schoolId={schoolId}>
	{#if count_score}
		<RatingStat rating={_ratingCount} noFormat />
	{:else}
		<RatingStat rating={_rating} />
	{/if}
	<div class="spacer" />
	<CommentStat comment={count_comment ? _allComment : _comment} />
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
