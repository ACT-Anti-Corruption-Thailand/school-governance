import { FastifyReply, FastifyRequest, RouteHandler } from 'fastify';
import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const serviceAccount = require('../../firebase-admin-key.json');

initializeApp({
	credential: cert(serviceAccount)
});

type HandlerWithUserId = (request: FastifyRequest, reply: FastifyReply, userId: string) => unknown;

export function withAuth(handler: HandlerWithUserId): RouteHandler {
	return async (request, reply) => {
		const token = request.headers.authorization?.replace('Bearer', '');

		if (!token) {
			reply.code(401).send('No token given');
			return;
		}

		try {
			const decodedToken = await getAuth().verifyIdToken(token.trim());
			return handler(request, reply, decodedToken.uid);
		} catch (err) {
			reply.code(401).send(err.errorInfo);
		}
	};
}
