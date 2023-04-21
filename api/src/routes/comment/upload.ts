import fetch, { FormData, File } from 'node-fetch';
import type { Multipart, MultipartFile } from '@fastify/multipart';
import type { Readable } from 'node:stream';

const convertStreamToBlob = async (
	stream: Readable,
	filename: string,
	mime: string
): Promise<Blob> =>
	new Promise((res, rej) => {
		const flush = () => {
			res(new File(chucks, filename, { type: mime }));
		};

		const chucks: Buffer[] = [];

		stream
			.on('data', (buf: Buffer) => {
				chucks.push(buf);
			})
			.once('error', rej)
			.once('end', flush)
			.once('close', flush);
	});

const isMultipartFile = (x: Multipart): x is MultipartFile => 'file' in x;

export async function uploadImages(req) {
	const formData = new FormData();
	const parts = req.parts();
	for await (const part of parts) {
		if (part.fieldname === 'files' && isMultipartFile(part)) {
			const f = await convertStreamToBlob(part.file, part.filename, part.mimetype);
			formData.append('files', f);
		}
	}
	formData.append('json', '{}');

	const path = encodeURIComponent(
		`${process.env.NOCODB_ORG}/${process.env.NOCODB_PROJECT}/SchoolComments/images`
	);

	const resp = await fetch(`${process.env.NOCODB_URL}/api/v1/db/storage/upload?path=${path}`, {
		method: 'POST',
		headers: {
			'xc-token': process.env.NOCODB_TOKEN
		},
		body: formData
	});

	if (!resp.ok) {
		throw new Error('📤 Upload Error', { cause: resp });
	}

	return await resp.json();
}
