<script lang="ts">
	import { tick } from 'svelte';
	import { Dialog, DialogTitle, DialogDescription } from '@rgossiaux/svelte-headlessui';

	export let title: string;
	export let hideTitle = false;
	export let description = '';
	export let isOpen: boolean;
	export let body_class = '';
	export let onCloseCallback = () => {};
	export let boxWidth = '480px';
	export let boxHeight = '600px';
	export let disabled_close = false;

	$: closeFn = () => {
		if (disabled_close) return;
		isOpen = false;
		tick().then(onCloseCallback);
	};
</script>

<Dialog open={isOpen} on:close={closeFn}>
	<DialogDescription>{description}</DialogDescription>

	<div class="modal-box" style:--modal-box-width={boxWidth} style:--modal-box-height={boxHeight}>
		<header class="f modal-header" class:header-background={!hideTitle || $$slots.title}>
			<button type="button" class="f modal-closebtn" on:click={closeFn} disabled={disabled_close}>
				<img
					src="/icons/close.svg"
					alt="ปิด"
					width="32"
					height="32"
					loading="lazy"
					decoding="async"
				/>
			</button>
			<DialogTitle class="modal-title {hideTitle ? 'sr-only' : ''}">{title}</DialogTitle>
			<slot name="title" />
		</header>
		<div class="modal-content {body_class}">
			<slot />
		</div>
	</div>
</Dialog>

<style lang="scss">
	:global(.modal-backdrop) {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.4);
		backdrop-filter: blur(2px);

		z-index: 20;
	}

	.modal-box {
		background: #fff;
		color: #3c55ab;

		position: fixed;
		inset: 0;
		z-index: 20;

		overflow: hidden auto;

		@media screen and (min-width: 768px) {
			box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
			border-radius: 8px;

			inset: unset;
			left: calc(50% + 32px);
			top: 50%;
			transform: translate(-50%, -50%);
			width: var(--modal-box-width, 480px);
			max-height: min(90vh, var(--modal-box-height, 600px));
		}
	}

	.modal-header {
		gap: 8px;
		padding: 16px;

		position: sticky;
		top: 0;

		> button {
			background: #fff;
			border-radius: 8px;
		}

		&.header-background {
			background: #fff;
		}
	}

	:global(.modal-title) {
		font-family: 'Mitr';
		font-weight: 500;
		font-size: 1.25rem;
		line-height: 125%;
		letter-spacing: 0.02em;
	}

	.modal-content {
		padding: 0 16px 16px;
	}

	.modal-closebtn:disabled {
		cursor: not-allowed;
	}
</style>
