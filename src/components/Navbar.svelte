<script lang="ts">
	import { onMount } from 'svelte';
	import { scroll } from 'motion';
	import {
		signInAnonymously,
		signInWithPopup,
		FacebookAuthProvider,
		signOut,
		ProviderId
	} from 'firebase/auth';

	import Modal from './Modal.svelte';

	import { page } from '$app/stores';
	import { auth, currentUser } from 'stores/firebaseapp';
	import { show_search, search_string } from 'stores/search';
	import { currentSchoolId } from 'stores/school';

	let PAGE_BASE = $page.route.id?.split('/')[1];

	let show_when: 'not_top' | 'always' | 'scroll_up' =
		PAGE_BASE === '' ? 'not_top' : PAGE_BASE === 'search' ? 'always' : 'scroll_up';
	let show = show_when !== 'not_top';

	let show_menu = false;

	const fbProvider = new FacebookAuthProvider();
	const loginFb = () => {
		if ($auth) {
			signInWithPopup($auth, fbProvider);
		}
	};
	const loginTw = () => {
		if ($auth) {
			if (confirm('ฟีเจอร์นี้ยังไม่ได้ทำจ้า แต่จะล็อกอินแบบ Anon ไปก่อนเพื่อทดสอบเว็บไหม?')) {
				signInAnonymously($auth);
			}
		}
	};

	const logout = () => {
		if ($auth) signOut($auth);
	};

	let is_mounted = false;
	onMount(() => {
		is_mounted = true;
		isread_checked = false;
		scroll(({ y }) => {
			if (show_when === 'not_top') {
				if (y.progress !== 0 && show === false) return (show = true);
				if (y.progress === 0 && show === true) return (show = show_menu = false);
				return;
			}
			if (show_when === 'scroll_up') {
				if (y.velocity < 0 && show === false) return (show = true);
				if (y.velocity > 0 && show === true) return (show = show_menu = false);
				return;
			}
		});
	});

	$: {
		PAGE_BASE = $page.route.id?.split('/')[1];
		show_when = PAGE_BASE === '' ? 'not_top' : PAGE_BASE === 'search' ? 'always' : 'scroll_up';
		show = show_when !== 'not_top';
	}

	$: if (is_mounted) {
		document.documentElement.classList.toggle('navbar-shown', show);
	}

	let login_isopen = false;
	let term_isopen = false;

	const term_modal_callback = () => {
		login_isopen = true;
	};

	let isread_checked = false;
</script>

