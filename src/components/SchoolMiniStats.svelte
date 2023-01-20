<script lang="ts">
	import { PUBLIC_NOCO_TOKEN_KEY } from '$env/static/public';

	import { onMount } from 'svelte';

	import RatingStat from './RatingStat.svelte';
	import CommentStat from './CommentStat.svelte';

	export let schoolId: string = '';
	export let noFetch = false;
	export let rating = 0;
	export let comment = 0;

	let _rating = 0;
	let _comment = 0;

	const fetchScore = async () => {
		if (!schoolId) return;

		try {
			const comment_count_resp = await fetch(
				`https://sheets.wevis.info/api/v1/db/data/v1/Open-School-Test/SchoolComments/count?where=${encodeURIComponent(
					`(schoolId,eq,${schoolId})~and(approved,eq,true)`
				)}`,
				{
					method: 'GET',
					headers: {
						'xc-token': PUBLIC_NOCO_TOKEN_KEY
					}
				}
			);
			const comment_count_json = await comment_count_resp.json();
			_comment = comment_count_json.count;

			const rating_resp = await fetch(
				`https://sheets.wevis.info/api/v1/db/data/v1/Open-School-Test/SchoolIndex/views/SchoolRating?where=${encodeURIComponent(
					`(schoolId,eq,${schoolId})`
				)}&limit=1&nested%5BuserRating%5D%5Blimit%5D=1`,
				{
					method: 'GET',
					headers: {
						'xc-token': PUBLIC_NOCO_TOKEN_KEY
					}
				}
			);
			const rating_json = await rating_resp.json();
			const rating_data = rating_json?.list?.[0];

			let school_classroom_avg =
				+rating_data?.countC1 === 0
					? 0
					: (+rating_data?.sumC1 +
							+rating_data?.sumC2 +
							+rating_data?.sumC3 +
							+rating_data?.sumC4) /
					  (4 * +rating_data?.countC1);
			let school_toilet_avg =
				+rating_data?.countT1 === 0
					? 0
					: (+rating_data?.sumT1 +
							+rating_data?.sumT2 +
							+rating_data?.sumT3 +
							+rating_data?.sumT4) /
					  (4 * +rating_data?.countT1);
			let school_canteen_avg =
				+rating_data?.countF1 === 0
					? 0
					: (+rating_data?.sumF1 +
							+rating_data?.sumF2 +
							+rating_data?.sumF3 +
							+rating_data?.sumF4) /
					  (4 * +rating_data?.countF1);
			let school_gym_avg =
				+rating_data?.countG1 === 0
					? 0
					: (+rating_data?.sumG1 +
							+rating_data?.sumG2 +
							+rating_data?.sumG3 +
							+rating_data?.sumG4) /
					  (4 * +rating_data?.countG1);
			_rating =
				(school_classroom_avg + school_toilet_avg + school_canteen_avg + school_gym_avg) /
				(+!!school_classroom_avg +
					+!!school_toilet_avg +
					+!!school_canteen_avg +
					+!!school_gym_avg);
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
