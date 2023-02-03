<script lang="ts">
	import { onMount } from 'svelte';
	import { animate, inView } from 'motion';

	import SchoolList from 'components/SchoolList.svelte';
	import ActAiBanner from 'components/ActAiBanner.svelte';
	import InViewLottie from 'components/InViewLottie.svelte';

	import { getLatestActivityList, getStatsList } from 'utils/data_fetching';

	const DEBUG_SCHOOL_LIST = [
		{ id: '1010720001', name: 'พญาไท' },
		{ id: '1010720002', name: 'โฆสิตสโมสร' },
		{ id: '1010720003', name: 'ราชวินิต' },
		{ id: '1010720004', name: 'ทีปังกรวิทยาพัฒน์ (วัดโบสถ์) ในพระราชูปถัมภ์ฯ' },
		{ id: '1010720005', name: 'วัดโสมนัส' }
	];
	let latestActivityList: any[] = [];
	let mostCommentList: any[] = [];
	let mostRatingList: any[] = [];

	let schoolListType: 'latest' | 'score' | 'comment' | 'debug' = 'latest';
	let schoolList: any[] = DEBUG_SCHOOL_LIST;

	$: if (schoolListType === 'latest') {
		schoolList = latestActivityList;
	} else if (schoolListType === 'score') {
		schoolList = mostRatingList;
	} else if (schoolListType === 'comment') {
		schoolList = mostCommentList;
	} else {
		schoolList = DEBUG_SCHOOL_LIST;
	}

	const _getLatestActivityList = async () => {
		latestActivityList = await getLatestActivityList();
	};

	const _getStatsList = async () => {
		const a = await getStatsList();
		mostCommentList = a.mostCommentList;
		mostRatingList = a.mostRatingList;
	};

	onMount(() => {
		_getLatestActivityList();
		_getStatsList();

		inView(
			'.data-cards > .card',
			(info) => {
				animate(info.target, { opacity: 1 }, { duration: 1 });
			},
			{
				amount: 0.9
			}
		);
	});
</script>

<header class="f header">
	<div />
	<p>
		อยากเห็นโรงเรียนของพวกเรา<br class="hide-desktop" />
		เปลี่ยนไปในทางที่ดีขึ้นไหม?
	</p>
	<img
		loading="lazy"
		decoding="async"
		class="header-logo"
		src="/logos/school_gov.svg"
		alt=""
		width="224"
		height="83"
	/>
	<p>
		ชวนทุกคนมาแลกเปลี่ยน<br class="hide-desktop" />
		เพื่อพัฒนาโรงเรียนไปด้วยกัน
	</p>
	<div class="header-detail">
		<div class="f header-detail-col">
			<img loading="lazy" decoding="async" src="/mascots/data.svg" alt="" width="40" height="40" />
			<span
				><span class="nobr">ส่องฐาน</span><br class="hide-desktop" /><span class="nobr">ข้อมูล</span
				></span
			>
		</div>
		<div class="f header-detail-col">
			<img loading="lazy" decoding="async" src="/mascots/star.svg" alt="" width="40" height="40" />
			<span
				><span class="nobr">ให้คะแนน</span><br class="hide-desktop" /><span class="nobr"
					>โรงเรียน</span
				></span
			>
		</div>
		<div class="f header-detail-col">
			<img loading="lazy" decoding="async" src="/mascots/speak.svg" alt="" width="40" height="40" />
			<span
				><span class="nobr">แลกเปลี่ยน</span><br class="hide-desktop" /><span class="nobr"
					>ความคิดเห็น</span
				></span
			>
		</div>
	</div>
	<a class="f search-box" href="/search">
		<img
			loading="lazy"
			decoding="async"
			src="/icons/search-box.svg"
			alt=""
			width="24"
			height="24"
		/>
		<span>ลองค้นหาโรงเรียนคุณ</span>
	</a>
</header>

