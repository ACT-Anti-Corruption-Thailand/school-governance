<script lang="ts">
	import { page } from '$app/stores';
	import { years } from 'data/years.js';
	import SchoolNav from 'components/school/SchoolNav.svelte';
	import { currentSchool, currentSchoolId } from 'stores/school';

	const LATEST_YEAR = years[years.length - 1];

	const updateData = (schoolId: number) => {
		$currentSchoolId = schoolId;
		fetch(`/data/${LATEST_YEAR}/${$page.params.schoolId}.json`)
			.then((resp) => resp.json())
			.then((data) => ($currentSchool = data));
	};

	$: if ($currentSchoolId !== +$page.params.schoolId) updateData(+$page.params.schoolId);
</script>

<section class="school-container">
	<slot />
</section>
<SchoolNav />

<style lang="scss">
	.school-container {
		color: #3c55ab;
		font-size: 0.8125rem;
	}

	@media screen and (min-width: 768px) {
		.school-container {
			margin-left: 64px;
			font-size: 1rem;
		}
	}
</style>
