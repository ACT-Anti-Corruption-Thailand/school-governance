import { nocoConfig, nocodb } from '../../utils/nocodb.js';
import { getSchoolComments, SchoolCommentsQuery } from '../school/get-comments.js';

export async function likeComment(
	userId: string,
	commentId: string,
	schoolId: string,
	query: SchoolCommentsQuery
) {
	await nocodb.dbTableRow.create(...nocoConfig, 'SchoolCommentLike', {
		commentId,
		userId
	});

	return getSchoolComments(schoolId, query);
}

export async function unlikeComment(likeId: string, schoolId: string, query: SchoolCommentsQuery) {
	await nocodb.dbTableRow.delete(...nocoConfig, 'SchoolCommentLike', likeId);

	return getSchoolComments(schoolId, query);
}
