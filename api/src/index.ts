import fastify from 'fastify';
import { nocodb, nocoConfig } from './libs/nocodb.js';

const app = fastify({ logger: true });

app.get('/', async () => nocodb.dbTableRow.list(...nocoConfig, 'SchoolComments'));

const start = async () => {
	try {
		await app.listen({ port: 3000 });
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
};

start();
