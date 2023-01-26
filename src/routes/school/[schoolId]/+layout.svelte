<script lang="ts">
	import { page } from '$app/stores';
	import SchoolNav from 'components/school/SchoolNav.svelte';
	import { currentSchool, currentSchoolId, LATEST_YEAR } from 'stores/school';

	const updateData = (schoolId: number) => {
		$currentSchoolId = schoolId;
		fetch(`/data/${$LATEST_YEAR}/${$page.params.schoolId}.json`)
			.then((resp) => resp.json())
			.then((data) => ($currentSchool = data));
	};

	$: if ($LATEST_YEAR && $currentSchoolId !== +$page.params.schoolId)
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
