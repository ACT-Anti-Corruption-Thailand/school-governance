<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import Modal from 'components/Modal.svelte';

	const LOCALSTORAGE_COOKIE_KEY = 'cookieSetting';
	const LOCALSTORAGE_COOKIE_EXPIRE_AT_KEY = 'cookieSettingExpireAt';

	const COOKIT_OPTIONS = ['Functionality', 'Performance'] as const;
	const DAYS_TO_EXPIRE = 30;

	const initAnalytics = (options: Record<typeof COOKIT_OPTIONS[number], boolean>) => {
		// if (options.Functionality) {
		// enable functionality analytics
		// }
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

	const save = (all = false) => {
		const expiredAtMs = new Date().getTime() + DAYS_TO_EXPIRE * 24 * 60 * 60 * 1000;

		if (all) {
			selectedCookies.Functionality = true;
			selectedCookies.Performance = true;
		}

		localStorage.setItem(LOCALSTORAGE_COOKIE_KEY, JSON.stringify(selectedCookies));
		localStorage.setItem(LOCALSTORAGE_COOKIE_EXPIRE_AT_KEY, `${expiredAtMs}`);

		initAnalytics(selectedCookies);

		term_isopen = false;
		isShow = false;
	};

	let isShow = false;
	let term_isopen = false;
	$: if (term_isopen) {
		selectedCookies.Performance = false;
	}

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
		<p>เว็บไซต์นี้ใช้คุกกี้เพื่อเพิ่มประสิทธิภาพและประสบการณ์ที่ดีในการใช้งานเว็บไซต์</p>
		<div class="f cookie-action">
			<button
				class="readmore"
				type="button"
				on:click={() => {
					term_isopen = true;
				}}>อ่านรายละเอียด</button
			>
			<button class="accept" type="button" on:click={() => save(true)}>ยอมรับ</button>
		</div>
	</div>

	<Modal title="นโยบายข้อมูลส่วนบุคคลสำหรับการใช้คุกกี้" bind:isOpen={term_isopen}>
		<p class="modal-content">
			<strong>องค์กรต่อต้านคอร์รัปชัน (ประเทศไทย)</strong> มีความจำเป็นต้องใช้คุกกี้ในการทำงานหลายส่วนของเว็บไซต์เพื่อรับประกันการให้บริการของเว็บไซต์ที่จะอำนวยความสะดวกในการใช้บริการเว็บไซต์ของท่าน
			โดยองค์กรรับประกันว่าจะใช้คุกกี้เท่าที่จำเป็น และมีมาตรการรักษาความมั่นคงปลอดภัยของข้อมูลของท่านโดยสอดคล้องกับกฎหมายที่เกี่ยวข้อง
			และจะไม่เปิดเผยข้อมูลดังกล่าวให้แก่บุคคลอื่น เว้นแต่เป็นกรณีการใช้คุกกี้บางประเภทที่อาจดำเนินการโดยผู้ให้บริการภายนอก
			ทั้งนี้เมื่อท่านเข้าใช้บริการเว็บไซต์องค์กรจะถือว่าท่านรับทราบและตกลงนโยบายข้อมูลส่วนบุคคลฉบับนี้แล้ว
			โดยองค์กรสงวนสิทธิ์ในการปรับปรุงนโยบายฉบับนี้ตามแต่ละระยะเวลาที่องค์กรเห็นสมควร โดยองค์กรจะแจ้งให้ท่านทราบถึงการเปลี่ยนแปลงดังกล่าวผ่านทางเว็บไซต์นี้
		</p>

		<p class="modal-content">
			<strong>ประเภทและวัตถุประสงค์การใช้คุกกี้ขององค์กร</strong> องค์กรมีความจำเป็นต้องใช้คุกกี้หลายประเภทเพื่อจุดประสงค์ที่แตกต่างกันไป
			โดยแบ่งออกเป็น 2 ประเภท ดังต่อไปนี้
		</p>

		<ol class="modal-content modal-ol">
			<li>
				Strictly Necessary Cookies
				ซึ่งเป็นคุกกี้ประเภทที่มีความจำเป็นอย่างมากต่อการทำงานให้บริการของเว็บไซต์แก่ผู้ใช้บริการ
			</li>
			<li>
				Performance Cookies ซึ่งเป็นคุกกี้ประเภทที่ประเมินประสิทธิภาพในการทำงานแต่ละส่วนของเว็บไซต์
				ทั้งนี้คุกกี้ประเภทดังกล่าวอาจดำเนินการโดยผู้ให้บริการภายนอก
			</li>
		</ol>

		<p class="modal-content">
			สำหรับคุกกี้ประเภทอื่นนอกเหนือจาก Strictly Necessary Cookies หากได้รับความยินยอมจากท่าน
			องค์กรจะใช้คุกกี้ดังกล่าวเพื่อวัตถุประสงค์เฉพาะที่ได้ระบุไว้<br />
			ทั้งนี้องค์กรใช้โปรแกรม Plausible และ Clarity ในการเก็บข้อมูลการใช้บริการเว็บไซต์ของท่าน
		</p>

		<p class="modal-content">
			<strong>สิทธิของเจ้าของข้อมูล</strong> องค์กรรับทราบ และเคารพสิทธิของท่านในฐานะเจ้าของข้อมูลตามกฎหมาย
			โดยเฉพาะสิทธิถอนความยินยอมได้ทางหน้าเว็บไซต์ และท่านสามารถลบการตั้งค่าคุกกี้บน Browser ของตนเองได้เช่นกัน
			หรือหากมีข้อสงสัยสามารถติดต่อได้ที่: อีเมล privacy@punchup.world
		</p>

		<hr class="cookie-line" />

		<div class="custom-control cookie-label">
			<input type="checkbox" bind:checked={selectedCookies.Functionality} disabled />
			<span>Strictly Necessary Cookies</span>
		</div>

		<label class="custom-control cookie-label">
			<input type="checkbox" bind:checked={selectedCookies.Performance} />
			<span>Performance Cookies</span>
		</label>

		<div class="f">
			<button class="cookie-modal-btn" type="button" on:click={() => save()}
				>บันทึกการตั้งค่า</button
			>
			<button class="cookie-modal-btn accept" type="button" on:click={() => save(true)}
				>ยอมรับทั้งหมด</button
			>
		</div>
	</Modal>
{/if}

<style lang="scss">
	.cookie-consent {
		position: fixed;
		inset: 0;
		top: unset;
		z-index: 17;

		@media screen and (min-width: 768px) {
			inset: 0 25%;
			top: unset;
		}

		padding: 16px 24px;
		background: #6bc9ff;
		box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.2);
		border-radius: 16px 16px 0 0;

		color: #0c166b;
	}

	.cookie-action {
		justify-content: space-between;
	}

	.readmore {
		text-decoration: underline;
	}

	.modal-content {
		margin-bottom: 8px;
	}

	.modal-ol {
		padding-left: 16px;
	}

	.cookie-modal-btn {
		box-shadow: 0 1px 4px rgb(12 22 107 / 20%);
		border-radius: 20px;
		padding: 4px 12px;
		border: 1px #3c55ab solid;

		&:hover {
			background: #3c55ab;
			color: #fff;
		}
	}

	.accept {
		color: #ffce4f;
		padding: 8px 16px;
		background: #0c166b;
		border-radius: 20px;

		&:hover {
			color: #ffce4f;
			background: #0c166b;
		}
	}

	.cookie-line {
		border: none;
		border-top: 1px #3c55ab solid;
		margin-bottom: 16px;
	}

	.cookie-label {
		display: block;
		margin-bottom: 8px;
		cursor: pointer;
	}

	.f {
		justify-content: space-between;
	}

	.custom-control > input[type='checkbox'] {
		position: absolute;
		opacity: 0;
		width: 0;
		pointer-events: none;

		+ span {
			display: flex;
			align-items: center;

			&::before {
				content: '';
				width: 16px;
				height: 16px;
				background: url(/icons/checkbox-unchecked-b.svg);
				display: inline-block;
				margin-right: 8px;
			}
		}

		&:checked + span::before {
			background: url(/icons/checkbox-checked-b.svg);
		}

		&:disabled:checked + span::before {
			background: url(/icons/checkbox-checked-g.svg);
		}
	}
</style>
