import fs from 'fs';

import GENERAL from './json/general.json' assert { type: 'json' };
import BUILDING from './json/building.json' assert { type: 'json' };
import COMPUTER from './json/computer.json' assert { type: 'json' };
import DURABLE_GOODS from './json/durable_goods.json' assert { type: 'json' };
import INTERNET from './json/internet.json' assert { type: 'json' };
import STAFF from './json/staff.json' assert { type: 'json' };
import STUDENT from './json/student.json' assert { type: 'json' };

import { years } from './years.js';

const groupBy = (arr, groupFn) =>
	arr.reduce((r, v, _i, _a, k = groupFn(v)) => ((r[k] || (r[k] = [])).push(v), r), {});

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

const CURRENT_SCHOOL_YEAR = getSchoolYear();

// This path is ignored. In production, the path will directly point to the public api
const getOutputPath = (filename) => `static/data/${CURRENT_SCHOOL_YEAR}/${filename}.json`;
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

if (!years.includes(CURRENT_SCHOOL_YEAR)) {
	let new_years = [...years, CURRENT_SCHOOL_YEAR].sort((a, z) => a - z);
	for (const path of ['data/years.js', 'src/data/years.js'])
		fs.writeFileSync(path, 'export const years = ' + JSON.stringify(new_years));
}

fs.writeFileSync(
	'src/data/update_date.js',
	`export const update_date = "${new Date().toLocaleDateString('th-TH')}"`
);

