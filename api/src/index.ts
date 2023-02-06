import fastify from 'fastify';
import { ZodError } from 'zod';
import { fromZodError } from 'zod-validation-error';
import { registerRoutes } from './router.js';

import cors from '@fastify/cors';
import { CORS_CONFIG, CorsError } from './utils/cors.js';

const app = fastify({ logger: true });
app.register(cors, CORS_CONFIG);

registerRoutes(app);

app.setErrorHandler(function (error, request, reply) {
	if (error instanceof ZodError) {
		reply.status(422).send(fromZodError(error));
	} else if (error instanceof CorsError) {
		reply.status(400).send({
			error: 'Origin not allowed! >:('
		});
	} else {
		console.error(error);
		reply.status(500).send();
	}
});

(async () => {
	try {
		await app.listen({ port: 3000 });
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
})();
