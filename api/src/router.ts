import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { addComment, deleteComment } from './routes/comment/add-delete.js';
import { likeComment, unlikeComment } from './routes/comment/like-unlike.js';
import { uploadImages } from './routes/comment/upload.js';
import { getUserRatingRecord } from './routes/rating/get.js';
import { setUserRatingRecord } from './routes/rating/set.js';
import { getSchoolAnnoucement } from './routes/school/get-annoucement.js';
import type { SchoolCommentsBody, SchoolCommentsQuery } from './routes/school/get-comments.js';
import { getSchoolComments, getSchoolCommentsCount } from './routes/school/get-comments.js';
import { getSchoolRating } from './routes/school/get-rating.js';
import { latestActivity } from './routes/school/latest.js';
import { countSchool, searchSchool } from './routes/school/search.js';
import { topComment, topRating } from './routes/school/top.js';
import { withAuth } from './utils/auth.js';
// import { backup } from './rating/backup.js';

export const convertBodyToQuery = (body: SchoolCommentsBody): SchoolCommentsQuery => {
	return {
		locations: body.locations.join(','),
		years: body.years.join(','),
		sort: body.sort
	};
};

const schoolCommentsQuerySchema = z.object({
	locations: z.string().optional(),
	years: z.string().optional(),
	sort: z.string().optional(),
	limit: z.string().optional()
});

const schoolCommentsBodySchema = z.object({
	locations: z.string().array().optional(),
	years: z.number().array().optional(),
	sort: z.string().optional()
});

export function registerRoutes(app: FastifyInstance) {
	app.get('/', () => 'School Governance API is doing OK :)');
	app.get(
		'/testauth',
		withAuth((_req, _resp, uid) => `Welcome ${uid} Auth is good :)`)
	);
	// app.get('/testbak', backup);

	app.get('/schools', (req) => {
		const query = z
			.object({
				name: z.string().optional(),
				district: z.string().optional(),
				province: z.string().optional(),
				exclude_district: z.string().optional(),
				exclude_school_id: z.string().optional(),
				limit: z.string().optional(),
				offset: z.string().optional()
			})
			.parse(req.query);

		return searchSchool(query);
	});

	app.get('/schools/latest', latestActivity);
	app.get('/schools/top/rating', topRating);
	app.get('/schools/top/comment', topComment);

	app.get('/schools/count', (req) => {
		const query = z
			.object({
				name: z.string()
			})
			.parse(req.query);

		return countSchool(query);
	});

	app.get('/schools/:schoolId/annoucements', (req) => {
		const { schoolId } = z
			.object({
				schoolId: z.string()
			})
			.parse(req.params);
		const query = z
			.object({
				schoolYear: z.preprocess((year) => +year, z.number().positive())
			})
			.parse(req.query);

		return getSchoolAnnoucement(schoolId, query);
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

	app.get('/schools/:schoolId/comments/count', (req) => {
		const { schoolId } = z
			.object({
				schoolId: z.string()
			})
			.parse(req.params);

		return getSchoolCommentsCount(schoolId);
	});

	app.get('/schools/:schoolId/comments/count/all', (req) => {
		const { schoolId } = z
			.object({
				schoolId: z.string()
			})
			.parse(req.params);

		return getSchoolCommentsCount(schoolId, true);
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
					schoolCommentsQuery: schoolCommentsBodySchema.optional()
				})
				.default({})
				.parse(body);

			return likeComment(userId, commentId, schoolId, convertBodyToQuery(schoolCommentsQuery));
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
					schoolCommentsQuery: schoolCommentsBodySchema.optional()
				})
				.default({})
				.parse(body);

			return unlikeComment(likeId, schoolId, convertBodyToQuery(schoolCommentsQuery));
		})
	);

	app.post(`/schools/upload`, withAuth(uploadImages));

	app.put(
		'/schools/:schoolId/comments',
		withAuth(async ({ params, body }, reply, userId) => {
			const { schoolId } = z
				.object({
					schoolId: z.string()
				})
				.parse(params);

			const { comments, location, schoolYear, images, schoolCommentsQuery } = z
				.object({
					comments: z.string(),
					location: z.string(),
					schoolYear: z.number(),
					images: z.string().optional(),
					schoolCommentsQuery: schoolCommentsBodySchema.optional()
				})
				.parse(body);

			return addComment(
				userId,
				schoolId,
				comments,
				location,
				schoolYear,
				images,
				convertBodyToQuery(schoolCommentsQuery)
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
					schoolCommentsQuery: schoolCommentsBodySchema.optional()
				})
				.default({})
				.parse(body);

			return deleteComment(commentId, schoolId, convertBodyToQuery(schoolCommentsQuery));
		})
	);

	app.get('/schools/:schoolId/rating/:year', ({ params }) => {
		const { schoolId, year } = z
			.object({
				schoolId: z.string(),
				year: z.string()
			})
			.parse(params);

		return getSchoolRating(schoolId, year);
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
