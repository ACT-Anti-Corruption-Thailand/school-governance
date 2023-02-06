import { nocoConfig, nocodb } from '../../utils/nocodb.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const groupBy = <T, K extends keyof any>(arr: T[], groupFn: (element: T) => K): Record<K, T[]> =>
	arr.reduce(
		(r, v, _i, _a, k = groupFn(v)) => ((r[k] || (r[k] = [])).push(v), r),
		{} as Record<K, T[]>
	);

interface AnnouncementData {
	announceTitle: string;
	announcePerson: string;
	announceContent: string;
	announceDate: string;
}

export interface SchoolAnnoucementQuery {
	schoolYear?: number;
}

export async function getSchoolAnnoucement(
	schoolId: string,
	{ schoolYear }: SchoolAnnoucementQuery = {}
) {
	const { list: raw_list } = await nocodb.dbTableRow.list(...nocoConfig, 'SchoolAnnouncements', {
		limit: '1000',
		where: `(schoolId,eq,${schoolId})~and(announceDate,btw,"${schoolYear}/5/1","${
			schoolYear + 1
		}/4/30")`
	});

	if (raw_list.length === 0)
		return {
			has_data: false,
			data: []
		};

	return {
		has_data: true,
		data: groupBy(raw_list, (a: AnnouncementData) =>
			new Date(a.announceDate).toLocaleDateString('th-TH', { month: 'long' })
		)
	};
}
