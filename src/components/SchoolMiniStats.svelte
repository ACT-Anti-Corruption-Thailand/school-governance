<script lang="ts">
	import { PUBLIC_API_HOST } from '$env/static/public';

	import { onMount } from 'svelte';

	import RatingStat from './RatingStat.svelte';
	import CommentStat from './CommentStat.svelte';

	import { schoolStatsCache } from 'stores/school_stats_cache';

	export let schoolId: string = '';
	export let noFetch = false;
	export let rating = 0;
	export let comment = 0;

	let _rating: undefined | number = undefined;
	let _comment = 0;

	const fetchScore = async () => {
		if (!schoolId) return;
		if (schoolId in $schoolStatsCache) {
			_rating = $schoolStatsCache[schoolId].rating;
			_comment = $schoolStatsCache[schoolId].comment;
			return;
		}

		try {
			const comment_count_resp = await fetch(
				`${PUBLIC_API_HOST}/schools/${schoolId}/comments/count`
			);
			const comment_count_json = await comment_count_resp.json();
			_comment = comment_count_json.count;

			const school_resp = await fetch(`${PUBLIC_API_HOST}/schools/${schoolId}/rating`);
			const school_json = await school_resp.json();
			_rating = school_json.rating.total;

			$schoolStatsCache = {
				...$schoolStatsCache,
				[schoolId]: { comment: _comment, rating: _rating }
			};
		} catch (e) {
			console.error(e);
		}
	};

	onMount(() => {
		if (noFetch) {
			_rating = rating;
			_comment = comment;
		} else {
			fetchScore();
		}
	});
</script>

<div class="f header-score" data-schoolId={schoolId}>
	<RatingStat rating={_rating} />
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
