/* eslint-disable @typescript-eslint/no-explicit-any */
import { nocoConfig, nocodb } from '../../utils/nocodb.js';
import { getSchoolRating } from '../school/get-rating.js';
import { getUserRatingRecord } from './get.js';

type QuizBody = {
	[key: string]: number;
};

function getCurrentSchoolYear() {
	const now = new Date();
	return now.getFullYear() - +(now.getMonth() < 4);
}

export async function setUserRatingRecord(userId: string, schoolId: string, quizBody: QuizBody) {
	const existingRecord = await getUserRatingRecord(userId, schoolId);

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
				where: `(userId,eq,${userId})~and(schoolId,eq,${schoolId})`
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
				year: getCurrentSchoolYear(),
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
			year: getCurrentSchoolYear(),
			...quizBody
		});
	}

	return {
		school: await getSchoolRating(schoolId),
		currentUser
	};
}