<section class="school-list-container">
	<h2 class="school-list-header">หรือดูโรงเรียนอื่นที่สนใจ</h2>
	<div class="overflow-x">
		<div class="f choice-con">
			<input
				id="school-list-choice1"
				class="school-list-radio"
				type="radio"
				bind:group={schoolListType}
				value="latest"
			/>
			<label for="school-list-choice1" class="f radio-pill">
				<span>ล่าสุด</span>
			</label>
			<input
				id="school-list-choice2"
				class="school-list-radio"
				type="radio"
				bind:group={schoolListType}
				value="score"
			/>
			<label for="school-list-choice2" class="f radio-pill">
				<span>คะแนนเสียงมากที่สุด</span>
			</label>
			<input
				id="school-list-choice3"
				class="school-list-radio"
				type="radio"
				bind:group={schoolListType}
				value="comment"
			/>
			<label for="school-list-choice3" class="f radio-pill">
				<span>ความเห็นมากสุด</span>
			</label>
			<input
				id="school-list-choice4"
				class="school-list-radio"
				type="radio"
				bind:group={schoolListType}
				value="debug"
			/>
			<label for="school-list-choice4" class="f radio-pill">
				<span>ทดสอบระบบ</span>
			</label>
		</div>
	</div>
	<SchoolList school_list={schoolList} />
</section>

<section class="information" id="information">
	<h2 class="f jcc">
		<img loading="lazy" decoding="async" src="/index/q1.svg" alt="" width="38" height="39" />
		<span>
			School Governance <br class="hide-desktop" />คืออะไร?<br />
			<img
				loading="lazy"
				decoding="async"
				src="/chevrons/bottom.svg"
				alt=""
				width="24"
				height="24"
			/>
		</span>
		<img loading="lazy" decoding="async" src="/index/q2.svg" alt="" width="33" height="40" />
	</h2>
	<p class="info-title1">เมื่อการแก้ไขปัญหาโรงเรียนแบบเดิม ๆ ไม่ตอบโจทย์...</p>
	<p>
		ในอดีตเมื่อนักเรียนอย่างพวกเรา อยากร่วมแสดงความคิดเห็น หรือคิดจะพัฒนาอะไรสักอย่างในโรงเรียน
		การส่งจดหมายร้องทุกข์ หรือเขียนโน๊ตไปหย่อนในกล่องรับเรื่องหน้าห้อง ผอ.
		คงจะเป็นทางเลือกที่ดีที่สุด
	</p>
	<p>
		แต่น่าเสียดายที่วิธีการเหล่านั้นอาจจะไม่ได้สัมฤทธิ์ผลเสมอไป หลายปีที่ผ่านมา
		นักเรียนหลายต่อหลายโรงเรียน ต่างพยายามส่งเสียงของพวกเขาออกไปนอกโรงเรียน
		เพื่อหวังจะเห็นความเปลี่ยนแปลง
	</p>
	<figure>
		<InViewLottie class="balloon-img" src="/lotties/wordbubble.json" />
		<figcaption>
			ที่มา: <a
				href="https://www.thaipbs.or.th/news/content/315668"
				target="_blank"
				rel="nofollow noopener noreferrer">สำนักข่าว Thai PBS</a
			>
		</figcaption>
	</figure>
	<p class="info-title2">
		แต่ไม่ใช่ทุกคำเรียกร้องที่จะไปได้ไกล เกินกว่าพาดหัวข่าว หรือ ข้อความในโลกอินเทอร์เน็ต
	</p>
	<p class="info-title3">การมีส่วนร่วม<br class="hide-desktop" />จึงเป็นกุญแจสำคัญ…</p>
	<p>
		การจะผลักดันให้โรงเรียนพัฒนาต่อไปได้ ต้องอาศัย <strong class="nobr">การมีส่วนร่วม</strong>
		ซึ่งไม่ได้มาจากแค่นักเรียนอย่างพวกเราเพียงฝ่ายเดียว แต่ผู้อำนวยการ คุณครู บุคลากร ฯลฯ ก็เป็นกำลังสำคัญในการร่วมรับรู้ข้อมูลของโรงเรียน
		ก่อนนำไปสู่การแลกเปลี่ยน แสดงความคิดเห็นและแก้ปัญหาเพื่อพัฒนาโรงเรียนไปพร้อมกับพวกเราด้วย
	</p>
	<InViewLottie class="contribute-img" src="/lotties/key.json" />
