import { nocoConfig, nocodb } from '../../utils/nocodb.js';
import { getSchoolComments, SchoolCommentsQuery } from '../school/get-comments.js';

export async function addComment(
	userId: string,
	schoolId: string,
	comments: string,
	location: string,
	schoolYear: number,
	images?: string,
	query?: SchoolCommentsQuery
) {
	await nocodb.dbTableRow.create(...nocoConfig, 'SchoolComments', {
		userId,
		schoolId,
		comments: comments,
		location: location,
		schoolYear: schoolYear,
		approved: !images,
		...(images ? { images } : null)
	});

	return getSchoolComments(schoolId, query);
}

export async function deleteComment(
	commentId: string,
	schoolId: string,
	query: SchoolCommentsQuery
) {
	await nocodb.dbTableRow.delete(...nocoConfig, 'SchoolComments', commentId);

	return getSchoolComments(schoolId, query);
}
