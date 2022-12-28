import fs from 'fs';

import GENERAL from './json/general.json' assert { type: 'json' };
import BUILDING from './json/building.json' assert { type: 'json' };
import COMPUTER from './json/computer.json' assert { type: 'json' };
import DURABLE_GOODS from './json/durable_goods.json' assert { type: 'json' };
import INTERNET from './json/internet.json' assert { type: 'json' };
import STAFF from './json/staff.json' assert { type: 'json' };
import STUDENT from './json/student.json' assert { type: 'json' };

function getSchoolYear() {
	const now = new Date();
	// If the current month is January to April,
	// subtract 1 from the year to get the school year
	return now.getFullYear() - +(now.getMonth() < 4);
	// let year = now.getFullYear();
	// if (now.getMonth() < 4) {
	// 	year -= 1;
	// }
	// return year;
}

// This path is ignored. In production, the path will directly point to the public api
const getOutputPath = (filename) => `static/data/${getSchoolYear()}/${filename}.json`;
// Used for debugging purpose, so we don't have to recompile all 29xxx schools
const SCHOOL_LIMIT = 50;

const formatSchoolName = (name) => {
	if (!name) return null;
	return name
		.replace(/\(/g, ' (')
		.replace(/\)/g, ') ')
		.replace(/\s+/g, ' ')
		.replace(/\w\S*/g, (txt) => txt[0].toLocaleUpperCase() + txt.substring(1).toLocaleLowerCase())
		.trim();
};

