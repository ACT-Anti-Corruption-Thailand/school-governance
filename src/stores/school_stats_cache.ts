import { PUBLIC_API_HOST } from '$env/static/public';
import { getCurrentSchoolYear } from 'stores/school';
import { writable } from 'svelte/store';

export const schoolStatsCache = writable<
	Record<string, { rating?: number; ratingCount?: number; comment?: number; allComment?: number }>
>({});

export const fetchSchoolStats = async (
	schoolId: string
): Promise<[number | undefined, number | undefined, number | undefined, number | undefined]> => {
	try {
		let _comment: number | undefined;
		let _allComment: number | undefined;
		let _ratingCount: number | undefined;
		let _rating: number | undefined;

		const comment_fetch = fetch(`${PUBLIC_API_HOST}/schools/${schoolId}/comments/count`)
			.then((resp) => resp.json())
			.then((json) => {
				_comment = +json.count;
			});

		const all_comment_fetch = fetch(`${PUBLIC_API_HOST}/schools/${schoolId}/comments/count/all`)
			.then((resp) => resp.json())
			.then((json) => {
				_allComment = +json.count;
			});

		const rating_fetch = fetch(
			`${PUBLIC_API_HOST}/schools/${schoolId}/rating/${getCurrentSchoolYear()}`
		)
			.then((resp) => resp.json())
			.then((json) => {
				_ratingCount = +json.count.total;
				_rating = +json.rating.total;
			});

		await Promise.allSettled([comment_fetch, all_comment_fetch, rating_fetch]);

		return [_comment, _allComment, _ratingCount, _rating];
	} catch (e) {
		console.error(e);
		return [undefined, undefined, undefined, undefined];
	}
};
