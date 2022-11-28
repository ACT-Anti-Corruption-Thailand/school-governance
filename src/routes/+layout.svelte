<script lang="ts">
	import Firebase from '../components/firebase.svelte';
	import { signInAnonymously, signOut } from 'firebase/auth';
	import { auth, currentUser } from '../stores/firebaseapp';

	const login = () => {
		if ($auth) signInAnonymously($auth);
	};

	const logout = () => {
		if ($auth) signOut($auth);
	};
</script>

<Firebase />
<div>
	{#if $currentUser}
		Current User is {$currentUser.uid}&emsp;
		<button type="button" on:click={logout}>LOGOUT</button>
	{:else}
		<button type="button" on:click={login}>LOGIN :D</button>
	{/if}
</div>
<nav style="position:sticky;top:0">
	<a href="/">Home</a>
	<a href="/search">Search</a>
	<a href="/school/1">School 1</a>
	<a href="/school/2">School 2</a>
</nav>
<main>
	<slot />
</main>
