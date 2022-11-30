<script lang="ts">
	import 'styles/main.scss';

	import Firebase from 'components/firebase.svelte';
	import MainNav from 'components/Navbar.svelte';
</script>

<Firebase />
<MainNav />
<main id="#main">
	<slot />
	<section style="background:azure;height:100vh" />
</main>
