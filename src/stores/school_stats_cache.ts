import { writable } from 'svelte/store';

export const schoolStatsCache = writable<
	Record<string, { rating: number | undefined; comment: number }>
>({});
