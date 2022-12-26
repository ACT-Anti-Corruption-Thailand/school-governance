<script lang="ts">
	import { onMount } from 'svelte';
	import { inView } from 'motion';
	import { Lottie } from 'lottie-svelte';
	import type { AnimationEvent } from 'lottie-svelte/iface';

	export let src: string;

	let el: HTMLElement;
	let lottie_animation_controller: AnimationEvent['detail'];

	const lottieAnimationHandler = (event: AnimationEvent) => {
		lottie_animation_controller = event.detail;
	};

	onMount(() => {
		inView(
			el,
			() => {
				lottie_animation_controller?.play?.();
			},
			{
				amount: 0.5
			}
		);
	});
</script>

<div bind:this={el} {...$$restProps}>
	<Lottie path={src} loop={false} autoplay={false} on:animation={lottieAnimationHandler} />
</div>
