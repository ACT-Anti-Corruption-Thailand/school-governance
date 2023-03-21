import { PUBLIC_API_HOST } from '$env/static/public';
import { writable } from 'svelte/store';
import { getCurrentSchoolYear } from 'stores/school';

export const schoolStatsCache = writable<
	Record<string, { rating?: number; ratingCount?: number; comment?: number }>
>({});

export const fetchSchoolStats = async (
	schoolId: string
): Promise<[number | undefined, number | undefined, number | undefined]> => {
	try {
		let _comment: number | undefined;
		let _ratingCount: number | undefined;
		let _rating: number | undefined;

		const comment_fetch = fetch(`${PUBLIC_API_HOST}/schools/${schoolId}/comments/count`)
			.then((resp) => resp.json())
			.then((json) => {
				_comment = +json.count;
			});

		const rating_fetch = fetch(
			`${PUBLIC_API_HOST}/schools/${schoolId}/rating/${getCurrentSchoolYear()}`
		)
			.then((resp) => resp.json())
			.then((json) => {
				_ratingCount = +json.count.total;
				_rating = +json.rating.total;
			});

		await Promise.allSettled([comment_fetch, rating_fetch]);

		return [_comment, _ratingCount, _rating];
	} catch (e) {
		console.error(e);
		return [undefined, undefined, undefined];
	}
};
