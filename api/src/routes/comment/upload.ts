import { nocoConfig, nocodb } from '../../utils/nocodb.js';

export interface UploadBodyType {
	json: string;
	files: File[];
}

export async function uploadImages(body: UploadBodyType) {
	return nocodb.storage.upload({ path: 'noco/Open-School-Test/SchoolComments/images' }, body);
}
