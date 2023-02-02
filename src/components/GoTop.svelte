<script lang="ts">
	import { scroll } from 'motion';
	import { onMount } from 'svelte';

	import { page } from '$app/stores';
	$: is_school_page = $page.route.id?.split('/')?.[1] === 'school';
	$: is_school_comment_page = is_school_page && $page.route.id?.split('/')?.[3] === 'comments';

	let goTop = () => {};

	let show = false;
	onMount(() => {
		scroll(({ y }) => {
			if (y.current > y.containerLength && !show) return (show = true);
			if (y.current < y.containerLength && show) return (show = false);
		});

		goTop = () => {
			window.scrollTo({
				top: 0,
				left: 0,
				behavior: 'smooth'
			});
		};
	});
</script>

<button
	class="gotop"
	type="button"
	class:show
	aria-label="กลับด้านบน"
	on:click={goTop}
	class:school={is_school_page}
	class:school-comment={is_school_comment_page}
>
	<img src="/chevrons/gotop.svg" alt="" width="14" height="8" loading="lazy" decoding="async" />
</button>

<style lang="scss">
	.gotop {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;

		background: #3c55ab;
		box-shadow: 0px 1px 4px rgba(12, 22, 107, 0.2);
		border-radius: 20px;

		position: fixed;
		bottom: 16px;
		right: 16px;
		z-index: 16;

		pointer-events: none;
		transform: scale(0);
		transition: transform 0.3s;

		&.show {
			pointer-events: auto;
			transform: scale(1);
		}

		&.school {
			bottom: 80px;

			@media screen and (min-width: 768px) {
				bottom: 40px;
			}
		}

		&.school-comment {
			bottom: 132px;

			@media screen and (min-width: 768px) {
				bottom: 40px;
			}
		}

		@media screen and (min-width: 768px) {
			bottom: 40px;
			right: 40px;
		}
	}
</style>
