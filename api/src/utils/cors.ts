export class CorsError extends Error {
	constructor() {
		super();
	}
}

const ALLOWED_HOSTNAME = process.env.ALLOWED_HOSTNAME?.split(',') || [];

export const CORS_CONFIG = {
	origin: (origin, cb) => {
		if (origin) {
			const hostname = new URL(origin).hostname;

			if (ALLOWED_HOSTNAME.includes(hostname)) {
				cb(null, true);
				return;
			}
		}
		cb(new CorsError(), false);
	}
};
