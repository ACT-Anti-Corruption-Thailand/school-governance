<script lang="ts">
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

<SchoolHeader pageData={{ name: 'คะแนนเฉลี่ย', color: '#FA7CC7' }}>
	<Dropdown options={DROPDOWN_DATA} bind:selectedOption={dropdown_choice} />
</SchoolHeader>
<p>
	Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo corporis, ratione, amet
	reprehenderit rerum voluptas sint veniam a exercitationem aliquam deserunt ipsa! Dolor ipsa
	quibusdam voluptatibus, iste earum quam quae.
</p>
