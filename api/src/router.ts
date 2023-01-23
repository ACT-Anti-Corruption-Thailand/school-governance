import { FastifyInstance } from 'fastify';
import { withAuth } from './utils/auth.js';
import { likeComment, unlikeComment } from './routes/comment/like-unlike.js';
import { getSchoolComments } from './routes/school/get-comments.js';
import { getSchoolScore } from './routes/school/get-score.js';

export function registerRoutes(app: FastifyInstance) {
	app.get('/', () => 'School Governance API is doing OK :)');
	app.get('/schools/:schoolId/comments', ({ params, query }) =>
		getSchoolComments(params['schoolId'], query['locations'], query['years'], query['sort'])
	);
	app.post(
		'/schools/:schoolId/comments/:commentId/like',
		withAuth(({ params, query }, reply, userId) =>
			likeComment(
				userId,
				params['commentId'],
				params['schoolId'],
				query['locations'],
				query['years'],
				query['sort']
			)
		)
	);
	app.delete(
		'/schools/:schoolId/likes/:likeId',
		withAuth(({ params, query }) =>
			unlikeComment(
				params['likeId'],
				params['schoolId'],
				query['locations'],
				query['years'],
				query['sort']
			)
		)
	);
	app.get('/schools/:schoolId/score', ({ params }) => getSchoolScore(params['schoolId']));
}