let loopcount = 0;
for (let school_id in GENERAL) {
	if (loopcount++ > SCHOOL_LIMIT) break;
	let d = { ...GENERAL[school_id][0] };
	delete d['school_id.1'];
	d.school_id = school_id;

	d.name_th = formatSchoolName(d.name_th);
	d.name_en = formatSchoolName(d.name_en);

	const buildings = BUILDING[school_id] ?? null;
	if (!buildings) {
		d.school_buildings = [];
		d.other_buildings = [];
		d.buildings_stats = {
			ดี: 0,
			พอใช้: 0,
			ทรุดโทรม: 0
		};
	} else {
		d.school_buildings = buildings.filter((b) => b.name.match(/อาคารเรียน/g));
		d.other_buildings = buildings.filter((b) => !b.name.match(/อาคารเรียน/g));
		d.buildings_stats = buildings.reduce(
			(a, c) => {
				switch (c.current_condition) {
					case 'ดี':
						a.ดี += 1;
						break;
					case 'พอใช้':
						a.พอใช้ += 1;
						break;
					case 'ทรุดโทรม':
						a.ทรุดโทรม += 1;
						break;
				}
				if (c.name.match(/อาคารเรียน/g)) {
					a.school_buildings_rooms += parseInt(c.room_number);
				}
				a.total += 1;
				return a;
			},
			{
				ดี: 0,
				พอใช้: 0,
				ทรุดโทรม: 0,
				total: 0,
				school_buildings_rooms: 0
			}
		);
	}

	let temp = COMPUTER[school_id];
	if (temp) {
		d.computer = {
			working: parseInt(temp[2].working),
			broken: parseInt(temp[2].not_working),
			total: parseInt(temp[2].total_sum),
			learning: {
				working: parseInt(temp[0].working),
				broken: parseInt(temp[0].not_working),
				total: parseInt(temp[0].sub_total),
				source: {
					obec: parseInt(temp[0].obec_budget),
					self: parseInt(temp[0].self_supply__donated)
				}
			},
			management: {
				working: parseInt(temp[1].working),
				broken: parseInt(temp[1].not_working),
				total: parseInt(temp[1].sub_total),
				source: {
					obec: parseInt(temp[1].obec_budget),
					self: parseInt(temp[1].self_supply__donated)
				}
			}
		};
	} else {
		d.computer = null;
	}
	d.durable_goods =
		DURABLE_GOODS[school_id].map((goods) => ({
			...goods,
			total: goods.working + goods.to_be_repaired + goods.to_be_removed
		})) ?? null;
	d.tables = {
		working: d.durable_goods[0].working + d.durable_goods[16].working + d.durable_goods[17].working,
		to_be_repaired:
			d.durable_goods[0].to_be_repaired +
			d.durable_goods[16].to_be_repaired +
			d.durable_goods[17].to_be_repaired,
		to_be_removed:
			d.durable_goods[0].to_be_removed +
			d.durable_goods[16].to_be_removed +
			d.durable_goods[17].to_be_removed,
		total: d.durable_goods[0].total + d.durable_goods[16].total + d.durable_goods[17].total
	};
	d.durable_goods_stats = d.durable_goods.reduce(
		(a, c) => {
			a.working += c.working;
			a.to_be_repaired += c.to_be_repaired;
			a.to_be_removed += c.to_be_removed;
			a.total += c.total;
			return a;
		},
		{
			working: 0,
			to_be_repaired: 0,
			to_be_removed: 0,
			total: 0
		}
	);
	d.internet = INTERNET[school_id][0] ?? null;
	for (let key in d.internet) {
		d.internet[key] = d.internet[key]?.trim() === '-' ? null : d.internet[key];
	}

	temp = STAFF[school_id];
	if (temp) {
		d.staff = {
			men: temp[21].men,
			women: temp[21].women,
			total: temp[21].total,
			ผู้อำนวยการ: {
				men: temp[5].men,
				women: temp[5].women,
				total: temp[5].total,
				คศ1: {
					men: temp[0].men,
					women: temp[0].women,
					total: temp[0].total
				},
				คศ2: {
					men: temp[1].men,
					women: temp[1].women,
					total: temp[1].total
				},
				คศ3: {
					men: temp[2].men,
					women: temp[2].women,
					total: temp[2].total
				},
				คศ4: {
					men: temp[3].men,
					women: temp[3].women,
					total: temp[3].total
				},
				คศ5: {
					men: temp[4].men,
					women: temp[4].women,
					total: temp[4].total
				}
			},
			รองผู้อำนวยการ: {
				men: temp[10].men,
				women: temp[10].women,
				total: temp[10].total,
				คศ1: {
					men: temp[6].men,
					women: temp[6].women,
					total: temp[6].total
				},
				คศ2: {
					men: temp[7].men,
					women: temp[7].women,
					total: temp[7].total
				},
				คศ3: {
					men: temp[8].men,
					women: temp[8].women,
					total: temp[8].total
				},
				คศ4: {
					men: temp[9].men,
					women: temp[9].women,
					total: temp[9].total
				}
			},
			ครู: {
				men: temp[16].men + temp[17].men,
				women: temp[16].women + temp[17].women,
				total: temp[16].total + temp[17].total,
				ครูผู้ช่วย: {
					men: temp[17].men,
					women: temp[17].women,
					total: temp[17].total
				},
				คศ1: {
					men: temp[11].men,
					women: temp[11].women,
					total: temp[11].total
				},
				คศ2: {
					men: temp[12].men,
					women: temp[12].women,
					total: temp[12].total
				},
				คศ3: {
					men: temp[13].men,
					women: temp[13].women,
					total: temp[13].total
				},
				คศ4: {
					men: temp[14].men,
					women: temp[14].women,
					total: temp[14].total
				},
				คศ5: {
					men: temp[15].men,
					women: temp[15].women,
					total: temp[15].total
				}
			},
			พนักงาน: {
				men: temp[18].men + temp[19].men + temp[20].men,
				women: temp[18].women + temp[19].women + temp[20].women,
				total: temp[18].total + temp[19].total + temp[20].total,
				ลูกจ้างประจำ: {
					men: temp[18].men,
					women: temp[18].women,
					total: temp[18].total
				},
				พนักงานราชการ: {
					men: temp[19].men,
					women: temp[19].women,
					total: temp[19].total
				},
				ลูกจ้างชั่วคราว: {
					men: temp[20].men,
					women: temp[20].women,
					total: temp[20].total
				}
			}
		};
	} else {
		d.staff = null;
	}

	temp = STUDENT[school_id];
	if (temp) {
		d.student = {
			total: {
				อ: temp[3].toal,
				ป: temp[10].toal,
				มต: temp[14].toal,
				มป: temp[21].toal,
				ม: temp[14].toal + temp[21].toal,
				class: temp[3].class + temp[10].class + temp[14].class + temp[21].class,
				all: temp[22].toal
			},
			อ1: { men: temp[0].men, women: temp[0].women, total: temp[0].toal, class: temp[0].class },
			อ2: { men: temp[1].men, women: temp[1].women, total: temp[1].toal, class: temp[1].class },
			อ3: { men: temp[2].men, women: temp[2].women, total: temp[2].toal, class: temp[2].class },
			ป1: { men: temp[4].men, women: temp[4].women, total: temp[4].toal, class: temp[4].class },
			ป2: { men: temp[5].men, women: temp[5].women, total: temp[5].toal, class: temp[5].class },
			ป3: { men: temp[6].men, women: temp[6].women, total: temp[6].toal, class: temp[6].class },
			ป4: { men: temp[7].men, women: temp[7].women, total: temp[7].toal, class: temp[7].class },
			ป5: { men: temp[8].men, women: temp[8].women, total: temp[8].toal, class: temp[8].class },
			ป6: { men: temp[9].men, women: temp[9].women, total: temp[9].toal, class: temp[9].class },
			ม1: { men: temp[11].men, women: temp[11].women, total: temp[11].toal, class: temp[11].class },
			ม2: { men: temp[12].men, women: temp[12].women, total: temp[12].toal, class: temp[12].class },
			ม3: { men: temp[13].men, women: temp[13].women, total: temp[13].toal, class: temp[13].class },
			ม4: { men: temp[15].men, women: temp[15].women, total: temp[15].toal, class: temp[15].class },
			ม5: { men: temp[16].men, women: temp[16].women, total: temp[16].toal, class: temp[16].class },
			ม6: { men: temp[17].men, women: temp[17].women, total: temp[17].toal, class: temp[17].class },
			ปวช1: {
				men: temp[18].men,
				women: temp[18].women,
				total: temp[18].toal,
				class: temp[18].class
			},
			ปวช2: {
				men: temp[19].men,
				women: temp[19].women,
				total: temp[19].toal,
				class: temp[19].class
			},
			ปวช3: {
				men: temp[20].men,
				women: temp[20].women,
				total: temp[20].toal,
				class: temp[20].class
			}
		};
	} else {
		d.student = null;
	}

	fs.writeFileSync(getOutputPath(school_id), JSON.stringify(d));
}
