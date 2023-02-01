<script lang="ts">
	import { onDestroy, onMount, tick } from 'svelte';

	export let comment: string;

	let el_comment_text: HTMLParagraphElement;
	let has_large_text = false;
	let unclamp = false;

	const calculateReadmore = () => {
		has_large_text = false;

		requestAnimationFrame(() => {
			const { height } = el_comment_text.getBoundingClientRect();
			const is_desktop = window.matchMedia('(min-width: 768px)').matches;

			// เช็คก่อนว่า ตอน 11 แถวมันกว้างกว่า 10 แถวหรือเปล่า
			// ถ้ากว้างกว่า ก็แปลว่ามันยาวเกิน 10 แถวจริงๆ ไม่ใช่ 10 แถวพอดี
			if (is_desktop) {
				if (height > 240) {
					has_large_text = true;
				}
			} else {
				if (height > 195) {
					has_large_text = true;
				}
			}
		});
	};

	onMount(() => {
		calculateReadmore();

		window.addEventListener('resize', calculateReadmore);
		window.addEventListener('orientationchange', calculateReadmore);
	});

	onDestroy(() => {
		window.removeEventListener('resize', calculateReadmore);
		window.removeEventListener('orientationchange', calculateReadmore);
	});

	const readmore = () => {
		unclamp = true;
	};
</script>

<!-- 240 195 -->

<p bind:this={el_comment_text} class="comment-text" class:clamp10={has_large_text} class:unclamp>
	{comment}
</p>
{#if has_large_text && !unclamp}
	<button class="comment-small" type="button" on:click={readmore}>...อ่านเพิ่มเติม</button>
{/if}

<style lang="scss">
	.comment-text {
		display: -webkit-box;
		-webkit-line-clamp: 11;
		-webkit-box-orient: vertical;
		overflow: hidden;
		position: relative;

		&.clamp10 {
			-webkit-line-clamp: 10;
		}

		&.unclamp {
			display: block;
			-webkit-line-clamp: unset;
			-webkit-box-orient: unset;
		}
	}

	.comment-small {
		font-size: 0.625rem;
		color: #9daad5;
		text-decoration: underline;

		@media screen and (min-width: 768px) {
			font-size: 0.8125rem;
		}
	}
</style>
