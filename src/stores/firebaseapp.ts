import { writable } from 'svelte/store';

import type { FirebaseApp } from 'firebase/app';
import type { Auth, User } from 'firebase/auth';

type UserWithToken = User & { accessToken: string };

export const app = writable<FirebaseApp | null>(null);
export const auth = writable<Auth | null>(null);
export const currentUser = writable<UserWithToken | null>(null);
