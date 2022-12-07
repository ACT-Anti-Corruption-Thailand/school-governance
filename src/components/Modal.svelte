<script lang="ts">
	import {
		Dialog,
		DialogOverlay,
		DialogTitle,
		DialogDescription
	} from '@rgossiaux/svelte-headlessui';

	export let title: string;
	export let description = '';
	export let isOpen = true;
</script>

<Dialog open={isOpen} on:close={() => (isOpen = false)}>
	<DialogOverlay class="modal-backdrop" />
	<DialogDescription>{description}</DialogDescription>

	<div class="modal-box">
		<header class="f modal-header">
			<button type="button" class="f" on:click={() => (isOpen = false)}>
				<img src="/close.svg" alt="ปิด" width="32" height="32" />
			</button>
			<slot name="title">
				<DialogTitle class="modal-title">{title}</DialogTitle>
			</slot>
		</header>
		<div class="modal-content">
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

		position: absolute;
		inset: 0;
		z-index: 20;

		@media screen and (min-width: 992px) {
			box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
			border-radius: 8px;

			inset: unset;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			width: 480px;
			max-height: 600px;

			overflow: hidden auto;
		}
	}

	.modal-header {
		background: #fff;

		gap: 8px;
		padding: 16px;

		position: sticky;
		top: 0;
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
</style>
