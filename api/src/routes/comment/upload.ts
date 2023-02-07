import fetch from 'node-fetch';

export async function uploadImages(body: FormData) {
	const resp = await fetch(
		`${process.env.NOCODB_URL}/api/v1/db/storage/upload?path=${encodeURIComponent(
			`${process.env.NOCODB_ORG}/${process.env.NOCODB_PROJECT}/SchoolComments/images`
		)}`,
		{
			method: 'GET',
			headers: {
				'xc-token': process.env.NOCODB_TOKEN
			},
			body
		}
	);
	return await resp.json();
}
