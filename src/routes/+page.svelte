<script lang="ts">
	import { animate, inView } from 'motion';
	import { onMount } from 'svelte';

	import ActAiBanner from 'components/ActAiBanner.svelte';
	import InViewLottie from 'components/InViewLottie.svelte';
	import SchoolList from 'components/SchoolList.svelte';

	import { getLatestActivityList, getStatsList } from 'utils/data_fetching';

	let latestActivityList: any[] = [];
	let mostCommentList: any[] = [];
	let mostRatingList: any[] = [];

	let schoolListType: 'latest' | 'score' | 'comment' = 'latest';
	let schoolList: any[] = [];

	$: if (schoolListType === 'score') {
		schoolList = mostRatingList;
	} else if (schoolListType === 'comment') {
		schoolList = mostCommentList;
	} else {
		schoolList = latestActivityList;
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

		inView(
			'.socialmedia-card',
			(info) => {
				animate(info.target, { transform: 'scale(1) translateY(0)', opacity: 1 }, { duration: 1 });
			},
			{
				amount: 0.9
			}
		);
	});
</script>

<svelte:head>
	<title>โรงเรียนโปร่งใส</title>
	<meta property="og:title" content="โรงเรียนโปร่งใส" />
	<meta name="twitter:title" content="โรงเรียนโปร่งใส" />
</svelte:head>

<header class="f header">
	<div />
	<div class="f header-logo-group">
		<img
			loading="eager"
			decoding="async"
			class="header-logo"
			src="/logos/school_gov.svg"
			alt=""
			width="200"
			height="130"
		/>
		<p class="header-bridge-text">
			ชวนทุกคนมาแลกเปลี่ยน<br class="hide-desktop" />
			<span class="nobr">เพื่อพัฒนาโรงเรียนไปด้วยกัน</span>
		</p>
		<div class="header-detail">
			<div class="f header-detail-col">
				<img
					loading="lazy"
					decoding="async"
					src="/mascots/data.svg"
					alt=""
					width="40"
					height="40"
				/>
				<span
					><span class="nobr">ส่องฐาน</span><br class="hide-desktop" /><span class="nobr"
						>ข้อมูล</span
					></span
				>
			</div>
			<div class="f header-detail-col">
				<img
					loading="lazy"
					decoding="async"
					src="/mascots/star.svg"
					alt=""
					width="40"
					height="40"
				/>
				<span
					><span class="nobr">ให้คะแนน</span><br class="hide-desktop" /><span class="nobr"
						>โรงเรียน</span
					></span
				>
			</div>
			<div class="f header-detail-col">
				<img
					loading="lazy"
					decoding="async"
					src="/mascots/speak.svg"
					alt=""
					width="40"
					height="40"
				/>
				<span
					><span class="nobr">แลกเปลี่ยน</span><br class="hide-desktop" /><span class="nobr"
						>ความคิดเห็น</span
					></span
				>
			</div>
		</div>
	</div>
	<div />
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
				<span>จำนวนรีวิว</span>
			</label>
			<input
				id="school-list-choice3"
				class="school-list-radio"
				type="radio"
				bind:group={schoolListType}
				value="comment"
			/>
			<label for="school-list-choice3" class="f radio-pill">
				<span>จำนวนความเห็น</span>
			</label>
		</div>
	</div>
	<SchoolList
		is_count_rating={schoolListType !== 'latest'}
		is_count_all_comments={schoolListType === 'comment'}
		school_list={schoolList}
	/>
	<p class="schoollist-footnote">*จำนวนรีวิวและความเห็นนับรวมทั้งหมดทุกปีการศึกษา</p>
</section>

