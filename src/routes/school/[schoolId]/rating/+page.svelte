<script lang="ts">
	import { years } from 'data/years.js';
	import SchoolHeader from 'components/school/SchoolHeader.svelte';
	import Dropdown from 'components/Dropdown.svelte';

	const DROPDOWN_DATA = years.map((y) => ({ label: y + 543, value: y }));

	let dropdown_choice = DROPDOWN_DATA[0];
</script>

<SchoolHeader pageData={{ name: 'คะแนนเฉลี่ย', color: '#FA7CC7' }}>
	<Dropdown options={DROPDOWN_DATA} bind:selected_option={dropdown_choice} />
</SchoolHeader>
<div class="desktop-margin">
	<p>
		Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo corporis, ratione, amet
		reprehenderit rerum voluptas sint veniam a exercitationem aliquam deserunt ipsa! Dolor ipsa
		quibusdam voluptatibus, iste earum quam quae.
	</p>
</div>

<style lang="scss">
	@media screen and (min-width: 768px) {
		.desktop-margin {
			width: 100%;
			max-width: 640px;
			margin: auto;
		}
	}
</style>
