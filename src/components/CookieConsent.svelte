<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	const LOCALSTORAGE_COOKIE_KEY = 'cookieSetting';
	const LOCALSTORAGE_COOKIE_EXPIRE_AT_KEY = 'cookieSettingExpireAt';

	const COOKIT_OPTIONS = ['Functionality', 'Performance'] as const;
	const DAYS_TO_EXPIRE = 30;

	const initAnalytics = (options: Record<typeof COOKIT_OPTIONS[number], boolean>) => {
		if (options.Functionality) {
			// enable functionality analytics
		}
		if (options.Performance) {
			// enable performance analytics
		}
	};

	let selectedCookies: Record<typeof COOKIT_OPTIONS[number], boolean> = {
		Functionality: true,
		Performance: true
	};

	// function createCookieSetting<T extends boolean>(
	// 	value: T
	// ): Record<typeof COOKIT_OPTIONS[number], T> | {} {
	// 	return COOKIT_OPTIONS.length
	// 		? COOKIT_OPTIONS.reduce(
	// 				(obj, option) => ({
	// 					...obj,
	// 					[option]: value
	// 				}),
	// 				{}
	// 		  )
	// 		: {};
	// }

	// function openSetting() {
	// 	selectedCookies = createCookieSetting(false);
	// 	isSettingOpen = true;
	// }

	const save = () => {
		const expiredAtMs = new Date().getTime() + DAYS_TO_EXPIRE * 24 * 60 * 60 * 1000;

		localStorage.setItem(LOCALSTORAGE_COOKIE_KEY, JSON.stringify(selectedCookies));
		localStorage.setItem(LOCALSTORAGE_COOKIE_EXPIRE_AT_KEY, `${expiredAtMs}`);

		initAnalytics(selectedCookies);

		isShow = false;
	};

	let isShow = false;
	// let isSettingOpen = false;

	onMount(() => {
		const localStorageCookieSetting = localStorage.getItem(LOCALSTORAGE_COOKIE_KEY);
		const localStorageCookieExpireAt = localStorage.getItem(LOCALSTORAGE_COOKIE_EXPIRE_AT_KEY);

		if (
			localStorageCookieSetting &&
			localStorageCookieExpireAt &&
			new Date().getTime() < new Date(+localStorageCookieExpireAt).getTime()
		)
			initAnalytics(JSON.parse(localStorageCookieSetting));
		else {
			localStorage.removeItem(LOCALSTORAGE_COOKIE_KEY);
			localStorage.removeItem(LOCALSTORAGE_COOKIE_EXPIRE_AT_KEY);
			isShow = true;
		}
	});
</script>

{#if isShow}
	<div class="cookie-consent" transition:fly={{ y: 100, duration: 500 }}>
		<p>We care about your data, and we'd love to use cookies to make your experience better.</p>
		<div class="f cookie-action">
			<button class="readmore" type="button">อ่านเพิ่มเติม</button>
			<button class="accept" type="button" on:click={save}>ยอมรับ</button>
		</div>
	</div>
{/if}

<style lang="scss">
	.cookie-consent {
		position: fixed;
		inset: 0;
		top: unset;
		z-index: 16;

		@media screen and (min-width: 768px) {
			inset: 0 25%;
			top: unset;
		}

		padding: 16px 24px;
		background: #6bc9ff;
		box-shadow: 0px -2px 5px rgba(0, 0, 0, 0.2);
		border-radius: 16px 16px 0px 0px;

		color: #0c166b;
	}

	.cookie-action {
		justify-content: space-between;
	}

	.readmore {
		text-decoration: underline;
	}

	.accept {
		color: #ffce4f;
		padding: 8px 16px;
		background: #0c166b;
		border-radius: 20px;
	}
</style>
