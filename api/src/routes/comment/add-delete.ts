import { nocoConfig, nocodb } from '../../utils/nocodb.js';
import { getSchoolComments, SchoolCommentsQuery } from '../school/get-comments.js';
import { FORBIDDEN_REGEXP } from './forbidden_words.js';

export async function addComment(
	userId: string,
	schoolId: string,
	comments: string,
	location: string,
	schoolYear: number,
	images?: string,
	query?: SchoolCommentsQuery
) {
	const cleaned_comments = comments.replace(FORBIDDEN_REGEXP, (e) => '*'.repeat(e.length));
	await nocodb.dbTableRow.create(...nocoConfig, 'SchoolComments', {
		userId,
		schoolId,
		comments: cleaned_comments,
		location,
		schoolYear,
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
