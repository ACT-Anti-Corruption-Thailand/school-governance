import { PUBLIC_NOCO_TOKEN_KEY } from '$env/static/public';
import type { SchoolData } from 'components/SchoolList.svelte';

type BasicSchema = {
	schoolId: string;
	nameTh: string;
};

export const getLatestActivityList = async () => {
	try {
		// get latest school rating
		let school_resp = await fetch(
			`https://sheets.wevis.info/api/v1/db/data/v1/Open-School-Test/SchoolUserRating?fields=schoolId%2CSchoolIndex%2CcreateDate&sort=-createDate%2C-Id&limit=5&nested%5BSchoolIndex%5D%5Bfields%5D=nameTh`,
			{
				method: 'GET',
				headers: {
					'xc-token': PUBLIC_NOCO_TOKEN_KEY
				}
			}
		);
		let school_json = await school_resp.json();
		let school_data_temp = school_json?.list ?? [];

		// get latest school comment
		school_resp = await fetch(
			`https://sheets.wevis.info/api/v1/db/data/v1/Open-School-Test/SchoolComments?fields=schoolId%2CSchoolIndex%2CcreateDate&sort=-createData%2C-Id&limit=5&nested%5BSchoolIndex%5D%5Bfields%5D=nameTh`,
			{
				method: 'GET',
				headers: {
					'xc-token': PUBLIC_NOCO_TOKEN_KEY
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
			const except_same_school_cause = school_data_id
				.map((id: string) => `(schoolId,neq,${id})`)
				.join('~and');

			school_resp = await fetch(
				`https://sheets.wevis.info/api/v1/db/data/v1/Open-School-Test/SchoolIndex?fields=schoolId%2CnameTh&limit=${num_school_more}&where=${encodeURIComponent(
					except_same_school_cause
				)}`,
				{
					method: 'GET',
					headers: {
						'xc-token': PUBLIC_NOCO_TOKEN_KEY
					}
				}
			);
			school_json = await school_resp.json();
			school_data_temp = school_json?.list ?? [];
			school_data = [...school_data, ...school_data_temp];
		}

		const a: SchoolData[] = school_data.map(
			(e: { schoolId: string; nameTh?: string; SchoolIndex?: { nameTh: string } }) => ({
				id: e.schoolId,
				name: e.nameTh ?? e?.SchoolIndex?.nameTh ?? '(ไม่พบชื่อ)'
			})
		);
		return a;
	} catch (e) {
		console.error(e);
	}
	return [];
};

export const getStatsList = async () => {
	try {
		let school_resp = await fetch(
			`https://sheets.wevis.info/api/v1/db/data/v1/Open-School-Test/SchoolIndex/views/SchoolStats?fields=schoolId%2CnameTh&sort=-commentCount&limit=5`,
			{
				method: 'GET',
				headers: {
					'xc-token': PUBLIC_NOCO_TOKEN_KEY
				}
			}
		);
		let school_json = await school_resp.json();
		let school_data = school_json?.list ?? [];
		const mostCommentList: SchoolData[] = school_data.map((e: BasicSchema) => ({
			id: e.schoolId,
			name: e.nameTh
		}));

		school_resp = await fetch(
			`https://sheets.wevis.info/api/v1/db/data/v1/Open-School-Test/SchoolIndex/views/SchoolStats?fields=schoolId%2CnameTh&sort=-ratingCount&limit=5`,
			{
				method: 'GET',
				headers: {
					'xc-token': PUBLIC_NOCO_TOKEN_KEY
				}
			}
		);
		school_json = await school_resp.json();
		school_data = school_json?.list ?? [];
		const mostRatingList: SchoolData[] = school_data.map((e: BasicSchema) => ({
			id: e.schoolId,
			name: e.nameTh
		}));

		return {
			mostCommentList,
			mostRatingList
		};
	} catch (e) {
		console.error(e);
	}
	return {
		mostCommentList: [],
		mostRatingList: []
	};
};