</section>

<section class="origin">
	<p class="origin-title">นี่คือที่มาของ</p>
	<img
		loading="lazy"
		decoding="async"
		class="origin-logo"
		src="/logos/school_gov.svg"
		alt=""
		width="224"
		height="83"
	/>
	<p style="line-height:1.7">
		เครื่องมือที่จะแสดง <a
			href="https://data.bopp-obec.info/emis/index.php"
			target="_blank"
			rel="nofollow noopener noreferrer">ฐานข้อมูลโรงเรียน</a
		>
		ซึ่งรวบรวมโดยสำนักงานคณะกรรมการการศึกษาขั้นพื้นฐาน (สพฐ.) เพื่อช่วยให้ทุกคนสามารถตรวจสอบข้อมูลสำคัญต่าง
		ๆ ที่เกี่ยวข้องกับโรงเรียนได้
	</p>
	<h3 class="f jcc">
		<InViewLottie class="lottie-mini" src="/lotties/data_ch.json" loop autoplay />
		<span>ส่องข้อมูลโรงเรียนของเรา</span>
		<InViewLottie class="lottie-mini flip" src="/lotties/data_ch.json" loop autoplay />
	</h3>
	<div class="f data-cards">
		<div class="card">
			<h4>
				<img
					src="/icons/location-b.svg"
					alt=""
					loading="lazy"
					decoding="async"
					width="16"
					height="16"
				/>
				<span>ข้อมูลพื้นฐานโรงเรียน</span>
				<img
					src="/icons/location-b.svg"
					alt=""
					loading="lazy"
					decoding="async"
					width="16"
					height="16"
				/>
			</h4>
			<p>เช็ครหัส ที่อยู่ เบอร์โทรโรงเรียน ฯลฯ</p>
		</div>
		<div class="card">
			<h4>
				<img src="/icons/cap.svg" alt="" loading="lazy" decoding="async" width="16" height="16" />
				<span>ข้อมูลนักเรียน</span>
				<img src="/icons/cap.svg" alt="" loading="lazy" decoding="async" width="16" height="16" />
			</h4>
			<p>นับจำนวนเพื่อนพี่น้องร่วมสถาบัน</p>
		</div>
		<div class="card">
			<h4>
				<img
					src="/icons/person-b.svg"
					alt=""
					loading="lazy"
					decoding="async"
					width="16"
					height="16"
				/>
				<span>ข้อมูลบุคลากร</span>
				<img
					src="/icons/person-b.svg"
					alt=""
					loading="lazy"
					decoding="async"
					width="16"
					height="16"
				/>
			</h4>
			<p>เช็คจำนวนครูมีสัดส่วนเท่าไรเมื่อเทียบกับนักเรียน</p>
		</div>
		<div class="card">
			<h4>
				<img src="/icons/chair.svg" alt="" loading="lazy" decoding="async" width="16" height="16" />
				<span>ข้อมูลอุปกรณ์</span>
				<img src="/icons/chair.svg" alt="" loading="lazy" decoding="async" width="16" height="16" />
			</h4>
			<p>ตรวจดูวัสดุ อุปกรณ์การเรียนต่าง ๆ ใช้งานได้จริงครบถ้วนหรือไม่</p>
		</div>
		<div class="card">
			<h4>
				<img
					src="/icons/school.svg"
					alt=""
					loading="lazy"
					decoding="async"
					width="16"
					height="16"
				/>
				<span>ข้อมูลสิ่งปลูกสร้าง</span>
				<img
					src="/icons/school.svg"
					alt=""
					loading="lazy"
					decoding="async"
					width="16"
					height="16"
				/>
			</h4>
			<p>เช็คสภาพสิ่งปลูกสร้าง จำนวนห้องเรียน ตรงกับความเป็นจริงแค่ไหน</p>
		</div>
	</div>
	<div class="act-banner">
		<ActAiBanner
			text="โดยทุกคนยังสามารถค้นหาข้อมูลเพิ่มเติมเกี่ยวกับอุปกรณ์ในโรงเรียนและการก่อสร้างอาคารได้ที่เครื่องมือ "
		/>
	</div>
	<p>
		พร้อมเทียบข้อมูลระหว่างปีการศึกษา เมื่อมีการอัปเดตข้อมูลใหม่ และ Download ไปใช้งานต่อในรูปแบบ
		CSV ได้
	</p>
