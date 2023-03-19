import { nocoConfig, nocodb } from '../../utils/nocodb.js';

export interface SchoolCommentsQuery {
	locations?: string;
	years?: string;
	sort?: string;
	limit?: string;
}

export interface SchoolCommentsBody {
	locations?: string[];
	years?: number[];
	sort?: string;
}

export async function getSchoolComments(
	schoolId: string,
	{ locations, years, sort, limit }: SchoolCommentsQuery = {}
) {
	const schoolIdQuery = `schoolId,eq,${schoolId}`;
	const approvedQuery = `approved,eq,true`;
	const locationQuery = locations
		? locations
				.split(',')
				.map((loc) => `(location,like,${loc})`)
				.join('~or')
		: null;
	const yearQuery = years
		? years
				.split(',')
				.map((year) => `(schoolYear,eq,${year})`)
				.join('~or')
		: null;
	const whereQuery = [schoolIdQuery, approvedQuery, locationQuery, yearQuery]
		.filter((e) => e)
		.map((e) => `(${e})`)
		.join('~and');

	const sortQuery = sort === 'latest' ? '-createDate' : '-likeCount';

	return nocodb.dbTableRow.list(...nocoConfig, 'SchoolComments', {
		where: whereQuery,
		sort: [sortQuery],
		limit
	});
}

export async function getSchoolCommentsCount(schoolId: string) {
	return nocodb.dbViewRow.count(...nocoConfig, 'SchoolComments', 'SchoolComments', {
		where: `(schoolId,eq,${schoolId})~and(approved,eq,true)`
	});
}
