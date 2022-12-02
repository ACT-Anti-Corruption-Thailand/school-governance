<script lang="ts">
	import { page } from '$app/stores';

	import SchoolNav from 'components/SchoolNav.svelte';

	import { currentSchool, currentSchoolId } from 'stores/school';

	const updateData = (schoolId: number) => {
		$currentSchoolId = schoolId;
		fetch(`/data/schools/${$page.params.schoolId}.json`)
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
	@media screen and (min-width: 992px) {
		.school-container {
			margin-left: 64px;
		}
	}
</style>
