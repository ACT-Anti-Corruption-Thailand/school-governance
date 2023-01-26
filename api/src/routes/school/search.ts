import { nocoConfig, nocodb } from '../../utils/nocodb.js';

interface SearchSchoolQuery {
	name?: string;
	province?: string;
	exclude_district?: string;
	exclude_school_id?: string;
	limit?: string;
	offset?: string;
}

export async function searchSchool({
	name,
	province,
	exclude_district,
	exclude_school_id,
	limit,
	offset
}: SearchSchoolQuery) {
	return await nocodb.dbTableRow.list(...nocoConfig, 'SchoolIndex', {
		where: [
			...(name ? [`(nameTh,like,%${name}%)`] : []),
			...(province ? [`(province,like,${province})`] : []),
			...(exclude_district ? [`(district,neq,${exclude_district})`] : []),
			...(exclude_school_id ? [`(schoolId,neq,${exclude_school_id})`] : [])
		].join('~and'),
		limit,
		offset
	});
}
