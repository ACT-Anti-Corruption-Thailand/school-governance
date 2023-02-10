<script lang="ts">
	import { PUBLIC_DATA_HOST } from '$env/static/public';
	import 'styles/main.scss';

	import { onMount } from 'svelte';

	import Firebase from 'components/Firebase.svelte';
	import MainNav from 'components/Navbar.svelte';
	import CookieConsent from 'components/CookieConsent.svelte';
	import GoTop from 'components/GoTop.svelte';

	import { years, update_date } from 'stores/school';

	const LOCALSTORAGE_SCHOOL_DATA_YEARS = 'schoolDataYears';
	const LOCALSTORAGE_SCHOOL_DATA_UPDATE_DATE = 'schoolDataUpdateDate';

	const fetchYearsData = () => {
		fetch(`${PUBLIC_DATA_HOST}/data/years_data.json`)
			.then((resp) => resp.json())
			.then((data) => {
				[{ year: 2022, update_date: '26/1/2566' }];
				const y = data.map((e: any) => e.year);
				const ud = Object.fromEntries(data.map((e: any) => [e.year, e.update_date]));
				$years = y;
				$update_date = ud;
				localStorage.setItem(LOCALSTORAGE_SCHOOL_DATA_YEARS, JSON.stringify(y));
				localStorage.setItem(LOCALSTORAGE_SCHOOL_DATA_UPDATE_DATE, JSON.stringify(ud));
			});
	};

	onMount(() => {
		const localStorageSchoolDataYears = localStorage.getItem(LOCALSTORAGE_SCHOOL_DATA_YEARS);
		const localStorageSchoolDataUpdateDate = localStorage.getItem(
			LOCALSTORAGE_SCHOOL_DATA_UPDATE_DATE
		);

		if (localStorageSchoolDataYears && localStorageSchoolDataUpdateDate) {
			$years = JSON.parse(localStorageSchoolDataYears);
			$update_date = JSON.parse(localStorageSchoolDataUpdateDate);
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
