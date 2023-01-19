import fs from 'fs';
import csv from 'csvtojson';

// const formatSchoolName = (name) => {
// 	if (!name) return null;
// 	return name
// 		.replace(/\(/g, ' (')
// 		.replace(/\)/g, ') ')
// 		.replace(/\s+/g, ' ')
// 		.replace(/\w\S*/g, (txt) => txt[0].toLocaleUpperCase() + txt.substring(1).toLocaleLowerCase())
// 		.trim();
// };

csv()
	.fromFile('data/csv/general.csv')
	.then((arr) => {
		let schoolIndexData = arr
			.map((d) => `${d.school_id}`)
			.join('\n')
			.replace(/[“”]/g, '"');

		fs.writeFileSync('data/schoolId.csv', 'schoolId\n' + schoolIndexData);
	});
