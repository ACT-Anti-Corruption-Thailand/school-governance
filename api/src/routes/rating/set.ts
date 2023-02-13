import { nocoConfig, nocodb } from '../../utils/nocodb.js';
import { getSchoolRating } from '../school/get-rating.js';
import { getUserRatingRecord } from './get.js';

type QuizBody = {
	[key: string]: number;
};

export async function setUserRatingRecord(userId: string, schoolId: string, quizBody: QuizBody) {
	const exitingRecord = await getUserRatingRecord(userId, schoolId);

	const currentUser = await (exitingRecord?.Id
		? nocodb.dbTableRow.update(...nocoConfig, 'SchoolUserRating', `${exitingRecord.Id}`, quizBody)
		: nocodb.dbTableRow.create(...nocoConfig, 'SchoolUserRating', {
				userId,
				schoolId,
				...quizBody
		  }));

	return {
		school: await getSchoolRating(schoolId),
		currentUser
	};
}
