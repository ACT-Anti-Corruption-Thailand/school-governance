<script lang="ts">
	import { PUBLIC_DATA_HOST } from '$env/static/public';
	import { page } from '$app/stores';
	import SchoolNav from 'components/school/SchoolNav.svelte';
	import { currentSchool, currentSchoolId, data_years } from 'stores/school';

	const latest_year = $data_years[0].year;

	const updateData = (schoolId: number) => {
		$currentSchoolId = schoolId;
		fetch(`${PUBLIC_DATA_HOST}/${latest_year}/${$page.params.schoolId}.json`)
			.then((resp) => resp.json())
			.then((data) => ($currentSchool = data));
	};

	$: if (latest_year && $currentSchoolId !== +$page.params.schoolId)
		updateData(+$page.params.schoolId);
</script>

<section class="school-container">
	<slot />
</section>
<SchoolNav />

<style lang="scss">
	.school-container {
		color: #3c55ab;
		font-size: 0.8125rem;

		@media screen and (min-width: 768px) {
			margin-left: 64px;
			font-size: 1rem;
		}
	}
</style>
