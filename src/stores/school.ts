import { writable, derived } from 'svelte/store';

export const currentSchoolId = writable<number | null>(null);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const currentSchool = writable<any | null>(null);
export const years = writable<number[] | null>(null);
export const update_date = writable<string | null>(null);

export const LATEST_YEAR = derived(years, ($years) => $years?.[0]);
export const REST_YEAR = derived(years, ($years) => {
	if ($years === null) return $years;
	const [, ...rest] = $years;
	return rest;
});