</section>

<section class="f open-join-learn">
	<h2>
		การเปิดฐานข้อมูลโรงเรียน<br class="hide-desktop" />
		เป็นส่วนหนึ่งของ<br />
		Open Join Learn
	</h2>
	<p>
		กระบวนการ Open Join Learn คือกลไกสำคัญ ที่จะช่วยส่งเสริมให้การพัฒนาขับเคลื่อนโรงเรียน
		ของเราเกิดขึ้นได้จริง โดยนอกจากทุกคนจะต้องมี โอกาสรับรู้ข้อมูลของโรงเรียนแล้ว
		<strong
			><span class="nobr">ยังต้องมี</span><span class="nobr">พื้นที่สำหรับ</span><span class="nobr"
				>ตรวจสอบ</span
			>&nbsp;<span class="nobr">รายงาน</span>&nbsp;<span class="nobr">ไปจนถึง</span><span
				class="nobr">สามารถ</span
			><span class="nobr">แลกเปลี่ยน</span><span class="nobr">ความคิดเห็น</span><span class="nobr"
				>ร่วมกันได้</span
			></strong
		>
	</p>
	<InViewLottie class="openjoinlearn-img" src="/lotties/openjoinlearn.json" />
	<p>
		การสร้างพื้นที่ปลอดภัยให้ทุกคนมีส่วนร่วมจึงสำคัญมาก ไม่เพียงเพื่อให้โรงเรียนก้าวไปข้างหน้าได้
		<strong
			><span class="nobr">แต่เพื่อ</span><span class="nobr">ส่งเสริม</span><span class="nobr"
				>ให้</span
			><span class="nobr">เกิดบรรยากาศ</span><span class="nobr">ของการบริหาร</span><span
				class="nobr">จัดการ</span
			><span class="nobr">ที่โปร่งใส</span></strong
		> และเราในฐานะนักเรียนก็จะได้ ฝึกฝนบทบาทการตั้งคำถามตรวจสอบและ แลกเปลี่ยนความคิดเห็นไปด้วย…ก่อนก้าวไปเป็น
		พลเมืองในโลกแห่งความเป็นจริง
	</p>
</section>

