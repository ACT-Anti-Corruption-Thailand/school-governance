<script lang="ts">
	import 'styles/main.scss';

	import Firebase from 'components/Firebase.svelte';
	import MainNav from 'components/Navbar.svelte';
	import CookieConsent from 'components/CookieConsent.svelte';
</script>

<Firebase />
<MainNav />
<CookieConsent />
<main id="#main">
	<slot />
	<section style="background:azure;height:100vh" />
</main>
