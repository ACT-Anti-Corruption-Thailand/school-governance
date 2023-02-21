import fetch from 'node-fetch';
import { searchSchool } from './search.js';

type SchoolData = {
	id: string;
	name: string;
	latestPost?: string;
};

export async function latestActivity() {
	// get latest school rating
	let school_resp = await fetch(
		`${process.env.NOCODB_URL}/api/v1/db/data/v1/${process.env.NOCODB_PROJECT}/SchoolUserRating?fields=schoolId%2CSchoolIndex%2CcreateDate&sort=-createDate%2C-Id&limit=5&nested%5BSchoolIndex%5D%5Bfields%5D=nameTh`,
		{
			method: 'GET',
			headers: {
				'xc-token': process.env.NOCODB_TOKEN
			}
		}
	);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let school_json: any = await school_resp.json();
	let school_data_temp = school_json?.list ?? [];

	// get latest school comment
	school_resp = await fetch(
		`${process.env.NOCODB_URL}/api/v1/db/data/v1/${process.env.NOCODB_PROJECT}/SchoolComments?fields=schoolId%2CSchoolIndex%2CcreateDate&sort=-createData%2C-Id&limit=5&nested%5BSchoolIndex%5D%5Bfields%5D=nameTh`,
		{
			method: 'GET',
			headers: {
				'xc-token': process.env.NOCODB_TOKEN
			}
		}
	);
	school_json = await school_resp.json();
	school_data_temp = [...school_data_temp, ...(school_json?.list ?? [])];

	school_data_temp.sort(
		(a: { createDate: string }, z: { createDate: string }) =>
			+new Date(z.createDate) - +new Date(a.createDate)
	);

	let school_data_id: string[] = [];
	let school_data: { schoolId: string }[] = [];
	school_data_temp.forEach((s: { schoolId: string }) => {
		if (!school_data_id.includes(s.schoolId)) {
			school_data_id = [...school_data_id, s.schoolId];
			school_data = [...school_data, s];
		}
	});

	// get normal school list
	if (school_data_id.length < 5) {
		const num_school_more = 5 - school_data_id.length;

		school_json = await searchSchool({
			limit: '' + num_school_more,
			exclude_school_id: school_data_id.join(',')
		});
		school_data_temp = school_json?.list ?? [];
		school_data = [...school_data, ...school_data_temp];
	}

	type SchoolDataType = {
		schoolId: string;
		nameTh?: string;
		SchoolIndex?: { nameTh: string };
		createDate?: string;
	};
	const a: SchoolData[] = school_data.map((e: SchoolDataType) => ({
		id: e.schoolId,
		name: e.nameTh ?? e?.SchoolIndex?.nameTh ?? '(ไม่พบชื่อ)',
		latestPost: e?.createDate
	}));
	return a;
}
