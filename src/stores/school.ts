import { writable } from 'svelte/store';

export const currentSchoolId = writable<number | null>(null);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const currentSchool = writable<any | null>(null);
