/* eslint-disable @typescript-eslint/no-explicit-any */
import { nocoConfig, nocodb } from '../../utils/nocodb.js';
import { getCurrentSchoolYear } from '../../utils/school.js';
import { getSchoolRating } from '../school/get-rating.js';
import { getUserRatingRecord } from './get.js';

type QuizBody = {
	[key: string]: number;
};

export async function setUserRatingRecord(userId: string, schoolId: string, quizBody: QuizBody) {
	const existingRecord = await getUserRatingRecord(userId, schoolId);

	const currentSchoolYear = getCurrentSchoolYear();
	let currentUser: any;
	if (existingRecord?.Id) {
		currentUser = await nocodb.dbTableRow.update(
			...nocoConfig,
			'SchoolUserRating',
			`${existingRecord.Id}`,
			quizBody
		);

		// # Fetch row for history
		// Normally the id for both table should be the same.
		// However, out of sync from god's act or human error is possible
		const historyRecord = await nocodb.dbViewRow.findOne(
			...nocoConfig,
			'SchoolUserRatingHistory',
			'SchoolUserRatingHistory',
			{
				fields: ['userId'],
				where: `(userId,eq,${userId})~and(schoolId,eq,${schoolId})~and(year,eq,${currentSchoolYear})`
			}
		);

		if (historyRecord?.Id) {
			nocodb.dbTableRow.update(
				...nocoConfig,
				'SchoolUserRatingHistory',
				`${historyRecord.Id}`,
				quizBody
			);
		} else {
			await nocodb.dbTableRow.create(...nocoConfig, 'SchoolUserRatingHistory', {
				userId,
				schoolId,
				year: currentSchoolYear,
				...quizBody
			});
		}
	} else {
		currentUser = await nocodb.dbTableRow.create(...nocoConfig, 'SchoolUserRating', {
			userId,
			schoolId,
			...quizBody
		});

		// Create same entry in history table + add year
		await nocodb.dbTableRow.create(...nocoConfig, 'SchoolUserRatingHistory', {
			userId,
			schoolId,
			year: currentSchoolYear,
			...quizBody
		});
	}

	return {
		school: await getSchoolRating(schoolId),
		currentUser
	};
}
