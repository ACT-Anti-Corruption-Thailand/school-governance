import { FastifyReply, FastifyRequest, RouteHandler } from 'fastify';

type HandlerWithUserId = (request: FastifyRequest, reply: FastifyReply, userId: string) => unknown;

export function withAuth(handler: HandlerWithUserId): RouteHandler {
	return (request, reply) => {
		const token = request.headers.authorization?.replace('Bearer', '');

		if (!token) {
			reply.code(401).send('No token given');
			return;
		}

		const userId = getUserId(token.trim());

		return handler(request, reply, userId);
	};
}

// TODO: Authorize and extract user id from token
function getUserId(token: string) {
	return token;
}
