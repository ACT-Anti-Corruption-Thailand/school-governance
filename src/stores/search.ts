import { writable } from 'svelte/store';

export const show_search = writable(false);
export const search_string = writable<string>('');
