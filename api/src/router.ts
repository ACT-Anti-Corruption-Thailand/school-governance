import { FastifyInstance } from 'fastify';
import { getSchoolComments } from './routes/school/get-comments.js';
import { getSchoolScore } from './routes/school/get-score.js';

export function registerRoutes(app: FastifyInstance) {
	app.get('/', () => 'School Governance API is doing OK :)');
	app.get('/schools/:schoolId/comments', ({ params, query }) =>
		getSchoolComments(params['schoolId'], query['locations'], query['years'], query['sort'])
	);
	app.get('/schools/:schoolId/score', ({ params }) => getSchoolScore(params['schoolId']));
}
