import fastify from 'fastify';
import { ZodError } from 'zod';
import { fromZodError } from 'zod-validation-error';
import { registerRoutes } from './router.js';

import cors from '@fastify/cors';
import { CORS_CONFIG, CorsError } from './utils/cors.js';

import multipart from '@fastify/multipart';

import cron from 'node-cron';
import { backup } from './rating/backup.js';

const app = fastify({ logger: { level: 'error' } });

app.register(cors, CORS_CONFIG);
app.register(multipart);

registerRoutes(app);

app.setErrorHandler(function (error, request, reply) {
	if (error instanceof ZodError) {
		reply.status(422).send(fromZodError(error));
	} else if (error instanceof CorsError) {
		reply.status(400).send({
			error: 'Origin not allowed! >:('
		});
	} else {
		console.error('='.repeat(20));
		console.error(error);
		console.error('='.repeat(20));
		reply.status(500).send();
	}
});

(async () => {
	try {
		await app.listen({ port: 3000, host: '0.0.0.0' });
		console.log('🏫 Server is running at //[::1]:3000/');
		console.log(`TS: ${Date.now()} (${new Date().toLocaleString('th-TH')})`);
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
})();

cron.schedule(
	'55 23 30 4 *',
	() => {
		console.log('⏲ Backup Cron Called');
		backup();
	},
	{
		timezone: 'Asia/Bangkok'
	}
);
