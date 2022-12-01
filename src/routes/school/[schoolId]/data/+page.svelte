<script lang="ts">
	import { currentSchool } from 'stores/school';
	import SchoolHeader from 'components/SchoolHeader.svelte';
	import Dropdown from 'components/Dropdown.svelte';

	const DROPDOWN_DATA = [
		{ value: '2565' },
		{ value: '2564' },
		{ value: '2563' },
		{ value: '2562' },
		{ value: '2561' }
	];

	let dropdown_choice = DROPDOWN_DATA[0];
</script>

<SchoolHeader pageData={{ name: 'ข้อมูลโรงเรียน', color: '#DDAB29' }}>
	<Dropdown options={DROPDOWN_DATA} bind:selectedOption={dropdown_choice} />
</SchoolHeader>
{#if $currentSchool}
	<div class="overflow">
		<pre>{JSON.stringify($currentSchool, null, 1)}</pre>
	</div>
{/if}

<style lang="scss">
	.overflow {
		overflow: scroll;
	}
</style>
