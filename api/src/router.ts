import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { withAuth } from './utils/auth.js';
import { likeComment, unlikeComment } from './routes/comment/like-unlike.js';
import { getSchoolComments } from './routes/school/get-comments.js';
import { getSchoolRating } from './routes/school/get-rating.js';
import { addComment, deleteComment } from './routes/comment/add-delete.js';
import { getSchoolAnnoucement } from './routes/school/get-annoucement.js';
import { getUserRatingRecord } from './routes/rating/get.js';
import { setUserRatingRecord } from './routes/rating/set.js';
import { searchSchool } from './routes/school/search.js';

const schoolCommentsQuerySchema = z.object({
	locations: z.string().optional(),
	years: z.string().optional(),
	sort: z.string().optional()
});

export function registerRoutes(app: FastifyInstance) {
	app.get('/', () => 'School Governance API is doing OK :)');

	app.get('/schools', (req) => {
		const query = z
			.object({
				name: z.string().optional(),
				province: z.string().optional(),
				exclude_district: z.string().optional(),
				exclude_school_id: z.string().optional(),
				limit: z.string().optional(),
				offset: z.string().optional()
			})
			.parse(req.query);

		return searchSchool(query);
	});

	app.get('/schools/:schoolId/annoucements', ({ params }) => {
		const { schoolId } = z
			.object({
				schoolId: z.string()
			})
			.parse(params);

		return getSchoolAnnoucement(schoolId);
	});

	app.get('/schools/:schoolId/comments', (req) => {
		const { schoolId } = z
			.object({
				schoolId: z.string()
			})
			.parse(req.params);
		const query = schoolCommentsQuerySchema.parse(req.query);

		return getSchoolComments(schoolId, query);
	});

	app.post(
		'/schools/:schoolId/comments/:commentId/like',
		withAuth(({ params, body }, reply, userId) => {
			const { commentId, schoolId } = z
				.object({
					commentId: z.string(),
					schoolId: z.string()
				})
				.parse(params);
			const { schoolCommentsQuery } = z
				.object({
					schoolCommentsQuery: schoolCommentsQuerySchema.optional()
				})
				.default({})
				.parse(body);

			return likeComment(userId, commentId, schoolId, schoolCommentsQuery);
		})
	);

	app.delete(
		'/schools/:schoolId/likes/:likeId',
		withAuth(({ params, body }) => {
			const { likeId, schoolId } = z
				.object({
					likeId: z.string(),
					schoolId: z.string()
				})
				.parse(params);
			const { schoolCommentsQuery } = z
				.object({
					schoolCommentsQuery: schoolCommentsQuerySchema.optional()
				})
				.default({})
				.parse(body);

			return unlikeComment(likeId, schoolId, schoolCommentsQuery);
		})
	);

	app.put(
		'/schools/:schoolId/comments',
		withAuth(async ({ params, body }, reply, userId) => {
			const { schoolId } = z
				.object({
					schoolId: z.string()
				})
				.parse(params);

			const { comments, location, schoolYear, uploadedFiles, schoolCommentsQuery } = z
				.object({
					comments: z.string(),
					location: z.string(),
					schoolYear: z.number(),
					uploadedFiles: z.string().array().optional(),
					schoolCommentsQuery: schoolCommentsQuerySchema.optional()
				})
				.parse(body);

			return addComment(
				userId,
				schoolId,
				comments,
				location,
				schoolYear,
				uploadedFiles,
				schoolCommentsQuery
			);
		})
	);

	app.delete(
		'/schools/:schoolId/comments/:commentId',
		withAuth(({ params, body }) => {
			const { commentId, schoolId } = z
				.object({
					commentId: z.string(),
					schoolId: z.string()
				})
				.parse(params);

			const { schoolCommentsQuery } = z
				.object({
					schoolCommentsQuery: schoolCommentsQuerySchema.optional()
				})
				.default({})
				.parse(body);

			return deleteComment(commentId, schoolId, schoolCommentsQuery);
		})
	);

	app.get('/schools/:schoolId/rating', ({ params }) => {
		const { schoolId } = z
			.object({
				schoolId: z.string()
			})
			.parse(params);

		return getSchoolRating(schoolId);
	});

	app.get(
		'/schools/:schoolId/rating/current-user',
		withAuth(({ params }, reply, userId) => {
			const { schoolId } = z
				.object({
					schoolId: z.string()
				})
				.parse(params);

			return getUserRatingRecord(userId, schoolId);
		})
	);

	app.post(
		'/schools/:schoolId/rating/current-user',
		withAuth(({ params, body }, reply, userId) => {
			const { schoolId } = z
				.object({
					schoolId: z.string()
				})
				.parse(params);

			const quizBody = z.record(z.number()).parse(body);

			return setUserRatingRecord(userId, schoolId, quizBody);
		})
	);
}