<section class="f feature">
	<p>
		School Governace จึงไม่ได้มีแค่ข้อมูลโรงเรียนให้ได้ส่องกันเท่านั้น แต่เพื่อน ๆ
		ยังสามารถเข้ามาช่วยกัน
		<strong>
			<span class="nobr">เปรียบเทียบ</span><span class="nobr">สิ่ง</span><span class="nobr"
				>อำนวยความสะดวก</span
			><span class="nobr">ต่าง ๆ&nbsp;</span><span class="nobr">ในโรงเรียน</span><span class="nobr"
				>ว่า</span
			><span class="nobr">ได้มาตรฐาน</span><span class="nobr">หรือไม่</span>&nbsp;<span class="nobr"
				>ไปจนถึง</span
			><span class="nobr">ส่ง Feedback</span>
		</strong>
		กลับไปยังโรงเรียนและผู้บริหารที่มีส่วนเกี่ยวข้องกับโรงเรียนของเรา
	</p>
	<div class="f feature-card-container">
		<div class="feature-card">
			<h3 class="f">
				<InViewLottie class="lottie-mini" src="/lotties/rating_completed.json" loop autoplay />
				<span>ให้คะแนนโรงเรียน</span>
				<InViewLottie class="lottie-mini flip" src="/lotties/rating_completed.json" loop autoplay />
			</h3>
			<p>เทียบบริการในโรงเรียนกับเกณฑ์มาตรฐาน พร้อมประเมิน ให้คะแนนโรงเรียนในแต่ละด้าน</p>
		</div>
		<div class="feature-card">
			<h3 class="f">
				<InViewLottie class="lottie-mini" src="/lotties/feedback_completed.json" loop autoplay />
				<span>โรงเรียนในมุมของเรา</span>
				<InViewLottie
					class="lottie-mini flip"
					src="/lotties/feedback_completed.json"
					loop
					autoplay
				/>
			</h3>
			<p>
				แสดงความคิดเห็นโดยไม่ระบุตัวตน ส่งประเด็น ปัญหาต่าง ๆ ไปยังบุคคลที่เกี่ยวข้อง
				ดูนโยบายข้อมูลส่วนบุคคล
			</p>
		</div>
		<div class="feature-card">
			<h3 class="f">
				<InViewLottie class="lottie-mini" src="/lotties/announce_ch.json" loop autoplay />
				<span>ติดตามประกาศ</span>
				<InViewLottie class="lottie-mini flip" src="/lotties/announce_ch.json" loop autoplay />
			</h3>
			<p>ช่องทางสำหรับสื่อสารหรือตอบกลับข้อคิดเห็นของเพื่อน ๆ โดยตรงจากโรงเรียน</p>
		</div>
	</div>
	<a class="f search-box" href="/search">
		<img
			loading="lazy"
			decoding="async"
			src="/icons/search-box.svg"
			alt=""
			width="24"
			height="24"
		/>
		<span>ลองค้นหาโรงเรียนคุณ</span>
	</a>
</section>

<section class="f ending">
	<p>
		แชร์ให้เพื่อน ๆ มาร่วมตรวจสอบด้วยกัน<br />
		<strong>#schoolgovernanceTH</strong>
	</p>
	<div class="f social-links">
		<a
			href="http://www.facebook.com/sharer/sharer.php?u=https://schoolgov.actai.co/"
			target="_blank"
			rel="nofollow noopener noreferrer"
		>
			<img
				loading="lazy"
				decoding="async"
				src="/icons/facebook.svg"
				alt="Facebook"
				width="40"
				height="40"
			/>
		</a>
		<a
			href="https://twitter.com/intent/tweet?url=https://schoolgov.actai.co/"
			target="_blank"
			rel="nofollow noopener noreferrer"
		>
			<img
				loading="lazy"
				decoding="async"
				src="/icons/twitter.svg"
				alt="Twitter"
				width="40"
				height="40"
			/>
		</a>
		<a
			href="https://social-plugins.line.me/lineit/share?url=https://schoolgov.actai.co/"
			target="_blank"
			rel="nofollow noopener noreferrer"
		>
			<img
				loading="lazy"
				decoding="async"
				src="/icons/line.svg"
				alt="Line"
				width="40"
				height="40"
			/>
		</a>
	</div>
	<div class="f more-links">
		<span class="bold">ติดตามข้อมูลข่าวสารเพิ่มเติมได้ที่</span>
		<a
			href="https://www.facebook.com/wethestudentsTH"
			target="_blank"
			rel="nofollow noopener noreferrer">Facebook: We The students Thailand</a
		>
		<a href="https://twitter.com/wethestudentst1" target="_blank" rel="nofollow noopener noreferrer"
			>Twitter: We The Student TH</a
		>
	</div>
</section>

