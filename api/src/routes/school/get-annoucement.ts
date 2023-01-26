import { nocoConfig, nocodb } from '../../utils/nocodb.js';

export function getSchoolAnnoucement(schoolId: string) {
	return nocodb.dbTableRow.list(...nocoConfig, 'Announcements', {
		limit: '999',
		where: `(schoolId,eq,${schoolId})`
	});
}