<section class="information" id="information">
	<h2 class="f jcc" style="margin-bottom:-8px">
		<img loading="lazy" decoding="async" src="/index/q1.svg" alt="" width="38" height="39" />
		<span>
			"โรงเรียนโปร่งใส" <br class="hide-desktop" />คืออะไร?<br />
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
	<p class="info-title1">
		เมื่อการแก้ไขปัญหาโรงเรียนแบบ<span class="nobr">เดิม ๆ</span> ไม่ตอบโจทย์...
	</p>
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
	<div class="socialmedia-card">
		<div class="f smc-profile">
			<img src="/index/sad.svg" alt="" width="40" height="40" loading="lazy" decoding="async" />
			<div>
				<div class="smc-name">Anon</div>
				<div class="smc-id">@anonymous01</div>
			</div>
		</div>
		<p class="smc-text">
			ค่าเทอมอย่างแพงแต่ แอร์เสีย ห้องมีแต่ฝุ่นห้องน้ำทุเรศมาก โต๊ะเก้าอี้ชำรุด ทางเดิน =
			ไซต์ก่อสร้าง ให้มาทำความสะอาดกันเองครูบางคนริดรอนสิทธิ์ไม่ให้ลงมาแสดงความเห็น
			ผู้บริหารทั้งหลายอิกนอความชุ่ยการบริหาร แจ้งอะไรเสียก็ไม่มาซ่อมจนเรียนจบพึ่งจะมา
		</p>
		<div class="f" style="justify-content:space-between">
			<img
				class="smc-like"
				src="/index/love.svg"
				alt=""
				width="16"
				height="16"
				loading="lazy"
				decoding="async"
			/>
			<span class="smc-id">May 19, 2022</span>
		</div>
	</div>
	<div class="socialmedia-card">
		<div class="f smc-profile">
			<img src="/index/angry.svg" alt="" width="40" height="40" loading="lazy" decoding="async" />
			<div>
				<div class="smc-name">Anny</div>
				<div class="smc-id">@anonymous02</div>
			</div>
		</div>
		<p class="smc-text">
			ที่สนามแถวๆแป้น6 มีตะปูโผล่ขึ้นมาทุเรดสุดๆ อันนี้เรียกว่าพร้อมยังโกโก้ออกมาพูดที
		</p>
		<div class="f" style="justify-content:space-between">
			<img
				class="smc-like"
				src="/index/love.svg"
				alt=""
				width="16"
				height="16"
				loading="lazy"
				decoding="async"
			/>
			<span class="smc-id">May 19, 2022</span>
		</div>
	</div>
	<p>
		ที่มา: <a
			href="https://www.thaipbs.or.th/news/content/315668"
			target="_blank"
			rel="nofollow noopener noreferrer">สำนักข่าว Thai PBS</a
		>
	</p>
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
	<p class="origin-title">
		เพราะการมีส่วนร่วมคือกุญแจสำคัญในการพัฒนาโรงเรียน <span class="nobr">นี่จึงเป็นที่มาของ</span>
	</p>
	<img
		loading="lazy"
		decoding="async"
		class="origin-logo"
		src="/logos/school_gov.svg"
		alt=""
		width="200"
		height="130"
	/>
	<p style="line-height:1.7">
		เครื่องมือที่จะแสดง <a
			href="https://data.bopp-obec.info/emis/index.php"
			target="_blank"
			rel="nofollow noopener noreferrer">ฐานข้อมูลโรงเรียน</a
		>
		ซึ่งรวบรวมโดยสำนักงานคณะกรรมการการศึกษาขั้นพื้นฐาน (สพฐ.) เพื่อช่วยให้ทุกคนสามารถตรวจสอบข้อมูลสำคัญ<span
			class="nobr">ต่าง ๆ</span
		> ที่เกี่ยวข้องกับโรงเรียนได้
	</p>
	<h3 class="f jcc">
		<InViewLottie class="lottie-mini" src="/lotties/data_ch.json" loop autoplay />
		<span>ส่องข้อมูลโรงเรียนของเรา</span>
		<InViewLottie class="lottie-mini flip" src="/lotties/data_ch.json" loop autoplay />
	</h3>
	<div class="data-cards-container">
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
					<img
						src="/icons/chair.svg"
						alt=""
						loading="lazy"
						decoding="async"
						width="16"
						height="16"
					/>
					<span>ข้อมูลอุปกรณ์</span>
					<img
						src="/icons/chair.svg"
						alt=""
						loading="lazy"
						decoding="async"
						width="16"
						height="16"
					/>
				</h4>
				<p>
					ตรวจดูวัสดุ อุปกรณ์การเรียน<span class="nobr">ต่าง ๆ</span> ใช้งานได้จริงครบถ้วนหรือไม่
				</p>
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
					<span>ข้อมูล<span class="nobr">สิ่งปลูกสร้าง</span></span>
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
	</div>
	<div class="act-banner">
		<ActAiBanner
			text="โดยทุกคนยังสามารถค้นหาข้อมูลการจัดซื้อจัดจ้างเกี่ยวกับอุปกรณ์และการก่อสร้างอาคารของโรงเรียนเพิ่มเติมได้ที่เครื่องมือ"
		/>
	</div>
	<p>
		พร้อมเทียบข้อมูลระหว่างปีการศึกษา เมื่อมีการอัปเดตข้อมูลใหม่ และ Download ไปใช้งานต่อในรูปแบบ
		CSV ได้
	</p>
