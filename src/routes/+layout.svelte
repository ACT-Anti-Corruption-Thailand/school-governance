<script lang="ts">
	import 'styles/main.scss';

	import { onMount } from 'svelte';

	import Firebase from 'components/Firebase.svelte';
	import MainNav from 'components/Navbar.svelte';
	import CookieConsent from 'components/CookieConsent.svelte';
	import GoTop from 'components/GoTop.svelte';

	import { years, update_date } from 'stores/school';

	const fetchYears = () => {
		fetch(`/data/years.json`)
			.then((resp) => resp.json())
			.then((data) => {
				$years = data;
			});
	};

	const fetchUpdateDate = () => {
		fetch(`/data/update_date.json`)
			.then((resp) => resp.json())
			.then((data) => {
				$update_date = data;
			});
	};

	onMount(() => {
		if ($years === null) fetchYears();
		if ($update_date === null) fetchUpdateDate();
	});
</script>

<Firebase />
<MainNav />
<CookieConsent />
<main id="#main">
	<slot />
</main>
<GoTop />