<footer class="f footer">
	<div class="f credit">
		<span>Powered by</span>
		<img
			loading="lazy"
			decoding="async"
			class="footer-img"
			src="/logos/act.svg"
			alt=""
			width="32"
			height="24"
		/>
	</div>
	<div class="f credit">
		<span>Co-Developed by</span>
		<img
			loading="lazy"
			decoding="async"
			class="footer-img footer2"
			src="/logos/pu.svg"
			alt=""
			width="50"
			height="16"
		/>
		<img
			loading="lazy"
			decoding="async"
			class="footer-img footer2"
			src="/logos/hand.png"
			alt=""
			width="42"
			height="16"
		/>
	</div>
	<div class="f credit">
		<span>Sponsors by </span>
		<img
			loading="lazy"
			decoding="async"
			class="footer-img footer3"
			src="/logos/act_full.svg"
			alt=""
			width="66"
			height="34"
		/>
		<img
			loading="lazy"
			decoding="async"
			class="footer-img footer3"
			src="/logos/tsri.png"
			alt=""
			width="26"
			height="32"
		/>
		<img
			loading="lazy"
			decoding="async"
			class="footer-img footer3"
			src="/logos/econ.png"
			alt=""
			width="40"
			height="32"
		/>
		<img
			loading="lazy"
			decoding="async"
			class="footer-img footer3"
			src="/logos/nrct.png"
			alt=""
			width="23"
			height="32"
		/>
	</div>
	<p>
		School Governance ต่อยอดจากแพลตฟอร์ม We The Students
		หนึ่งในผลการวิจัยภายใต้ชุดโครงการวิจัยเพื่อสังคมไทยไร้คอร์รัปชัน ระยะที่ 2 โดย ผศ. ดร.ธานี
		ชัยวัฒน์ และคณะ<br class="hide-desktop" /> คณะเศรษฐศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย สนับสนุนโดย สำนักงานการวิจัยแห่งชาติ
		(วช.) และสำนักงานคณะกรรมการส่งเสริมวิทยาศาสตร์ วิจัยและนวัตกรรม (สกสว.)
	</p>
</footer>

