<script lang="ts">
	import { years } from 'data/years.js';

	import Dropdown from 'components/Dropdown.svelte';
	import Modal from 'components/Modal.svelte';
	import SchoolHeader from 'components/school/SchoolHeader.svelte';
	import ScoreDiagram from 'components/ScoreDiagram.svelte';

	const DROPDOWN_DATA = years.map((y) => ({ label: y + 543, value: y }));
	let dropdown_choice = DROPDOWN_DATA[0];

	const METRIC_DROPDOWN = [
		{ label: 'ทุกสถานที่', value: 'all' },
		{ label: 'ห้องเรียน', value: 'classroom' },
		{ label: 'ห้องน้ำ', value: 'toilet' },
		{ label: 'โรงอาหาร', value: 'canteen' },
		{ label: 'สนามกีฬา', value: 'gym' }
	];
	let metric_choice = METRIC_DROPDOWN[0];

	const DETAIL_DROPDOWN = [
		{ value: 'ห้องเรียน' },
		{ value: 'ห้องน้ำ' },
		{ value: 'โรงอาหาร' },
		{ value: 'สนามกีฬา' }
	];
	let detail_choice = DETAIL_DROPDOWN[0];
	let detail_modal_isopen = false;
	let detail_modal_callback = () => {};

	let score_enough = 3.3;
	let score_beauty = 2.9;
	let score_safe = 3.5;
	let score_clean = 2.9;

	let quiz_isopen = !false;
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
</script>

<SchoolHeader pageData={{ name: 'คะแนนเฉลี่ย', color: '#FA7CC7' }}>
	<Dropdown options={DROPDOWN_DATA} bind:selected_option={dropdown_choice} />
</SchoolHeader>

<button type="button" class="f rate-btn" on:click={() => (quiz_isopen = true)}>
	<span>แล้วคุณละ ให้กี่คะแนน?</span>
	<img src="/ratings/mascot-w.svg" alt="" width="25" height="25" />
</button>

<Modal
	title="ให้คะแนน"
	bind:isOpen={quiz_isopen}
	body_class="quiz-body f {quiz_location ? 'quiz-body-gap' : ''}"
	onCloseCallback={quiz_onclose}
