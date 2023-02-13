<script lang="ts">
	import { PUBLIC_API_HOST } from '$env/static/public';

	import { onMount } from 'svelte';

	import {
		QUIZ_QUESTIONS_DESC,
		QUIZ_QUESTIONS_TITLE,
		QUIZ_QUESTIONS_IMAGE
	} from 'data/quiz-questions';

	import Dropdown from 'components/Dropdown.svelte';
	import Modal from 'components/Modal.svelte';
	import SchoolHeader from 'components/school/SchoolHeader.svelte';
	import ScoreDiagram from 'components/school/ScoreDiagram.svelte';
	import { Lottie } from 'lottie-svelte';

	import { page } from '$app/stores';
	import { currentUser } from 'stores/firebaseapp';
	import { computed_years } from 'stores/school';
	import { login_modal_isopen } from 'stores/login_modal';

	$: schoolId = $page.params.schoolId;

	const DROPDOWN_DATA = $computed_years?.map((y) => ({ label: y + 543, value: y })) ?? [];
	let dropdown_choice = DROPDOWN_DATA[0];

	const METRIC_DROPDOWN = [
		{ label: 'ทุกสถานที่', value: 'all' },
		{ label: 'ห้องเรียน', value: 'classroom', icon: '/ratings/classroom.svg' },
		{ label: 'ห้องน้ำ', value: 'toilet', icon: '/ratings/toilet.svg' },
		{ label: 'โรงอาหาร', value: 'canteen', icon: '/ratings/canteen.svg' },
		{ label: 'สนามกีฬา', value: 'gym', icon: '/ratings/gym.svg' }
	];
	let metric_choice = METRIC_DROPDOWN[0];

	const DETAIL_DROPDOWN = [
		{ value: 'ห้องเรียน', icon: '/ratings/classroom.svg' },
		{ value: 'ห้องน้ำ', icon: '/ratings/toilet.svg' },
		{ value: 'โรงอาหาร', icon: '/ratings/canteen.svg' },
		{ value: 'สนามกีฬา', icon: '/ratings/gym.svg' }
	];
	let detail_choice = DETAIL_DROPDOWN[0];
	let detail_modal_isopen = false;
	let detail_modal_callback = () => {};

	let quiz_isopen = false;
	let quiz_onclose = () => {
		detail_modal_callback = () => {};
		quiz_location = null;
		quiz_rating_values = [0, 0, 0, 0, 0];
		quiz_current_step = 0;
	};

	let quiz_location: null | 'classroom' | 'toilet' | 'canteen' | 'gym' = null;
	type Rating = 0 | 1 | 2 | 3 | 4 | 5;
	let quiz_rating_values: [Rating, Rating, Rating, Rating, Rating] = [0, 0, 0, 0, 0];
	let quiz_current_step = 0;
	const location_thname = (name: string) => {
		return (
			{
				classroom: 'ห้องเรียน',
				toilet: 'ห้องน้ำ',
				canteen: 'โรงอาหาร',
				gym: 'สนามกีฬา'
			}[name] ?? name
		);
	};

	let quiz_display_avg = 0;
	let quiz_display_pleasure = 0;

	let quiz_classroom_done = false;
	let quiz_toilet_done = false;
	let quiz_canteen_done = false;
	let quiz_gym_done = false;

	let quizfinish_isopen = false;

	interface SchoolScoreData {
		countC1: number;
		countC2: number;
		countC3: number;
		countC4: number;
		countC5: number;
		countT1: number;
		countT2: number;
		countT3: number;
		countT4: number;
		countT5: number;
		countF1: number;
		countF2: number;
		countF3: number;
		countF4: number;
		countF5: number;
		countG1: number;
		countG2: number;
		countG3: number;
		countG4: number;
		countG5: number;
		sumF1: number;
		sumC1: number;
		sumF2: number;
		sumC2: number;
		sumC3: number;
		sumC4: number;
		sumF3: number;
		sumC5: number;
		sumF4: number;
		sumT1: number;
		sumF5: number;
		sumT2: number;
		sumT3: number;
		sumG1: number;
		sumT4: number;
		sumT5: number;
		sumG3: number;
		sumG4: number;
		sumG5: number;
		sumG2: number;
	}
	let school_data: SchoolScoreData;

	// Avg จะเกิดจากอันที่ไม่ใช่ 0 ก็เลย conv เป็น bool แล้วทำให้เป็น num (0 1) จะได้นับได้ว่ามีกี่ตัวที่ไม่ใช่ 0
	// วิธีการคิดแบบนี้ใช้กับตัวที่ cross-axis แบบ cleanliness, security, ... ด้วย
	let school_total_count = 0;

	let school_classroom_avg = 0;
	let school_toilet_avg = 0;
	let school_canteen_avg = 0;
	let school_gym_avg = 0;
	let school_total_avg = 0;

	let school_pleasure_classroom_avg = 0;
	let school_pleasure_toilet_avg = 0;
	let school_pleasure_canteen_avg = 0;
	let school_pleasure_gym_avg = 0;
	let school_total_pleasure_avg = 0;

	let school_enough_avg = 0;
	let school_beauty_avg = 0;
	let school_clean_avg = 0;
	let school_safe_avg = 0;
	$: if (metric_choice.value === 'all') {
		school_enough_avg =
			(+school_data?.sumC2 + +school_data?.sumT2 + +school_data?.sumF2 + +school_data?.sumG2) /
			(+school_data?.countC2 +
				+school_data?.countT2 +
				+school_data?.countF2 +
				+school_data?.countG2);
		school_beauty_avg =
			(+school_data?.sumC4 + +school_data?.sumT4 + +school_data?.sumF4 + +school_data?.sumG4) /
			(+school_data?.countC4 +
				+school_data?.countT4 +
				+school_data?.countF4 +
				+school_data?.countG4);
		school_clean_avg =
			(+school_data?.sumC1 + +school_data?.sumT1 + +school_data?.sumF1 + +school_data?.sumG1) /
			(+school_data?.countC1 +
				+school_data?.countT1 +
				+school_data?.countF1 +
				+school_data?.countG1);
		school_safe_avg =
			(+school_data?.sumC3 + +school_data?.sumT3 + +school_data?.sumF3 + +school_data?.sumG3) /
			(+school_data?.countC3 +
				+school_data?.countT3 +
				+school_data?.countF3 +
				+school_data?.countG3);
	} else if (metric_choice.value === 'classroom') {
		school_enough_avg = +school_data?.sumC2 / +school_data?.countC2;
		school_beauty_avg = +school_data?.sumC4 / +school_data?.countC4;
		school_clean_avg = +school_data?.sumC1 / +school_data?.countC1;
		school_safe_avg = +school_data?.sumC3 / +school_data?.countC3;
	} else if (metric_choice.value === 'toilet') {
		school_enough_avg = +school_data?.sumT2 / +school_data?.countT2;
		school_beauty_avg = +school_data?.sumT4 / +school_data?.countT4;
		school_clean_avg = +school_data?.sumT1 / +school_data?.countT1;
		school_safe_avg = +school_data?.sumT3 / +school_data?.countT3;
	} else if (metric_choice.value === 'canteen') {
		school_enough_avg = +school_data?.sumF2 / +school_data?.countF2;
		school_beauty_avg = +school_data?.sumF4 / +school_data?.countF4;
		school_clean_avg = +school_data?.sumF1 / +school_data?.countF1;
		school_safe_avg = +school_data?.sumF3 / +school_data?.countF3;
	} else if (metric_choice.value === 'gym') {
		school_enough_avg = +school_data?.sumG2 / +school_data?.countG2;
		school_beauty_avg = +school_data?.sumG4 / +school_data?.countG4;
		school_clean_avg = +school_data?.sumG1 / +school_data?.countG1;
		school_safe_avg = +school_data?.sumG3 / +school_data?.countG3;
	}

	let mounted = false;
	onMount(async () => {
		mounted = true;
	});

	$: if (mounted && schoolId) {
		fetchData();
	}

	$: if (mounted && schoolId && $currentUser) {
		fetchUserRow();
	}

	interface SchoolJsonSchema {
		count?: {
			total: number;
		};
		rating?: {
			classroom: number;
			toilet: number;
			canteen: number;
			gym: number;
			total: number;
		};
		pleasure?: {
			classroom: number;
			toilet: number;
			canteen: number;
			gym: number;
			total: number;
		};
		raw: SchoolScoreData;
	}
	const assignSchoolScore = (school_json: SchoolJsonSchema) => {
		school_total_count = school_json?.count?.total ?? 0;
		school_classroom_avg = school_json?.rating?.classroom ?? 0;
		school_toilet_avg = school_json?.rating?.toilet ?? 0;
		school_canteen_avg = school_json?.rating?.canteen ?? 0;
		school_gym_avg = school_json?.rating?.gym ?? 0;
		school_total_avg = school_json?.rating?.total ?? 0;

		school_pleasure_classroom_avg = school_json?.pleasure?.classroom ?? 0;
		school_pleasure_toilet_avg = school_json?.pleasure?.toilet ?? 0;
		school_pleasure_canteen_avg = school_json?.pleasure?.canteen ?? 0;
		school_pleasure_gym_avg = school_json?.pleasure?.gym ?? 0;
		school_total_pleasure_avg = school_json?.pleasure?.total ?? 0;

		school_data = school_json?.raw ?? {};
	};

	const fetchData = async () => {
		try {
			// get school overall rating
			const school_resp = await fetch(`${PUBLIC_API_HOST}/schools/${schoolId}/rating`);
			const school_json = await school_resp.json();

			assignSchoolScore(school_json);
		} catch (e) {
			console.error(e);
		}
	};

	const fetchUserRow = async () => {
		if (!$currentUser) return;

		try {
			const user_resp = await fetch(`${PUBLIC_API_HOST}/schools/${schoolId}/rating/current-user`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${$currentUser.accessToken}`
				}
			});

			const user_json = await user_resp.json();

			if (user_json) {
				user_record_id = user_json?.Id ?? null;
				quiz_classroom_done = user_json?.cDone ?? false;
				quiz_toilet_done = user_json?.tDone ?? false;
				quiz_canteen_done = user_json?.fDone ?? false;
				quiz_gym_done = user_json?.gDone ?? false;
			}
		} catch (e) {
			console.error(e);
		}
	};

	let user_record_id: null | number = null;
	const submitScore = async () => {
		if (!$currentUser) return;
		if (!quiz_location) return;

		quiz_display_avg =
			(quiz_rating_values[0] +
				quiz_rating_values[1] +
				quiz_rating_values[2] +
				quiz_rating_values[3]) /
			4;
		quiz_display_pleasure = quiz_rating_values[4];

		const quiz_body_key = {
			classroom: 'c',
			toilet: 't',
			canteen: 'f',
			gym: 'g'
		}[quiz_location];
		const quiz_body = {
			[quiz_body_key + 1]: quiz_rating_values[0],
			[quiz_body_key + 2]: quiz_rating_values[1],
			[quiz_body_key + 3]: quiz_rating_values[2],
			[quiz_body_key + 4]: quiz_rating_values[3],
			[quiz_body_key + 5]: quiz_rating_values[4]
		};

		// fix svelte error a rai mai ru maybe eslint confusing
		const ustore = $currentUser;
		try {
			const submit_resp = await fetch(
				`${PUBLIC_API_HOST}/schools/${schoolId}/rating/current-user`,
				{
					method: 'POST',
					headers: {
						Authorization: `Bearer ${ustore.accessToken}`,
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(quiz_body)
				}
			);

			const { currentUser, school } = await submit_resp.json();

			user_record_id = currentUser.Id ?? null;
			quiz_classroom_done = currentUser.cDone ?? false;
			quiz_toilet_done = currentUser.tDone ?? false;
			quiz_canteen_done = currentUser.fDone ?? false;
			quiz_gym_done = currentUser.gDone ?? false;

			assignSchoolScore(school);

			quiz_isopen = false;
			requestAnimationFrame(() => {
				quizfinish_isopen = true;
			});
		} catch (e) {
			console.error(e);
		}
	};

	const openQuizModal = () => {
		if ($currentUser) {
			quiz_isopen = true;
		} else {
			$login_modal_isopen = true;
		}
	};
</script>

<svelte:head>
	<title>คะแนนโรงเรียน — โปร่งใสวิทยา</title>
</svelte:head>

<SchoolHeader pageData={{ name: 'คะแนนเฉลี่ย', color: '#FA7CC7' }} />

<button type="button" class="f rate-btn" on:click={openQuizModal}>
	<span>แล้วคุณละ ให้กี่คะแนน?</span>
	<div class="school-quiz-lottie">
		<Lottie path="/lotties/littlestar.json" loop={true} autoplay={true} />
	</div>
</button>

<!--  ██████╗ ██╗   ██╗██╗███████╗ -->
<!-- ██╔═══██╗██║   ██║██║╚══███╔╝ -->
<!-- ██║   ██║██║   ██║██║  ███╔╝  -->
<!-- ██║▄▄ ██║██║   ██║██║ ███╔╝   -->
<!-- ╚██████╔╝╚██████╔╝██║███████╗ -->
<!-- ╚══▀▀═╝  ╚═════╝ ╚═╝╚══════╝ -->

<Modal
	title="ให้คะแนน"
	bind:isOpen={quiz_isopen}
	body_class="quiz-body f {quiz_location ? 'quiz-body-gap' : ''}"
	onCloseCallback={quiz_onclose}
	boxWidth="640px"
	boxHeight="700px"
	boxLeftShift="24px"
>
	<div class="quiz-location" slot="title">
		{#if quiz_location}
			<img
				loading="lazy"
				decoding="async"
				src="/ratings/{quiz_location}.svg"
				alt=""
				width="16"
				height="16"
			/>
			<span class="mitr">{location_thname(quiz_location)}</span>
		{/if}
	</div>

	{#if quiz_location}
		<div class="quiz-step-container">
			{#each Array(5) as _, i}
				<div class="quiz-step" class:quiz-step-current={quiz_current_step >= i} />
			{/each}
		</div>
		<!-- <input type="number" min="0" max="4" bind:value={quiz_current_step} /> -->
		<!-- <p>
			{JSON.stringify(quiz_rating_values)}
		</p> -->
		<div class="f quiz-img-wrapper">
			<img
				class="quiz-img"
				loading="lazy"
				decoding="async"
				src={QUIZ_QUESTIONS_IMAGE[quiz_location][quiz_current_step]}
				alt=""
				width="228"
				height="125"
			/>
		</div>
		<h3 class="mitr asfs">{QUIZ_QUESTIONS_TITLE[quiz_current_step]}</h3>
		<p class="tal asfs">{QUIZ_QUESTIONS_DESC[quiz_location][quiz_current_step]}</p>

		<div class="quiz-body-spacer" />

		<div class="rating-select">
			<div class="f rating-select-label">
				{#if quiz_current_step === 4}
					<span>ไม่พึงพอใจเลย</span>
					<span>พึงพอใจที่สุด</span>
				{:else}
					<span>ไม่ตรงเลย</span>
					<span>ตรงที่สุด</span>
				{/if}
			</div>
			<div class="f rating-select-controls" class:smile-theme={quiz_current_step === 4}>
				<label>
					<input
						type="radio"
						name="quiz-rating-radio"
						bind:group={quiz_rating_values[quiz_current_step]}
						class:checked={quiz_rating_values[quiz_current_step] > 1 && quiz_current_step !== 4}
						value={1}
					/>
					<span>1</span>
				</label>
				<label>
					<input
						type="radio"
						name="quiz-rating-radio"
						bind:group={quiz_rating_values[quiz_current_step]}
						class:checked={quiz_rating_values[quiz_current_step] > 2 && quiz_current_step !== 4}
						value={2}
					/>
					<span>2</span>
				</label>
				<label>
					<input
						type="radio"
						name="quiz-rating-radio"
						bind:group={quiz_rating_values[quiz_current_step]}
						class:checked={quiz_rating_values[quiz_current_step] > 3 && quiz_current_step !== 4}
						value={3}
					/>
					<span>3</span>
				</label>
				<label>
					<input
						type="radio"
						name="quiz-rating-radio"
						bind:group={quiz_rating_values[quiz_current_step]}
						class:checked={quiz_rating_values[quiz_current_step] > 4 && quiz_current_step !== 4}
						value={4}
					/>
					<span>4</span>
				</label>
				<label>
					<input
						type="radio"
						name="quiz-rating-radio"
						bind:group={quiz_rating_values[quiz_current_step]}
						value={5}
					/>
					<span>5</span>
				</label>
			</div>
		</div>

		<div class="f rating-form-btns">
			{#if quiz_current_step > 0}
				<button
					class="rating-form-btn secondary"
					type="button"
					on:click={() => {
						quiz_current_step -= 1;
					}}>กลับ</button
				>
			{/if}
			{#if quiz_current_step < 4}
				<button
					class="rating-form-btn"
					type="button"
					disabled={quiz_rating_values[quiz_current_step] === 0}
					on:click={() => {
						quiz_current_step += 1;
					}}>ไปต่อ</button
				>
			{:else}
				<button
					class="rating-form-btn f"
					type="button"
					disabled={quiz_rating_values[quiz_current_step] === 0}
					on:click={submitScore}
				>
					<span>ส่งคะแนน</span>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 16 16"
						width="16"
						height="16"
						><path
							fill="currentColor"
							d="M13.286 5.705A1 1 0 0011.87 4.29l-5.88 5.88-1.876-1.868A1 1 0 002.702 9.72l2.581 2.575a1 1 0 001.413-.001l6.59-6.59z"
						/></svg
					>
				</button>
			{/if}
		</div>
	{:else}
		<div class="quiz-body-spacer" />

		<p>
			สิ่งอำนวยความสะดวกต่าง ๆ ของโรงเรียน ตอบโจทย์การใช้งานของพวกเราแล้ว... จริงหรือ?
			มาให้คะแนนเพื่อสะท้อนสภาพการใช้งานจริงและความพอใจของพวกเรากันดีกว่า
			ไว้เป็นแนวทางสำหรับช่วยกันปรับปรุงแก้ไขต่อไป
		</p>
		<p class="pink quiz-est-time">ใช้เวลาไม่เกิน 5 นาที</p>
		<p>เลือกให้คะแนนตามสถานที่</p>
		<div class="quiz-location-selector">
			<button
				class="quiz-location-btn f"
				class:qfm-done={quiz_classroom_done}
				type="button"
				on:click={() => {
					quiz_location = 'classroom';
				}}
			>
				<img
					loading="lazy"
					decoding="async"
					src="/ratings/classroom.svg"
					alt=""
					width="16"
					height="16"
				/>
				<span class="mitr">ห้องเรียน</span>
			</button>
			<button
				class="quiz-location-btn f"
				class:qfm-done={quiz_toilet_done}
				type="button"
				on:click={() => {
					quiz_location = 'toilet';
				}}
			>
				<img
					loading="lazy"
					decoding="async"
					src="/ratings/toilet.svg"
					alt=""
					width="16"
					height="16"
				/>
				<span class="mitr">ห้องน้ำ</span>
			</button>
			<button
				class="quiz-location-btn f"
				class:qfm-done={quiz_canteen_done}
				type="button"
				on:click={() => {
					quiz_location = 'canteen';
				}}
			>
				<img
					loading="lazy"
					decoding="async"
					src="/ratings/canteen.svg"
					alt=""
					width="16"
					height="16"
				/>
				<span class="mitr">โรงอาหาร</span>
			</button>
			<button
				class="quiz-location-btn f"
				class:qfm-done={quiz_gym_done}
				type="button"
				on:click={() => {
					quiz_location = 'gym';
				}}
			>
				<img loading="lazy" decoding="async" src="/ratings/gym.svg" alt="" width="16" height="16" />
				<span class="mitr">สนามกีฬา</span>
			</button>
		</div>

		<div class="quiz-body-spacer" />
	{/if}
	<button
		class="metric-btn mlra"
		type="button"
		on:click={() => {
			detail_modal_callback = openQuizModal;
			quiz_isopen = false;
			if (quiz_location) {
				detail_choice = {
					value: {
						classroom: 'ห้องเรียน',
						toilet: 'ห้องน้ำ',
						canteen: 'โรงอาหาร',
						gym: 'สนามกีฬา'
					}[quiz_location],
					icon: {
						classroom: '/ratings/classroom.svg',
						toilet: '/ratings/toilet.svg',
						canteen: '/ratings/canteen.svg',
						gym: '/ratings/gym.svg'
					}[quiz_location]
				};
			}
			requestAnimationFrame(() => {
				detail_modal_isopen = true;
			});
		}}>อ่านเกณฑ์มาตรฐานเพิ่มเติม</button
	>
</Modal>

<!-- ███████╗██╗   ██╗ ██████╗ ██████╗███████╗███████╗███████╗ -->
<!-- ██╔════╝██║   ██║██╔════╝██╔════╝██╔════╝██╔════╝██╔════╝ -->
<!-- ███████╗██║   ██║██║     ██║     █████╗  ███████╗███████╗ -->
<!-- ╚════██║██║   ██║██║     ██║     ██╔══╝  ╚════██║╚════██║ -->
<!-- ███████║╚██████╔╝╚██████╗╚██████╗███████╗███████║███████║ -->
<!-- ╚══════╝ ╚═════╝  ╚═════╝ ╚═════╝╚══════╝╚══════╝╚══════╝ -->

<Modal
	title="ส่งคะแนนเรียบร้อย"
	hideTitle
	bind:isOpen={quizfinish_isopen}
	body_class="quiz-body f"
	onCloseCallback={quiz_onclose}
	boxWidth="640px"
	boxLeftShift="24px"
>
	<div class="quiz-body-spacer" />

	<h3 class="mitr qfm-title">ส่งคะแนนเรียบร้อย</h3>
	<div class="qfm-img">
		<Lottie path="/lotties/rating_completed.json" loop={true} autoplay={true} />
	</div>
	<p>ขอบคุณที่เข้ามามีส่วนร่วม คะแนนของคุณมีความหมายต่อการพัฒนาโรงเรียนของเรา</p>

	<div class="quiz-body-spacer" />

	<p class="mt16">คะแนนที่คุณให้</p>
	<div class="f qfm-score-list">
		<span class="mitr">คะแนนตามเกณฑ์มาตรฐาน</span>
		<span class="mitr f qfm-score">
			{quiz_display_avg.toFixed(1)}
			<img
				loading="lazy"
				decoding="async"
				src="/ratings/radio-star-checked.svg"
				alt=""
				width="20"
				height="20"
			/>
		</span>
	</div>
	<div class="f qfm-score-list">
		<span class="mitr">คะแนนความพึงพอใจ</span>
		<span class="mitr f qfm-score">
			{quiz_display_pleasure.toFixed(1)}
			<img
				loading="lazy"
				decoding="async"
				src="/ratings/rate-{Math.round(quiz_display_pleasure)}a.svg"
				alt=""
				width="20"
				height="20"
			/>
		</span>
	</div>

	<div class="quiz-body-spacer" />

	<p class="mt16">เลือกให้คะแนนสถานที่อื่น</p>
	<div class="quiz-location-selector">
		<button
			class="quiz-location-btn f"
			class:qfm-done={quiz_classroom_done}
			type="button"
			on:click={() => {
				quiz_location = 'classroom';
				quiz_rating_values = [0, 0, 0, 0, 0];
				quiz_current_step = 0;

				quizfinish_isopen = false;
				requestAnimationFrame(openQuizModal);
			}}
		>
			<img
				loading="lazy"
				decoding="async"
				src="/ratings/classroom.svg"
				alt=""
				width="16"
				height="16"
			/>
			<span class="mitr">ห้องเรียน</span>
		</button>
		<button
			class="quiz-location-btn f"
			class:qfm-done={quiz_toilet_done}
			type="button"
			on:click={() => {
				quiz_location = 'toilet';
				quiz_rating_values = [0, 0, 0, 0, 0];
				quiz_current_step = 0;

				quizfinish_isopen = false;
				requestAnimationFrame(openQuizModal);
			}}
		>
			<img
				loading="lazy"
				decoding="async"
				src="/ratings/toilet.svg"
				alt=""
				width="16"
				height="16"
			/>
			<span class="mitr">ห้องน้ำ</span>
		</button>
		<button
			class="quiz-location-btn f"
			class:qfm-done={quiz_canteen_done}
			type="button"
			on:click={() => {
				quiz_location = 'canteen';
				quiz_rating_values = [0, 0, 0, 0, 0];
				quiz_current_step = 0;

				quizfinish_isopen = false;
				requestAnimationFrame(openQuizModal);
			}}
		>
			<img
				loading="lazy"
				decoding="async"
				src="/ratings/canteen.svg"
				alt=""
				width="16"
				height="16"
			/>
			<span class="mitr">โรงอาหาร</span>
		</button>
		<button
			class="quiz-location-btn f"
			class:qfm-done={quiz_gym_done}
			type="button"
			on:click={() => {
				quiz_location = 'gym';
				quiz_rating_values = [0, 0, 0, 0, 0];
				quiz_current_step = 0;

				quizfinish_isopen = false;
				requestAnimationFrame(openQuizModal);
			}}
		>
			<img loading="lazy" decoding="async" src="/ratings/gym.svg" alt="" width="16" height="16" />
			<span class="mitr">สนามกีฬา</span>
		</button>
	</div>
</Modal>

<div class="desktop-margin">
	<div class="card">
		<div class="f">
			<h3 class="mitr">คะแนนตามเกณฑ์มาตรฐาน</h3>
			{#if school_total_count}
				<div class="total-rating-container">
					<div class="f g4">
						<img
							loading="lazy"
							decoding="async"
							src="/icons/star.svg"
							alt=""
							width="20"
							height="20"
						/>
						<span class="mitr total-rating">{school_total_avg.toFixed(1)}</span>
					</div>
					<span>{school_total_count} รีวิว</span>
				</div>
			{/if}
		</div>
		{#if school_total_count}
			<div class="f pink">
				<div>
					<h3 class="mitr">ระดับคุณภาพโรงเรียน</h3>
					{#if school_total_avg >= 4}
						<p>ภาพรวมดีมาก ตรงตามเกณฑ์มาตรฐาน</p>
					{:else if school_total_avg >= 3}
						<p>ภาพรวมดี แต่มีบางส่วนที่พัฒนาให้ดีกว่านี้ได้</p>
					{:else if school_total_avg >= 2}
						<p>มีหลายส่วนที่พัฒนาให้ดีกว่านี้ได้</p>
					{:else}
						<p>ยังมีหลายส่วนที่ต้องพัฒนาให้ดีกว่านี้</p>
					{/if}
				</div>
				{#if school_total_avg >= 4}
					<img
						loading="lazy"
						decoding="async"
						class="rating-text pop"
						src="/ratings/rating-text-4.svg"
						alt=""
						width="73"
						height="49"
					/>
				{:else if school_total_avg >= 3}
					<img
						loading="lazy"
						decoding="async"
						class="rating-text pop"
						src="/ratings/rating-text-3.svg"
						alt=""
						width="73"
						height="49"
					/>
				{:else if school_total_avg >= 2}
					<img
						loading="lazy"
						decoding="async"
						class="rating-text pop"
						src="/ratings/rating-text-2.svg"
						alt=""
						width="73"
						height="49"
					/>
				{:else}
					<img
						loading="lazy"
						decoding="async"
						class="rating-text pop"
						src="/ratings/rating-text-1.svg"
						alt=""
						width="73"
						height="49"
					/>
				{/if}
			</div>
		{/if}
		<button class="metric-btn" type="button" on:click={() => (detail_modal_isopen = true)}
			>อ่านเกณฑ์มาตรฐาน</button
		>
	</div>

	{#if !school_total_count}
		<div class="card">
			<div>ระดับคุณภาพโรงเรียน</div>
			<strong>ขึ้นอยู่กับการให้คะแนนของคุณ</strong>
		</div>
	{/if}

	<!--  ██████╗██████╗ ██╗████████╗███████╗██████╗ ██╗ █████╗  -->
	<!-- ██╔════╝██╔══██╗██║╚══██╔══╝██╔════╝██╔══██╗██║██╔══██╗ -->
	<!-- ██║     ██████╔╝██║   ██║   █████╗  ██████╔╝██║███████║ -->
	<!-- ██║     ██╔══██╗██║   ██║   ██╔══╝  ██╔══██╗██║██╔══██║ -->
	<!-- ╚██████╗██║  ██║██║   ██║   ███████╗██║  ██║██║██║  ██║ -->
	<!--  ╚═════╝╚═╝  ╚═╝╚═╝   ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝╚═╝  ╚═╝ -->

	<Modal
		title="เกณฑ์มาตรฐาน"
		hideTitle
		bind:isOpen={detail_modal_isopen}
		onCloseCallback={detail_modal_callback}
	>
		<div class="f" slot="title">
			<h3 class="mitr" role="presentation" style="font-size:.9rem">เกณฑ์มาตรฐาน</h3>
			<Dropdown options={DETAIL_DROPDOWN} bind:selected_option={detail_choice} />
		</div>
		{#if detail_choice.value === 'ห้องเรียน'}
			<h4 class="detail-header">ความสะอาด</h4>
			<ol class="detail-list">
				<li>ห้องเรียนสะอาด</li>
				<li>พื้นห้องเรียน/ โต๊ะไม่มีขยะและฝุ่นละออง</li>
				<li>หน้าต่าง/กระจกบานเกร็ดใสสะอาด</li>
				<li>ฝ้า/ผนัง/เพดานไม่มีฝุ่น คราบเปรอะเปื้อน</li>
				<li>ระเบียงหน้าห้อง/นอกหน้าต่างไม่มีขยะ</li>
				<li>อากาศถ่ายเทสะดวก</li>
				<li>มีอุปกรณ์ทำความสะอาด/มีถังขยะ</li>
				<li>มีการจัดเวรทำความสะอาดห้องเรียน</li>
				<li>มีที่เก็บอุปกรณ์ทำความสะอาด</li>
			</ol>

			<h4 class="detail-header">ความเพียงพอ</h4>
			<ol class="detail-list">
				<li>จำนวนโต๊ะ-เก้าอี้เท่ากับจำนวนนักเรียน</li>
				<li>จำนวนโต๊ะ-เก้าอี้เข้าคู่กัน</li>
				<li>มีแสงสว่างจากหลอดไฟที่เพียงพอ</li>
				<li>มีพัดลมหรือเครื่องปรับอากาศ เพียงพอ</li>
				<li>มีสื่อและอุปกรณ์การเรียน การสอนเพียงพอ เช่น กระดาน ทีวี ปากกา</li>
			</ol>

			<h4 class="detail-header">ความปลอดภัย</h4>
			<ol class="detail-list">
				<li>โต๊ะ-เก้าอี้นักเรียนอยู่ในสภาพดี แข็งแร็ง</li>
				<li>มีระเบียงนอกหน้าต่างและหน้าห้องเรียน</li>
				<li>ฝ้าและเพดานไม่ผุพัง แตกหัก</li>
				<li>พื้นห้องเรียนไม่ควรใช้วัสดุที่พื้นผิวลื่น</li>
				<li>หน้าต่างประตูอยู่ในสภาพด</li>
				<li>สวิตช์ไฟ ปลั๊กไฟไม่อยู่ในจุดที่อันตราย</li>
			</ol>

			<h4 class="detail-header">ความสวยงาม</h4>
			<ol class="detail-list">
				<li>มีการตกแต่งที่สวยงาม ดูแลรักษาอย่างดี</li>
				<li>มีบรรยากาศทางวิชาการ (มุมส่งเสริมการเรียนรู้ใน ห้องเรียน)</li>
				<li>โต๊ะเรียนน่าใช้ไม่มีรอยขูด เขียน</li>
				<li>ห้องเรียนไม่แออัด คับแคบเกินไป</li>
				<li>มีช่องว่างระหว่างโต๊ะเรียนและเก้าอี้</li>
				<li>ห้องเรียนแบ่งเป็นสัดส่วน มีระเบียบ</li>
			</ol>
		{/if}
		{#if detail_choice.value === 'ห้องน้ำ'}
			<h4 class="detail-header">ความสะอาด</h4>
			<ol class="detail-list">
				<li>มีกระดาษชำระ</li>
				<li>มีขันตักน้ำ/สายฉีด/น้ำสะอาดใช้ชำระ</li>
				<li>มีสบู่ล้างมือ/มีอ่างล้างมือ</li>
				<li>มีถังขยะ</li>
				<li>มีพัดลม/ช่องระบายอากาศ 10% ของพื้นที่</li>
				<li>พื้นห้องน้ำที่สะอาด</li>
				<li>มีถังเก็บสิ่งปฏิกูล</li>
				<li>มีรางระบายน้ำ</li>
			</ol>

			<h4 class="detail-header">ความเพียงพอ</h4>
			<ol class="detail-list">
				<li>โถปัสสาวะ 90 คน / 1 โถ</li>
				<li>โถสุขภัณฑ์ 40 คน / 1 โถ</li>
				<li>จำนวนห้องน้ำเพียงพอกับนักเรียน</li>
				<li>สภาพห้องน้ำและสุขภัณฑ์พร้อมใช้งาน</li>
				<li>อ่างล้างมือเพียงพอ</li>
				<li>ส้วมราดน้ำต้องมีน้ำราดพอเพียง</li>
				<li>แสงสว่างเพียงพอ</li>
			</ol>

			<h4 class="detail-header">ความปลอดภัย</h4>
			<ol class="detail-list">
				<li>ห้องน้ำไม่อยู่ที่ลับตา</li>
				<li>แบ่งแยกห้องน้ำชายและห้องน้ำหญิง</li>
				<li>ประตูมีกลอนล็อคแข็งแร็ง</li>
				<li>มีที่กั้นโถปัสสาวะผู้ชาย</li>
				<li>แสงสว่างเพียงพอ</li>
				<li>ห้องน้ำมีความมิดชิด</li>
				<li>กระจกไม่แตก</li>
				<li>โถสุขภัณฑ์/อุปกรณ์ในห้องน้ำไม่ชำรุด</li>
			</ol>

			<h4 class="detail-header">ความสวยงาม</h4>
			<ol class="detail-list">
				<li>มีการตกแต่งที่สวยงาม ดูแลรักษาอย่างดี</li>
				<li>มีการใช้ที่ดับกลิ่น (ลูกเหม็น มะกรูด)</li>
				<li>มีการบำรุงรักษาห้องน้ำให้อยู่ในสภาพดี</li>
				<li>มีป้ายประชาสัมพันธ์เกี่ยวกับสุขอนามัย</li>
				<li>มีการแบ่งสัดส่วนที่ชัดเจนในห้องน้ำ</li>
				<li>ไม่มีการขีดเขียนตามพนัง</li>
				<li>มีป้ายห้ามสูบบุหรี่</li>
			</ol>
		{/if}
		{#if detail_choice.value === 'โรงอาหาร'}
			<h4 class="detail-header">ความสะอาด</h4>
			<ol class="detail-list">
				<li>ตั้งอยู่ห่างจากห้องน้ำและที่เก็บขยะ</li>
				<li>ภาชนะที่ใส่อาหารมีฝาปิด/คลุมพลาสติก</li>
				<li>มีตู้สำหรับปกปิดอาหารที่ปรุงสำเร็จ</li>
				<li>ภาชนะใส่น้ำส้มสายชู น้ำปลา น้ำจิ้ม มีฝาปิด</li>
				<li>มีที่วางช้อน ส้อม และตะเกียบ</li>
				<li>โต๊ะ-เก้าอี้นั่งมีความสะอาด</li>
				<li>มีการระบายอากาศ/มีพัดลมระบายอากาศ</li>
				<li>ไม่มีสัตว์ในโรงอาหาร เช่น นก แมว</li>
				<li>ไม่มีเศษอาหารบนพื้น</li>
				<li>มีน้ำดื่มใส่ในภาชนะที่สะอาด</li>
				<li>แม่ครัวใส่เสื้อมีแขน/ที่คลุมผม/ผ้ากันเปื้อน</li>
				<li>มีที่จุ่มฆ่าเชื้อโรคสำหรับ ช้อน ส้อม ตะเกียบ</li>
				<li>พื้นที่ทำอาหารถูกสุขลักษณะ</li>
				<li>มีการแยกขยะ เศษอาหาร</li>
			</ol>

			<h4 class="detail-header">ความเพียงพอ</h4>
			<ol class="detail-list">
				<li>มีที่นั่งเพียงพอสำหรับนักเรียน (500 ที่นั่ง ต่อ นักเรียน 400 คน)</li>
				<li>มีตู้กดน้ำดื่มบริการเพียงพอ</li>
				<li>มีภาชนะในการรับประทานอาหารเพียงพอ</li>
				<li>มีร้านอาหารเพียงพอ</li>
				<li>มีพัดลมระบายอากาศเพียงพอ</li>
			</ol>

			<h4 class="detail-header">ความปลอดภัย</h4>
			<ol class="detail-list">
				<li>มีตรารับรองมอก. และ อย.</li>
				<li>มีประตูปิดมิดชิด/ประตูมุ้งลวด</li>
				<li>มีสัญลักษณ์ห้ามสูบบุหรี่</li>
				<li>โต๊ะ-เก้าอี้แข็งแร็ง ใช้งานได้</li>
				<li>ภาชนะทำจากวัสดุที่ปลอดภัย เช่น สแตนเลส กระเบื้องเคลือบขาว แก้ว อลูมิเนียม</li>
				<li>ตะเกียบทำจากไม้หรือพลาสติก/ไม่ตกแต่งสี</li>
				<li>พื้นที่ในโรงอาหารแยกเป็นสัดส่วน</li>
				<li>ไม่มีวัตถุไวไฟ</li>
				<li>วัสดุที่ใช้ในโรงอาหารต้องไม่ติดไฟง่าย</li>
			</ol>

			<h4 class="detail-header">ความสวยงาม</h4>
			<ol class="detail-list">
				<li>มีการตกแต่งที่สวยงาม ดูแลรักษาอย่างดี</li>
				<li>มีถังขยะแยกประเภทให้ใช้งาน</li>
				<li>อาหารถูกหลักโภชนาการ</li>
				<li>นักเรียนมีความพึงพอใจในรสชาติ ปริมาณและความสะอาดของอาหาร</li>
				<li>มีที่เก็บภาชนะจาน ชามเรียบร้อย</li>
				<li>มีมุมล้างมือ</li>
				<li>มีการตกแต่ง</li>
			</ol>
		{/if}
		{#if detail_choice.value === 'สนามกีฬา'}
			<h4 class="detail-header">ความสะอาด</h4>
			<ol class="detail-list">
				<li>บริเวณลานกีฬาสะอาด พร้อมใช้</li>
				<li>พื้นสนามไม่มีฝุ่นและขยะ</li>
				<li>พื้นที่ระบายอากาศ/ปลอดโปร่ง</li>
				<li>อุปกรณ์กีฬาสะอาด น่าใช้</li>
			</ol>

			<h4 class="detail-header">ความเพียงพอ</h4>
			<ol class="detail-list">
				<li>มีสนามบาส/แป้นบาส/ลูกบาส</li>
				<li>มีสนามฟุตบอล/ลูกบอล/ ประตู</li>
				<li>มีลานกีฬาอเนกประสงค์</li>
				<li>มีสนามวอลเล่ย์บอล/ลูกวอลเลย์บอล</li>
				<li>มีสนามตะกร้อ/ลูกตระกร้อ</li>
				<li>มีอุปกรณ์กีฬาที่เพียงพอต่อการใช้งาน</li>
				<li>มีพื้นที่กว้างพอสำหรับเล่นกีฬา</li>
				<li>มีพื้นที่เพียงพอสำหรับจำนวนนักเรียน</li>
			</ol>

			<h4 class="detail-header">ความปลอดภัย</h4>
			<ol class="detail-list">
				<li>ไม่มีวัสดุที่อันตรายบริเวณสนามกีฬา</li>
				<li>โดม/หลังคาไม่มีรอยรั่วหรือพัง</li>
				<li>สถานที่ไม่รกร้าง</li>
				<li>พื้นสนามเหมาะสมต่อการใช้งาน เช่น ไม่ใช่ลานดิน ไม่มีหลุมบ่อ</li>
				<li>มีแสงสว่างเพียงพอในการใช้งาน</li>
				<li>อุปกรณ์กีฬาอยู่ในสภาพที่สมบูรณ์ พร้อมใช้งาน ไม่ชำรุด</li>
				<li>อัฒจรรย์อยู่ในสภาพดีพร้อมใช้งาน</li>
			</ol>

			<h4 class="detail-header">ความสวยงาม</h4>
			<ol class="detail-list">
				<li>มีการจัดสรรพื้นที่อย่างเหมาะสม</li>
				<li>มีกีฬาให้เล่นหลากหลาย</li>
				<li>ทาสีพื้นสนามสวยงาม</li>
				<li>มีโดมหลังคาปิดกั้น กันแดด กันฝน</li>
				<li>มีความร่มรื่น</li>
				<li>มีพื้นที่ให้นั่งเล่นหรือเชียร์กีฬา</li>
			</ol>
		{/if}
	</Modal>

	<div class="card">
		<h3 class="fw400">แบ่งตามสถานที่</h3>
		<div class="f g8">
			<img
				loading="lazy"
				decoding="async"
				src="/ratings/classroom.svg"
				alt=""
				width="16"
				height="16"
			/>
			<span class="mitr">ห้องเรียน</span>
			<span class="f110" />
			{#if +school_data?.countC1}
				<span class="mitr meter-num">{school_classroom_avg.toFixed(1)}</span>
				<span class="meter" style:--value={school_classroom_avg} />
				<span class="review-count">{school_data?.countC1} รีวิว</span>
			{:else}
				<div class="no-review">ยังไม่มีคะแนน</div>
			{/if}
		</div>
		<div class="f g8">
			<img
				loading="lazy"
				decoding="async"
				src="/ratings/toilet.svg"
				alt=""
				width="16"
				height="16"
			/>
			<span class="mitr">ห้องน้ำ</span>
			<span class="f110" />
			{#if +school_data?.countT1}
				<span class="mitr meter-num">{school_toilet_avg.toFixed(1)}</span>
				<span class="meter" style:--value={school_toilet_avg} />
				<span class="review-count">{school_data?.countT1} รีวิว</span>
			{:else}
				<div class="no-review">ยังไม่มีคะแนน</div>
			{/if}
		</div>
		<div class="f g8">
			<img
				loading="lazy"
				decoding="async"
				src="/ratings/canteen.svg"
				alt=""
				width="16"
				height="16"
			/>
			<span class="mitr">โรงอาหาร</span>
			<span class="f110" />
			{#if +school_data?.countF1}
				<span class="mitr meter-num">{school_canteen_avg.toFixed(1)}</span>
				<span class="meter" style:--value={school_canteen_avg} />
				<span class="review-count">{school_data?.countF1} รีวิว</span>
			{:else}
				<div class="no-review">ยังไม่มีคะแนน</div>
			{/if}
		</div>
		<div class="f g8">
			<img loading="lazy" decoding="async" src="/ratings/gym.svg" alt="" width="16" height="16" />
			<span class="mitr">สนามกีฬา</span>
			<span class="f110" />
			{#if +school_data?.countG1}
				<span class="mitr meter-num">{school_gym_avg.toFixed(1)}</span>
				<span class="meter" style:--value={school_gym_avg} />
				<span class="review-count">{school_data?.countG1} รีวิว</span>
			{:else}
				<div class="no-review">ยังไม่มีคะแนน</div>
			{/if}
		</div>
	</div>

	<div class="card">
		<div class="f">
			<h3 class="fw400">แบ่งตามด้าน</h3>
			<Dropdown options={METRIC_DROPDOWN} bind:selected_option={metric_choice} />
		</div>
		<ScoreDiagram
			score_enough={school_enough_avg}
			score_beauty={school_beauty_avg}
			score_clean={school_clean_avg}
			score_safe={school_safe_avg}
		/>
	</div>

	<div class="card">
		<div class="f">
			<h3 class="mitr">คะแนนความพึงพอใจ</h3>
			{#if school_total_count}
				<div class="total-rating-container">
					<div class="f g4">
						<img
							loading="lazy"
							decoding="async"
							src="/ratings/rate-{Math.round(school_total_pleasure_avg)}a.svg"
							alt=""
							width="32"
							height="32"
						/>
						<span class="mitr total-rating">{school_total_pleasure_avg.toFixed(1)}</span>
					</div>
					<span>{school_total_count} รีวิว</span>
				</div>
			{/if}
		</div>
		<div class="f g8">
			<img
				loading="lazy"
				decoding="async"
				src="/ratings/classroom.svg"
				alt=""
				width="16"
				height="16"
			/>
			<span class="mitr">ห้องเรียน</span>
			<span class="f110" />
			<img
				loading="lazy"
				decoding="async"
				src="/ratings/rate-{Math.round(school_pleasure_classroom_avg)}a.svg"
				alt=""
				width="28"
				height="28"
			/>
			{#if +school_data?.countC5}
				<span class="mitr meter-num">{school_pleasure_classroom_avg.toFixed(1)}</span>
				<span class="meter short" style:--value={school_pleasure_classroom_avg} />
				<span class="review-count">{school_data?.countC5} รีวิว</span>
			{:else}
				<div class="no-review long">ยังไม่มีคะแนน</div>
			{/if}
		</div>
		<div class="f g8">
			<img
				loading="lazy"
				decoding="async"
				src="/ratings/toilet.svg"
				alt=""
				width="16"
				height="16"
			/>
			<span class="mitr">ห้องน้ำ</span>
			<span class="f110" />
			<img
				loading="lazy"
				decoding="async"
				src="/ratings/rate-{Math.round(school_pleasure_toilet_avg)}a.svg"
				alt=""
				width="28"
				height="28"
			/>
			{#if +school_data?.countT5}
				<span class="mitr meter-num">{school_pleasure_toilet_avg.toFixed(1)}</span>
				<span class="meter short" style:--value={school_pleasure_toilet_avg} />
				<span class="review-count">{school_data?.countT5} รีวิว</span>
			{:else}
				<div class="no-review long">ยังไม่มีคะแนน</div>
			{/if}
		</div>
		<div class="f g8">
			<img
				loading="lazy"
				decoding="async"
				src="/ratings/canteen.svg"
				alt=""
				width="16"
				height="16"
			/>
			<span class="mitr">โรงอาหาร</span>
			<span class="f110" />
			<img
				loading="lazy"
				decoding="async"
				src="/ratings/rate-{Math.round(school_pleasure_canteen_avg)}a.svg"
				alt=""
				width="28"
				height="28"
			/>
			{#if +school_data?.countF5}
				<span class="mitr meter-num">{school_pleasure_canteen_avg.toFixed(1)}</span>
				<span class="meter short" style:--value={school_pleasure_canteen_avg} />
				<span class="review-count">{school_data?.countF5} รีวิว</span>
			{:else}
				<div class="no-review long">ยังไม่มีคะแนน</div>
			{/if}
		</div>
		<div class="f g8">
			<img loading="lazy" decoding="async" src="/ratings/gym.svg" alt="" width="16" height="16" />
			<span class="mitr">สนามกีฬา</span>
			<span class="f110" />
			<img
				loading="lazy"
				decoding="async"
				src="/ratings/rate-{Math.round(school_pleasure_gym_avg)}a.svg"
				alt=""
				width="28"
				height="28"
			/>
			{#if +school_data?.countG5}
				<span class="mitr meter-num">{school_pleasure_gym_avg.toFixed(1)}</span>
				<span class="meter short" style:--value={school_pleasure_gym_avg} />
				<span class="review-count">{school_data?.countG5} รีวิว</span>
			{:else}
				<div class="no-review long">ยังไม่มีคะแนน</div>
			{/if}
		</div>
	</div>

	<div class="mobile-spacer" />
</div>

<style lang="scss">
	@media screen and (min-width: 768px) {
		.desktop-margin {
			width: 100%;
			max-width: 640px;
			margin: auto;
			margin-top: 73px;
		}
	}

	.desktop-margin {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.f {
		justify-content: space-between;
		width: 100%;
	}

	.card {
		padding: 16px;

		background: #fff;

		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.mobile-spacer {
		height: 64px;

		@media screen and (min-width: 768px) {
			height: 32px;
		}
	}

	.total-rating-container {
		text-align: right;

		span {
			line-height: 1;
		}
	}

	.total-rating {
		font-size: 1.5625rem;
	}

	.metric-btn {
		text-align: left;
		text-decoration: underline;
		margin-right: auto;
		width: max-content;
	}

	.meter {
		min-width: 35%;
		height: 4px;
		background: #ddd;
		display: flex;
		border-radius: 2px;
		overflow: hidden;

		&.short {
			min-width: 25%;
		}

		&::before,
		&::after {
			content: '';
			display: block;
		}

		&::before {
			background: #fa7cc7;
			flex: var(--value) var(--value) 0;
		}

		&::after {
			flex: calc(5 - var(--value)) calc(5 - var(--value)) 0;
		}
	}

	.meter-num {
		font-size: 1.25rem;
		line-height: 1;
	}

	.review-count {
		font-size: 0.625rem;
		line-height: 1;
		white-space: nowrap;

		@media screen and (min-width: 768px) {
			font-size: 0.8125rem;
		}
	}

	.detail-header {
		font-size: 0.8125rem;
		font-weight: 500;

		@media screen and (min-width: 768px) {
			font-size: 1rem;
		}
	}

	.detail-list {
		font-size: 0.8125rem;
		margin: 4px 16px 16px;

		@media screen and (min-width: 768px) {
			font-size: 1rem;
		}
	}

	.rate-btn {
		position: fixed;
		left: 16px;
		bottom: 80px;
		width: calc(100% - 32px);
		z-index: 1;
		padding: 8px 16px;
		gap: 8px;

		background: #fa7cc7;
		box-shadow: 0 1px 4px rgba(12, 22, 107, 0.2);
		border-radius: 24px;

		color: #fff;
		line-height: 1;
		text-decoration: none;

		justify-content: center;
		cursor: pointer;
	}

	@media screen and (min-width: 768px) {
		.rate-btn {
			width: 100%;
			max-width: 640px;
			left: calc(50% + 32px);
			top: calc(60px + 16px + var(--navbar-height));
			bottom: unset;
			transform: translateX(-50%);

			transition: top 0.3s;
			will-change: top;
		}
	}

	.quiz-location {
		line-height: 1;
		margin-left: auto;

		display: inline-flex;
		align-items: center;
		gap: 8px;
	}

	:global(.quiz-body) {
		height: calc(100% - 64px);
		flex-direction: column;
		text-align: center;

		font-size: 0.8125rem;
	}

	@media screen and (min-width: 768px) {
		:global(.quiz-body) {
			font-size: 1rem;
		}
	}

	:global(.quiz-body-gap) {
		gap: 8px;
	}

	.quiz-body-spacer {
		flex: 1 1 0;
	}

	.quiz-est-time {
		margin: 8px 0 32px;
	}

	.quiz-location-selector {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 8px;
		margin: 16px 0;
		width: 100%;
	}

	.quiz-location-btn {
		padding: 12px 0;
		background: #fff;
		border: 1px solid #fcbde3;
		box-shadow: 0 0 4px rgba(12, 22, 107, 0.2);
		border-radius: 4px;

		gap: 8px;
		white-space: nowrap;

		justify-content: center;
	}

	.quiz-step-container {
		height: 8px;
		display: flex;
		gap: 4px;
		width: 100%;
	}

	.quiz-step {
		background: #ddd;
		border-radius: 4px;
		flex: 1 1 0;

		&.quiz-step-current {
			background: #fa7cc7;
		}
	}

	.rating-select {
		width: 100%;

		.rating-select-label {
			font-size: 0.625rem;

			@media screen and (min-width: 768px) {
				font-size: 0.8125rem;
			}
		}

		> .rating-select-controls {
			--unchecked-style: url(/ratings/radio-star-unchecked.svg);
			--checked-style: url(/ratings/radio-star-checked.svg);

			> label {
				line-height: 1;
				font-size: 0;
				cursor: pointer;

				> input {
					position: absolute;
					opacity: 0;
					width: 0;
					pointer-events: none;

					+ span::before {
						content: '';
						background: var(--unchecked-style);
						display: block;
						width: 44px;
						height: 44px;
						background-size: contain;
						background-position: 50%;
					}

					:is(&.checked, &:checked) + span::before {
						background: var(--checked-style);
					}
				}
			}

			&.smile-theme {
				> label:nth-child(1) {
					--unchecked-style: url(/ratings/rate-1.svg);
					--checked-style: url(/ratings/rate-1a.svg);
				}

				> label:nth-child(2) {
					--unchecked-style: url(/ratings/rate-2.svg);
					--checked-style: url(/ratings/rate-2a.svg);
				}

				> label:nth-child(3) {
					--unchecked-style: url(/ratings/rate-3.svg);
					--checked-style: url(/ratings/rate-3a.svg);
				}

				> label:nth-child(4) {
					--unchecked-style: url(/ratings/rate-4.svg);
					--checked-style: url(/ratings/rate-4a.svg);
				}

				> label:nth-child(5) {
					--unchecked-style: url(/ratings/rate-5.svg);
					--checked-style: url(/ratings/rate-5a.svg);
				}
			}
		}
	}

	.rating-form-btns {
		gap: 16px;
		margin: 16px 0;
	}

	.rating-form-btn {
		background: #fa7cc7;
		border: 2px solid #fa7cc7;
		box-shadow: 0 1px 4px rgba(12, 22, 107, 0.2);
		border-radius: 24px;

		font-family: 'Mitr';
		font-weight: 500;
		font-size: 1rem;
		line-height: 125%;
		letter-spacing: 0.02em;
		color: #fff;

		flex: 1 1 0;
		padding: 8px 0;

		justify-content: center;
		gap: 8px;

		&:is([disabled], .secondary) {
			background: #fff;
			border: 2px solid #fcbde3;
			box-shadow: 0 1px 4px rgba(12, 22, 107, 0.2);
			color: #fcbde3;
		}
	}

	.qfm-title {
		font-size: 1.25rem;
	}

	.qfm-img {
		width: 30%;
		margin: 16px auto;
	}

	.qfm-score-list {
		padding: 8px 16px;
		border-bottom: 1px dashed #ced5ea;
		line-height: 1;

		.qfm-score {
			gap: 8px;
			width: auto;
			line-height: 1;
			font-size: 1.2em;
		}
	}

	.qfm-done {
		background: #fcbde3;

		&::after {
			content: '';
			background: url(/icons/check-b.svg);
			width: 16px;
			height: 16px;
		}
	}

	.no-review {
		color: #9daad5;
		line-height: 1;
		min-width: 47%;

		&.long {
			min-width: 51%;
		}
	}

	.rating-text {
		filter: drop-shadow(0px 1px 4px rgba(12, 22, 107, 0.2));
	}

	.quiz-img {
		width: 90%;
		height: 120px;
		object-fit: contain;

		@media screen and (min-width: 768px) {
			width: auto;
			height: 200px;
		}
	}

	.quiz-img-wrapper {
		justify-content: center;
		padding: 8px 0 0;

		@media screen and (min-width: 768px) {
			padding: 16px 0 8px;
		}
	}

	@keyframes swingBounceIn {
		from,
		20%,
		40%,
		60%,
		80%,
		to {
			animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
		}

		0% {
			opacity: 0;
			transform: scale3d(0.3, 0.3, 0.3);
		}

		20% {
			transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 15deg);
		}

		40% {
			transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -10deg);
		}

		60% {
			opacity: 1;
			transform: scale3d(1.03, 1.03, 1.03) rotate3d(0, 0, 1, 5deg);
		}

		80% {
			transform: scale3d(0.97, 0.97, 0.97) rotate3d(0, 0, 1, -5deg);
		}

		to {
			opacity: 1;
			transform: scale3d(1, 1, 1) rotate3d(0, 0, 1, 0deg);
		}
	}

	.pop {
		animation: swingBounceIn 1s;
	}

	.school-quiz-lottie {
		width: 25px;
		height: 25px;
	}

	// #region UTILS
	.g4 {
		gap: 4px;
	}

	.g8 {
		gap: 8px;
	}

	.pink {
		color: #fa7cc7;
	}

	h4,
	.mitr {
		font-family: 'Mitr';
		font-weight: 500;
		line-height: 125%;
		letter-spacing: 0.02em;
	}

	.fw400 {
		font-weight: 400;
	}

	.f110 {
		flex: 1 1 0;
	}

	.mlra {
		margin-left: auto;
		margin-right: auto;
	}

	.asfs {
		align-self: flex-start;
	}

	.tal {
		text-align: left;
	}

	.mt16 {
		margin-top: 16px;
	}
	// #endregion
</style>
