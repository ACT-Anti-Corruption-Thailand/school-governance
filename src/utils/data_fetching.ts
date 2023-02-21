import { PUBLIC_API_HOST } from '$env/static/public';
import type { SchoolData } from 'components/SchoolList.svelte';

type BasicSchema = {
	schoolId: string;
	nameTh: string;
};

export const getLatestActivityList = async () => {
	try {
		const school_resp = await fetch(`${PUBLIC_API_HOST}/schools/latest`);
		const school_json = await school_resp.json();
		return school_json;
	} catch (e) {
		console.error(e);
	}
	return [];
};

export const getStatsList = async () => {
	try {
		let school_resp = await fetch(`${PUBLIC_API_HOST}/schools/top/comment`);
		let school_json = await school_resp.json();
		let school_data = school_json?.list ?? [];
		const mostCommentList: SchoolData[] = school_data.slice(0, 5).map((e: BasicSchema) => ({
			id: e.schoolId,
			name: e.nameTh
		}));

		school_resp = await fetch(`${PUBLIC_API_HOST}/schools/top/rating`);
		school_json = await school_resp.json();
		school_data = school_json?.list ?? [];
		const mostRatingList: SchoolData[] = school_data.slice(0, 5).map((e: BasicSchema) => ({
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
