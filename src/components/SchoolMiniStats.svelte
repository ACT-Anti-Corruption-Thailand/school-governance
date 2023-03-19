<script lang="ts">
	import { onMount } from 'svelte';

	import RatingStat from './RatingStat.svelte';
	import CommentStat from './CommentStat.svelte';

	import { fetchSchoolStats, schoolStatsCache } from 'stores/school_stats_cache';

	export let schoolId: string = '';
	export let noFetch = false;
	export let count_score = false;

	export let rating = 0;
	export let ratingCount = 0;
	export let comment = 0;

	let _comment: undefined | number = undefined;
	let _ratingCount: undefined | number = undefined;
	let _rating: undefined | number = undefined;

	const fetchScore = async () => {
		if (!schoolId) return;
		if (schoolId in $schoolStatsCache) {
			_rating = $schoolStatsCache[schoolId].rating;
			_ratingCount = $schoolStatsCache[schoolId].ratingCount;
			_comment = $schoolStatsCache[schoolId].comment;
			return;
		}

		[_comment, _ratingCount, _rating] = await fetchSchoolStats(schoolId);

		if (_comment === undefined || _ratingCount === undefined || _rating === undefined) return;
		$schoolStatsCache = {
			...$schoolStatsCache,
			[schoolId]: { comment: _comment, ratingCount: _ratingCount, rating: _rating }
		};
	};

	onMount(() => {
		if (noFetch) {
			_rating = rating;
			_ratingCount = ratingCount;
			_comment = comment;
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
	<CommentStat comment={_comment} />
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
