import fastify from 'fastify';
import { ZodError } from 'zod';
import { fromZodError } from 'zod-validation-error';
import { registerRoutes } from './router.js';

const app = fastify({ logger: true });

registerRoutes(app);

app.setErrorHandler(function (error, request, reply) {
	if (error instanceof ZodError) {
		reply.status(422).send(fromZodError(error));
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
