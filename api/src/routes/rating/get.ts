import { nocoConfig, nocodb } from '../../utils/nocodb.js';

interface UserRatingRecord {
	Id: number;
	cDone: number;
	tDone: number;
	fDone: number;
	gDone: number;
}

export async function getUserRatingRecord(
	userId: string,
	schoolId: string
): Promise<UserRatingRecord | null> {
	const record = await nocodb.dbViewRow.findOne(
		...nocoConfig,
		'SchoolUserRating',
		'SchoolUserRating',
		{
			fields: ['Id', 'cDone', 'tDone', 'fDone', 'gDone'],
			where: `(userId,eq,${userId})~and(schoolId,eq,${schoolId})`
		}
	);

	return Object.keys(record).length > 0 ? record : null;
}
