<script lang="ts">
	import { page } from '$app/stores';

	import { currentSchoolId } from 'stores/school';

	$: PAGE_BASE = $page.route.id?.split('/')[3] ?? '';
</script>

<div class="nav-compensate" />
<nav class="f school-nav" aria-label="School Navigation">
	<a class="f nav-menu" class:active={PAGE_BASE === ''} href="/school/{$currentSchoolId}/">
		<svg class="home-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"
			><path
				stroke="currentColor"
				stroke-linejoin="round"
				stroke-width="1.5"
				fill-rule="evenodd"
				d="M10 1L5 5.6V9H2a1 1 0 00-1 1v7a1 1 0 001 1h16a1 1 0 001-1v-7a1 1 0 00-1-1h-3V5.6L10 1z"
				clip-rule="evenodd"
			/><path
				class="clock"
				stroke="currentColor"
				stroke-linejoin="round"
				stroke-width="1.5"
				fill="#fff"
				d="M10 11a2 2 0 100-4 2 2 0 000 4z"
			/></svg
		>
		<span>โรงเรียน</span>
	</a>
	<a class="f nav-menu" class:active={PAGE_BASE === 'data'} href="/school/{$currentSchoolId}/data">
		<svg class="data-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"
			><path
				stroke="currentColor"
				stroke-linejoin="round"
				stroke-width="1.5"
				d="M18 2h-5.333v5H7.333v5H2v6h16V2z"
			/></svg
		>
		<span>ข้อมูล</span>
	</a>
	<a
		class="f nav-menu"
		class:active={PAGE_BASE === 'rating'}
		href="/school/{$currentSchoolId}/rating"
	>
		<svg class="rating-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"
			><path
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="1.5"
				d="M10 1.667l2.575 5.216 5.759.842-4.167 4.058.983 5.734L10 14.808l-5.15 2.709.984-5.734-4.167-4.058 5.758-.842L10 1.667z"
			/></svg
		>
		<span>คะแนน</span>
	</a>
	<a
		class="f nav-menu"
		class:active={PAGE_BASE === 'comments'}
		href="/school/{$currentSchoolId}/comments"
	>
		<svg class="comments-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"
			><path
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="1.5"
				d="M17.5 9.583a6.983 6.983 0 01-.75 3.167 7.084 7.084 0 01-6.333 3.917 6.983 6.983 0 01-3.167-.75L2.5 17.5l1.583-4.75a6.983 6.983 0 01-.75-3.167A7.083 7.083 0 017.25 3.25a6.983 6.983 0 013.167-.75h.416A7.067 7.067 0 0117.5 9.167v.416z"
			/></svg
		>
		<span>ความเห็น</span>
	</a>
	<a
		class="f nav-menu"
		class:active={PAGE_BASE === 'notice'}
		href="/school/{$currentSchoolId}/notice"
	>
		<svg class="notice-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"
			><path
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="1.5"
				d="M10 14.167h.008M10 7.5v4M8.575 3.217L1.516 15a1.666 1.666 0 001.425 2.5h14.117a1.667 1.667 0 001.425-2.5L11.425 3.217a1.667 1.667 0 00-2.85 0v0z"
			/><path
				class="exclaim"
				fill="none"
				fill-rule="evenodd"
				d="M10 5.75c-.737 0-1.25.549-1.25 1.125v4.25c0 .576.513 1.125 1.25 1.125s1.25-.549 1.25-1.125v-4.25c0-.576-.513-1.125-1.25-1.125zm-.008 8c-.683 0-1.242.557-1.242 1.25s.559 1.25 1.242 1.25h.016c.683 0 1.242-.557 1.242-1.25s-.559-1.25-1.242-1.25h-.016z"
				clip-rule="evenodd"
			/></svg
		>
		<span>ประกาศ</span>
	</a>
</nav>

<style lang="scss">
	.nav-compensate {
		height: 64px;
	}

	.school-nav {
		position: fixed;
		inset: 0;
		top: unset;
		height: 64px;

		z-index: 8;

		background: #fff;
		box-shadow: 0 -2px 5px rgba(12, 22, 107, 0.2);

		justify-content: space-around;

		@media screen and (min-width: 412px) {
			justify-content: center;
			gap: 32px;
		}
	}

	.nav-menu {
		flex-direction: column;
		color: #9daad5;
		text-decoration: none;
		font-size: 0.625rem;
		line-height: 1.3;
		gap: 4px;

		> svg {
			width: 20px;
			height: 20px;
		}

		&.active {
			color: #3c55ab;

			> svg {
				fill: currentColor;

				&.home-icon {
					.clock {
						stroke: none;
					}
				}

				&.data-icon {
					color: #ffce4f;
				}

				&.rating-icon {
					color: #fa7cc7;
				}

				&.comments-icon {
					color: #6bc9ff;
				}

				&.notice-icon {
					color: #fc5858;

					.exclaim {
						fill: #fff;
					}
				}
			}
		}
	}

	@media screen and (min-width: 768px) {
		.nav-compensate {
			display: none;
		}
		.school-nav {
			flex-direction: column;
			inset: 0;
			top: var(--navbar-height);
			right: unset;
			transition: top 0.3s;
			will-change: top;

			width: 64px;
			height: unset;
		}
	}
</style>
