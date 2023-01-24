import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { withAuth } from './utils/auth.js';
import { likeComment, unlikeComment } from './routes/comment/like-unlike.js';
import { getSchoolComments } from './routes/school/get-comments.js';
import { getSchoolScore } from './routes/school/get-score.js';

const schoolCommentsQuerySchema = z.object({
	locations: z.string().optional(),
	years: z.string().optional(),
	sort: z.string().optional()
});

export function registerRoutes(app: FastifyInstance) {
	app.get('/', () => 'School Governance API is doing OK :)');

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
		withAuth((req, reply, userId) => {
			const { commentId, schoolId } = z
				.object({
					commentId: z.string(),
					schoolId: z.string()
				})
				.parse(req.params);
			const query = schoolCommentsQuerySchema.parse(req.query);

			return likeComment(userId, commentId, schoolId, query);
		})
	);

	app.delete(
		'/schools/:schoolId/likes/:likeId',
		withAuth((req) => {
			const { likeId, schoolId } = z
				.object({
					likeId: z.string(),
					schoolId: z.string()
				})
				.parse(req.params);
			const query = schoolCommentsQuerySchema.parse(req.query);

			return unlikeComment(likeId, schoolId, query);
		})
	);

	app.get('/schools/:schoolId/score', ({ params }) => getSchoolScore(params['schoolId']));
}
