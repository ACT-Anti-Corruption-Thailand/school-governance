import { nocoConfig, nocodb } from '../../utils/nocodb.js';
import { getSchoolComments } from '../school/get-comments.js';

export async function likeComment(
	userId: string,
	commentId: string,
	schoolId: string,
	locations?: string,
	years?: string,
	sort?: string
) {
	await nocodb.dbTableRow.create(...nocoConfig, 'SchoolCommentLike', {
		commentId,
		userId
	});

	return getSchoolComments(schoolId, locations, years, sort);
}

export async function unlikeComment(
	likeId: string,
	schoolId: string,
	locations?: string,
	years?: string,
	sort?: string
) {
	await nocodb.dbTableRow.delete(...nocoConfig, 'SchoolCommentLike', likeId);

	return getSchoolComments(schoolId, locations, years, sort);
}