</section>

<section class="f open-join-learn">
	<h2>
		<span class="nobr">การแสดงฐานข้อมูลโรงเรียน</span><br class="hide-desktop" /><span class="nobr"
			>ของแพลตฟอร์ม "โรงเรียนโปร่งใส"</span
		><br />
		<span class="nobr">เป็นส่วนหนึ่งของ</span><br class="hide-desktop" />
		<span class="nobr">Open Join Learn</span>
	</h2>
	<p>
		กระบวนการ Open Join Learn คือกลไกสำคัญ ที่จะช่วยส่งเสริมให้การพัฒนาขับเคลื่อนโรงเรียน
		ของเราเกิดขึ้นได้จริง โดยนอกจากทุกคนจะต้องมีโอกาสรับรู้ข้อมูลของโรงเรียนแล้ว
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
		> และเราในฐานะนักเรียนก็จะได้ฝึกฝนบทบาทการตั้งคำถามตรวจสอบ และแลกเปลี่ยนความคิดเห็นไปด้วย…ก่อนก้าวไปเป็น
		พลเมืองในโลกแห่งความเป็นจริง
	</p>
</section>

<section class="f feature">
	<p>
		"โรงเรียนโปร่งใส" จึงไม่ได้มีแค่ข้อมูลโรงเรียนให้ได้ส่องกันเท่านั้น แต่<span class="nobr"
			>เพื่อน ๆ</span
		>
		ยังสามารถเข้ามาช่วยกัน
		<strong>
			<span class="nobr">เปรียบเทียบ</span><span class="nobr">สิ่ง</span><span class="nobr"
				>อำนวยความสะดวก</span
			><span class="nobr">ต่าง ๆ&nbsp;</span><span class="nobr">ในโรงเรียน</span><span class="nobr"
				>ว่าได้มาตรฐานหรือไม่</span
			>&nbsp;<span class="nobr">ไปจนถึง</span><span class="nobr">ส่ง Feedback</span>
		</strong>
		กลับไปยังโรงเรียนและผู้บริหารที่มีส่วนเกี่ยวข้องกับ<span class="nobr">โรงเรียนของเรา</span>
	</p>
	<div class="f feature-card-container">
		<div class="feature-card">
			<h3 class="f">
				<InViewLottie class="lottie-mini" src="/lotties/rating_completed.json" loop autoplay />
				<span>ให้คะแนนโรงเรียน</span>
				<InViewLottie class="lottie-mini flip" src="/lotties/rating_completed.json" loop autoplay />
			</h3>
			<p>
				เทียบบริการในโรงเรียนกับเกณฑ์มาตรฐาน <span class="nobr">พร้อมประเมิน</span
				>ให้คะแนนโรงเรียนในแต่ละด้าน
			</p>
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
				แสดงความคิดเห็นโดยไม่ระบุตัวตน ส่งประเด็น ปัญหา<span class="nobr">ต่าง ๆ</span> ไปยังบุคคลที่เกี่ยวข้อง
				ดูนโยบายข้อมูลส่วนบุคคล
			</p>
		</div>
		<div class="feature-card">
			<h3 class="f">
				<InViewLottie class="lottie-mini" src="/lotties/announce_ch.json" loop autoplay />
				<span>ติดตามประกาศ</span>
				<InViewLottie class="lottie-mini flip" src="/lotties/announce_ch.json" loop autoplay />
			</h3>
			<p>
				ช่องทางสำหรับสื่อสารหรือตอบกลับข้อคิดเห็นของ<span class="nobr">เพื่อน ๆ</span> โดยตรงจากโรงเรียน
			</p>
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
	<div class="f more-links">
		<span class="bold">ติดตามข้อมูลข่าวสารเพิ่มเติมได้ที่</span>
		<div class="login-success-aligner">
			<a
				class="f login-modal-btn"
				href="https://www.facebook.com/schoolgovTH"
				target="_blank"
				rel="nofollow noopener noreferrer"
			>
				<img
					src="/icons/facebook.svg"
					alt=""
					width="24"
					height="24"
					loading="lazy"
					decoding="async"
				/>
				<span>Facebook Page</span>
			</a>
			<a
				class="f login-modal-btn"
				href="https://twitter.com/wethestudentst1"
				target="_blank"
				rel="nofollow noopener noreferrer"
			>
				<img
					src="/icons/twitter.svg"
					alt=""
					width="24"
					height="24"
					loading="lazy"
					decoding="async"
				/>
				<span>Twitter</span>
			</a>
			<a
				class="f login-modal-btn"
				href="https://line.me/ti/g2/Joczl7Owr2VK_hGM1xUETXXq9wVLxRGEuZM7CQ?utm_source=invitation&utm_medium=link_copy&utm_campaign=default"
				target="_blank"
				rel="nofollow noopener noreferrer"
			>
				<img src="/icons/line.svg" alt="" width="24" height="24" loading="lazy" decoding="async" />
				<span>LINE OpenChat</span>
			</a>
		</div>
	</div>
	<p>
		แชร์ให้<span class="nobr">เพื่อน ๆ</span> มาร่วมตรวจสอบด้วยกัน<br />
		<strong>#โรงเรียนโปร่งใส</strong>
	</p>
	<div class="f social-links">
		<a
			href="http://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fschoolgov.actai.co%2F"
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
			href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fschoolgov.actai.co%2F"
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
			href="https://social-plugins.line.me/lineit/share?url=https%3A%2F%2Fschoolgov.actai.co%2F"
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
</section>

