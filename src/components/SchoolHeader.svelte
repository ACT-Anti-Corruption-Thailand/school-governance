<script lang="ts">
	import { page } from '$app/stores';

	import { currentSchool, currentSchoolId } from 'stores/school';

	export let pageData: {
		name: string;
		color: string;
	} | null = null;

	const updateData = (schoolId: number) => {
		$currentSchoolId = schoolId;
		fetch(`/data/schools/${$page.params.schoolId}.json`)
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
		<div class="f header-score">
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" width="16" height="16"
				><path
					fill="#FA7CC7"
					stroke="#FA7CC7"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="1.5"
					d="M10 1.667l2.575 5.216 5.759.842-4.167 4.058.983 5.734L10 14.808l-5.15 2.709.984-5.734-4.167-4.058 5.758-.842L10 1.667z"
				/></svg
			>
			<span class="header-score-text more-right-space">3.2</span>
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" width="16" height="16"
				><path
					fill="#6BC9FF"
					stroke="#6BC9FF"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="1.5"
					d="M17.5 9.583a6.983 6.983 0 01-.75 3.167 7.084 7.084 0 01-6.333 3.917 6.983 6.983 0 01-3.167-.75L2.5 17.5l1.583-4.75a6.983 6.983 0 01-.75-3.167A7.083 7.083 0 017.25 3.25a6.983 6.983 0 013.167-.75h.416A7.067 7.067 0 0117.5 9.167v.416z"
				/></svg
			>
			<span class="header-score-text">50</span>
		</div>
	</slot>
</header>

<style lang="scss">
	.school-header {
		justify-content: space-between;

		box-shadow: 0px 1px 4px rgba(12, 22, 107, 0.2);
		background: #fff;
		padding: 12px 16px;

		position: sticky;
		top: var(--navbar-height);
		transition: top 0.3s;
		will-change: top;
		z-index: 10;

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

	.header-score {
		gap: 4px;

		> .header-score-text {
			font-family: 'Mitr';
			font-weight: 500;
			line-height: 1.25;
			text-align: center;
			letter-spacing: 0.02em;
			color: #3c55ab;

			&.more-right-space {
				margin-right: 4px;
			}
		}
	}
</style>
