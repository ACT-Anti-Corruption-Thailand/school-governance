import { writable, derived } from 'svelte/store';
import type { SchoolData } from 'types/school_type';

function getCurrentSchoolYear() {
	const now = new Date();
	return now.getFullYear() - +(now.getMonth() < 4);
}

export const currentSchoolId = writable<number | null>(null);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const currentSchool = writable<SchoolData | null>(null);

export const years = writable<number[]>([getCurrentSchoolYear()]);
export const update_date = writable<Record<string, string>>({});

export const LATEST_YEAR = derived(years, ($years) => $years?.[0]);
export const REST_YEAR = derived(years, ($years) => {
	if ($years === null) return $years;
	const [, ...rest] = $years;
	return rest;
});
