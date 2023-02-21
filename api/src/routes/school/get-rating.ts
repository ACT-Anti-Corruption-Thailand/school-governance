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

	const total_rating_count =
		+ratingData?.countC1 + +ratingData?.countT1 + +ratingData?.countF1 + +ratingData?.countG1;

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

	const school_pleasure_classroom_avg =
		+ratingData?.countC5 === 0 ? 0 : +ratingData?.sumC5 / +ratingData?.countC5;
	const school_pleasure_toilet_avg =
		+ratingData?.countT5 === 0 ? 0 : +ratingData?.sumT5 / +ratingData?.countT5;
	const school_pleasure_canteen_avg =
		+ratingData?.countF5 === 0 ? 0 : +ratingData?.sumF5 / +ratingData?.countF5;
	const school_pleasure_gym_avg =
		+ratingData?.countG5 === 0 ? 0 : +ratingData?.sumG5 / +ratingData?.countG5;
	const school_total_pleasure_avg =
		(school_pleasure_classroom_avg +
			school_pleasure_toilet_avg +
			school_pleasure_canteen_avg +
			school_pleasure_gym_avg) /
		(+!!school_pleasure_classroom_avg +
			+!!school_pleasure_toilet_avg +
			+!!school_pleasure_canteen_avg +
			+!!school_pleasure_gym_avg);

	return {
		count: {
			row: +count,
			total: total_rating_count,
			classroom: +ratingData?.countC1,
			toilet: +ratingData?.countT1,
			canteen: +ratingData?.countF1,
			gym: +ratingData?.countG1
		},
		rating: {
			total:
				(schoolClassroomAvg + schoolToiletAvg + schoolCanteenAvg + schoolGymAvg) /
				(+!!schoolClassroomAvg + +!!schoolToiletAvg + +!!schoolCanteenAvg + +!!schoolGymAvg),
			classroom: schoolClassroomAvg,
			toilet: schoolToiletAvg,
			canteen: schoolCanteenAvg,
			gym: schoolGymAvg
		},
		pleasure: {
			total: school_total_pleasure_avg,
			classroom: school_pleasure_classroom_avg,
			toilet: school_pleasure_toilet_avg,
			canteen: school_pleasure_canteen_avg,
			gym: school_pleasure_gym_avg
		},
		raw: ratingData
	};
}
