<script lang="ts">
	import { onMount } from 'svelte';
	import { scroll } from 'motion';
	import { signInAnonymously, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
	import { auth, currentUser } from 'stores/firebaseapp';
	import { show_search, search_string } from 'stores/search';

	import { page } from '$app/stores';
	let PAGE_BASE = $page.route.id?.split('/')[1];

	let show_when: 'not_top' | 'always' | 'scroll_up' =
		PAGE_BASE === '' ? 'not_top' : PAGE_BASE === 'search' ? 'always' : 'scroll_up';
	let show = show_when !== 'not_top';

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

	let is_mounted = false;
	onMount(() => {
		is_mounted = true;
		scroll(({ y }) => {
			if (show_when === 'not_top') {
				if (y.progress !== 0 && show === false) return (show = true);
				if (y.progress === 0 && show === true) return (show = show_menu = false);
				return;
			}
			if (show_when === 'scroll_up') {
				if (y.velocity < 0 && show === false) return (show = true);
				if (y.velocity > 0 && show === true) return (show = show_menu = false);
				return;
			}
		});
	});

	$: {
		PAGE_BASE = $page.route.id?.split('/')[1];
		show_when = PAGE_BASE === '' ? 'not_top' : PAGE_BASE === 'search' ? 'always' : 'scroll_up';
		show = show_when !== 'not_top';
	}

	$: if (is_mounted) {
		document.documentElement.classList.toggle('navbar-shown', show);
	}
</script>

<nav class="f main-nav" class:show class:show_search={$show_search}>
	<a href="#main" class="skip-link">Skip to main content</a>
	{#if PAGE_BASE === 'search'}
		<div class="nav-left">
			<button class="f jcc nav-btn" type="button" on:click={() => ($show_search = true)}>
				<img src="/icons/nav-search.svg" alt="ค้นหา" width="32" height="32" />
			</button>
		</div>
	{/if}
	<div class="nav-logo">
		<a href="/" on:click={() => (show_menu = false)}>
			<img src="/logo/school_gov.svg" alt="" width="108" height="40" />
		</a>
	</div>
	<div class="nav-right nav-search">
		<label class="f">
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="24" height="24"
				><path
					stroke="#9DAAD5"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35"
				/></svg
			>
			<input
				type="text"
				placeholder="พิมพ์ชื่อโรงเรียนหรือจังหวัดที่คุณอยากค้นหา"
				bind:value={$search_string}
			/>
		</label>
		<button
			class="f"
			type="button"
			on:click={() => {
				$show_search = false;
				$search_string = '';
			}}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 20 20"
				width="20"
				height="20"
				aria-label="ปิด"
				><path
					stroke="#3C55AB"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M14.667 5.333l-9.334 9.334M5.333 5.333l9.334 9.334"
				/></svg
			>
		</button>
	</div>
	<div class="f nav-right">
		{#if $currentUser}
			<img
				class="nav-profile"
				src={$currentUser.photoURL ?? '/icons/anon.svg'}
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
				{#if PAGE_BASE === 'search'}
					<button
						class="f jcc nav-btn search-btn"
						type="button"
						on:click={() => ($show_search = true)}
					>
						<img src="/icons/search.svg" alt="ค้นหา" width="20" height="20" />
						<span>ค้นหาโรงเรียน</span>
					</button>
				{:else}
					<a href="/search" on:click={() => (show_menu = false)}>
						<img src="/icons/search.svg" alt="" width="20" height="20" />
						<span>ค้นหาโรงเรียน</span>
					</a>
				{/if}
			</li>
			<li>
				<a href="/#information" on:click={() => (show_menu = false)}>
					<img src="/icons/question.svg" alt="" width="20" height="20" />
					<span>School Governance คืออะไร?</span>
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
						<img src={$currentUser.photoURL ?? '/icons/anon.svg'} alt="" width="24" height="24" />
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
		z-index: 12;

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

		> .nav-search {
			display: none;
		}

		&.show_search {
			> :not(.nav-search) {
				display: none;
			}

			> .nav-search {
				display: flex;
				align-items: center;

				background: #fff;
				box-shadow: 0px 0px 4px rgba(12, 22, 107, 0.2);
				border-radius: 30px;

				width: 100%;
				height: 40px;

				padding: 0 16px;

				> label {
					gap: 8px;
					flex: 1 1 0;

					> input {
						flex: 1 1 0;

						border: none;
						padding: 0;
						outline: none;

						height: 40px;
						font-size: 0.8125rem;
						font-family: inherit;
						color: #3c55ab;

						&::placeholder {
							color: #9daad5;
						}
					}
				}
			}
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

	@media screen and (min-width: 768px) {
		.main-nav {
			> .nav-left.nav-left.nav-left {
				display: none;
			}

			.nav-menu > li {
				> .nav-btn {
					justify-content: flex-start;
				}
			}

			&.show_search {
				> :not(.nav-search) {
					display: initial;
				}

				> .nav-right {
					display: flex;
				}

				> .nav-search {
					width: 50%;
				}
			}
		}
	}

	@media screen and (min-width: 992px) {
		.main-nav {
			height: 72px;
			padding: 16px 32px;

			&.show_search {
				> .nav-search {
					width: 40%;
				}

				.nav-menu > li {
					> a > span,
					> .nav-btn {
						display: none;
					}
				}
			}
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
