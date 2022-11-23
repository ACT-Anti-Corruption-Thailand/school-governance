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
<nav>
	<div>
		{#if $currentUser}
			Current User is {$currentUser.uid}&emsp;
			<button type="button" on:click={logout}>LOGOUT</button>
		{:else}
			<button type="button" on:click={login}>LOGIN :D</button>
		{/if}
	</div>
	<div>
		<a href="/">Home</a>
		<a href="/search">Search</a>
		<a href="/school">School</a>
	</div>
</nav>
<main>
	<slot />
</main>
