<script lang="ts">
	import { PUBLIC_DATA_HOST } from '$env/static/public';
	import 'styles/main.scss';

	import { onMount } from 'svelte';

	import Firebase from 'components/Firebase.svelte';
	import MainNav from 'components/Navbar.svelte';
	import CookieConsent from 'components/CookieConsent.svelte';
	import GoTop from 'components/GoTop.svelte';

	import { data_years } from 'stores/school';

	const LOCALSTORAGE_SCHOOL_DATA_YEARS = 'schoolDataYears';

	const fetchYearsData = () => {
		fetch(`${PUBLIC_DATA_HOST}/years_data.json`)
			.then((resp) => resp.json())
			.then((data) => {
				$data_years = data;
				localStorage.setItem(LOCALSTORAGE_SCHOOL_DATA_YEARS, JSON.stringify(data));
			});
	};

	onMount(() => {
		const localStorageSchoolDataYears = localStorage.getItem(LOCALSTORAGE_SCHOOL_DATA_YEARS);
		if (localStorageSchoolDataYears) {
			const parsed = JSON.parse(localStorageSchoolDataYears);
			// migration guard to new api, can remove when publicly announced
			if (['undefined', 'number'].includes(typeof parsed?.[0])) $data_years = parsed;
		}
		fetchYearsData();
	});
</script>

<Firebase />
<MainNav />
<CookieConsent />
<main id="#main">
	<slot />
</main>
<GoTop />
