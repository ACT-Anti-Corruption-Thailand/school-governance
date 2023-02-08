import fetch from 'node-fetch';
import { nocoConfig, nocodb } from '../../utils/nocodb.js';

interface SearchSchoolQuery {
	name?: string;
	district?: string;
	province?: string;
	exclude_district?: string;
	exclude_school_id?: string;
	limit?: string;
	offset?: string;
}

export async function searchSchool({
	name,
	district,
	province,
	exclude_district,
	exclude_school_id,
	limit,
	offset
}: SearchSchoolQuery) {
	return await nocodb.dbTableRow.list(...nocoConfig, 'SchoolIndex', {
		where: [
			...(name ? [`(nameTh,like,%${name}%)`] : []),
			...(district ? [`(district,eq,${district})`] : []),
			...(province ? [`(province,eq,${province})`] : []),
			...(exclude_district ? [`(district,neq,${exclude_district})`] : []),
			...(exclude_school_id ? [`(schoolId,neq,${exclude_school_id})`] : [])
		].join('~and'),
		limit,
		offset
	});
}

export async function countSchool({ name }: { name?: string }) {
	const resp = await fetch(
		`${process.env.NOCODB_URL}/api/v1/db/data/v1/${
			process.env.NOCODB_PROJECT
		}/SchoolIndex/count?where=${encodeURIComponent(`(nameTh,like,%${name}%)`)}`,
		{
			method: 'GET',
			headers: {
				'xc-token': process.env.NOCODB_TOKEN
			}
		}
	);
	return await resp.json();
}