<footer class="f footer">
	<div class="f credit">
		<span class="nobr">Powered by</span>
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
		<span class="nobr">Co-Developed by</span>
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
		<img
			loading="lazy"
			decoding="async"
			class="footer-img footer3"
			src="/logos/siamlab.png"
			alt=""
			width="31"
			height="32"
		/>
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
		"โรงเรียนโปร่งใส" ต่อยอดจากแพลตฟอร์ม We The Students
		หนึ่งในผลการวิจัยภายใต้ชุดโครงการวิจัยเพื่อสังคมไทยไร้คอร์รัปชัน ระยะที่ 2 โดย ผศ. ดร.ธานี
		ชัยวัฒน์ และคณะ<br class="hide-desktop" /> คณะเศรษฐศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย สนับสนุนโดย สำนักงานการวิจัยแห่งชาติ
		(วช.) และสำนักงานคณะกรรมการส่งเสริมวิทยาศาสตร์ วิจัยและนวัตกรรม (สกสว.)
	</p>
	<a href="/terms" class="terms"> นโยบายข้อมูลส่วนบุคคล </a>
</footer>

<style lang="scss">
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

	.terms {
		color: #dddddd;

		&:hover {
			color: #fff;
		}
	}

	.header {
		background: #3c55ab;
		border-radius: 0 0 24px 24px;

		flex-direction: column;
		justify-content: space-between;
		text-align: center;

		color: #fff;

		margin-bottom: 20px;
	}

	.header-logo {
		width: 50%;
		height: auto;
		max-width: 350px;
	}

	.header-bridge-text {
		font-size: 1.2em;
		margin: 16px 0;

		@media screen and (min-width: 768px) {
			margin: 32px 0;
		}
	}

	.header-logo-group {
		flex-direction: column;
		margin-top: 40px;
		width: 100%;
		overflow: hidden;
	}

	.header-detail {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 24px;
		margin-bottom: 16px;
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
		padding: 32px 16px 56px;
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
		padding: 0 16px 24px;
		scroll-margin-top: 104px;

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

			margin: 40px 0 24px;
		}

		.info-title2 {
			font-size: 1rem;
			margin: 40px 0 24px;
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
	}

	.origin {
		background: #3c55ab;
		border-radius: 24px 24px 0 0;
		padding: 24px 16px;
		color: #fff;
		text-align: center;

		.origin-logo {
			margin: 16px 0;
			height: auto;
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

		.data-cards-container {
			@media screen and (min-width: 992px) {
				margin-left: -30%;
				margin-right: -30%;
			}
		}

		.data-cards {
			gap: 16px;
			flex-direction: column;
			align-items: stretch;

			@media screen and (min-width: 992px) {
				flex-direction: row;
				max-width: 1200px;
				margin: auto;
				justify-content: center;
			}

			> .card {
				h4 {
					font-family: 'Mitr';
					font-weight: 500;
					font-size: 1rem;
					letter-spacing: 0.02em;
					margin-bottom: 8px;

					display: flex;
					align-items: baseline;
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
				margin-left: calc(-50% + 56px);
				margin-right: calc(-50% + 56px);
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
		padding: 24px 16px 184px;

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
			padding-left: 20%;
			padding-right: 20%;
			font-size: 1rem;
		}

		.footer {
			padding-bottom: 136px;
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
			padding-top: 40px;

			.school-list-header {
				font-size: 1rem;
			}
		}

		.information {
			scroll-margin-top: 128px;
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

	.login-modal-btn {
		padding: 8px 16px;
		gap: 16px;

		background: #fff;
		box-shadow: 0 1px 4px rgba(12, 22, 107, 0.2);
		border-radius: 200px;
		color: inherit;
		font-size: 0.8125rem;
		border: 1px solid #ced5ea;

		transition: box-shadow 0.1s;

		&,
		&:hover {
			text-decoration: none;
		}

		&:hover {
			box-shadow: 0 0 0 rgba(12, 22, 107, 0.2);
		}

		> span {
			flex: 1 1 0;
		}
	}

	.login-success-aligner {
		display: grid;
		grid-template-columns: max-content;
		justify-content: center;
		gap: 16px;

		margin: 16px 0 24px;

		@media screen and (min-width: 768px) {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	.socialmedia-card {
		padding: 16px;
		margin: 0 auto 16px;
		gap: 8px;

		background: #fff;
		box-shadow: 0 0 4px rgba(12, 22, 107, 0.2);
		border-radius: 10px;

		text-align: left;

		transform: scale(0.8) translateY(50%);
		opacity: 0;

		max-width: 650px;

		.smc-profile {
			gap: 16px;
		}

		.smc-name,
		.smc-id {
			line-height: 1.36;
			font-weight: 500;
		}

		.smc-id {
			font-weight: 400;
			color: #9daad5;
		}

		.smc-text {
			margin: 8px 0;
		}

		@media screen and (min-width: 768px) {
			.smc-like {
				width: 24px;
				height: 24px;
			}
		}
	}

	.schoollist-footnote {
		font-family: 'IBM Plex Sans Thai Looped';
		font-size: 10px;
		line-height: 136%;
		text-align: center;
		color: #9daad5;
		margin-top: 16px;
	}

	@media screen and (min-width: 768px) {
		.schoollist-footnote {
			font-size: 13px;
		}
	}
</style>
