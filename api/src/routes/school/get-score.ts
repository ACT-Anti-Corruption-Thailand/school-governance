import { nocoConfig, nocodb } from '../../utils/nocodb.js';

const MAX_SCORE = 4;

const schoolScoreColumes = ['count', 'sum'].flatMap((col) =>
	['C', 'T', 'F', 'G'].flatMap((char) => [1, 2, 3, 4, 5].map((num) => `${col}${char}${num}`))
);

export async function getSchoolScore(schoolId?: string) {
	if (!schoolId) return;

	const { count } = await nocodb.dbViewRow.count(
		...nocoConfig,
		'SchoolComments',
		'SchoolComments',
		{
			where: `(schoolId,eq,${schoolId})~and(approved,eq,true)`
		}
	);

	const ratingData = await nocodb.dbViewRow.findOne(...nocoConfig, 'SchoolIndex', 'SchoolRating', {
		fields: schoolScoreColumes,
		where: `(schoolId,eq,${schoolId})`
	});

	ratingData['3'] === 0;

	const getAverageCategoryScore = (category: string) =>
		+ratingData[`count${category}1`] === 0
			? 0
			: (+ratingData[`sum${category}1`] +
					+ratingData[`sum${category}2`] +
					+ratingData[`sum${category}3`] +
					+ratingData[`sum${category}4`]) /
			  (MAX_SCORE * +ratingData[`count${category}1`]);

	const schoolClassroomAvg = getAverageCategoryScore('C');
	const schoolToiletAvg = getAverageCategoryScore('T');
	const schoolCanteenAvg = getAverageCategoryScore('F');
	const schoolGymAvg = getAverageCategoryScore('G');

	return {
		count,
		rating:
			(schoolClassroomAvg + schoolToiletAvg + schoolCanteenAvg + schoolGymAvg) /
			(+!!schoolClassroomAvg + +!!schoolToiletAvg + +!!schoolCanteenAvg + +!!schoolGymAvg)
	};
}
