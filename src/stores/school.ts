import { PUBLIC_BASE_YEAR } from '$env/static/public';
import { writable, derived } from 'svelte/store';
import type { SchoolData } from 'types/school_type';

export const currentSchoolId = writable<number | null>(null);
export const currentSchool = writable<SchoolData | null>(null);

function getCurrentSchoolYear() {
	const now = new Date();
	return now.getFullYear() - +(now.getMonth() < 4);
}

// enumerate school year
function getSchoolYearList() {
	const cur = getCurrentSchoolYear();
	const start = +PUBLIC_BASE_YEAR;
	return Array(cur - start + 1)
		.fill(0)
		.map((_, i) => i + start);
}

interface DataYears {
	year: number;
	update_date: string;
}

export const computed_years = writable<number[]>(getSchoolYearList());
export const data_years = writable<DataYears[]>([
	{
		year: +PUBLIC_BASE_YEAR,
		update_date: '(เกิดข้อผิดพลาด กรุณาโหลดใหม่อีกครั้ง)'
	}
]);

export const LATEST_COMPUTED_YEAR = derived(computed_years, ($years) => $years?.[0]);
export const REST_COMPUTED_YEAR = derived(computed_years, ($years) => {
	if ($years === null) return $years;
	const [, ...rest] = $years;
	return rest;
});
