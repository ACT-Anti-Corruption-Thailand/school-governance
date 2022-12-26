<script lang="ts">
	import {
		Listbox,
		ListboxButton,
		ListboxOptions,
		ListboxOption
	} from '@rgossiaux/svelte-headlessui';
	import { createEventDispatcher } from 'svelte';

	export let options: string[];
	export let selected_option = options[0];

	const dispatch = createEventDispatcher();

	const setOption = (option: string) => {
		selected_option = option;
		dispatch('change', option);
	};
</script>

<Listbox
	class="province-dropdown-root"
	value={selected_option}
	on:change={(e) => setOption(e.detail)}
>
	<ListboxButton class="f province-dropdown-button">
		<span>{selected_option}</span>
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="24" height="24"
			><path
				stroke="#3C55AB"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M6 9l6 6 6-6"
			/></svg
		>
	</ListboxButton>
	<ListboxOptions class="province-dropdown-list">
		{#each options as option (option)}
			<ListboxOption value={option} class={({ active }) => (active ? 'active' : '')}>
				{option}
			</ListboxOption>
		{/each}
	</ListboxOptions>
</Listbox>

<style lang="scss">
	:global(.province-dropdown-root) {
		position: relative;
	}

	:global(.province-dropdown-button) {
		flex-direction: row;
		justify-content: space-between;
		padding: 0 12px 0 16px;
		gap: 8px;
		width: 100%;
		height: 40px;

		background: #fff;
		box-shadow: 0px 0px 4px rgba(12, 22, 107, 0.2);
		border-radius: 24px;

		color: #3c55ab;
	}

	:global(.province-dropdown-button[aria-expanded='true'] > svg) {
		transform: rotate(180deg);
	}

	:global(.province-dropdown-list) {
		position: absolute;
		top: 44px;
		margin: 0;
		width: 100%;
		height: 80vh;

		display: flex;
		align-items: flex-start;
		flex-direction: column;
		padding: 0;

		background: #fff;
		box-shadow: 0px 0px 4px rgba(12, 22, 107, 0.2);
		border-radius: 8px;

		list-style: none;
		overflow: hidden auto;

		color: #3c55ab;
	}

	:global(.province-dropdown-list > li) {
		padding: 0 16px;
		height: 40px;
		width: 100%;

		flex: 0 0 40px;
		display: flex;
		align-items: center;

		cursor: pointer;
		user-select: none;
	}

	:global(.province-dropdown-list > li.active) {
		background: #ecf7f7;
	}
</style>
