import { FastifyInstance } from 'fastify';
import { getSchoolScore } from './routes/school/get-score.js';

export function registerRoutes(app: FastifyInstance) {
	app.get('/', () => 'School Governance API is doing OK :)');
	app.get('/schools/:schoolId/score', (req) => getSchoolScore(req.params['schoolId']));
}