>
	<div class="quiz-location" slot="title">
		{#if quiz_location}
			<img src="/ratings/{quiz_location}.svg" alt="" width="16" height="16" />
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
		<img src="/ratings/placeholder.png" alt="" width="228" height="125" />
		<h3 class="mitr asfs">ความสะอาด</h3>
		<p class="tal">
			ห้องเรียนของฉันมีองค์ประกอบสำคัญ เช่น พื้น หน้าต่าง ระเบียง โต๊ะ ฯลฯ ไม่มีฝุ่น ขยะ หรือคราบ
			เปรอะเปื้อน บรรยากาศห้องเรียนปลอดโปร่ง มีการ
			จัดเวรทำความสะอาดพร้อมทั้งมีอุปกรณ์ทำความสะอาดพร้อมใช้จัดเก็บเป็นระเบียบ
		</p>

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
					class="rating-form-btn"
					type="button"
					disabled={quiz_rating_values[quiz_current_step] === 0}
					on:click={() => {
						/* TODO: submit score */
					}}>ส่งคะแนน</button
				>
			{/if}
		</div>
	{:else}
		<div class="quiz-body-spacer" />

		<p>
			สิ่งอำนวยความสะดวกต่าง ๆ ของโรงเรียน ตอบโจทย์การใช้งานของพวกเราแล้ว... จริงหรือ?
			มาให้คะแนนเพื่อสะท้อนสภาพการใช้งานจริงและความพอใจของพวกเรากันดีกว่า
			ไว้เป็นแนวทางสำหรับช่วยกันปรับปรุงแก้ไขต่อไป
		</p>
		<p class="pink quiz-est-time">ใช้เวลาไม่เกิน XX นาที</p>
		<p>เลือกให้คะแนนตามสถานที่</p>
		<div class="quiz-location-selector">
			<button
				class="quiz-location-btn f"
				type="button"
				on:click={() => {
					quiz_location = 'classroom';
				}}
			>
				<img src="/ratings/classroom.svg" alt="" width="16" height="16" />
				<span class="mitr">ห้องเรียน</span>
			</button>
			<button
				class="quiz-location-btn f"
				type="button"
				on:click={() => {
					quiz_location = 'toilet';
				}}
			>
				<img src="/ratings/toilet.svg" alt="" width="16" height="16" />
				<span class="mitr">ห้องน้ำ</span>
			</button>
			<button
				class="quiz-location-btn f"
				type="button"
				on:click={() => {
					quiz_location = 'canteen';
				}}
			>
				<img src="/ratings/canteen.svg" alt="" width="16" height="16" />
				<span class="mitr">โรงอาหาร</span>
			</button>
			<button
				class="quiz-location-btn f"
				type="button"
				on:click={() => {
					quiz_location = 'gym';
				}}
			>
				<img src="/ratings/gym.svg" alt="" width="16" height="16" />
				<span class="mitr">สนามกีฬา</span>
			</button>
		</div>

		<div class="quiz-body-spacer" />
	{/if}
	<button
		class="metric-btn mlra"
		type="button"
		on:click={() => {
			detail_modal_callback = () => {
				quiz_isopen = true;
			};
			quiz_isopen = false;
			detail_modal_isopen = true;
		}}>อ่านเกณฑ์มาตรฐานเพิ่มเติม</button
	>
</Modal>

<div class="desktop-margin">
	<div class="card">
		<div class="f">
			<h3 class="mitr">คะแนนตามเกณฑ์มาตรฐาน</h3>
			<div class="total-rating-container">
				<div class="f g4">
					<img src="/icons/star.svg" alt="" width="20" height="20" />
					<span class="mitr total-rating">2.9</span>
				</div>
				<span>66 รีวิว</span>
			</div>
		</div>
		<div class="f pink">
			<div>
				<h3 class="mitr">ระดับคุณภาพโรงเรียน</h3>
				<p>หลายส่วนพัฒนาให้ดีกว่านี้ได้</p>
			</div>
			<img src="/ratings/rating-avg.svg" alt="" width="73" height="49" />
		</div>
		<button class="metric-btn" type="button" on:click={() => (detail_modal_isopen = true)}
			>อ่านเกณฑ์มาตรฐาน</button
		>
	</div>

	<Modal
		title="เกณฑ์มาตรฐาน"
		hideTitle
		bind:isOpen={detail_modal_isopen}
		onCloseCallback={detail_modal_callback}
	>
		<div class="f" slot="title">
			<h3 class="mitr" role="presentation">เกณฑ์มาตรฐาน</h3>
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
			<img src="/ratings/classroom.svg" alt="" width="16" height="16" />
			<span class="mitr">ห้องเรียน</span>
			<span class="f110" />
			<span class="mitr meter-num">2.9</span>
			<span class="meter" style:--value="2.9" />
			<span class="review-count">19 รีวิว</span>
		</div>
		<div class="f g8">
			<img src="/ratings/toilet.svg" alt="" width="16" height="16" />
			<span class="mitr">ห้องน้ำ</span>
			<span class="f110" />
			<span class="mitr meter-num">2.9</span>
			<span class="meter" style:--value="2.9" />
			<span class="review-count">19 รีวิว</span>
		</div>
		<div class="f g8">
			<img src="/ratings/canteen.svg" alt="" width="16" height="16" />
			<span class="mitr">โรงอาหาร</span>
			<span class="f110" />
			<span class="mitr meter-num">2.9</span>
			<span class="meter" style:--value="2.9" />
			<span class="review-count">19 รีวิว</span>
		</div>
		<div class="f g8">
			<img src="/ratings/gym.svg" alt="" width="16" height="16" />
			<span class="mitr">สนามกีฬา</span>
			<span class="f110" />
			<span class="mitr meter-num">2.9</span>
			<span class="meter" style:--value="2.9" />
			<span class="review-count">19 รีวิว</span>
		</div>
	</div>

	<div class="card">
		<div class="f">
			<h3 class="fw400">แบ่งตามด้าน</h3>
			<Dropdown options={METRIC_DROPDOWN} bind:selected_option={metric_choice} />
		</div>
		<ScoreDiagram {score_enough} {score_beauty} {score_safe} {score_clean} />
	</div>

	<div class="card">
		<div class="f">
			<h3 class="mitr">คะแนนความพึงพอใจ</h3>
			<div class="total-rating-container">
				<div class="f g4">
					<img src="/ratings/rate-2a.svg" alt="" width="32" height="32" />
					<span class="mitr total-rating">2.9</span>
				</div>
				<span>66 รีวิว</span>
			</div>
		</div>
		<div class="f g8">
			<img src="/ratings/classroom.svg" alt="" width="16" height="16" />
			<span class="mitr">ห้องเรียน</span>
			<span class="f110" />
			<img src="/ratings/rate-2a.svg" alt="" width="28" height="28" />
			<span class="mitr meter-num">2.9</span>
			<span class="meter short" style:--value="2.9" />
			<span class="review-count">19 รีวิว</span>
		</div>
		<div class="f g8">
			<img src="/ratings/toilet.svg" alt="" width="16" height="16" />
			<span class="mitr">ห้องน้ำ</span>
			<span class="f110" />
			<img src="/ratings/rate-2a.svg" alt="" width="28" height="28" />
			<span class="mitr meter-num">2.9</span>
			<span class="meter short" style:--value="2.9" />
			<span class="review-count">19 รีวิว</span>
		</div>
		<div class="f g8">
			<img src="/ratings/canteen.svg" alt="" width="16" height="16" />
			<span class="mitr">โรงอาหาร</span>
			<span class="f110" />
			<img src="/ratings/rate-2a.svg" alt="" width="28" height="28" />
			<span class="mitr meter-num">2.9</span>
			<span class="meter short" style:--value="2.9" />
			<span class="review-count">19 รีวิว</span>
		</div>
		<div class="f g8">
			<img src="/ratings/gym.svg" alt="" width="16" height="16" />
			<span class="mitr">สนามกีฬา</span>
			<span class="f110" />
			<img src="/ratings/rate-2a.svg" alt="" width="28" height="28" />
			<span class="mitr meter-num">2.9</span>
			<span class="meter short" style:--value="2.9" />
			<span class="review-count">19 รีวิว</span>
		</div>
	</div>
</div>

<style lang="scss">
	@media screen and (min-width: 768px) {
		.desktop-margin {
			width: 100%;
			max-width: 640px;
			margin: auto;
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
		background: #dddddd;
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
	}

	.detail-header {
		font-size: 0.8125rem;
		font-weight: 500;
	}

	.detail-list {
		font-size: 0.8125rem;
		margin: 4px 16px 16px;
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
		box-shadow: 0px 1px 4px rgba(12, 22, 107, 0.2);
		border-radius: 24px;

		color: #fff;
		line-height: 1;
		text-decoration: none;

		justify-content: center;
		cursor: pointer;
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
		margin-top: 16px;
	}

	.quiz-location-btn {
		padding: 12px 32px;
		background: #fff;
		border: 1px solid #fcbde3;
		box-shadow: 0px 0px 4px rgba(12, 22, 107, 0.2);
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
		background: #dddddd;
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
		}

		> .rating-select-controls {
			--unchecked-style: url(/ratings/radio-star-unchecked.svg);
			--checked-style: url(/ratings/radio-star-checked.svg);

			> label {
				line-height: 1;
				font-size: 0;

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
		box-shadow: 0px 1px 4px rgba(12, 22, 107, 0.2);
		border-radius: 24px;

		font-family: 'Mitr';
		font-weight: 500;
		font-size: 1rem;
		line-height: 125%;
		letter-spacing: 0.02em;
		color: #fff;

		flex: 1 1 0;
		padding: 8px 0;

		&:is([disabled], .secondary) {
			background: #fff;
			border: 2px solid #fcbde3;
			box-shadow: 0px 1px 4px rgba(12, 22, 107, 0.2);
			color: #fcbde3;
		}
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
	// #endregion
</style>
