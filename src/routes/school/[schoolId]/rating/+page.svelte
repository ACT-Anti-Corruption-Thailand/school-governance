<script lang="ts">
	import { years } from 'data/years.js';

	import SchoolHeader from 'components/school/SchoolHeader.svelte';
	import Dropdown from 'components/Dropdown.svelte';
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
		<button class="metric-btn" type="button">อ่านเกณฑ์มาตรฐาน</button>
	</div>

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

	// UTILS
	.g4 {
		gap: 4px;
	}

	.g8 {
		gap: 8px;
	}

	.pink {
		color: #fa7cc7;
	}

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
</style>
