<script lang="ts">
	import { PUBLIC_API_HOST } from '$env/static/public';

	import { onMount } from 'svelte';

	import RatingStat from './RatingStat.svelte';
	import CommentStat from './CommentStat.svelte';

	import { schoolStatsCache } from 'stores/school_stats_cache';

	export let schoolId: string = '';
	export let noFetch = false;
	export let count_score = false;

	export let rating = 0;
	export let ratingCount = 0;
	export let comment = 0;

	let _rating: undefined | number = undefined;
	let _ratingCount: undefined | number = undefined;
	let _comment: undefined | number = undefined;

	const fetchScore = async () => {
		if (!schoolId) return;
		if (schoolId in $schoolStatsCache) {
			_rating = $schoolStatsCache[schoolId].rating;
			_ratingCount = $schoolStatsCache[schoolId].ratingCount;
			_comment = $schoolStatsCache[schoolId].comment;
			return;
		}

		try {
			fetch(`${PUBLIC_API_HOST}/schools/${schoolId}/comments/count`)
				.then((resp) => resp.json())
				.then((json) => {
					_comment = +json.count;

					updateStore();
				});

			fetch(`${PUBLIC_API_HOST}/schools/${schoolId}/rating`)
				.then((resp) => resp.json())
				.then((json) => {
					_ratingCount = +json.count.total;
					_rating = +json.rating.total;

					updateStore();
				});
		} catch (e) {
			console.error(e);
		}
	};

	// called when score and rating is fetched. it will check if we have both
	// `_comment`, `_ratingCount`, and `_rating` and update the store
	const updateStore = () => {
		if (_comment === undefined || _ratingCount === undefined || _rating === undefined) return;

		$schoolStatsCache = {
			...$schoolStatsCache,
			[schoolId]: { comment: _comment, rating: _rating, ratingCount: _ratingCount }
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
