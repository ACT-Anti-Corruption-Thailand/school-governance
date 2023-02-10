export interface SchoolData {
	student: Student;
	staff: Staff;
	computer: Computer;
	internet: Internet;
	durable_goods: DurableGoods;
	school_id: string;
	smis_id: string;
	obec_id: string;
	name_th: string;
	name_en: string;
	address: string;
	subdistrict: string;
	district: string;
	province: string;
	postcode: string;
	telephone: string;
	fax: string;
	grades: string;
	established: string;
	email: string;
	links: Link[];
	network_of_education_development_center: string;
	local_gov_org: string;
	distance_to_edu_area: string;
	distance_to_district: string;
	logo_image_path: string;
	principal: Principal;
	latlng: string[];
	affiliation: string;
	school_size: string;
	building: Building;
}

export interface Computer {
	learning: Learning;
	management: Learning;
	total: number;
	working: number;
	broken: number;
}

export interface Learning {
	source: Source;
	total: number;
	working: number;
	broken: number;
}

export interface Source {
	obec: number;
	self: number;
}

export interface DurableGoods {
	stats: {
		working: number;
		to_be_repaired: number;
		to_be_removed: number;
		total: number;
	};
	data: {
		[key: string]: DurableGood;
	};
}

export interface DurableGood {
	working: number;
	to_be_repaired: number;
	to_be_removed: number;
	total: number;
	list: List[];
}

export interface List {
	code: string;
	type: string;
	name: string;
	working: number;
	to_be_repaired: number;
	to_be_removed: number;
	total: number;
}

export interface Internet {
	provider: string;
	type: string;
	speed: string;
	status: string;
	monthly_price: string;
	lan_network: string;
	wireless_lan_network: string;
}

export interface Link {
	text: string;
	url: string;
}

export interface Principal {
	name: string;
	position_title: string;
	image_path: string;
}

export interface Staff extends Gender {
	ครู: ครู;
	ผู้อำนวยการ: ครู;
	พนักงาน: พนักงาน;
	รองผู้อำนวยการ: ครู;
}

export interface ครู {
	men: number;
	women: number;
	total: number;
	คศ1: Gender;
	คศ2: Gender;
	คศ3: Gender;
	คศ4: Gender;
	คศ5?: Gender;
	ครูผู้ช่วย?: Gender;
}

export interface Gender {
	men: number;
	women: number;
	total: number;
}

export interface GenderClass extends Gender {
	class: number;
}

export interface พนักงาน extends Gender {
	ลูกจ้างประจำ: Gender;
	พนักงานราชการ: Gender;
	ลูกจ้างชั่วคราว: Gender;
}

export interface Student {
	total: Total;
	อ1: GenderClass;
	อ2: GenderClass;
	อ3: GenderClass;
	ป1: GenderClass;
	ป2: GenderClass;
	ป3: GenderClass;
	ป4: GenderClass;
	ป5: GenderClass;
	ป6: GenderClass;
	ม1: GenderClass;
	ม2: GenderClass;
	ม3: GenderClass;
	ม4: GenderClass;
	ม5: GenderClass;
	ม6: GenderClass;
	ปวช1: GenderClass;
	ปวช2: GenderClass;
	ปวช3: GenderClass;
}

export interface Total {
	ป: number;
	ปวช: number;
	ม: number;
	มต: number;
	มป: number;
	อ: number;
	all: number;
	class: number;
}

export interface Building {
	data: { [key: string]: BuildingData[] };
	stats: { [key: string]: number };
}

export interface BuildingData {
	name: string;
	raw_name: string;
	model: string;
	build_at: string;
	current_condition: 'ดี' | 'พอใช้' | 'ทรุดโทรม';
	room_number: number | null;
	images: string[];
}
