<script lang="ts">
	import { PUBLIC_NOCO_TOKEN_KEY } from '$env/static/public';
	import { onMount } from 'svelte';

	import SchoolHeader from 'components/school/SchoolHeader.svelte';
	import RatingStat from 'components/RatingStat.svelte';
	import CommentStat from 'components/CommentStat.svelte';

	import { currentSchool, currentSchoolId, update_date, LATEST_YEAR } from 'stores/school';
	$: d = $currentSchool;

	let total_rating = 0;
	let total_rating_count = 0;
	let classroom_avg = 0;
	let toilet_avg = 0;
	let canteen_avg = 0;
	let gym_avg = 0;
	let total_comment = 0;

	const fetchScore = async () => {
		if (!$currentSchoolId) return;

		try {
			const comment_count_resp = await fetch(
				`https://sheets.wevis.info/api/v1/db/data/v1/Open-School-Test/SchoolComments/count?where=${encodeURIComponent(
					`(schoolId,eq,${$currentSchoolId})~and(approved,eq,true)`
				)}`,
				{
					method: 'GET',
					headers: {
						'xc-token': PUBLIC_NOCO_TOKEN_KEY
					}
				}
			);
			const comment_count_json = await comment_count_resp.json();
			total_comment = comment_count_json.count;

			const rating_resp = await fetch(
				`https://sheets.wevis.info/api/v1/db/data/v1/Open-School-Test/SchoolIndex/views/SchoolRating?where=${encodeURIComponent(
					`(schoolId,eq,${$currentSchoolId})`
				)}&limit=1&nested%5BuserRating%5D%5Blimit%5D=1`,
				{
					method: 'GET',
					headers: {
						'xc-token': PUBLIC_NOCO_TOKEN_KEY
					}
				}
			);
			const rating_json = await rating_resp.json();
			const rating_data = rating_json?.list?.[0];

			total_rating_count =
				+rating_data?.countC1 +
				+rating_data?.countT1 +
				+rating_data?.countF1 +
				+rating_data?.countG1;
			classroom_avg =
				+rating_data?.countC1 === 0
					? 0
					: (+rating_data?.sumC1 +
							+rating_data?.sumC2 +
							+rating_data?.sumC3 +
							+rating_data?.sumC4) /
					  (4 * +rating_data?.countC1);
			toilet_avg =
				+rating_data?.countT1 === 0
					? 0
					: (+rating_data?.sumT1 +
							+rating_data?.sumT2 +
							+rating_data?.sumT3 +
							+rating_data?.sumT4) /
					  (4 * +rating_data?.countT1);
			canteen_avg =
				+rating_data?.countF1 === 0
					? 0
					: (+rating_data?.sumF1 +
							+rating_data?.sumF2 +
							+rating_data?.sumF3 +
							+rating_data?.sumF4) /
					  (4 * +rating_data?.countF1);
			gym_avg =
				+rating_data?.countG1 === 0
					? 0
					: (+rating_data?.sumG1 +
							+rating_data?.sumG2 +
							+rating_data?.sumG3 +
							+rating_data?.sumG4) /
					  (4 * +rating_data?.countG1);
			total_rating =
				(classroom_avg + toilet_avg + canteen_avg + gym_avg) /
				(+!!classroom_avg + +!!toilet_avg + +!!canteen_avg + +!!gym_avg);
		} catch (e) {
			console.error(e);
		}
	};

	let posts: any[] = [];
	const fetchComments = async () => {
		let schoolid_query = `schoolId,eq,${$currentSchoolId}`;
		let approved_query = `approved,eq,true`;
		let location_query = ['classroom', 'toilet', 'canteen', 'gym', 'other']
			.map((loc) => `(location,like,${loc})`)
			.join('~or');
		let year_query = `(schoolYear,eq,${$LATEST_YEAR})`;
		let where_query = [schoolid_query, approved_query, location_query, year_query]
			.filter((e) => e)
			.map((e) => `(${e})`)
			.join('~and');
		let sort_query = '-createDate';

		try {
			const resp = await fetch(
				`https://sheets.wevis.info/api/v1/db/data/v1/Open-School-Test/SchoolComments?limit=3&where=${encodeURIComponent(
					where_query
				)}&sort=${encodeURIComponent(sort_query)}`,
				{
					method: 'GET',
					headers: {
						'xc-token': PUBLIC_NOCO_TOKEN_KEY
					}
				}
			);
			const json = await resp.json();
			posts = json?.list;
		} catch (err) {
			console.error(err);
		}
	};

	const fixNaN = (val: string | number, defaultVal = '—') => {
		if (typeof val === 'string') return val === 'NaN' ? defaultVal : val;
		return Number.isNaN(val) ? defaultVal : val;
	};

	onMount(() => {
		fetchScore();
		fetchComments();
	});