let loopcount = 0;
for (let school_id in GENERAL) {
	if (loopcount++ > SCHOOL_LIMIT) break;

	//  ██████╗ ███████╗███╗   ██╗███████╗██████╗  █████╗ ██╗
	// ██╔════╝ ██╔════╝████╗  ██║██╔════╝██╔══██╗██╔══██╗██║
	// ██║  ███╗█████╗  ██╔██╗ ██║█████╗  ██████╔╝███████║██║
	// ██║   ██║██╔══╝  ██║╚██╗██║██╔══╝  ██╔══██╗██╔══██║██║
	// ╚██████╔╝███████╗██║ ╚████║███████╗██║  ██║██║  ██║███████╗
	//  ╚═════╝ ╚══════╝╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝

	let d = { ...GENERAL[school_id][0] };
	delete d['school_id.1'];
	d.school_id = school_id;

	d.name_th = formatSchoolName(d.name_th);
	d.name_en = formatSchoolName(d.name_en);

	if (d.province === 'กรุงเทพมหานคร') {
		d.subdistrict = `แขวง${d.subdistrict}`;
	} else {
		d.subdistrict = `ตำบล${d.subdistrict}`;
		d.district = `อำเภอ${d.district}`;
	}

	d.website = d.website.replace(/ เว็บไซต์โรงเรียน \(สารสนเทศ\)/, '').trim();

	// ██████╗ ██╗   ██╗██╗██╗     ██████╗ ██╗███╗   ██╗ ██████╗ ███████╗
	// ██╔══██╗██║   ██║██║██║     ██╔══██╗██║████╗  ██║██╔════╝ ██╔════╝
	// ██████╔╝██║   ██║██║██║     ██║  ██║██║██╔██╗ ██║██║  ███╗███████╗
	// ██╔══██╗██║   ██║██║██║     ██║  ██║██║██║╚██╗██║██║   ██║╚════██║
	// ██████╔╝╚██████╔╝██║███████╗██████╔╝██║██║ ╚████║╚██████╔╝███████║
	// ╚═════╝  ╚═════╝ ╚═╝╚══════╝╚═════╝ ╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚══════╝

	const buildings = BUILDING[school_id] ?? null;
	d.buildings = {
		data: {
			อาคารเรียน: [],
			อาคารทั่วไป: [],
			ห้องน้ำ: [],
			บ้านพัก: [],
			การเกษตร: [],
			อื่นๆ: []
		},
		stats: {
			ดี: 0,
			พอใช้: 0,
			ทรุดโทรม: 0,
			จำนวนห้องในอาคารเรียน: 0,
			รวม: 0
		}
	};
	if (buildings) {
		buildings.forEach((b) => {
			b.name = b.name.replace(/ ลำดับที่.+/g, '').trim();

			if (b.name.match(/อาคารเรียน/)) {
				// # อาคารเรียน
				// อาคารเรียน
				d.buildings.data.อาคารเรียน.push(b);
				d.buildings.stats.จำนวนห้องในอาคารเรียน += parseInt(b.room_number);
			} else if (b.name.match(/อาคาร|สนาม|หอสมุด/)) {
				// # อาคารทั่วไป
				// อาคารอเนกประสงค์/โรงอาหาร/โรงฝึกงาน/หอประชุม
				// สนามกีฬา
				// สนามเด็กเล่น
				// หอสมุด
				// อาคารสำนักงานเขตพื้นที่การศึกษา
				d.buildings.data.อาคารทั่วไป.push(b);
			} else if (b.name.match(/ส้วม/)) {
				// # ห้องน้ำ
				// ส้วม
				// ส้วม1
				d.buildings.data.ห้องน้ำ.push(b);
			} else if (b.name.match(/บ้านพัก/)) {
				// # บ้านพัก
				// บ้านพักครู
				// บ้านพักนักเรียน
				// บ้านพักภารโรง
				d.buildings.data.บ้านพัก.push(b);
			} else if (b.name.match(/เรือนเพาะชำ|บ่อ/)) {
				// # การเกษตร
				// เรือนเพาะชำ
				// บ่อน้ำตื้น
				// บ่อเลี้ยงปลา
				d.buildings.data.การเกษตร.push(b);
			} else {
				// # อื่นๆ
				// ถนน/รางระบายน้ำ
				// ถังเก็บน้ำ
				// รั้ว
				d.buildings.data.อื่นๆ.push(b);
			}

			if (b.current_condition) d.buildings.stats[b.current_condition]++;
			d.buildings.stats.รวม++;
		});
	}

	//  ██████╗ ██████╗ ███╗   ███╗██████╗ ██╗   ██╗████████╗███████╗██████╗
	// ██╔════╝██╔═══██╗████╗ ████║██╔══██╗██║   ██║╚══██╔══╝██╔════╝██╔══██╗
	// ██║     ██║   ██║██╔████╔██║██████╔╝██║   ██║   ██║   █████╗  ██████╔╝
	// ██║     ██║   ██║██║╚██╔╝██║██╔═══╝ ██║   ██║   ██║   ██╔══╝  ██╔══██╗
	// ╚██████╗╚██████╔╝██║ ╚═╝ ██║██║     ╚██████╔╝   ██║   ███████╗██║  ██║
	//  ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚═╝      ╚═════╝    ╚═╝   ╚══════╝╚═╝  ╚═╝

	const computer = COMPUTER[school_id];
	d.computer = null;
	if (computer) {
		d.computer = {
			working: parseInt(computer[2].working),
			broken: parseInt(computer[2].not_working),
			total: parseInt(computer[2].total_sum),
			learning: {
				working: parseInt(computer[0].working),
				broken: parseInt(computer[0].not_working),
				total: parseInt(computer[0].sub_total),
				source: {
					obec: parseInt(computer[0].obec_budget),
					self: parseInt(computer[0].self_supply__donated)
				}
			},
			management: {
				working: parseInt(computer[1].working),
				broken: parseInt(computer[1].not_working),
				total: parseInt(computer[1].sub_total),
				source: {
					obec: parseInt(computer[1].obec_budget),
					self: parseInt(computer[1].self_supply__donated)
				}
			}
		};
	}

	// ██████╗ ██╗   ██╗██████╗  █████╗ ██████╗ ██╗     ███████╗     ██████╗  ██████╗  ██████╗ ██████╗ ███████╗
	// ██╔══██╗██║   ██║██╔══██╗██╔══██╗██╔══██╗██║     ██╔════╝    ██╔════╝ ██╔═══██╗██╔═══██╗██╔══██╗██╔════╝
	// ██║  ██║██║   ██║██████╔╝███████║██████╔╝██║     █████╗      ██║  ███╗██║   ██║██║   ██║██║  ██║███████╗
	// ██║  ██║██║   ██║██╔══██╗██╔══██║██╔══██╗██║     ██╔══╝      ██║   ██║██║   ██║██║   ██║██║  ██║╚════██║
	// ██████╔╝╚██████╔╝██║  ██║██║  ██║██████╔╝███████╗███████╗    ╚██████╔╝╚██████╔╝╚██████╔╝██████╔╝███████║
	// ╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ ╚══════╝╚══════╝     ╚═════╝  ╚═════╝  ╚═════╝ ╚═════╝ ╚══════╝

	const durable_goods = DURABLE_GOODS[school_id]?.map((d) => {
		const name = formatSchoolName(
			d.name.replace(/\(ใช้บริหารจัดการ\)|\(ใช้ในการเรียนการสอน\)/g, '')
		);
		const type = [11001, 22001, 22002].includes(d.code)
			? 'โต๊ะเก้าอี้นักเรียน'
			: d.type.replace('ครุภัณฑ์สำนักงาน โรงเรียน', 'ครุภัณฑ์สำนักงาน/โรงเรียน');
		const total = d.working + d.to_be_repaired + d.to_be_removed;

		return {
			...d,
			name,
			type,
			total
		};
	});
	d.durable_goods = {
		data: null,
		stats: {
			working: 0,
			to_be_repaired: 0,
			to_be_removed: 0,
			total: 0
		}
	};
	if (durable_goods) {
		const groupped_goods = groupBy(durable_goods, (d) => d.type);
		for (const type in groupped_goods) {
			const items = groupped_goods[type].filter((d) => d.total);

			if (items.length === 0) {
				delete groupped_goods[type];
				continue;
			}

			groupped_goods[type] = {
				working: items.reduce((a, c) => (a += c.working), 0),
				to_be_repaired: items.reduce((a, c) => (a += c.to_be_repaired), 0),
				to_be_removed: items.reduce((a, c) => (a += c.to_be_removed), 0),
				total: items.reduce((a, c) => (a += c.total), 0),
				list: items
			};

			d.durable_goods.stats.working += groupped_goods[type].working;
			d.durable_goods.stats.to_be_repaired += groupped_goods[type].to_be_repaired;
			d.durable_goods.stats.to_be_removed += groupped_goods[type].to_be_removed;
			d.durable_goods.stats.total += groupped_goods[type].total;
		}

		d.durable_goods.data = groupped_goods;
	}

	// ██╗███╗   ██╗████████╗███████╗██████╗ ███╗   ██╗███████╗████████╗
	// ██║████╗  ██║╚══██╔══╝██╔════╝██╔══██╗████╗  ██║██╔════╝╚══██╔══╝
	// ██║██╔██╗ ██║   ██║   █████╗  ██████╔╝██╔██╗ ██║█████╗     ██║
	// ██║██║╚██╗██║   ██║   ██╔══╝  ██╔══██╗██║╚██╗██║██╔══╝     ██║
	// ██║██║ ╚████║   ██║   ███████╗██║  ██║██║ ╚████║███████╗   ██║
	// ╚═╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝╚══════╝   ╚═╝

	const internet = INTERNET[school_id][0];
	d.internet = null;
	if (internet) {
		d.internet = {};
		for (let key in internet) {
			d.internet[key] = internet[key]?.trim() === '-' ? null : internet[key];
		}
	}

	// ███████╗████████╗ █████╗ ███████╗███████╗
	// ██╔════╝╚══██╔══╝██╔══██╗██╔════╝██╔════╝
	// ███████╗   ██║   ███████║█████╗  █████╗
	// ╚════██║   ██║   ██╔══██║██╔══╝  ██╔══╝
	// ███████║   ██║   ██║  ██║██║     ██║
	// ╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝     ╚═╝

	const staff = STAFF[school_id];
	d.staff = null;
	if (staff) {
		d.staff = {
			men: staff[21].men,
			women: staff[21].women,
			total: staff[21].total,
			ผู้อำนวยการ: {
				men: staff[5].men,
				women: staff[5].women,
				total: staff[5].total,
				คศ1: {
					men: staff[0].men,
					women: staff[0].women,
					total: staff[0].total
				},
				คศ2: {
					men: staff[1].men,
					women: staff[1].women,
					total: staff[1].total
				},
				คศ3: {
					men: staff[2].men,
					women: staff[2].women,
					total: staff[2].total
				},
				คศ4: {
					men: staff[3].men,
					women: staff[3].women,
					total: staff[3].total
				},
				คศ5: {
					men: staff[4].men,
					women: staff[4].women,
					total: staff[4].total
				}
			},
			รองผู้อำนวยการ: {
				men: staff[10].men,
				women: staff[10].women,
				total: staff[10].total,
				คศ1: {
					men: staff[6].men,
					women: staff[6].women,
					total: staff[6].total
				},
				คศ2: {
					men: staff[7].men,
					women: staff[7].women,
					total: staff[7].total
				},
				คศ3: {
					men: staff[8].men,
					women: staff[8].women,
					total: staff[8].total
				},
				คศ4: {
					men: staff[9].men,
					women: staff[9].women,
					total: staff[9].total
				}
			},
			ครู: {
				men: staff[16].men + staff[17].men,
				women: staff[16].women + staff[17].women,
				total: staff[16].total + staff[17].total,
				ครูผู้ช่วย: {
					men: staff[17].men,
					women: staff[17].women,
					total: staff[17].total
				},
				คศ1: {
					men: staff[11].men,
					women: staff[11].women,
					total: staff[11].total
				},
				คศ2: {
					men: staff[12].men,
					women: staff[12].women,
					total: staff[12].total
				},
				คศ3: {
					men: staff[13].men,
					women: staff[13].women,
					total: staff[13].total
				},
				คศ4: {
					men: staff[14].men,
					women: staff[14].women,
					total: staff[14].total
				},
				คศ5: {
					men: staff[15].men,
					women: staff[15].women,
					total: staff[15].total
				}
			},
			พนักงาน: {
				men: staff[18].men + staff[19].men + staff[20].men,
				women: staff[18].women + staff[19].women + staff[20].women,
				total: staff[18].total + staff[19].total + staff[20].total,
				ลูกจ้างประจำ: {
					men: staff[18].men,
					women: staff[18].women,
					total: staff[18].total
				},
				พนักงานราชการ: {
					men: staff[19].men,
					women: staff[19].women,
					total: staff[19].total
				},
				ลูกจ้างชั่วคราว: {
					men: staff[20].men,
					women: staff[20].women,
					total: staff[20].total
				}
			}
		};
	}

	// ███████╗████████╗██╗   ██╗██████╗ ███████╗███╗   ██╗████████╗
	// ██╔════╝╚══██╔══╝██║   ██║██╔══██╗██╔════╝████╗  ██║╚══██╔══╝
	// ███████╗   ██║   ██║   ██║██║  ██║█████╗  ██╔██╗ ██║   ██║
	// ╚════██║   ██║   ██║   ██║██║  ██║██╔══╝  ██║╚██╗██║   ██║
	// ███████║   ██║   ╚██████╔╝██████╔╝███████╗██║ ╚████║   ██║
	// ╚══════╝   ╚═╝    ╚═════╝ ╚═════╝ ╚══════╝╚═╝  ╚═══╝   ╚═╝

	const student = STUDENT[school_id];
	d.student = null;
	if (student) {
		d.student = {
			total: {
				อ: student[3].toal,
				ป: student[10].toal,
				มต: student[14].toal,
				มป: student[21].toal,
				ม: student[14].toal + student[21].toal,
				class: student[3].class + student[10].class + student[14].class + student[21].class,
				all: student[22].toal
			},
			อ1: {
				men: student[0].men,
				women: student[0].women,
				total: student[0].toal,
				class: student[0].class
			},
			อ2: {
				men: student[1].men,
				women: student[1].women,
				total: student[1].toal,
				class: student[1].class
			},
			อ3: {
				men: student[2].men,
				women: student[2].women,
				total: student[2].toal,
				class: student[2].class
			},
			ป1: {
				men: student[4].men,
				women: student[4].women,
				total: student[4].toal,
				class: student[4].class
			},
			ป2: {
				men: student[5].men,
				women: student[5].women,
				total: student[5].toal,
				class: student[5].class
			},
			ป3: {
				men: student[6].men,
				women: student[6].women,
				total: student[6].toal,
				class: student[6].class
			},
			ป4: {
				men: student[7].men,
				women: student[7].women,
				total: student[7].toal,
				class: student[7].class
			},
			ป5: {
				men: student[8].men,
				women: student[8].women,
				total: student[8].toal,
				class: student[8].class
			},
			ป6: {
				men: student[9].men,
				women: student[9].women,
				total: student[9].toal,
				class: student[9].class
			},
			ม1: {
				men: student[11].men,
				women: student[11].women,
				total: student[11].toal,
				class: student[11].class
			},
			ม2: {
				men: student[12].men,
				women: student[12].women,
				total: student[12].toal,
				class: student[12].class
			},
			ม3: {
				men: student[13].men,
				women: student[13].women,
				total: student[13].toal,
				class: student[13].class
			},
			ม4: {
				men: student[15].men,
				women: student[15].women,
				total: student[15].toal,
				class: student[15].class
			},
			ม5: {
				men: student[16].men,
				women: student[16].women,
				total: student[16].toal,
				class: student[16].class
			},
			ม6: {
				men: student[17].men,
				women: student[17].women,
				total: student[17].toal,
				class: student[17].class
			},
			ปวช1: {
				men: student[18].men,
				women: student[18].women,
				total: student[18].toal,
				class: student[18].class
			},
			ปวช2: {
				men: student[19].men,
				women: student[19].women,
				total: student[19].toal,
				class: student[19].class
			},
			ปวช3: {
				men: student[20].men,
				women: student[20].women,
				total: student[20].toal,
				class: student[20].class
			}
		};
	}

	fs.writeFileSync(getOutputPath(school_id), JSON.stringify(d, null, 1));
}
