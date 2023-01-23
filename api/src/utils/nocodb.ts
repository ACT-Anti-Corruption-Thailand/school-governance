import { Api } from 'nocodb-sdk';

export const nocoConfig: [string, string] = [process.env.NOCODB_ORG, process.env.NOCODB_PROJECT];

export const nocodb = new Api({
	baseURL: process.env.NOCODB_URL,
	headers: {
		'xc-token': process.env.NOCODB_TOKEN
	}
});
