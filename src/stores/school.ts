import { writable } from 'svelte/store';

export const currentSchoolId = writable<number | null>(null);
export const currentSchool = writable<object | null>(null);