</script>

<SchoolHeader>
	<div class="f header-score">
		<RatingStat rating={total_rating} />
		<div class="spacer" />
		<CommentStat comment={total_comment} />
	</div>
</SchoolHeader>

<div class="overview-container">
	<a href="/school/{$currentSchoolId}/data" class="section-link">
		<div class="card">
			<header class="f section-header mitr">
				<img src="/mascots/data.svg" alt="" width="50" height="50" />
				<span>ข้อมูลโรงเรียน</span>
				<img src="/chevrons/right.svg" alt="" width="24" height="24" />
			</header>

			<div class="school-data-grid">
				<div class="f school-data-block">
					<span class="school-data-text">นักเรียนทั้งหมด</span>
					<span class="school-data-val">
						<span class="mitr school-bignum">{d?.student?.total?.all?.toLocaleString() || '—'}</span
						> คน
					</span>
				</div>
				<div class="f school-data-block">
					<span class="school-data-text">นักเรียนต่อครู</span>
					<span class="school-data-val">
						<span class="mitr school-bignum"
							>1:{fixNaN(
								Math.ceil(d?.student?.total?.all / d?.staff?.ครู?.total).toLocaleString()
							)}</span
						> คน
					</span>
				</div>
				<div class="f school-data-block">
					<span class="school-data-text">นักเรียนต่อห้อง</span>
					<span class="school-data-val">
						<span class="mitr school-bignum"
							>{fixNaN(
								Math.ceil(d?.student?.total?.all / d?.student?.total?.class).toLocaleString()
							)}</span
						> คน
					</span>
				</div>
				<div class="f school-data-block">
					<span class="school-data-text">อุปกรณ์การเรียน</span>
					<span class="school-data-val">
						<span class="mitr school-bignum"
							>{~~((d?.durable_goods?.stats?.working / d?.durable_goods?.stats?.total) * 100) ||
								'—'}%</span
						> ใช้งานได้
					</span>
				</div>
			</div>
		</div>
	</a>

	<a href="/school/{$currentSchoolId}/rating" class="section-link">
		<div class="card">
			<header class="f section-header">
				<img src="/mascots/star.svg" alt="" width="50" height="50" />
				{#if fixNaN(total_rating.toFixed(1)) === '—'}
					<span class="f header-text-adjust mitr">ยังไม่มีคะแนน</span>
				{:else}
					<span class="f header-text-adjust">
						<span class="mitr header-bignum">{fixNaN(total_rating.toFixed(1))}</span>
						<span class="mitr"> คะแนน </span>
						<small>| {fixNaN(total_rating_count.toLocaleString())} รีวิว</small>
					</span>
				{/if}
				<img src="/chevrons/right.svg" alt="" width="24" height="24" />
			</header>
			{#if !Number.isNaN(total_rating) && total_rating}
				<div class="f score-summary">
					<div>
						<div>ระดับคุณภาพโรงเรียน</div>
						<div style="color:#FA7CC7;">
							{#if total_rating >= 4}
								ภาพรวมดีมาก ตรงตามเกณฑ์มาตรฐาน
							{:else if total_rating >= 3}
								ภาพรวมดี แต่มีบางส่วนที่พัฒนาให้ดีกว่านี้ได้
							{:else if total_rating >= 2}
								มีหลายส่วนที่พัฒนาให้ดีกว่านี้ได้
							{:else}
								ยังมีหลายส่วนที่ต้องพัฒนาให้ดีกว่านี้
							{/if}
						</div>
					</div>
					{#if total_rating >= 4}
						<img src="/ratings/rating-text-4.svg" alt="" width="73" height="49" />
					{:else if total_rating >= 3}
						<img src="/ratings/rating-text-3.svg" alt="" width="73" height="49" />
					{:else if total_rating >= 2}
						<img src="/ratings/rating-text-2.svg" alt="" width="73" height="49" />
					{:else}
						<img src="/ratings/rating-text-1.svg" alt="" width="73" height="49" />
					{/if}
				</div>
			{/if}
			<div class="f score-locations">
				<div class="f score-location">
					<div>ห้องเรียน</div>
					<div class="f mitr header-text-adjust">
						<img src="/icons/star.svg" alt="คะแนนเฉลี่ย" width="16" height="16" />
						<span class="location-star">{fixNaN(classroom_avg.toFixed(1))}</span>
					</div>
				</div>
				<div class="f score-location">
					<div>ห้องน้ำ</div>
					<div class="f mitr header-text-adjust">
						<img src="/icons/star.svg" alt="คะแนนเฉลี่ย" width="16" height="16" />
						<span class="location-star">{fixNaN(toilet_avg.toFixed(1))}</span>
					</div>
				</div>
				<div class="f score-location">
					<div>โรงอาหาร</div>
					<div class="f mitr header-text-adjust">
						<img src="/icons/star.svg" alt="คะแนนเฉลี่ย" width="16" height="16" />
						<span class="location-star">{fixNaN(canteen_avg.toFixed(1))}</span>
					</div>
				</div>
				<div class="f score-location">
					<div>สนามกีฬา</div>
					<div class="f mitr header-text-adjust">
						<img src="/icons/star.svg" alt="คะแนนเฉลี่ย" width="16" height="16" />
						<span class="location-star">{fixNaN(gym_avg.toFixed(1))}</span>
					</div>
				</div>
			</div>
		</div>
	</a>

	<a href="/school/{$currentSchoolId}/comments" class="section-link">
		<div class="card">
			<header class="f section-header mitr">
				<img src="/mascots/speak.svg" alt="" width="50" height="50" />
				<span class="f header-text-adjust">
					<span class="header-bignum">{total_comment.toLocaleString()}</span>
					ความคิดเห็น
				</span>
				<img src="/chevrons/right.svg" alt="" width="24" height="24" />
			</header>
			<div class="comments-scrolling">
				{#each posts as post (post.Id)}
					<div class="f comment">
						<p class="comment-text">{post.comments}</p>
						<div>
							<div class="comment-date">
								โพสต์เมื่อ {new Date(post.createDate).toLocaleDateString('th')}
							</div>
							<div class="f comment-like">
								<img src="/icons/like.svg" alt="" width="16" height="16" />
								{#if +post.likeCount}
									<span>{post.likeCount.toLocaleString()} คนเห็นด้วยกับสิ่งนี้</span>
								{:else}
									<span>ยังไม่มีใครเห็นด้วยกับสิ่งนี้</span>
								{/if}
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</a>
</div>

<div class="overview-download">
	<a class="download-btn" href="/data/{$LATEST_YEAR}/{$currentSchoolId}.json" download>
		<img src="/icons/download.svg" alt="" width="24" height="24" />
		<span>ดาวน์โหลดข้อมูลโรงเรียน</span>
	</a>
	<p>
		สามารถตรวจสอบความถูกต้องของข้อมูลเพื่อใช้ประกอบการอ้างอิงหรือติดต่อหน่วยงานต้นทางข้อมูลได้ที่<br
		/>
		ระบบสารสนเทศเพื่อการบริหารการศึกษา (Education Management Information System : EMIS)<br />
		<a href="https://data.bopp-obec.info/emis" target="_blank" rel="nofollow noopener noreferrer"
			>https://data.bopp-obec.info/emis</a
		>
	</p>
	<p class="download-update">อัปเดตข้อมูลล่าสุดเมื่อ {$update_date[$LATEST_YEAR]}</p>
</div>

<style lang="scss">
	.header-score {
		margin-left: auto;
		gap: 4px;

		> .spacer {
			width: 4px;
		}
	}

	.section-link {
		&,
		&:hover {
			text-decoration: none;
			color: inherit;
		}

		flex: 1 1 0;
	}

	.mitr {
		font-family: 'Mitr';
		font-weight: 500;
		line-height: 125%;
		letter-spacing: 0.02em;
	}

	.card {
		padding: 16px;

		background: #fff;

		display: flex;
		flex-direction: column;
		gap: 8px;

		margin-bottom: 16px;
	}

	.section-header {
		font-size: 1rem;
		text-decoration: none;
		color: #3c55ab;
		white-space: nowrap;

		> span {
			line-height: 1;

			margin-left: 16px;
			flex: 1 1 0;
		}
	}

	.school-data-grid {
		display: grid;
		gap: 16px;
		grid-template-columns: auto auto;

		@media screen and (min-width: 992px) {
			grid-template-columns: auto;
		}
	}

	.school-data-block {
		padding: 16px;

		background: #ffffff;
		border: 1px solid #fff5dd;
		// box-shadow: 0px 0px 5px rgba(12, 22, 107, 0.2);
		border-radius: 5px;

		justify-content: space-between;
		flex-wrap: wrap;
		gap: 0 16px;
	}

	.school-data-text {
		color: #ddab29;
		align-self: flex-start;
	}

	.school-data-val {
		white-space: nowrap;
		flex: 1 1 0;
		text-align: right;
	}

	.school-bignum {
		font-size: 1.5rem;
		margin-right: 4px;

		@media screen and (min-width: 768px) {
			font-size: 2rem;
		}
	}

	.score-summary {
		justify-content: space-between;
	}

	.header-bignum {
		font-size: 1.5rem;
		font-weight: 700;
	}

	.header-text-adjust {
		gap: 0.5ch;
		line-height: 1;
	}

	.score-locations {
		justify-content: space-between;

		@media screen and (min-width: 992px) {
			flex-direction: column;
			margin-top: 8px;
		}
	}

	.score-location {
		flex-direction: column;

		@media screen and (min-width: 992px) {
			flex-direction: row;
			justify-content: space-between;
			width: 100%;
			padding: 12px 0;
			border-bottom: 1px solid #fedeea;
		}
	}

	.location-star {
		font-size: 1rem;

		@media screen and (min-width: 768px) {
			font-size: 1.2rem;
		}
	}

	.overview-download {
		text-align: center;
		padding: 16px 16px 0;

		> p {
			color: #0c166b;
			margin: 16px 0;
		}

		.download-update {
			color: #9daad5;
		}
	}

	@media screen and (min-width: 992px) {
		.overview-container {
			display: flex;
			gap: 16px;
			padding: 40px 40px 0;
		}

		.overview-download {
			padding: 24px 40px 0;
		}
	}

	.comment {
		align-items: flex-start;
		flex-direction: column;

		padding: 16px;
		gap: 8px;

		background: #ffffff;
		border: 1px solid #ecf7f7;
		border-radius: 5px;

		flex: 0 0 80%;
		max-width: 360px;

		@media screen and (min-width: 768px) {
			flex: initial;
			max-width: unset;
		}
	}

	.comment-date {
		font-size: 0.77em;
		color: #b1b2b3;
		margin-bottom: 4px;
	}

	.comment-like {
		font-size: 0.77em;
		color: #9daad5;
		line-height: 1;
		align-items: flex-end;

		> img {
			margin-right: 0.5ch;
		}
	}

	.comment-text {
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.comments-scrolling {
		display: flex;
		overflow-x: auto;
		gap: 8px;

		@media screen and (min-width: 768px) {
			overflow-x: initial;
			flex-direction: column;
		}
	}

	@media screen and (min-width: 768px) {
		.comment:nth-of-type(3) {
			display: none;
		}
	}

	.download-btn {
		display: inline-flex;
		padding: 10px 20px;
		gap: 10px;
		align-items: center;

		background: #3c55ab;
		box-shadow: 0px 1px 4px rgba(12, 22, 107, 0.2);
		border-radius: 20px;
		color: #fff;
		text-decoration: none;
	}
</style>
