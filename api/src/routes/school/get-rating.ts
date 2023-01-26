import { nocoConfig, nocodb } from '../../utils/nocodb.js';

const MAX_RATING = 4;

const schoolRatingColumes = ['count', 'sum'].flatMap((col) =>
	['C', 'T', 'F', 'G'].flatMap((char) => [1, 2, 3, 4, 5].map((num) => `${col}${char}${num}`))
);

export async function getSchoolRating(schoolId?: string) {
	if (!schoolId) return;

	const { count } = await nocodb.dbViewRow.count(
		...nocoConfig,
		'SchoolComments',
		'SchoolComments',
		{
			where: `(schoolId,eq,${schoolId})~and(approved,eq,true)`
		}
	);

	let ratingData = await nocodb.dbViewRow.findOne(...nocoConfig, 'SchoolIndex', 'SchoolRating', {
		fields: schoolRatingColumes,
		where: `(schoolId,eq,${schoolId})`
	});

	ratingData = Object.entries(ratingData).reduce(
		(obj, [key, value]) => ({ ...obj, [key]: +value }),
		{}
	);

	const getAverageCategoryRating = (category: string) =>
		ratingData[`count${category}1`] === 0
			? 0
			: (+ratingData[`sum${category}1`] +
					+ratingData[`sum${category}2`] +
					+ratingData[`sum${category}3`] +
					+ratingData[`sum${category}4`]) /
			  (MAX_RATING * +ratingData[`count${category}1`]);

	const schoolClassroomAvg = getAverageCategoryRating('C');
	const schoolToiletAvg = getAverageCategoryRating('T');
	const schoolCanteenAvg = getAverageCategoryRating('F');
	const schoolGymAvg = getAverageCategoryRating('G');

	return {
		count: +count,
		rating:
			(schoolClassroomAvg + schoolToiletAvg + schoolCanteenAvg + schoolGymAvg) /
			(+!!schoolClassroomAvg + +!!schoolToiletAvg + +!!schoolCanteenAvg + +!!schoolGymAvg),
		raw: ratingData
	};
}
