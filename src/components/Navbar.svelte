<script lang="ts">
	import { onMount } from 'svelte';
	import { scroll } from 'motion';
	import { signInAnonymously, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
	import { auth, currentUser } from 'stores/firebaseapp';
	import { navbar_show } from 'stores/navbar';

	import { page } from '$app/stores';
	let PAGE_BASE = $page.route.id?.split('/')[1];

	let show_when: 'not_top' | 'always' | 'scroll_up' =
		PAGE_BASE === '' ? 'not_top' : PAGE_BASE === 'search' ? 'always' : 'scroll_up';
	$navbar_show = show_when !== 'not_top';

	let show_menu = false;

	const ggProvider = new GoogleAuthProvider();
	const login = () => {
		if ($auth) {
			signInAnonymously($auth);
			// signInWithPopup($auth, ggProvider);
		}
	};

	const logout = () => {
		if ($auth) signOut($auth);
	};

	onMount(() => {
		scroll(({ y }) => {
			if (show_when === 'not_top') {
				if (y.progress !== 0 && $navbar_show === false) return ($navbar_show = true);
				if (y.progress === 0 && $navbar_show === true) return ($navbar_show = show_menu = false);
				return;
			}
			if (show_when === 'scroll_up') {
				if (y.velocity < 0 && $navbar_show === false) return ($navbar_show = true);
				if (y.velocity > 0 && $navbar_show === true) return ($navbar_show = show_menu = false);
				return;
			}
		});
	});

	$: {
		PAGE_BASE = $page.route.id?.split('/')[1];
		show_when = PAGE_BASE === '' ? 'not_top' : PAGE_BASE === 'search' ? 'always' : 'scroll_up';
		$navbar_show = show_when !== 'not_top';
	}
</script>

<nav class="f main-nav" class:show={$navbar_show}>
	<a href="#main" class="skip-link">Skip to main content</a>
	{#if PAGE_BASE === 'search'}
		<div class="nav-left">
			<button class="f jcc nav-btn" type="button" on:click={() => (show_menu = !show_menu)}>
				<img src="/icons/nav-search.svg" alt="ค้นหา" width="32" height="32" />
			</button>
		</div>
	{/if}
	<div class="nav-logo">
		<a href="/" on:click={() => (show_menu = false)}>
			<img src="/logo.svg" alt="" width="108" height="40" />
		</a>
	</div>
	<div class="f nav-right">
		{#if $currentUser}
			<img
				class="nav-profile"
				src={$currentUser.photoURL ?? '/anon.svg'}
				alt=""
				width="32"
				height="32"
			/>
		{/if}
		<button class="f jcc nav-btn" type="button" on:click={() => (show_menu = !show_menu)}>
			<img src="/icons/nav-ham.svg" alt="เปิดเมนู" width="32" height="32" />
		</button>
		<menu class="nav-menu" class:show={show_menu}>
			<li>
				<a href="/#information" on:click={() => (show_menu = false)}>
					<img src="/icons/question.svg" alt="" width="20" height="20" />
					<span>School Governance คืออะไร?</span>
				</a>
			</li>
			<li>
				<a href="/search" on:click={() => (show_menu = false)}>
					<img src="/icons/search.svg" alt="" width="20" height="20" />
					<span>ค้นหาโรงเรียน</span>
				</a>
			</li>
			<li>
				<a href="https://www.google.co.th/">
					<img src="/icons/chat.svg" alt="" width="20" height="20" />
					<span>ติดต่อเจ้าหน้าที่</span>
				</a>
			</li>
			<li class="nav-menu-last">
				{#if $currentUser}
					<button class="logged-in" type="button" on:click={logout}>
						<img src={$currentUser.photoURL ?? '/anon.svg'} alt="" width="24" height="24" />
						<span>Log out</span>
					</button>
				{:else}
					<button type="button" on:click={login}>Log in</button>
				{/if}
			</li>
		</menu>
	</div>
</nav>
{#if show_when !== 'not_top'}
	<div class="nav-compensate" />
{/if}

<style lang="scss">
	.main-nav {
		height: 48px;
		padding: 12px 16px;
		background: #3c55ab;

		position: fixed;
		top: 0;
		left: 0;
		width: 100%;

		transform: translateY(-100%);
		transition: transform 0.3s;

		&.show,
		&:focus-within {
			transform: translateY(0);
		}

		> .nav-left {
			margin-right: auto;
		}

		> .nav-right {
			margin-left: auto;
			gap: 8px;
		}
	}

	.nav-compensate {
		height: 48px;
	}

	.nav-logo {
		height: 100%;

		img {
			height: 100%;
			width: auto;
		}
	}

	.nav-menu {
		background: #3c55ab;
		list-style: none;

		position: absolute;
		margin: 0;
		left: 0;
		top: 48px;
		width: 100%;

		z-index: 16;

		display: none;
		&.show {
			display: initial;
		}

		> li {
			height: 44px;

			> :is(a, button) {
				display: flex;
				align-items: center;
				gap: 8px;
				height: inherit;
				padding: 0 16px;

				color: #fff;

				&:hover {
					background: #16338f;
				}
			}

			> a {
				text-decoration: none;
			}

			> button {
				width: 100%;
			}
		}
	}

	.nav-menu > .nav-menu-last {
		border-top: 1px #ffce4f solid;

		> button {
			font-weight: 500;
		}
	}

	.skip-link {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;

		&:focus,
		&:active {
			width: auto;
			height: auto;
			clip: auto;
			white-space: normal;
			background: #3c55ab;
			color: #fff;
			margin: unset;
		}
	}

	@media screen and (min-width: 992px) {
		.main-nav {
			height: 72px;
			padding: 16px 32px;
		}

		.nav-compensate {
			height: 72px;
		}

		.nav-profile,
		.nav-btn {
			display: none;
		}

		.nav-menu,
		.nav-menu.show {
			position: static;
			display: flex;
			gap: 16px;

			> li > :is(a, button) {
				border-radius: 99px;
			}

			> .nav-menu-last {
				border: none;
				background: unset;

				> button {
					border: 1px #ffce4f solid;

					&:hover {
						background: #16338f;
					}
				}
			}
		}
	}
</style>
