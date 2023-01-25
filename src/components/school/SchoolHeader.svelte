<script lang="ts">
	import { page } from '$app/stores';
	import { years } from 'data/years.js';
	import SchoolRating from 'components/SchoolMiniStats.svelte';
	import { currentSchool, currentSchoolId } from 'stores/school';

	const LATEST_YEAR = years[years.length - 1];

	export let pageData: {
		name: string;
		color: string;
	} | null = null;

	const updateData = (schoolId: number) => {
		$currentSchoolId = schoolId;
		fetch(`/data/${LATEST_YEAR}/${$page.params.schoolId}.json`)
			.then((resp) => resp.json())
			.then((data) => ($currentSchool = data));
	};

	$: if ($currentSchoolId !== +$page.params.schoolId) updateData(+$page.params.schoolId);
</script>

<header class="f school-header">
	<hgroup>
		<h1>{$currentSchool?.name_th ?? '(ไม่พบชื่อ)'}</h1>
		{#if pageData}
			<h2 style="color:{pageData.color}">{pageData.name}</h2>
		{:else if $currentSchool?.name_en}
			<p>{$currentSchool?.name_en}</p>
		{/if}
	</hgroup>
	<slot>
		<SchoolRating schoolId={$page.params.schoolId} />
	</slot>
</header>
<div class="school-header-compensate" />

<style lang="scss">
	.school-header-compensate,
	.school-header {
		height: 60px;
	}

	.school-header {
		justify-content: space-between;

		box-shadow: 0px 1px 4px rgba(12, 22, 107, 0.2);
		background: #fff;
		padding: 12px 16px;

		position: fixed;
		top: var(--navbar-height);
		transition: top 0.3s;
		will-change: top;
		z-index: 10;

		width: 100%;

		@media screen and (min-width: 768px) {
			width: calc(100% - 64px);
		}

		> hgroup {
			color: #3c55ab;

			> h1 {
				font-family: 'Mitr';
				font-weight: 700;
				font-size: 1rem;
				line-height: 1.25;
				letter-spacing: 0.02em;

				margin: 0;
			}

			> h2 {
				font-family: 'Mitr';
				font-weight: 500;
				font-size: 0.8125rem;
				line-height: 1.25;
				letter-spacing: 0.02em;

				margin: 0;
			}

			> p {
				font-size: 0.8125rem;
				line-height: 1.36;

				margin: 0;
			}
		}
	}
</style>