<style lang="scss" scoped>
	.nobr {
		white-space: nowrap;
	}

	.header,
	.school-list-container,
	.information,
	.origin,
	.open-join-learn,
	.feature,
	.ending,
	.footer {
		font-size: 0.8125rem;
	}

	.header {
		background: #3c55ab;
		border-radius: 0 0 24px 24px;
		min-height: 70vh;

		flex-direction: column;
		justify-content: space-between;
		text-align: center;

		color: #fff;

		margin-bottom: 20px;
	}

	.header-logo {
		width: 70%;
		height: auto;
	}

	.header-detail {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 24px;
	}

	.header-detail-col {
		flex-direction: column;
		gap: 8px;
		flex: 1 1 0;

		> span {
			display: block;

			font-family: 'Mitr';
			font-weight: 500;
			letter-spacing: 0.02em;
		}
	}

	.search-box {
		width: 90%;
		height: 40px;

		background: #fff;
		box-shadow: 0 0 4px rgb(12 22 107 / 20%);
		border-radius: 30px;

		margin-bottom: -20px;
		padding: 0 16px;
		gap: 8px;

		line-height: 1;
		color: #3c55ab;
		text-decoration: none;
	}

	.school-list-container {
		padding: 32px 16px 24px;
	}

	.school-list-header {
		font-family: 'IBM Plex Sans Thai Looped';
		font-weight: 400;
		font-size: 13px;
		line-height: 1;
		color: #16338f;
	}

	.choice-con {
		gap: 4px;
		margin: 16px 0;
	}

	input.school-list-radio {
		position: absolute;
		opacity: 0;
		width: 0;
		pointer-events: none;

		& + .radio-pill {
			height: 28px;
			padding: 0 10px;

			border: 1px solid #c7eaff;
			border-radius: 20px;

			font-size: 0.8125rem;
			line-height: 1;
			color: #3da4df;
			white-space: nowrap;

			cursor: pointer;
		}

		&:checked + .radio-pill {
			background: #c7eaff;
			color: #16338f;
		}
	}

	.information {
		text-align: center;
		color: #3c55ab;
		padding: 0 16px 48px;

		> h2 {
			font-family: 'Mitr';
			font-weight: 500;
			font-size: 20px;

			letter-spacing: 0.02em;
			gap: 8px;
		}

		.info-title1,
		.info-title2,
		.info-title3 {
			font-family: 'Mitr';
			font-weight: 700;
			font-size: 1.25rem;
			text-align: center;
			letter-spacing: 0.02em;

			color: #3c55ab;

			margin: 48px 0 24px;
		}

		.info-title2 {
			font-size: 1rem;
			margin: 24px 0;
			font-weight: 500;
		}

		.info-title3 {
			font-size: 1.5625rem;
			color: #fa7cc7;
			margin: 24px 0;
		}

		p {
			margin-bottom: 24px;
		}

		figcaption,
		figcaption > a {
			font-family: 'IBM Plex Sans Thai Looped';
			font-size: 0.625rem;
			color: #9daad5;
			margin-top: 8px;
		}
	}

	.origin {
		background: #3c55ab;
		border-radius: 24px 24px 0 0;
		padding: 24px 16px;
		color: #fff;
		text-align: center;

		.origin-logo {
			margin: 16px 0;
		}

		a {
			color: #fff;
		}

		h3 {
			font-family: 'Mitr';
			font-weight: 500;
			font-size: 1rem;
			letter-spacing: 0.02em;
			color: #fff;

			gap: 12px;
			margin: 24px 0;
		}

		.data-cards {
			gap: 16px;
			flex-direction: column;
			align-items: stretch;

			@media screen and (min-width: 768px) {
				flex-direction: row;
				margin-inline: calc(-50% + 56px);
			}

			> .card {
				h4 {
					font-family: 'Mitr';
					font-weight: 500;
					font-size: 1rem;
					letter-spacing: 0.02em;
					margin-bottom: 8px;

					display: flex;
					align-items: center;
					justify-content: space-between;
					gap: 8px;
				}

				background: #fff5dd;
				box-shadow: 0 1px 4px rgba(12, 22, 107, 0.2);
				border-radius: 5px;
				padding: 12px 16px;
				color: #3c55ab;

				flex: 1 1 0;

				opacity: 0;
			}
		}

		.act-banner {
			margin: 16px 0 24px;
		}
	}

	.open-join-learn {
		padding: 40px 16px;
		text-align: center;
		color: #3c55ab;

		flex-direction: column;
		gap: 24px;

		h2 {
			font-family: 'Mitr';
			font-weight: 500;
			font-size: 1.25rem;
			letter-spacing: 0.02em;
		}
	}

	.feature {
		padding: 24px 16px 0;
		margin-bottom: 20px;
		text-align: center;
		background: #3c55ab;
		border-radius: 0 0 24px 24px;
		color: #fff;
		flex-direction: column;
		gap: 24px;

		.feature-card-container {
			gap: 16px;
			align-items: stretch;
			flex-direction: column;

			@media screen and (min-width: 768px) {
				flex-direction: row;
				margin-inline: calc(-50% + 56px);
			}

			.feature-card {
				background: rgba(255, 255, 255, 0.1);
				border-radius: 5px;
				padding: 16px;

				flex: 1 1 0;

				h3 {
					font-family: 'Mitr';
					font-weight: 500;
					font-size: 1rem;
					text-align: center;
					letter-spacing: 0.02em;
					gap: 12px;
					justify-content: center;
					margin-bottom: 8px;
				}
			}
		}
	}

	.ending {
		margin-top: 32px;
		padding: 24px;
		color: #3c55ab;
		flex-direction: column;
		text-align: center;

		.social-links {
			gap: 20px;
			margin: 24px 0;
		}

		.more-links {
			flex-direction: column;
			gap: 4px;

			a {
				color: #3c55ab;
			}
		}

		strong,
		.bold {
			font-weight: 500;
		}
	}

	.footer {
		flex-direction: column;
		padding: 24px 16px 40px;

		background: #0c166b;
		border-radius: 24px 24px 0 0;
		color: #fff;
		text-align: center;

		gap: 16px;

		.credit {
			gap: 10px;
		}

		p {
			margin-top: 8px;
		}
	}

	:global(.balloon-img),
	:global(.contribute-img),
	:global(.openjoinlearn-img) {
		margin: auto;
	}

	:global(.balloon-img) {
		width: calc(100% + 32px);
		overflow: hidden;
		position: relative;
		left: -16px;
	}

	:global(.balloon-img > div) {
		width: 120%;
		position: relative;
		left: -10%;
		height: auto;
	}

	.footer-img {
		width: auto;
		height: 24px;

		&.footer2 {
			height: 16px;
		}

		&.footer3 {
			height: 32px;
		}
	}

	// ██████╗ ███████╗███████╗██╗  ██╗████████╗ ██████╗ ██████╗
	// ██╔══██╗██╔════╝██╔════╝██║ ██╔╝╚══██╔══╝██╔═══██╗██╔══██╗
	// ██║  ██║█████╗  ███████╗█████╔╝    ██║   ██║   ██║██████╔╝
	// ██║  ██║██╔══╝  ╚════██║██╔═██╗    ██║   ██║   ██║██╔═══╝
	// ██████╔╝███████╗███████║██║  ██╗   ██║   ╚██████╔╝██║
	// ╚═════╝ ╚══════╝╚══════╝╚═╝  ╚═╝   ╚═╝    ╚═════╝ ╚═╝

	@media screen and (min-width: 768px) {
		.header,
		.school-list-container,
		.information,
		.origin,
		.open-join-learn,
		.feature,
		.ending,
		.footer {
			padding-inline: 25%;
			font-size: 1rem;
		}

		.hide-desktop {
			display: none;
		}

		.header {
			p {
				font-size: 1.25rem;
			}

			.header-detail {
				gap: 32px;

				.header-detail-col {
					img {
						width: 64px;
						height: 64px;
					}
				}
			}
		}

		.search-box {
			padding: 16px;
			height: 56px;
			margin-bottom: -28px;
		}

		.school-list-container {
			padding-block: 40px;

			.school-list-header {
				font-size: 1rem;
			}
		}

		.information {
			> h2 {
				gap: 32px;

				> span {
					font-size: 1.25rem;
				}
			}

			.info-title1 {
				font-size: 1.5625rem;
			}

			.info-title2 {
				font-size: 1.25rem;
			}

			.info-title3 {
				font-size: 1.9375rem;
			}

			figcaption,
			figcaption > a {
				font-size: 0.8125rem;
			}
		}

		.origin {
			.origin-title {
				font-size: 1.25rem;
			}

			h3 {
				font-size: 1.25rem;
			}

			.data-cards {
				> .card {
					h4 {
						font-size: 1.25rem;
					}
				}
			}
		}

		.open-join-learn {
			gap: 32px;

			h2 {
				font-size: 1.5625rem;
			}
		}

		.feature {
			padding: 40px 25% 0;
			margin-bottom: 28px;

			.feature-card-container .feature-card h3 {
				margin-bottom: 16px;
			}
		}

		.ending {
			font-size: 1.25rem;
		}

		:global(.balloon-img),
		:global(.contribute-img),
		:global(.openjoinlearn-img) {
			max-width: 480px;
			width: 100%;
			height: auto;
		}

		:global(.balloon-img) {
			left: 0;
		}

		:global(.balloon-img > div) {
			width: auto;
			position: relative;
			left: 0;
			height: auto;
		}

		:global(.openjoinlearn-img) {
			max-width: 350px;
		}

		.footer-img {
			width: auto;
			height: 40px;

			&.footer2 {
				height: 32px;
			}

			&.footer3 {
				height: 56px;
			}
		}
	}

	.overflow-x {
		overflow-x: auto;
	}

	:global(.lottie-mini) {
		width: 40px;
		height: 40px;
	}

	:global(.lottie-mini.flip) {
		transform: scaleX(-100%);
	}
</style>
