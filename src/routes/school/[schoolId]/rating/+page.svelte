<script lang="ts">
	import { years } from 'data/years.js';

	import SchoolHeader from 'components/school/SchoolHeader.svelte';
	import Dropdown from 'components/Dropdown.svelte';
	import ScoreDiagram from 'components/ScoreDiagram.svelte';

	const DROPDOWN_DATA = years.map((y) => ({ label: y + 543, value: y }));

	let dropdown_choice = DROPDOWN_DATA[0];

	let score_enough = 3.3;
	let score_beauty = 2.9;
	let score_safe = 3.5;
	let score_clean = 2.9;
</script>

<SchoolHeader pageData={{ name: 'คะแนนเฉลี่ย', color: '#FA7CC7' }}>
	<Dropdown options={DROPDOWN_DATA} bind:selected_option={dropdown_choice} />
</SchoolHeader>
<div class="desktop-margin">
	<div class="card">
		<div class="f">
			<h3>คะแนนตามเกณฑ์มาตรฐาน</h3>
			<div>
				<div class="f">
					<img src="/icons/star.svg" alt="" width="20" height="20" />
					<span>2.9</span>
				</div>
				<span>66 รีวิว</span>
			</div>
		</div>
		<div class="f">
			<div>
				<h3>ระดับคุณภาพโรงเรียน</h3>
				<p>หลายส่วนพัฒนาให้ดีกว่านี้ได้</p>
			</div>
			<img src="/ratings/rating-avg.svg" alt="" width="73" height="49" />
		</div>
		<button type="button">อ่านเกณฑ์มาตรฐาน</button>
	</div>

	<div class="card">
		<h3>แบ่งตามสถานที่</h3>
		<div class="f">
			<img src="/ratings/classroom.svg" alt="" width="16" height="16" />
			<span>ห้องเรียน</span>
			<span>2.9</span>
			<span>2.9</span>
			<span>19 รีวิว</span>
		</div>
		<div class="f">
			<img src="/ratings/toilet.svg" alt="" width="16" height="16" />
			<span>ห้องน้ำ</span>
			<span>2.9</span>
			<span>2.9</span>
			<span>19 รีวิว</span>
		</div>
		<div class="f">
			<img src="/ratings/canteen.svg" alt="" width="16" height="16" />
			<span>โรงอาหาร</span>
			<span>2.9</span>
			<span>2.9</span>
			<span>19 รีวิว</span>
		</div>
		<div class="f">
			<img src="/ratings/gym.svg" alt="" width="16" height="16" />
			<span>สนามกีฬา</span>
			<span>2.9</span>
			<span>2.9</span>
			<span>19 รีวิว</span>
		</div>
	</div>

	<div class="card">
		<div class="f">
			<h3>แบ่งตามด้าน</h3>
		</div>
		<ScoreDiagram {score_enough} {score_beauty} {score_safe} {score_clean} />
	</div>

	<div class="card">
		<div class="f">
			<h3>คะแนนตามเกณฑ์มาตรฐาน</h3>
			<div>
				<div class="f">
					<img src="/icons/star.svg" alt="" width="20" height="20" />
					<span>2.9</span>
				</div>
				<span>66 รีวิว</span>
			</div>
		</div>
		<div class="f">
			<img src="/ratings/classroom.svg" alt="" width="16" height="16" />
			<span>ห้องเรียน</span>
			<img src="/ratings/classroom.svg" alt="" width="16" height="16" />
			<span>2.9</span>
			<span>2.9</span>
			<span>19 รีวิว</span>
		</div>
		<div class="f">
			<img src="/ratings/toilet.svg" alt="" width="16" height="16" />
			<span>ห้องน้ำ</span>
			<img src="/ratings/classroom.svg" alt="" width="16" height="16" />
			<span>2.9</span>
			<span>2.9</span>
			<span>19 รีวิว</span>
		</div>
		<div class="f">
			<img src="/ratings/canteen.svg" alt="" width="16" height="16" />
			<span>โรงอาหาร</span>
			<img src="/ratings/classroom.svg" alt="" width="16" height="16" />
			<span>2.9</span>
			<span>2.9</span>
			<span>19 รีวิว</span>
		</div>
		<div class="f">
			<img src="/ratings/gym.svg" alt="" width="16" height="16" />
			<span>สนามกีฬา</span>
			<img src="/ratings/classroom.svg" alt="" width="16" height="16" />
			<span>2.9</span>
			<span>2.9</span>
			<span>19 รีวิว</span>
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
	}

	.card {
		background: #fff;
		padding: 16px;
	}
</style>