<nav class="f main-nav" class:show class:show_search={$show_search}>
	<a href="#main" class="skip-link">Skip to main content</a>
	{#if PAGE_BASE === 'search'}
		<div class="nav-left">
			<button class="f jcc nav-btn" type="button" on:click={() => ($show_search = true)}>
				<img src="/icons/nav-search.svg" alt="ค้นหา" width="32" height="32" />
			</button>
		</div>
	{/if}
	<div class="nav-logo">
		<a href="/" on:click={() => (show_menu = false)}>
			<img src="/logos/school_gov.svg" alt="" width="108" height="40" />
		</a>
	</div>
	<div class="nav-right nav-search">
		<label class="f">
			<img src="/icons/search-box.svg" alt="" width="24" height="24" />
			<input
				type="text"
				placeholder="พิมพ์ชื่อโรงเรียนหรือจังหวัดที่คุณอยากค้นหา"
				bind:value={$search_string}
			/>
		</label>
		<button
			class="f"
			type="button"
			on:click={() => {
				$show_search = false;
				$search_string = '';
			}}
		>
			<img src="/icons/close-bold.svg" alt="" width="20" height="20" />
		</button>
	</div>
	<div class="f nav-right">
		{#if $currentUser}
			<img
				class="nav-profile round-img"
				src={$currentUser.photoURL ?? '/icons/anon.svg'}
				alt=""
				width="32"
				height="32"
			/>
		{/if}
		<button class="f jcc nav-btn" type="button" on:click={() => (show_menu = !show_menu)}>
			<img src="/icons/nav-ham.svg" alt="เปิดเมนู" width="32" height="32" />
		</button>
		<menu class="nav-menu" class:show={show_menu}>
			{#if PAGE_BASE === 'search'}
				<li class="search-desktop-nav-list">
					<button
						class="f jcc nav-btn search-btn"
						type="button"
						on:click={() => ($show_search = true)}
					>
						<img src="/icons/search.svg" alt="ค้นหา" width="20" height="20" />
						<span>ค้นหาโรงเรียน</span>
					</button>
				</li>
			{:else}
				<li>
					<a href="/search" on:click={() => (show_menu = false)}>
						<img src="/icons/search.svg" alt="" width="20" height="20" />
						<span>ค้นหาโรงเรียน</span>
					</a>
				</li>
			{/if}
			<li>
				<a href="/#information" on:click={() => (show_menu = false)}>
					<img src="/icons/question.svg" alt="" width="20" height="20" />
					<span>School Governance คืออะไร?</span>
				</a>
			</li>
			<li>
				<a href="https://www.google.co.th/">
					<img src="/icons/chat.svg" alt="" width="20" height="20" />
					<span>ติดต่อเจ้าหน้าที่</span>
				</a>
			</li>
			<li class="nav-menu-last">
				{#if $currentUser}
					<button class="logged-in" type="button" on:click={logout}>
						<img
							class="round-img"
							src={$currentUser.photoURL ?? '/icons/anon.svg'}
							alt=""
							width="24"
							height="24"
						/>
						<span>Log out</span>
					</button>
				{:else}
					<button
						type="button"
						on:click={() => {
							login_isopen = true;
						}}>Log in</button
					>
				{/if}
			</li>
		</menu>
	</div>
</nav>
{#if show_when !== 'not_top'}
	<div class="nav-compensate" />
{/if}

<Modal title="Log in" hideTitle bind:isOpen={login_isopen} body_class="f login-modal-body">
	{#if $currentUser}
		<div class="f login-modal-top-content">
			<img class="login-modal-logo" src="/logos/school_gov-b.svg" alt="" width="224" height="83" />
			<div>
				<h3 class="login-modal-title">Log in</h3>
				<p class="login-modal-subtitle">สำเร็จ</p>
			</div>
			<div>
				<div class="f login-img-wrapper">
					<div class="login-img-container">
						<img
							class="login-user-img round-img"
							src={$currentUser.photoURL || '/icons/anon-b.svg'}
							alt=""
							width="80"
							height="80"
						/>
						{#if $currentUser?.providerData?.[0]?.providerId === 'facebook.com'}
							<img
								class="login-social-logo"
								src="/icons/facebook.svg"
								alt=""
								width="24"
								height="24"
							/>
						{/if}
					</div>
				</div>
				<div class="login-modal-subtitle">ยินดีต้อนรับ</div>
				<div>{$currentUser.displayName || $currentUser.email || $currentUser.uid}</div>
			</div>
			{#if $currentSchoolId}
				<div class="fspace small" />
				<a class="f btn-school" href="/school/{$currentSchoolId}/rating">
					<span>ให้คะแนน</span>
					<img src="/icons/star-w.svg" alt="" width="24" height="24" />
				</a>
				<a class="f btn-school blue" href="/school/{$currentSchoolId}/comments">
					<span>แสดงความเห็น</span>
					<img src="/icons/comment-w.svg" alt="" width="24" height="24" />
				</a>
			{:else}
				<div class="fspace" />
				<a class="f search-box" href="/search">
					<img src="/icons/search-box.svg" alt="" width="24" height="24" />
					<span>ลองค้นหาโรงเรียนคุณ</span>
				</a>
			{/if}
		</div>
	{:else}
		<div class="f login-modal-top-content">
			<div>
				<h3 class="login-modal-title">Log in</h3>
				<p class="login-modal-subtitle">เพื่อให้คะแนนและแสดงความคิดเห็น</p>
			</div>
			<img class="login-modal-logo" src="/logos/school_gov-b.svg" alt="" width="224" height="83" />
			<p class="login-modal-text">
				ขอความร่วมมือผู้ใช้งานทุกท่านแสดงความคิดเห็นด้วยภาษาสุภาพเพื่อสร้างสังคมการแลกเปลี่ยนที่เป็นมิตรและสร้างสรรค์
			</p>
			<p class="login-modal-text coral">
				โดย องค์กรต่อต้านคอร์รัปชัน (ประเทศไทย) หรือ ACT
				ซึ่งเป็นองค์กรส่วนกลางที่ไม่ขึ้นตรงต่อโรงเรียนใด
				ขอยืนยันว่าข้อมูลของท่านจะถูกเก็บเป็นความลับและไม่มีการเปิดเผยระหว่างการใช้งาน
			</p>
			<label class="custom-control login-modal-text login-control">
				<input type="checkbox" bind:checked={isread_checked} />
				<span>
					ฉันได้อ่านและยอมรับ&nbsp;
					<button
						class="policy-btn"
						type="button"
						on:click={() => {
							login_isopen = false;
							requestAnimationFrame(() => {
								term_isopen = true;
							});
						}}>นโยบายข้อมูลส่วนบุคคล</button
					>
				</span>
			</label>
		</div>
		<div class="f login-modal-btns">
			<button class="f login-modal-btn" type="button" on:click={loginFb} disabled={!isread_checked}>
				<img src="/icons/facebook.svg" alt="" width="24" height="24" />
				เชื่อมต่อกับ Facebook
			</button>
			<button class="f login-modal-btn" type="button" on:click={loginTw} disabled={!isread_checked}>
				<img src="/icons/twitter.svg" alt="" width="24" height="24" />
				เชื่อมต่อกับ Twitter
			</button>
		</div>
	{/if}
</Modal>

<Modal
	title="นโยบายข้อมูลส่วนบุคคล"
	bind:isOpen={term_isopen}
	onCloseCallback={term_modal_callback}
>
	<div class="policy-content">
		<h3>
			ข้อกำหนดและเงื่อนไขการอนุญาตการใช้บริการและการใช้ข้อมูล ของ องค์กรต่อต้านคอร์รัปชัน
			(ประเทศไทย)
		</h3>
		<p>
			องค์กรต่อต้านคอร์รัปชัน (ประเทศไทย)
			ดำเนินการรวบรวมข้อมูลเปิดสาธารณะของโรงเรียนสังกัดสำนักงานคณะกรรมการการศึกษาขั้นพื้นฐาน (สพฐ.)
			ที่มีความสำคัญต่อการบริหารจัดการและการพัฒนาคุณภาพการให้บริการในสถานศึกษาน
			ทำการเชื่อมโยงและนำเสนอข้อมูลดังกล่าว
			เพื่อประโยชน์ของสาธารณะในการส่งเสริมความโปร่งใสและสร้างการมีส่วนร่วมภายในสถานศึกษา
			โดยอำนวยความสะดวกให้หน่วยงานและผู้ที่เกี่ยวข้องในระบบการศึกษาสามารถวิเคราะห์ข้อมูลเพื่อติดตามตรวจสอบและร่วมแลกเปลี่ยนความคิดเห็นได้โดยง่าย
			และเป็นเครื่องมือในการส่งเสริมธรรมาภิบาล ความโปร่งใส
			และเปิดพื้นที่เพื่อพัฒนาคุณภาพการให้บริการในสถานศึกษา
			ผู้ใช้บริการและผู้ใช้ข้อมูลสามารถเข้าใช้ข้อมูลในเว็บไซต์นี้ได้
			ภายใต้การยอมรับข้อกำหนดและเงื่อนไขการอนุญาตให้ใช้ข้อมูลเพื่อการส่งเสริมธรรมาภิบาลภายในสถานศึกษา
			ดังนี้
		</p>

		<h4>คำนิยาม</h4>
		<p>
			&ldquo;ข้อกำหนด&rdquo; หมายความว่า
			ข้อกำหนดและเงื่อนไขการอนุญาตการใช้บริการและการใช้ข้อมูลเพื่อการส่งเสริมธรรมาภิบาลภายในสถานศึกษา
			ของ องค์กรต่อต้านคอร์รัปชัน (ประเทศไทย)
		</p>
		<p>
			&ldquo;ข้อมูล&rdquo; หมายความว่า สิ่งที่สื่อความหมายให้รู้เรื่องราวข้อเท็จจริงหรือเรื่องอื่นใด
			ไม่ว่าการสื่อความหมายนั้นจะทำได้โดยสภาพของสิ่งนั้นเองหรือโดยผ่านวิธีการใด ๆ
			และไม่ว่าจะได้จัดทำไว้ในรูปของเอกสาร แฟ้ม รายงาน หนังสือ แผนผัง แผนที่ ภาพวาด ภาพถ่าย
			ภาพถ่ายดาวเทียม ฟิล์ม การบันทึกภาพหรือเสียง การบันทึกโดยเครื่องคอมพิวเตอร์ เครื่องมือตรวจวัด
			การสำรวจระยะไกล หรือวิธีอื่นใดที่ทำให้สิ่งที่บันทึกไว้ปรากฏได้
		</p>
		<p>
			&ldquo;ข้อมูลเปิดเผย&rdquo; หมายความว่า ข้อมูลที่หน่วยงานหรือองค์กร
			เปิดเผยต่อสาธารณะตามกฎหมายว่าด้วยข้อมูลข่าวสารของราชการ
			หรือกฎหมายอื่นในรูปแบบข้อมูลดิจิทัลที่สามารถเข้าถึงและใช้ได้อย่างเสรี ไม่จำกัดแพลตฟอร์ม
			ไม่เสียค่าใช้จ่าย เผยแพร่ ทำซ้ำ หรือใช้ประโยชน์ได้โดยไม่จำกัดวัตถุประสงค์
		</p>
		<p>
			&ldquo;ผู้ใช้ข้อมูล&rdquo; หมายความว่า บุคคล คณะบุคคล นิติบุคคล หน่วยงาน
			หรือองค์กรทั้งภาครัฐและภาคเอกชนทั้งในประเทศและต่างประเทศ ที่เข้าใช้ข้อมูลซึ่งเผยแพร่บน
			<a href="https://schoolgov.actai.co">https://schoolgov.actai.co</a> และตกลงยอมรับเงื่อนไขการใช้บริการและการใช้ข้อมูลภายใต้ข้อกำหนด
		</p>
		<p>
			&ldquo;การใช้บริการ&rdquo; หมายความว่า การเข้าถึง ลงทะเบียน หรือใช้งานผลิตภัณฑ์ ซอฟต์แวร์
			และบริการบนเว็บไซต์ขององค์กร
			ไม่ว่าส่วนใดส่วนหนึ่งหรือทั้งหมดและให้หมายรวมถึงผู้ใช้บริการที่ใช้งานโดยตรงผ่านเว็บไซต์
			หรือช่องทางขององค์กรในรูปแบบต่างๆ
		</p>
		<p>
			&ldquo;การใช้ข้อมูล&rdquo; หมายความว่า
			การนำข้อมูลไม่ว่าทั้งหมดหรือบางส่วนไปใช้ประโยชน์ไม่ว่าจะด้วยรูปแบบหรือวิธีการใด ๆ
			หรือเพื่อวัตถุประสงค์ใด ๆ อันชอบด้วยกฎหมายของผู้ใช้ข้อมูล
			และภายใต้การยอมรับการปฏิบัติตามข้อกำหนดการได้มาซึ่งข้อมูล
		</p>
		<p>
			ข้อมูลที่เผยแพร่บน <a href="https://schoolgov.actai.co">https://schoolgov.actai.co</a>
			เป็นข้อมูลเปิดเผยที่เผยแพร่ผ่านระบบสารสนเทศเพื่อบริหารการศึกษา (Education Management Information
			System : EMIS) และระบบจัดเก็บข้อมูลสิ่งก่อสร้าง (B-OBEC) ของสำนักงานคณะกรรมการการศึกษาขั้นพื้นฐาน
			(สพฐ.) โดยองค์กรต่อต้านคอร์รัปชัน (ประเทศไทย) ได้ดำเนินการรวบรวมและเผยแพร่ข้อมูลในรูปแบบดิจิทัล
			เพื่อประโยชน์ของสาธารณะในการส่งเสริมความโปร่งใสและสร้างการมีส่วนร่วมภายในสถานศึกษา
		</p>
		<p>
			ข้อมูลที่เผยแพร่บน <a href="https://schoolgov.actai.co">https://schoolgov.actai.co</a>
			ดำเนินการปรับปรุงอย่างสม่ำเสมอเพื่อให้ข้อมูลเป็นปัจจุบันมากที่สุด โดยผู้ใช้งานสามารถตรวจสอบความถูกต้องของข้อมูล
			ได้ดังนี้
		</p>
		<ul>
			<li>
				ข้อมูลสารสนเทศสถานศึกษา
				<ul>
					<li>
						เข้าถึงจาก ระบบสารสนเทศเพื่อบริหารการศึกษา (Education Management Information System :
						EMIS) - <a href="https://data.bopp-obec.info/emis/">https://data.bopp-obec.info/emis/</a
						>
					</li>
				</ul>
			</li>
			<li>
				ข้อมูลสิ่งก่อสร้างสถานศึกษา
				<ul>
					<li>
						เข้าถึงจาก ระบบจัดเก็บข้อมูลสิ่งก่อสร้าง (B-OBEC) - <a
							href="https://bobec.bopp-obec.info/">https://bobec.bopp-obec.info/</a
						>
					</li>
				</ul>
			</li>
		</ul>

		<h4>ข้อกำหนดและเงื่อนไขของข้อกำหนด</h4>
		<p>
			ผู้ใช้บริการและใช้ข้อมูล มีสิทธิและหน้าที่ในการใช้บริการและข้อมูลบน <a
				href="https://schoolgov.actai.co">https://schoolgov.actai.co</a
			>
			ดังนี้
		</p>
		<ol>
			<li>
				เข้าถึง ลงทะเบียน หรือใช้งานผลิตภัณฑ์ ซอฟต์แวร์ และบริการบนเว็บไซต์ขององค์กร
				เพื่อวัตถุประสงค์และผลประโยชน์อื่นใดในการส่งเสริมธรรมาภิบาลและพัฒนาคุณภาพการให้บริการของสถานศึกษา
			</li>
			<li>
				ทำซ้ำ เผยแพร่ แจกจ่าย หรือใช้ประโยชน์ในรูปแบบอื่นใดจากข้อมูล
				เพื่อวัตถุประสงค์ในการพัฒนาบริการและนวัตกรรมต่าง ๆ
				หรือเพื่อประโยชน์อื่นใดในการส่งเสริมธรรมาภิบาล และพัฒนาคุณภาพการให้บริการของสถานศึกษา
			</li>
			<li>
				ประยุกต์ใช้ข้อมูล โดยวิธีการหรือรูปแบบต่าง ๆ
				ซึ่งไม่เป็นการปรับเปลี่ยนเนื้อหาสาระของข้อมูลให้สื่อความหมายผิดไปจากเดิม
			</li>
			<li>
				ใช้ประโยชน์ในข้อมูลโดยการรวมข้อมูลเข้ากับข้อมูลอื่น ๆ
				หรือการนำข้อมูลมาเป็นส่วนหนึ่งในการศึกษา วิเคราะห์ วิจัย พัฒนาบริการและนวัตกรรม
				หรือการดำเนินการอื่นใดเพื่อมุ่งให้เกิดประโยชน์แก่ส่วนรวมในการส่งเสริมธรรมาภิบาล
				และพัฒนาคุณภาพการให้บริการของสถานศึกษา
			</li>
			<li>
				ปฏิบัติตามมาตรฐาน ข้อกำหนด และหลักเกณฑ์ที่เกี่ยวข้องกับการใช้ข้อมูลเพื่อส่งเสริมธรรมาภิบาล
				และพัฒนาคุณภาพการให้บริการของสถานศึกษา ของ องค์กรต่อต้านคอร์รัปชัน (ประเทศไทย)
			</li>
		</ol>
		<p>
			ทั้งนี้
			ผู้ใช้ข้อมูลต้องใช้ข้อมูลเพื่อวัตถุประสงค์อันชอบด้วยกฎหมายและไม่ขัดต่อความสงบเรียบร้อยหรือศีลธรรมอันดีของประชาชน
		</p>

		<h4>การอ้างอิงข้อมูลจาก <a href="https://schoolgov.actai.co">https://schoolgov.actai.co</a></h4>
		<p>
			ในการนำข้อมูลไม่ว่าทั้งหมดหรือบางส่วนไปใช้งาน หรือดำเนินการอื่นเพื่อวัตถุประสงค์ใด ๆ
			อันชอบด้วยกฎหมายของผู้ใช้ข้อมูล ผู้ใช้ข้อมูลต้องอ้างอิงถึงหน่วยงานผู้จัดทำข้อมูล
			โดยใส่ข้อความเพื่อแสดงถึงแหล่งที่มาของข้อมูลเปิดสารสนเทศ วันที่เข้าถึงข้อมูล และข้อมูลอื่น ๆ
			ที่จำเป็น
		</p>
		<p>
			องค์กรต่อต้านคอร์รัปชัน (ประเทศไทย) ขอสงวนสิทธิ์ในการเก็บค่าบริการการเข้าถึงข้อมูล
			การระงับชั่วคราวหรือยกเลิกการเผยแพร่ข้อมูลบน <a href="https://schoolgov.actai.co"
				>https://schoolgov.actai.co</a
			>
			หรือยกเลิกการให้ข้อมูลต่อไปไม่ว่ากรณีใด ๆ โดยไม่จำต้องบอกกล่าวล่วงหน้า และไม่ก่อให้เกิดความรับผิดชอบใด
			ๆ แก่องค์กรต่อต้านคอร์รัปชัน (ประเทศไทย)
		</p>

		<h3>ข้อกําหนดและเงื่อนไขสำหรับการสมัครสมาชิก</h3>
		<p>
			ผู้สมัครสมาชิกตกลงยินยอมผูกพันตามข้อกําหนดและเงื่อนไขการใช้บริการออนไลน์ของ
			องค์กรต่อต้านคอร์รัปชัน (ประเทศไทย) ดังต่อไปนี้
		</p>
		<p>ท่านสามารถสมัครสมาชิกในการใช้งานโดยไม่ต้องเสียค่าใช้จ่ายใด ๆ ทั้งสิ้น</p>
		<p>
			ผู้สมัครสมาชิกจะต้องกรอกข้อมูลรายละเอียดต่าง ๆ ตามจริงให้ครบถ้วน
			ทั้งนี้เพื่อประโยชน์ของตัวผู้สมัครเอง หากมีการตรวจพบว่าข้อมูลของท่านไม่เป็นความจริง
			ผู้ให้บริการจะขอระงับการใช้งานโดยไม่ต้องแจ้งให้ทราบล่วงหน้า และข้อมูลรายละเอียดต่าง ๆ
			ของท่านจะได้รับการคุ้มครองตามนโยบายการคุ้มครองข้อมูลส่วนบุคคลที่ทางผู้ให้บริการจัดทำขึ้น
			ทั้งนี้ท่านมั่นใจได้ว่า<span class="policy-btn"
				>จะไม่มีการเปิดเผยข้อมูลส่วนบุคคลอันเป็นการสื่อถึงตัวสมาชิกผู้ใช้งาน</span
			>
		</p>
		<p>
			ผู้ใดแอบอ้าง หรือกระทําการใด ๆ
			อันเป็นการละเมิดสิทธิส่วนบุคคลโดยการใช้ข้อมูลของผู้อื่นมาแอบอ้างสมัครสมาชิกเพื่อให้ได้ซึ่งสิทธิการเป็นสมาชิก
			หรือกระทำการเผยแพร่ข้อมูลส่วนบุคคลผู้เป็นสมาชิกถือว่าเป็นความผิด
			ต้องรับโทษตามที่กฎหมายกําหนดไว้
		</p>
		<p>
			ข้อมูลส่วนบุคคลของผู้สมัครที่ได้ลงทะเบียน หรือข้อมูลการใช้งานของเว็บไซต์ของทั้งหมดนั้น
			ผู้สมัคร ยอมรับและตกลงว่าเป็นสิทธิขององค์กรฯ
			ในการเก็บรวบรวมและใช้ข้อมูลของผู้สมัครสมาชิกในงานที่เกี่ยวข้องกับองค์กรฯ
		</p>
		<p>
			ผู้สมัครจะต้องรักษารหัสผ่าน หรือชื่อเข้าใช้งานในระบบสมาชิกเป็นความลับ
			และหากมีผู้อื่นสามารถเข้าใช้จากทางชื่อของผู้สมัคร ได้ทางองค์กรฯ จะไม่รับผิดชอบใด ๆ ทั้งสิ้น
		</p>
		<p>
			ข้าพเจ้าผู้สมัคร ได้อ่านรายละเอียดข้อกำหนดและเงื่อนไขการสมัครสมาชิกโดยละเอียดถี่ถ้วนแล้ว
			ผู้สมัครยินยอมและตกลงให้องค์กรฯ ตรวจสอบข้อมูลส่วนบุคคลตามที่ระบุในการสมัครสมาชิก
			หรือจัดเก็บรวบรวมข้อมูลและใช้ข้อมูลของผู้สมัครสมาชิกในงานที่เกี่ยวข้องกับองค์กรฯ
		</p>
	</div>
</Modal>

<style lang="scss">
	.main-nav {
		height: 48px;
		padding: 12px 16px;
		background: #3c55ab;

		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 12;

		transform: translateY(-100%);
		transition: transform 0.3s;

		&.show,
		&:focus-within {
			transform: translateY(0);
		}

		> .nav-left {
			margin-right: auto;
		}

		> .nav-right {
			margin-left: auto;
			gap: 8px;
		}

		> .nav-search {
			display: none;
		}

		&.show_search {
			> :not(.nav-search) {
				display: none;
			}

			> .nav-search {
				display: flex;
				align-items: center;

				background: #fff;
				box-shadow: 0px 0px 4px rgba(12, 22, 107, 0.2);
				border-radius: 30px;

				width: 100%;
				height: 40px;

				padding: 0 16px;

				> label {
					gap: 8px;
					flex: 1 1 0;

					> input {
						flex: 1 1 0;

						border: none;
						padding: 0;
						outline: none;

						height: 40px;
						font-size: 0.8125rem;
						font-family: inherit;
						color: #3c55ab;

						&::placeholder {
							color: #9daad5;
						}
					}
				}
			}
		}
	}

	.nav-compensate {
		height: 48px;
	}

	.nav-logo {
		height: 100%;

		img {
			height: 100%;
			width: auto;
		}
	}

	.nav-menu {
		background: #3c55ab;
		list-style: none;

		position: absolute;
		margin: 0;
		left: 0;
		top: 48px;
		width: 100%;

		z-index: 16;

		display: none;
		&.show {
			display: initial;
		}

		> li {
			height: 44px;

			> :is(a, button) {
				display: flex;
				align-items: center;
				gap: 8px;
				height: inherit;
				padding: 0 16px;

				color: #fff;

				&:hover {
					background: #16338f;
				}
			}

			> a {
				text-decoration: none;
			}

			> button {
				width: 100%;
			}
		}
	}

	.nav-menu > .nav-menu-last {
		border-top: 1px #ffce4f solid;

		> button {
			font-weight: 500;
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
			width: auto;
			height: auto;
			clip: auto;
			white-space: normal;
			background: #3c55ab;
			color: #fff;
			margin: unset;
		}
	}

	@media screen and (min-width: 768px) {
		.main-nav {
			> .nav-left.nav-left.nav-left {
				display: none;
			}

			.nav-menu > li {
				> .nav-btn {
					justify-content: flex-start;
				}
			}

			&.show_search {
				> :not(.nav-search) {
					display: initial;
				}

				> .nav-right {
					display: flex;
				}

				> .nav-search {
					width: 50%;
				}
			}
		}
	}

	@media screen and (min-width: 992px) {
		.main-nav {
			height: 72px;
			padding: 16px 32px;

			&.show_search {
				> .nav-search {
					width: 40%;
				}

				.nav-menu > li {
					> a > span,
					> .nav-btn {
						display: none;
					}
				}
			}
		}

		.nav-compensate {
			height: 72px;
		}

		.nav-profile,
		.nav-btn {
			display: none;
		}

		.nav-menu,
		.nav-menu.show {
			position: static;
			display: flex;
			gap: 16px;

			> li > :is(a, button) {
				border-radius: 99px;
			}

			> .nav-menu-last {
				border: none;
				background: unset;

				> button {
					border: 1px #ffce4f solid;

					&:hover {
						background: #16338f;
					}
				}
			}
		}
	}

	:global(.login-modal-body) {
		height: calc(100% - 64px);
		flex-direction: column;
		text-align: center;
		padding: 0 !important;
	}

	.login-modal-top-content {
		padding: 0 24px 24px;
		flex-direction: column;
		flex: 1 1 0;
		justify-content: center;
		width: 100%;
	}

	.login-modal-title {
		font-family: 'Mitr';
		font-weight: 700;
		font-size: 1.5625rem;
		line-height: 125%;
		text-align: center;
		letter-spacing: 0.02em;
		color: #3c55ab;
		text-transform: uppercase;
	}

	.login-control.custom-control.login-modal-text {
		margin-bottom: -8px;
	}

	.login-modal-subtitle {
		font-size: 0.8125rem;

		@media screen and (min-width: 768px) {
			font-size: 1rem;
		}
	}

	.login-modal-logo {
		width: 50%;
		margin: 16px 0;

		&:first-child {
			margin-top: 0;
		}
	}

	.login-modal-text {
		font-size: 0.625rem;
		margin-bottom: 16px;

		@media screen and (min-width: 768px) {
			font-size: 0.8125rem;
		}

		&.coral {
			color: #f5a2a2;
		}
	}

	.policy-btn {
		display: inline-block;
		text-decoration: underline;
	}

	.login-modal-btns {
		background: #ecf7f7;
		padding: 32px 0;
		width: 100%;

		flex-direction: column;
		gap: 16px;
	}

	.login-modal-btn {
		padding: 8px 16px;
		gap: 8px;

		background: #ffffff;
		box-shadow: 0px 1px 4px rgba(12, 22, 107, 0.2);
		border-radius: 200px;

		&:disabled {
			opacity: 0.5;
			cursor: not-allowed;
		}
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
	}

	.policy-content {
		font-size: 0.8125rem;

		@media screen and (min-width: 768px) {
			font-size: 1rem;
		}

		h3 {
			font-size: 1.23em;
		}

		h4 {
			font-size: 1.07em;
		}

		h3,
		h4 {
			margin-bottom: 4px;
		}

		p,
		ol,
		ul {
			margin-bottom: 12px;
		}

		li > :is(ol, ul) {
			margin-bottom: 0;
		}

		ol,
		ul {
			padding-left: 16px;
		}

		a {
			color: inherit;
		}
	}

	.login-img-container {
		position: relative;
		margin: 16px 0;
	}

	.login-user-img {
		width: 80px;
		height: 80px;
		object-fit: cover;
		object-position: center;
		display: block;
	}

	.login-social-logo {
		position: absolute;
		bottom: 0;
		right: 0;
		width: 24px;
		height: 24px;
	}

	.search-box {
		width: 100%;
		height: 40px;

		background: #fff;
		box-shadow: 0 0 4px rgb(12 22 107 / 20%);
		border-radius: 30px;

		padding: 0 16px;
		gap: 8px;

		line-height: 136%;
		color: #3c55ab;
		text-decoration: none;
	}

	.login-img-wrapper {
		justify-content: center;
	}

	.fspace {
		height: 96px;

		&.small {
			height: 64px;
		}
	}

	.btn-school {
		padding: 8px 16px;
		gap: 8px;

		background: #fa7cc7;
		box-shadow: 0px 1px 4px rgba(12, 22, 107, 0.2);
		border-radius: 24px;
		color: #fff;
		text-decoration: none;
		font-weight: 500;

		&:first-of-type {
			margin-bottom: 16px;
		}

		&.blue {
			background: #6bc9ff;
		}
	}

	.round-img {
		border-radius: 999px;
	}

	.search-desktop-nav-list {
		display: none;

		@media screen and (min-width: 768px) {
			display: initial;
		}
	}
</style>
