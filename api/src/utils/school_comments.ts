import { SchoolCommentsQuery, SchoolCommentsBody } from '../routes/school/get-comments.js';

export const convertBodyToQuery = (body: SchoolCommentsBody): SchoolCommentsQuery => {
	return {
		locations: body.locations.join(','),
		years: body.years.join(','),
		sort: body.sort
	};
};
