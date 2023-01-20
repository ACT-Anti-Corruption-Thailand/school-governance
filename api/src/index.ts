import fastify from 'fastify';
import { registerRoutes } from './router.js';

const app = fastify({ logger: true });

registerRoutes(app);

(async () => {
	try {
		await app.listen({ port: 3000 });
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
})();
