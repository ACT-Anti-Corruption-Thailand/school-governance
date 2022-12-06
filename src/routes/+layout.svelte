<script lang="ts">
	import 'styles/main.scss';

	import Firebase from 'components/Firebase.svelte';
	import MainNav from 'components/Navbar.svelte';
	import CookieConsent from 'components/CookieConsent.svelte';
	import GoTop from 'components/GoTop.svelte';
</script>

<Firebase />
<MainNav />
<CookieConsent />
<main id="#main">
	<slot />
</main>
<GoTop />
