import { nocoConfig, nocodb } from '../../utils/nocodb.js';

export async function topRating() {
	return await nocodb.dbViewRow.list(...nocoConfig, 'SchoolIndex', 'SchoolStats', {
		fields: ['schoolId', 'nameTh'],
		sort: ['-ratingCount']
	});
}

export async function topComment() {
	return await nocodb.dbViewRow.list(...nocoConfig, 'SchoolIndex', 'SchoolStats', {
		fields: ['schoolId', 'nameTh'],
		sort: ['-commentCount']
	});
}
