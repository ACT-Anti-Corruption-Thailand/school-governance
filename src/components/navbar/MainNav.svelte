<script lang="ts">
	import { onMount } from 'svelte';
	import { scroll } from 'motion';
	import { signInAnonymously, signOut } from 'firebase/auth';
	import { auth, currentUser } from 'stores/firebaseapp';

	import { page } from '$app/stores';
	let PAGE_BASE = $page.route.id?.split('/')[1];
	let mode: 'show_on_scroll' | 'fixed' | 'static' =
		PAGE_BASE === '' ? 'show_on_scroll' : PAGE_BASE === 'search' ? 'fixed' : 'static';
	let show = mode !== 'show_on_scroll';

	let show_menu = false;

	const login = () => {
		if ($auth) signInAnonymously($auth);
	};

	const logout = () => {
		if ($auth) signOut($auth);
	};

	onMount(() => {
		scroll(({ y }) => {
			if (mode === 'show_on_scroll' && y.progress !== 0 && show === false) return (show = true);
			if (mode === 'show_on_scroll' && y.progress === 0 && show === true)
				return (show = show_menu = false);
		});
	});

	$: {
		PAGE_BASE = $page.route.id?.split('/')[1];
		mode = PAGE_BASE === '' ? 'show_on_scroll' : PAGE_BASE === 'search' ? 'fixed' : 'static';
		show = mode !== 'show_on_scroll';
	}
</script>

<nav class="main-nav" class:show class:static={mode === 'static'}>
	<a href="#main" class="skip-link">Skip to main content</a>
	<div class="nav-left">
		<a href="/" on:click={() => (show_menu = false)}>
			<img src="/facebook.svg" alt="" width="24" height="24" />
		</a>
	</div>
	<div class="nav-center">LOGO?</div>
	<div class="nav-right">
		<button type="button" on:click={() => (show_menu = !show_menu)}>Ham</button>
	</div>
	{#if show_menu}
		<ul class="nav-menu">
			<li>
				<a href="/" on:click={() => (show_menu = false)}>
					<span>School Governance คืออะไร?</span>
				</a>
			</li>
			<li>
				<a href="/search" on:click={() => (show_menu = false)}>
					<img src="/facebook.svg" alt="" width="24" height="24" />
					<span>ค้นหาโรงเรียน</span>
				</a>
			</li>
			<li>
				<a href="#a">
					<img src="/facebook.svg" alt="" width="24" height="24" />
					<span>ติดต่อเจ้าหน้าที่</span>
				</a>
			</li>
			{#if $currentUser}
				<li class="nav-menu-last bordered static">
					<span>
						{#if $currentUser.providerId === 'facebook.com'}
							<img src="/facebook.svg" alt="" width="28" height="28" />
						{:else if $currentUser.providerId === 'twitter.com'}
							<img src="/twitter.svg" alt="" width="28" height="28" />
						{:else}
							<img src="/anon.svg" alt="" width="28" height="28" />
						{/if}
						{$currentUser.uid}
					</span>
				</li>
				<li class="nav-menu-last">
					<button type="button" on:click={logout}>Log out</button>
				</li>
			{:else}
				<li class="nav-menu-last bordered">
					<button type="button" on:click={login}>Log in</button>
				</li>
			{/if}
		</ul>
	{/if}
</nav>
{#if mode === 'fixed'}
	<div style="height:36px" />
{/if}

<style lang="scss">
	.main-nav {
		display: none;
		align-items: center;

		height: 36px;
		padding: 8px 16px;
		background: #3c55ab;

		position: fixed;
		top: 0;
		left: 0;
		width: 100%;

		&.static {
			position: static;
		}

		&.show {
			display: flex;
		}

		> .nav-left {
			margin-right: auto;
		}

		> .nav-right {
			margin-left: auto;
		}
	}

	.nav-menu {
		background: #3c55ab;
		list-style: none;

		position: absolute;
		margin: 0;
		left: 0;
		top: 36px;
		width: 100%;

		z-index: 16;

		> li {
			height: 36px;

			> :is(a, button, span) {
				display: flex;
				align-items: center;
				gap: 8px;
				height: inherit;
				padding: 0 16px;

				color: #fff;
				font-family: inherit;
				font-size: inherit;
				line-height: inherit;
			}

			> :is(a, button) {
				cursor: pointer;

				&:hover {
					background: #4663c2;
				}
			}

			> a {
				text-decoration: none;
			}

			> button {
				border: none;
				background: unset;
				width: 100%;
			}
		}
	}

	.nav-menu-last {
		background: #163095;

		&.bordered {
			border-top: 1px #3c55ab dashed;
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
			// position: static;
			width: auto;
			height: auto;
			// overflow: visible;
			clip: auto;
			white-space: normal;
			background: #3c55ab;
			color: #fff;
			margin: unset;
		}
	}
</style>
