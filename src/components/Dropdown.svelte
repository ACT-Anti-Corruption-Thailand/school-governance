<script lang="ts">
	import {
		Listbox,
		ListboxButton,
		ListboxOptions,
		ListboxOption
	} from '@rgossiaux/svelte-headlessui';

	export let options: {
		value: string | number;
		label?: string | number;
	}[];
	export let selected_option = options[0];
</script>

<Listbox
	class="dropdown-root"
	value={selected_option}
	on:change={(e) => (selected_option = e.detail)}
>
	<ListboxButton class="dropdown-button">
		<span class="nobr">{selected_option.label ?? selected_option.value}</span>
		<img src="/chevrons/bottom.svg" alt="" width="24" height="24" loading="lazy" decoding="async" />
	</ListboxButton>
	<ListboxOptions class="dropdown-list">
		{#each options as option (option.value)}
			<ListboxOption value={option} class={({ active }) => (active ? 'active' : '')}>
				{option.label ?? option.value}
			</ListboxOption>
		{/each}
	</ListboxOptions>
</Listbox>

<style lang="scss">
	.nobr {
		white-space: nowrap;
	}

	:global(.dropdown-root) {
		position: relative;
	}

	:global(.dropdown-button) {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 4px 12px 4px 16px;
		gap: 8px;
		height: 32px;

		background: #ffffff;
		border: 1px solid #9daad5;
		border-radius: 30px;

		font-family: 'Mitr';
		font-weight: 500;
		font-size: 0.812rem;
		line-height: 125%;
		letter-spacing: 0.02em;
		color: #3c55ab;
	}

	:global(.dropdown-list) {
		position: absolute;
		top: 34px;
		margin: 0;
		width: 100%;

		display: flex;
		flex-direction: column;
		align-items: flex-start;
		padding: 0;

		background: #ffffff;
		border: 0.5px solid #9daad5;
		box-shadow: 0 0 4px rgba(12, 22, 107, 0.2);
		border-radius: 10px;

		list-style: none;
		overflow: hidden;
	}

	:global(.dropdown-list > li) {
		padding: 8px 16px;
		height: 32px;

		font-family: 'Mitr';
		font-weight: 500;
		font-size: 0.812rem;
		line-height: 125%;
		letter-spacing: 0.02em;
		color: #3c55ab;

		display: block;
		width: 100%;

		cursor: pointer;
		user-select: none;
	}

	:global(.dropdown-list > li.active) {
		background: #ced5ea;
	}
</style>
