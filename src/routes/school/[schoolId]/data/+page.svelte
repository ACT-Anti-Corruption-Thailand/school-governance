<script lang="ts">
	import { PUBLIC_BASE_YEAR, PUBLIC_DATA_HOST } from '$env/static/public';

	import { scroll } from 'motion';
	import { onMount, tick } from 'svelte';
	import { balancer } from 'svelte-action-balancer';

	import {
		Dialog,
		DialogDescription,
		DialogOverlay,
		DialogTitle
	} from '@rgossiaux/svelte-headlessui';
	import ActAiBanner from 'components/ActAiBanner.svelte';
	import Dropdown from 'components/Dropdown.svelte';
	import Modal from 'components/Modal.svelte';
	import CircularProgress from 'components/school/CircularProgress.svelte';
	import RatioChart from 'components/school/RatioChart.svelte';
	import SchoolHeader from 'components/school/SchoolHeader.svelte';
	import Waffle from 'components/school/Waffle.svelte';
	import type { SchoolData } from 'types/school_type';

	import { currentSchool, currentSchoolId, data_years } from 'stores/school';

	let years: undefined | number[];
	let update_date: undefined | string;
	let DROPDOWN_DATA: undefined | { label: number; value: number }[];
	let dropdown_choice: undefined | { label: number; value: number };

	$: if ($data_years) {
		years = $data_years?.map((y) => y.year) ?? [+PUBLIC_BASE_YEAR];
		update_date = $data_years?.[0]?.update_date ?? '(เกิดข้อผิดพลาด กรุณาโหลดใหม่อีกครั้ง)';
		DROPDOWN_DATA = years?.map((y) => ({ label: y + 543, value: y }));
		dropdown_choice = DROPDOWN_DATA[0];
	}

	$: d = $currentSchool;

	const FALLBACK_BUILDING_IMG = '/school/school-placeholder.png';

	const tryImage = (url: string) => {
		return new Promise((res, rej) => {
			const img = new Image();
			img.addEventListener('error', rej);
			img.addEventListener('load', res);
			img.src = url;
		});
	};

	const getUsableImage = async (urls: string[]) => {
		for (const url of urls) {
			try {
				await tryImage(url);
				return url;
			} catch (e) {
				console.error('ImageRequestErr ' + e);
			}
		}
		return FALLBACK_BUILDING_IMG;
	};

	const getUsableImageObject = async (schoolData: SchoolData) => {
		const building_data = { ...schoolData.building.data };
		let new_building_data: Record<string, any> = {};

		for (const building_type in building_data) {
			new_building_data[building_type] = await Promise.all(
				building_data[building_type].map((e) => getUsableImage(e.images))
			);
		}

		return new_building_data;
	};

	let building_imgs: Record<string, string[]> = {};

	$: if (d) getUsableImageObject(d).then((e) => (building_imgs = e));

	const getConditionClass = (condition: string, await2 = false) => {
		const CONDITIONS_CLASS: Record<string, string> = {
			ดี: 'usable-color',
			พอใช้: await2 ? 'await2-color' : 'await-color',
			ทรุดโทรม: 'unusable-color'
		};
		return CONDITIONS_CLASS[condition] ?? '';
	};

	const mergeGoodsName = (goods_list: any[]) =>
		[...new Set(goods_list.map((e) => e.name))].join(', ');

	let อ_modal_open = false;
	let ป_modal_open = false;
	let มต_modal_open = false;
	let มป_modal_open = false;
	let ครู_modal_open = false;
	let บุคลากร_modal_open = false;
	let อุปกรณ์การเรียน_modal_open = false;
	let อุปกรณ์อื่น_modal_open = false;
	let อาคาร_modal_open = false;

	let lightbox_open = false;
	let lightbox_building_name = '';
	let lightbox_url = '';
	let lightbox_callback = () => {};

	const openLightbox = (name: string, url: string, callback = () => {}) => {
		if (url === FALLBACK_BUILDING_IMG) return;
		lightbox_building_name = name;
		lightbox_url = url;
		lightbox_callback = callback;
		tick().then(() => {
			lightbox_open = true;
		});
	};

	let [current_year, ...other_years] = [...(years ?? [])];
	let school_other_years_data: { year: number; data: any }[] = [];

	const fetchOtherYearData = () => {
		if (other_years.length > 1) {
			other_years.forEach((year, index) => {
				fetch(`${PUBLIC_DATA_HOST}/${year}/${currentSchoolId}.json`)
					.then((resp) => resp.json())
					.then(
						(data) =>
							(school_other_years_data[index] = {
								year,
								data
							})
					);
			});
		}
	};

	let el_student_section: HTMLElement;
	let el_employee_section: HTMLElement;
	let el_goods_section: HTMLElement;
	let el_building_section: HTMLElement;
	let el_general_section: HTMLElement;

	let employee_section_intx = false;
	let goods_section_intx = false;
	let building_section_intx = false;
	let general_section_intx = false;

	let active_section: 'student' | 'employee' | 'goods' | 'building' | 'general' = 'student';
	$: if (general_section_intx) active_section = 'general';
	else if (building_section_intx) active_section = 'building';
	else if (goods_section_intx) active_section = 'goods';
	else if (employee_section_intx) active_section = 'employee';
	else active_section = 'student';

	let current_scrolly = 0;
	let section_pos = [0, 0, 0, 0, 0];

	const getOffsetY = (el: HTMLElement, scrollY: number) => {
		const rect = el.getBoundingClientRect();
		return rect.top + scrollY;
	};

	const calcHeaderPos = () => {
		const winY = window.scrollY;

		section_pos = [
			getOffsetY(el_student_section, winY),
			getOffsetY(el_employee_section, winY),
			getOffsetY(el_goods_section, winY),
			getOffsetY(el_building_section, winY),
			getOffsetY(el_general_section, winY)
		];
	};

	// because nav is shifting around
	// we have to check if nav *will* be shown or not
	// and scroll to accordingly
	const scrollToSection = (section: 'student' | 'employee' | 'goods' | 'building' | 'general') => {
		const SECTION_LOOKUP = {
			student: 0,
			employee: 1,
			goods: 2,
			building: 3,
			general: 4
		};
		let section_offset = section_pos[SECTION_LOOKUP[section]];
		let is_desktop = window.matchMedia('(min-width: 768px)').matches;
		let jumpnav_size = is_desktop ? 48 : 32;

		if (section_offset > current_scrolly) {
			// if scroll down, nav will hide
			return scrollTo({
				behavior: 'smooth',
				top: section_offset - 60 - jumpnav_size
			});
		} else {
			// if scroll up, nav will be displayed
			let nav_size = is_desktop ? 72 : 48;
			return scrollTo({
				behavior: 'smooth',
				top: section_offset - 60 - jumpnav_size - nav_size
			});
		}
	};

	let mounted = false;
	onMount(() => {
		mounted = true;
	});

	$: if (mounted && years) {
		fetchOtherYearData();
	}

	$: if (
		mounted &&
		d &&
		el_student_section &&
		el_employee_section &&
		el_goods_section &&
		el_building_section &&
		el_general_section
	) {
		calcHeaderPos();

		scroll(({ y }) => (employee_section_intx = !!y.progress), {
			target: el_employee_section,
			offset: ['start 0.5', 'end start']
		});

		scroll(({ y }) => (goods_section_intx = !!y.progress), {
			target: el_goods_section,
			offset: ['start 0.5', 'end start']
		});

		scroll(({ y }) => (building_section_intx = !!y.progress), {
			target: el_building_section,
			offset: ['start 0.5', 'end start']
		});

		scroll(({ y }) => (general_section_intx = !!y.progress), {
			target: el_general_section,
			offset: ['start 0.5', 'end start']
		});

		scroll(({ y }) => (current_scrolly = y.current));
	}
</script>

<svelte:head>
	<title>ข้อมูลโรงเรียน{d?.name_th ?? ' (ไม่พบชื่อ)'} — โปร่งใสวิทยาคม</title>
	<meta
		property="og:title"
		content="ข้อมูลโรงเรียน{d?.name_th ?? ' (ไม่พบชื่อ)'} — โปร่งใสวิทยาคม"
	/>
	<meta
		name="twitter:title"
		content="ข้อมูลโรงเรียน{d?.name_th ?? ' (ไม่พบชื่อ)'} — โปร่งใสวิทยาคม"
	/>
</svelte:head>

<SchoolHeader pageData={{ name: 'ข้อมูลโรงเรียน', color: '#DDAB29' }}>
	<div class="jumpnav-wrapper">
		<menu class="f jumpnav">
			<li>
				<button
					type="button"
					class:j-active={active_section === 'student'}
					on:click={() => scrollToSection('student')}
				>
					นักเรียน
				</button>
			</li>
			<li>
				<button
					type="button"
					class:j-active={active_section === 'employee'}
					on:click={() => scrollToSection('employee')}
				>
					ครู/บุคลากร
				</button>
			</li>
			<li>
				<button
					type="button"
					class:j-active={active_section === 'goods'}
					on:click={() => scrollToSection('goods')}
				>
					อุปกรณ์
				</button>
			</li>
			<li>
				<button
					type="button"
					class:j-active={active_section === 'building'}
					on:click={() => scrollToSection('building')}
				>
					สิ่งก่อสร้าง
				</button>
			</li>
			<li>
				<button
					type="button"
					class:j-active={active_section === 'general'}
					on:click={() => scrollToSection('general')}
				>
					ทั่วไป
				</button>
			</li>
		</menu>
	</div>
	{#if DROPDOWN_DATA}
		<div>
			<span class="schoolyear-dropdown-label">ปีการศึกษา</span>
			<Dropdown options={DROPDOWN_DATA} bind:selected_option={dropdown_choice} />
		</div>
	{/if}
</SchoolHeader>

<div class="jumpnav-compensate" />

<div class="desktop-margin">
	{#if d}
		<h2 bind:this={el_student_section} id="student-section" class="f">
			<span>นักเรียน <small>(คน)</small></span>
			<span>{d.student.total.all.toLocaleString('th-TH')}</span>
		</h2>
		<section>
			<div class="f">
				<span>
					เฉลี่ยนักเรียนห้องละ <small>(คน)</small>
				</span>
				<span class="mitr"
					>{Math.ceil(d.student.total.all / d.student.total.class).toLocaleString('th-TH')}</span
				>
			</div>
			<hr />
			{#if d.school_size}
				<span class="mitr">
					โรงเรียนขนาด{d.school_size}
				</span>
			{/if}
			<details class="school-size-detail">
				<summary>
					<span class="f">
						<img
							loading="lazy"
							decoding="async"
							src="/icons/info.svg"
							alt=""
							width="16"
							height="16"
						/>
						<span>ดูเกณฑ์การแบ่งขนาดโรงเรียน</span>
						<img
							loading="lazy"
							decoding="async"
							class="chevron"
							src="/chevrons/bottom.svg"
							alt=""
							width="24"
							height="24"
						/>
					</span>
				</summary>
				<div class="school-size-flex">
					<div>
						<h4>ขนาดโรงเรียนสังกัดสำนักงานเขตพื้นที่ประถมศึกษา</h4>
						<dl class="list-grid">
							<dt>เล็ก</dt>
							<dd>มีนักเรียน 1 &ndash; 120 คน</dd>
							<dt>กลาง</dt>
							<dd>มีนักเรียน 121 &ndash; 600 คน</dd>
							<dt>ใหญ่</dt>
							<dd>มีนักเรียน 601 &ndash; 1,500 คน</dd>
							<dt>ใหญ่พิเศษ</dt>
							<dd>มีนักเรียน 1,501 คนขึ้นไป</dd>
						</dl>
					</div>
					<div>
						<h4>ขนาดโรงเรียนสังกัดสำนักงานเขตพื้นที่มัธยมศึกษา</h4>
						<dl class="list-grid">
							<dt>เล็ก</dt>
							<dd>มีนักเรียน 1 &ndash; 499 คน</dd>
							<dt>กลาง</dt>
							<dd>มีนักเรียน 500 &ndash; 1,499 คน</dd>
							<dt>ใหญ่</dt>
							<dd>มีนักเรียน 1,500 &ndash; 2,499 คน</dd>
							<dt>ใหญ่พิเศษ</dt>
							<dd>มีนักเรียน 2,500 คนขึ้นไป</dd>
						</dl>
					</div>
				</div>
			</details>
		</section>
		<section>
			<div class="mb8">สัดส่วนจากนักเรียนทั้งหมด</div>
			<RatioChart
				data={[
					{ number: d.student.total.อ, color: '#3f836e' },
					{ number: d.student.total.ป, color: '#b1a215' },
					{ number: d.student.total.มต, color: '#f09326' },
					{ number: d.student.total.มป, color: '#ffc700' }
				]}
			/>
			<div class="col2-on-desktop">
				{#if d.student.total.อ}
					<button
						type="button"
						class="mitr f student-size-btn"
						on:click={() => {
							อ_modal_open = true;
						}}
					>
						<span class="student-color-1 std-size-color" />
						<span>
							อนุบาล
							<span class="std-unit fs10">(คน)</span>
						</span>
						<span class="std-size-count">{d.student.total.อ.toLocaleString('th-TH')}</span>
						<img
							loading="lazy"
							decoding="async"
							src="/chevrons/right.svg"
							alt=""
							width="24"
							height="24"
						/>
					</button>
					<Modal
						title={`อนุบาล ${d.student.total.อ.toLocaleString('th-TH')} คน`}
						bind:isOpen={อ_modal_open}
					>
						<div class="f mitr modal-section-header">
							<span>อนุบาล 1</span>
							<span class="mitr">{d.student.อ1.total.toLocaleString('th-TH')}</span>
						</div>
						<div class="f modal-section">
							<span>จำนวนห้องเรียน <small>(ห้อง)</small></span>
							<span class="mitr">{d.student.อ1.class.toLocaleString('th-TH')}</span>
						</div>
						<div class="f modal-section">
							<span>แบ่งตามเพศ</span>
							<span>
								หญิง
								<span class="mitr">{d.student.อ1.women.toLocaleString('th-TH')}</span>
								ชาย
								<span class="mitr">{d.student.อ1.men.toLocaleString('th-TH')}</span>
							</span>
						</div>
						<div class="f mitr modal-section-header">
							<span>อนุบาล 2</span>
							<span class="mitr">{d.student.อ2.total.toLocaleString('th-TH')}</span>
						</div>
						<div class="f modal-section">
							<span>จำนวนห้องเรียน <small>(ห้อง)</small></span>
							<span class="mitr">{d.student.อ2.class.toLocaleString('th-TH')}</span>
						</div>
						<div class="f modal-section">
							<span>แบ่งตามเพศ</span>
							<span>
								หญิง
								<span class="mitr">{d.student.อ2.women.toLocaleString('th-TH')}</span>
								ชาย
								<span class="mitr">{d.student.อ2.men.toLocaleString('th-TH')}</span>
							</span>
						</div>
						<div class="f mitr modal-section-header">
							<span>อนุบาล 3</span>
							<span class="mitr">{d.student.อ3.total.toLocaleString('th-TH')}</span>
						</div>
						<div class="f modal-section">
							<span>จำนวนห้องเรียน <small>(ห้อง)</small></span>
							<span class="mitr">{d.student.อ3.class.toLocaleString('th-TH')}</span>
						</div>
						<div class="f modal-section">
							<span>แบ่งตามเพศ</span>
							<span>
								หญิง
								<span class="mitr">{d.student.อ3.women.toLocaleString('th-TH')}</span>
								ชาย
								<span class="mitr">{d.student.อ3.men.toLocaleString('th-TH')}</span>
							</span>
						</div>
					</Modal>
				{/if}
				{#if d.student.total.ป}
					<button
						type="button"
						class="mitr f student-size-btn"
						on:click={() => {
							ป_modal_open = true;
						}}
					>
						<span class="student-color-2 std-size-color" />
						<span>
							ประถม
							<span class="std-unit fs10">(คน)</span>
						</span>
						<span class="std-size-count">{d.student.total.ป.toLocaleString('th-TH')}</span>
						<img
							loading="lazy"
							decoding="async"
							src="/chevrons/right.svg"
							alt=""
							width="24"
							height="24"
						/>
					</button>
					<Modal
						title={`ประถม ${d.student.total.ป.toLocaleString('th-TH')} คน`}
						bind:isOpen={ป_modal_open}
					>
						<div class="f mitr modal-section-header">
							<span>ประถม 1</span>
							<span class="mitr">{d.student.ป1.total.toLocaleString('th-TH')}</span>
						</div>
						<div class="f modal-section">
							<span>จำนวนห้องเรียน <small>(ห้อง)</small></span>
							<span class="mitr">{d.student.ป1.class.toLocaleString('th-TH')}</span>
						</div>
						<div class="f modal-section">
							<span>แบ่งตามเพศ</span>
							<span>
								หญิง
								<span class="mitr">{d.student.ป1.women.toLocaleString('th-TH')}</span>
								ชาย
								<span class="mitr">{d.student.ป1.men.toLocaleString('th-TH')}</span>
							</span>
						</div>
						<div class="f mitr modal-section-header">
							<span>ประถม 2</span>
							<span class="mitr">{d.student.ป2.total.toLocaleString('th-TH')}</span>
						</div>
						<div class="f modal-section">
							<span>จำนวนห้องเรียน <small>(ห้อง)</small></span>
							<span class="mitr">{d.student.ป2.class.toLocaleString('th-TH')}</span>
						</div>
						<div class="f modal-section">
							<span>แบ่งตามเพศ</span>
							<span>
								หญิง
								<span class="mitr">{d.student.ป2.women.toLocaleString('th-TH')}</span>
								ชาย
								<span class="mitr">{d.student.ป2.men.toLocaleString('th-TH')}</span>
							</span>
						</div>
						<div class="f mitr modal-section-header">
							<span>ประถม 3</span>
							<span class="mitr">{d.student.ป3.total.toLocaleString('th-TH')}</span>
						</div>
						<div class="f modal-section">
							<span>จำนวนห้องเรียน <small>(ห้อง)</small></span>
							<span class="mitr">{d.student.ป3.class.toLocaleString('th-TH')}</span>
						</div>
						<div class="f modal-section">
							<span>แบ่งตามเพศ</span>
							<span>
								หญิง
								<span class="mitr">{d.student.ป3.women.toLocaleString('th-TH')}</span>
								ชาย
								<span class="mitr">{d.student.ป3.men.toLocaleString('th-TH')}</span>
							</span>
						</div>
						<div class="f mitr modal-section-header">
							<span>ประถม 4</span>
							<span class="mitr">{d.student.ป4.total.toLocaleString('th-TH')}</span>
						</div>
						<div class="f modal-section">
							<span>จำนวนห้องเรียน <small>(ห้อง)</small></span>
							<span class="mitr">{d.student.ป4.class.toLocaleString('th-TH')}</span>
						</div>
						<div class="f modal-section">
							<span>แบ่งตามเพศ</span>
							<span>
								หญิง
								<span class="mitr">{d.student.ป4.women.toLocaleString('th-TH')}</span>
								ชาย
								<span class="mitr">{d.student.ป4.men.toLocaleString('th-TH')}</span>
							</span>
						</div>
						<div class="f mitr modal-section-header">
							<span>ประถม 5</span>
							<span class="mitr">{d.student.ป5.total.toLocaleString('th-TH')}</span>
						</div>
						<div class="f modal-section">
							<span>จำนวนห้องเรียน <small>(ห้อง)</small></span>
							<span class="mitr">{d.student.ป5.class.toLocaleString('th-TH')}</span>
						</div>
						<div class="f modal-section">
							<span>แบ่งตามเพศ</span>
							<span>
								หญิง
								<span class="mitr">{d.student.ป5.women.toLocaleString('th-TH')}</span>
								ชาย
								<span class="mitr">{d.student.ป5.men.toLocaleString('th-TH')}</span>
							</span>
						</div>
						<div class="f mitr modal-section-header">
							<span>ประถม 6</span>
							<span class="mitr">{d.student.ป6.total.toLocaleString('th-TH')}</span>
						</div>
						<div class="f modal-section">
							<span>จำนวนห้องเรียน <small>(ห้อง)</small></span>
							<span class="mitr">{d.student.ป6.class.toLocaleString('th-TH')}</span>
						</div>
						<div class="f modal-section">
							<span>แบ่งตามเพศ</span>
							<span>
								หญิง
								<span class="mitr">{d.student.ป6.women.toLocaleString('th-TH')}</span>
								ชาย
								<span class="mitr">{d.student.ป6.men.toLocaleString('th-TH')}</span>
							</span>
						</div>
					</Modal>
				{/if}
				{#if d.student.total.มต}
					<button
						type="button"
						class="mitr f student-size-btn"
						on:click={() => {
							มต_modal_open = true;
						}}
					>
						<span class="student-color-3 std-size-color" />
						<span>
							มัธยมต้น
							<span class="std-unit fs10">(คน)</span>
						</span>
						<span class="std-size-count">{d.student.total.มต.toLocaleString('th-TH')}</span>
						<img
							loading="lazy"
							decoding="async"
							src="/chevrons/right.svg"
							alt=""
							width="24"
							height="24"
						/>
					</button>
					<Modal
						title={`มัธยมต้น ${d.student.total.มต.toLocaleString('th-TH')} คน`}
						bind:isOpen={มต_modal_open}
					>
						<div class="f mitr modal-section-header">
							<span>มัธยม 1</span>
							<span class="mitr">{d.student.ม1.total.toLocaleString('th-TH')}</span>
						</div>
						<div class="f modal-section">
							<span>จำนวนห้องเรียน <small>(ห้อง)</small></span>
							<span class="mitr">{d.student.ม1.class.toLocaleString('th-TH')}</span>
						</div>
						<div class="f modal-section">
							<span>แบ่งตามเพศ</span>
							<span>
								หญิง
								<span class="mitr">{d.student.ม1.women.toLocaleString('th-TH')}</span>
								ชาย
								<span class="mitr">{d.student.ม1.men.toLocaleString('th-TH')}</span>
							</span>
						</div>
						<div class="f mitr modal-section-header">
							<span>มัธยม 2</span>
							<span class="mitr">{d.student.ม2.total.toLocaleString('th-TH')}</span>
						</div>
						<div class="f modal-section">
							<span>จำนวนห้องเรียน <small>(ห้อง)</small></span>
							<span class="mitr">{d.student.ม2.class.toLocaleString('th-TH')}</span>
						</div>
						<div class="f modal-section">
							<span>แบ่งตามเพศ</span>
							<span>
								หญิง
								<span class="mitr">{d.student.ม2.women.toLocaleString('th-TH')}</span>
								ชาย
								<span class="mitr">{d.student.ม2.men.toLocaleString('th-TH')}</span>
							</span>
						</div>
						<div class="f mitr modal-section-header">
							<span>มัธยม 3</span>
							<span class="mitr">{d.student.ม3.total.toLocaleString('th-TH')}</span>
						</div>
						<div class="f modal-section">
							<span>จำนวนห้องเรียน <small>(ห้อง)</small></span>
							<span class="mitr">{d.student.ม3.class.toLocaleString('th-TH')}</span>
						</div>
						<div class="f modal-section">
							<span>แบ่งตามเพศ</span>
							<span>
								หญิง
								<span class="mitr">{d.student.ม3.women.toLocaleString('th-TH')}</span>
								ชาย
								<span class="mitr">{d.student.ม3.men.toLocaleString('th-TH')}</span>
							</span>
						</div>
					</Modal>
				{/if}
				{#if d.student.total.มป}
					<button
						type="button"
						class="mitr f student-size-btn"
						on:click={() => {
							มป_modal_open = true;
						}}
					>
						<span class="student-color-4 std-size-color" />
						<span>
							มัธยมปลาย
							<span class="std-unit fs10">(คน)</span>
						</span>
						<span class="std-size-count">{d.student.total.มป.toLocaleString('th-TH')}</span>
						<img
							loading="lazy"
							decoding="async"
							src="/chevrons/right.svg"
							alt=""
							width="24"
							height="24"
						/>
					</button>
					<Modal
						title={`มัธยมปลาย ${d.student.total.มป.toLocaleString('th-TH')} คน`}
						bind:isOpen={มป_modal_open}
					>
						{#if d.student.ม4.total + d.student.ม5.total + d.student.ม6.total}
							<div class="f mitr modal-section-header">
								<span>มัธยม 4</span>
								<span class="mitr">{d.student.ม4.total.toLocaleString('th-TH')}</span>
							</div>
							<div class="f modal-section">
								<span>จำนวนห้องเรียน <small>(ห้อง)</small></span>
								<span class="mitr">{d.student.ม4.class.toLocaleString('th-TH')}</span>
							</div>
							<div class="f modal-section">
								<span>แบ่งตามเพศ</span>
								<span>
									หญิง
									<span class="mitr">{d.student.ม4.women.toLocaleString('th-TH')}</span>
									ชาย
									<span class="mitr">{d.student.ม4.men.toLocaleString('th-TH')}</span>
								</span>
							</div>
							<div class="f mitr modal-section-header">
								<span>มัธยม 5</span>
								<span class="mitr">{d.student.ม5.total.toLocaleString('th-TH')}</span>
							</div>
							<div class="f modal-section">
								<span>จำนวนห้องเรียน <small>(ห้อง)</small></span>
								<span class="mitr">{d.student.ม5.class.toLocaleString('th-TH')}</span>
							</div>
							<div class="f modal-section">
								<span>แบ่งตามเพศ</span>
								<span>
									หญิง
									<span class="mitr">{d.student.ม5.women.toLocaleString('th-TH')}</span>
									ชาย
									<span class="mitr">{d.student.ม5.men.toLocaleString('th-TH')}</span>
								</span>
							</div>
							<div class="f mitr modal-section-header">
								<span>มัธยม 6</span>
								<span class="mitr">{d.student.ม6.total.toLocaleString('th-TH')}</span>
							</div>
							<div class="f modal-section">
								<span>จำนวนห้องเรียน <small>(ห้อง)</small></span>
								<span class="mitr">{d.student.ม6.class.toLocaleString('th-TH')}</span>
							</div>
							<div class="f modal-section">
								<span>แบ่งตามเพศ</span>
								<span>
									หญิง
									<span class="mitr">{d.student.ม6.women.toLocaleString('th-TH')}</span>
									ชาย
									<span class="mitr">{d.student.ม6.men.toLocaleString('th-TH')}</span>
								</span>
							</div>
						{/if}
						{#if d.student.ปวช1.total + d.student.ปวช2.total + d.student.ปวช3.total}
							<div class="f mitr modal-section-header">
								<span>ปวช 1</span>
								<span class="mitr">{d.student.ปวช1.total.toLocaleString('th-TH')}</span>
							</div>
							<div class="f modal-section">
								<span>จำนวนห้องเรียน <small>(ห้อง)</small></span>
								<span class="mitr">{d.student.ปวช1.class.toLocaleString('th-TH')}</span>
							</div>
							<div class="f modal-section">
								<span>แบ่งตามเพศ</span>
								<span>
									หญิง
									<span class="mitr">{d.student.ปวช1.women.toLocaleString('th-TH')}</span>
									ชาย
									<span class="mitr">{d.student.ปวช1.men.toLocaleString('th-TH')}</span>
								</span>
							</div>
							<div class="f mitr modal-section-header">
								<span>ปวช 2</span>
								<span class="mitr">{d.student.ปวช2.total.toLocaleString('th-TH')}</span>
							</div>
							<div class="f modal-section">
								<span>จำนวนห้องเรียน <small>(ห้อง)</small></span>
								<span class="mitr">{d.student.ปวช2.class.toLocaleString('th-TH')}</span>
							</div>
							<div class="f modal-section">
								<span>แบ่งตามเพศ</span>
								<span>
									หญิง
									<span class="mitr">{d.student.ปวช2.women.toLocaleString('th-TH')}</span>
									ชาย
									<span class="mitr">{d.student.ปวช2.men.toLocaleString('th-TH')}</span>
								</span>
							</div>
							<div class="f mitr modal-section-header">
								<span>ปวช 3</span>
								<span class="mitr">{d.student.ปวช3.total.toLocaleString('th-TH')}</span>
							</div>
							<div class="f modal-section">
								<span>จำนวนห้องเรียน <small>(ห้อง)</small></span>
								<span class="mitr">{d.student.ปวช3.class.toLocaleString('th-TH')}</span>
							</div>
							<div class="f modal-section">
								<span>แบ่งตามเพศ</span>
								<span>
									หญิง
									<span class="mitr">{d.student.ปวช3.women.toLocaleString('th-TH')}</span>
									ชาย
									<span class="mitr">{d.student.ปวช3.men.toLocaleString('th-TH')}</span>
								</span>
							</div>
						{/if}
					</Modal>
				{/if}
			</div>
		</section>

		{#if years && years.length > 1}
			<section>
				<h3 class="mb16">เปรียบเทียบจำนวนนักเรียน {years.length} ปีที่ผ่านมา</h3>
				<div class="f fw500">
					<span>ปี</span>
					<span>คน</span>
				</div>
				<div class="compare-chart">
					<div>{`${current_year + 543}`.substring(2, 4)}</div>
					<RatioChart
						data={[
							{ number: d.student.total.อ, color: '#3f836e' },
							{ number: d.student.total.ป, color: '#b1a215' },
							{ number: d.student.total.มต, color: '#f09326' },
							{ number: d.student.total.มป, color: '#ffc700' }
						]}
					/>
					<div>{d.student.total.all.toLocaleString('th-TH')}</div>
					{#each school_other_years_data as yd}
						<div>{`${yd.year + 543}`.substring(2, 4)}</div>
						<RatioChart
							data={[
								{ number: yd.data?.student?.total?.อ, color: '#3f836e' },
								{ number: yd.data?.student?.total?.ป, color: '#b1a215' },
								{ number: yd.data?.student?.total?.มต, color: '#f09326' },
								{ number: yd.data?.student?.total?.มป, color: '#ffc700' }
							]}
						/>
						<div>{yd.data?.student?.total?.all?.toLocaleString('th-TH')}</div>
					{/each}
				</div>
			</section>
		{/if}

		<h2 bind:this={el_employee_section} id="employee-section" class="f">
			<span>ครู/บุคลากร <small>(คน)</small></span>
			<span>{d.staff.total.toLocaleString('th-TH')}</span>
		</h2>
		<section>
			<button
				type="button"
				class="teacher-size-btn mb8"
				on:click={() => {
					ครู_modal_open = true;
				}}
			>
				<h3 class="mitr f">
					<span>ครู</span>
					<span class="mla">{d.staff.ครู.total.toLocaleString('th-TH')}</span>
					<img
						loading="lazy"
						decoding="async"
						src="/chevrons/right.svg"
						alt=""
						width="24"
						height="24"
					/>
				</h3>
				<p>ครูทั่วไป, ครูผู้ช่วย, ชำนาญการ, ชำนาญการพิเศษ...</p>
			</button>
			<Modal
				title={`ครู ${d.staff.ครู.total.toLocaleString('th-TH')} คน`}
				bind:isOpen={ครู_modal_open}
			>
				<div class="modal-section-header p16">
					<div class="f ais fs10 g8">
						<img
							loading="lazy"
							decoding="async"
							src="/icons/info.svg"
							alt=""
							width="16"
							height="16"
						/>
						<p>
							เอกสารจาก UNESCO ระบุว่า
							คุณภาพของครูผู้สอนเป็นหนึ่งในปัจจัยที่สามารถบ่งชี้สภาพการให้บริการของโรงเรียนได้
							สำหรับบริบทโรงเรียนในไทย วิทยฐานะและระดับตำแหน่ง
							จัดเป็นปัจจัยที่สามารถสะท้อนคุณภาพของครูและบุคลากรได้
						</p>
					</div>
					<details class="school-size-detail">
						<summary>
							<span class="f">
								<img
									loading="lazy"
									decoding="async"
									src="/icons/info.svg"
									alt=""
									width="16"
									height="16"
								/>
								<span>ดูลำดับวิทยาฐานะและระดับตำแหน่งทั้งหมด</span>
								<img
									loading="lazy"
									decoding="async"
									class="chevron"
									src="/chevrons/bottom.svg"
									alt=""
									width="24"
									height="24"
								/>
							</span>
						</summary>
						<div class="school-size-flex">
							<ul class="teacher-list">
								<li>ครูระดับตำแหน่ง ครูผู้ช่วย</li>
								<li>ครูระดับตำแหน่ง คศ. 1</li>
								<li>ครูระดับตำแหน่ง คศ. 2 เป็นวิทยฐานะ "ชำนาญการ"</li>
								<li>ครูระดับตำแหน่ง คศ. 3 เป็นวิทยฐานะ "ชำนาญการพิเศษ"</li>
								<li>ครูระดับตำแหน่ง คศ. 4 เป็นวิทยฐานะ "เชี่ยวชาญ"</li>
								<li>ครูระดับตำแหน่ง คศ. 5 เป็นวิทยฐานะ "เชี่ยวชาญพิเศษ"</li>
							</ul>
						</div>
					</details>
				</div>
				{#if d.staff.ครู.คศ5?.total}
					<div class="f modal-section">
						<span>ครูเชี่ยวชาญพิเศษ</span>
						<span class="mitr">{d.staff.ครู.คศ5.total.toLocaleString('th-TH')}</span>
					</div>
				{/if}
				{#if d.staff.ครู.คศ4.total}
					<div class="f modal-section">
						<span>ครูเชี่ยวชาญ</span>
						<span class="mitr">{d.staff.ครู.คศ4.total.toLocaleString('th-TH')}</span>
					</div>
				{/if}
				{#if d.staff.ครู.คศ3.total}
					<div class="f modal-section">
						<span>ครูชำนาญการพิเศษ</span>
						<span class="mitr">{d.staff.ครู.คศ3.total.toLocaleString('th-TH')}</span>
					</div>
				{/if}
				{#if d.staff.ครู.คศ2.total}
					<div class="f modal-section">
						<span>ครูชำนาญการ</span>
						<span class="mitr">{d.staff.ครู.คศ2.total.toLocaleString('th-TH')}</span>
					</div>
				{/if}
				{#if d.staff.ครู.คศ1.total}
					<div class="f modal-section">
						<span>ครู คศ. 1</span>
						<span class="mitr">{d.staff.ครู.คศ1.total.toLocaleString('th-TH')}</span>
					</div>
				{/if}
				{#if d.staff.ครู.ครูผู้ช่วย?.total}
					<div class="f modal-section">
						<span>ครูผู้ช่วย</span>
						<span class="mitr">{d.staff.ครู.ครูผู้ช่วย.total.toLocaleString('th-TH')}</span>
					</div>
				{/if}
			</Modal>
			<div class="f">
				<span>สัดส่วนครู ต่อ นักเรียน</span>
				<span class="mitr fs20"
					>1:{Math.ceil(d.student.total.all / d.staff.ครู.total).toLocaleString('th-TH')}</span
				>
			</div>
			<hr />
			<div class="f">
				<span>ครู</span>
				<span class="usable-color cv">นักเรียน</span>
			</div>
			<div class="f ratio-chart">
				<div class="f">
					<img
						loading="lazy"
						decoding="async"
						src="/icons/person-b.svg"
						alt=""
						width="24"
						height="24"
					/>
				</div>
				<div class="f special">
					{#each Array(Math.ceil(d.student.total.all / d.staff.ครู.total)) as _}
						<img
							loading="lazy"
							decoding="async"
							src="/icons/person-y.svg"
							alt=""
							width="24"
							height="24"
						/>
					{/each}
				</div>
			</div>
		</section>

		{#if years && years.length > 1}
			<section>
				<h3 class="mb16">เปรียบเทียบจำนวนครู {years.length} ปีที่ผ่านมา</h3>
				<div class="f fw500">
					<span>ปี</span>
					<span>คน</span>
				</div>
				<div class="compare-chart">
					<div>{`${current_year + 543}`.substring(2, 4)}</div>
					<RatioChart
						label_type="value"
						data={[
							{ number: d.staff.ครู.total, color: '#3c55ab', label: '' },
							{
								number: d.student.total.all,
								color: '#FFC700',
								font_color: '#3c55ab',
								label: `1:${Math.ceil(d.student.total.all / d.staff.ครู.total).toLocaleString(
									'th-TH'
								)}`
							}
						]}
					/>
					<div>{d.staff.ครู.total.toLocaleString('th-TH')}</div>
					{#each school_other_years_data as yd}
						<div>{`${yd.year + 543}`.substring(2, 4)}</div>
						<RatioChart
							label_type="value"
							data={[
								{ number: yd.data?.staff?.ครู?.total, color: '#3c55ab', label: '' },
								{
									number: yd.data?.student?.total?.all,
									color: '#FFC700',
									font_color: '#3c55ab',
									label: `1:${Math.ceil(
										yd.data?.student?.total?.all / yd.data?.staff?.ครู?.total
									).toLocaleString('th-TH')}`
								}
							]}
						/>
						<div>{yd.data?.staff?.ครู?.total?.toLocaleString('th-TH')}</div>
					{/each}
				</div>
			</section>
		{/if}

		<button
			type="button"
			class="teacher-size-btn emp-btn mb8"
			on:click={() => {
				บุคลากร_modal_open = true;
			}}
		>
			<h3 class="mitr f">
				<span>บุคลากร</span>
				<span class="mla">{d.staff.พนักงาน.total.toLocaleString('th-TH')}</span>
				<img
					loading="lazy"
					decoding="async"
					src="/chevrons/right.svg"
					alt=""
					width="24"
					height="24"
				/>
			</h3>
			<p>พนักงานธุรการ การเงิน บัญชี นักโภชนาการ นักการ-ภารโรง</p>
		</button>
		<Modal
			title={`บุคลากร ${d.staff.พนักงาน.total.toLocaleString('th-TH')} คน`}
			bind:isOpen={บุคลากร_modal_open}
		>
			<div class="modal-section-header p16">
				<div class="f ais fs10 g8">
					<img
						loading="lazy"
						decoding="async"
						src="/icons/info.svg"
						alt=""
						width="16"
						height="16"
					/>
					<p>
						&ldquo;บุคลากรภายในโรงเรียน&rdquo; สามารถเป็นได้ทั้ง พนักงานธุรการ นักโภชนาการ
						นักการภารโรง ฯลฯ ที่ถึงแม้นักเรียนส่วนใหญ่อาจจะไม่ค่อยได้คลุกคลีหรือมีปฏิสัมพันธ์โดยตรง
						แต่ก็ถือเป็นคณะทำงานสำคัญของโรงเรียน
					</p>
				</div>
			</div>
			{#if d.staff.พนักงาน.ลูกจ้างประจำ.total}
				<div class="f modal-section">
					<span>ลูกจ้างประจำ</span>
					<span class="mitr">{d.staff.พนักงาน.ลูกจ้างประจำ.total.toLocaleString('th-TH')}</span>
				</div>
			{/if}
			{#if d.staff.พนักงาน.ลูกจ้างชั่วคราว.total}
				<div class="f modal-section">
					<span>ลูกจ้างชั่วคราว</span>
					<span class="mitr">{d.staff.พนักงาน.ลูกจ้างชั่วคราว.total.toLocaleString('th-TH')}</span>
				</div>
			{/if}
			{#if d.staff.พนักงาน.พนักงานราชการ.total}
				<div class="f modal-section">
					<span>พนักงานราชการ</span>
					<span class="mitr">{d.staff.พนักงาน.พนักงานราชการ.total.toLocaleString('th-TH')}</span>
				</div>
			{/if}
		</Modal>

		<section class="f">
			<div class="f directors">
				<h3>ผู้อำนวยการ</h3>
				{#if d.principal.name}
					<p class="fw500">{d.principal.name}</p>
				{/if}
				{#if d.principal.position_title}
					<small>{d.principal.position_title}</small>
				{/if}
			</div>
			{#if d.principal.image_path}
				<img
					loading="lazy"
					decoding="async"
					class="director-img"
					src={d.principal.image_path}
					alt=""
				/>
			{/if}
		</section>

		<h2 bind:this={el_goods_section} id="goods-section" class="f">
			<span>อุปกรณ์ <small>ที่ใช้งานได้จากทั้งหมด</small></span>
			<span class="f g8">
				<CircularProgress
					percent={(d.durable_goods.stats.working / d.durable_goods.stats.total) * 100}
				/>
				{~~((d.durable_goods.stats.working / d.durable_goods.stats.total) * 100)}%
			</span>
		</h2>
		<section>
			<dl class="f status-color">
				<dt class="usable-color">เหลือง</dt>
				<dd>ใช้งานได้</dd>
				<dt class="await-color">เหลืองเข้ม</dt>
				<dd>รอซ่อม/จำหน่าย</dd>
				<dt class="unusable-color">แดง</dt>
				<dd>ใช้งานไม่ได้</dd>
			</dl>
		</section>

		<button
			type="button"
			class="teacher-size-btn emp-btn mb8"
			on:click={() => {
				อุปกรณ์การเรียน_modal_open = true;
			}}
		>
			<h3 class="f">
				<span>อุปกรณ์การเรียน</span>
				<span class="mla ibm fs10">ดูทั้งหมด</span>
				<img
					loading="lazy"
					decoding="async"
					src="/chevrons/right.svg"
					alt=""
					width="24"
					height="24"
				/>
			</h3>
		</button>
		<Modal title="อุปกรณ์การเรียน" bind:isOpen={อุปกรณ์การเรียน_modal_open}>
			<dl class="f status-color fs10 mb16">
				<dt class="usable-color">เหลือง</dt>
				<dd>ใช้งานได้</dd>
				<dt class="await-color">เหลืองเข้ม</dt>
				<dd>รอซ่อม/จำหน่าย</dd>
				<dt class="unusable-color">แดง</dt>
				<dd>ใช้งานไม่ได้</dd>
			</dl>
			{#each d.durable_goods.data.ครุภัณฑ์การศึกษา.list as eduitem (eduitem.code)}
				<div class="f mb8 mitr">
					<span>
						{eduitem.name}
						<!-- <small>(ชิ้น)</small> -->
					</span>
					<span>{eduitem.total.toLocaleString('th-TH')}</span>
				</div>
				<RatioChart
					data={[
						{ number: eduitem.working, color: '#FFC700' },
						{ number: eduitem.to_be_repaired, color: '#ddab29' },
						{ number: eduitem.to_be_removed, color: '#fc5858' }
					]}
				/>
				<p class="mb8 fs10 ratio-stat-text">
					<span class="cv usable-color">{eduitem.working.toLocaleString('th-TH')}</span>
					|
					<span class="cv await-color">{eduitem.to_be_repaired.toLocaleString('th-TH')}</span>
					|
					<span class="cv unusable-color">{eduitem.to_be_removed.toLocaleString('th-TH')}</span>
					<!-- ชิ้น -->
				</p>
			{/each}
		</Modal>

		<section>
			<h3 class="f mb8">
				<span>
					โต๊ะเก้าอี้นักเรียน
					<small>(ตัว)</small>
				</span>
				<span>{d.durable_goods.data.โต๊ะเก้าอี้นักเรียน.total.toLocaleString('th-TH')}</span>
			</h3>
			<RatioChart
				data={[
					{ number: d.durable_goods.data.โต๊ะเก้าอี้นักเรียน.working, color: '#FFC700' },
					{ number: d.durable_goods.data.โต๊ะเก้าอี้นักเรียน.to_be_repaired, color: '#ddab29' },
					{ number: d.durable_goods.data.โต๊ะเก้าอี้นักเรียน.to_be_removed, color: '#fc5858' }
				]}
			/>
			<p class="mb8 fs10 ratio-stat-text">
				<span class="cv usable-color"
					>{d.durable_goods.data.โต๊ะเก้าอี้นักเรียน.working.toLocaleString('th-TH')}</span
				>
				|
				<span class="cv await-color"
					>{d.durable_goods.data.โต๊ะเก้าอี้นักเรียน.to_be_repaired.toLocaleString('th-TH')}</span
				>
				|
				<span class="cv unusable-color"
					>{d.durable_goods.data.โต๊ะเก้าอี้นักเรียน.to_be_removed.toLocaleString('th-TH')}</span
				> ตัว
			</p>
			<div class="f">
				<span>สัดส่วนโต๊ะเก้าอี้ ต่อ นักเรียน</span>
				<span class="mitr fs20"
					>1:{Math.ceil(
						d.student.total.all / d.durable_goods.data.โต๊ะเก้าอี้นักเรียน.working
					).toLocaleString('th-TH')}</span
				>
			</div>
			<hr />
			<div class="f ratio-chart">
				<div class="f">
					<img
						loading="lazy"
						decoding="async"
						src="/icons/chair.svg"
						alt=""
						width="24"
						height="24"
					/>
				</div>
				<div class="f special">
					{#each Array(Math.ceil(d.student.total.all / d.durable_goods.data.โต๊ะเก้าอี้นักเรียน.working)) as _}
						<img
							loading="lazy"
							decoding="async"
							src="/icons/person-y.svg"
							alt=""
							width="24"
							height="24"
						/>
					{/each}
				</div>
			</div>
		</section>
		<section>
			{#if Object.keys(d.computer).length === 0 || d.computer === null || d.computer === undefined}
				<h3 class="f">
					<span>คอมพิวเตอร์</span>
					<span class="no-data ibm" style="font-size:.85em;font-weight:400">ไม่มีข้อมูล</span>
				</h3>
			{:else}
				<h3 class="f mb8">
					<span>
						คอมพิวเตอร์
						<small>(เครื่อง)</small>
					</span>
					<span>{d.computer.learning.total.toLocaleString('th-TH')}</span>
				</h3>
				<p class="fs10 mb8">
					ใช้วิธีการวัดคนละแบบกับอุปกรณ์อื่น <span class="cv usable-color"
						>(ไม่มีสถานะรอซ่อม/จำหน่าย)</span
					>
				</p>
				<RatioChart
					data={[
						{ number: d.computer.learning.working, color: '#FFC700' },
						{ number: d.computer.learning.broken, color: '#fc5858' }
					]}
				/>
				<p class="mb8 fs10 ratio-stat-text">
					<span class="cv usable-color">{d.computer.learning.working.toLocaleString('th-TH')}</span>
					|
					<span class="cv unusable-color">{d.computer.learning.broken.toLocaleString('th-TH')}</span
					> เครื่อง
				</p>
				<div class="f">
					<span>สัดส่วนคอมพิวเตอร์ ต่อ นักเรียน</span>
					<span class="mitr fs20"
						>1:{Math.ceil(d.student.total.all / d.computer.learning.working).toLocaleString(
							'th-TH'
						)}</span
					>
				</div>
				<hr />
				<div class="f ratio-chart">
					<div class="f">
						<img
							loading="lazy"
							decoding="async"
							src="/icons/tv.svg"
							alt=""
							width="24"
							height="24"
						/>
					</div>
					<div class="f special">
						{#each Array(Math.ceil(d.student.total.all / d.computer.learning.working)) as _}
							<img
								loading="lazy"
								decoding="async"
								src="/icons/person-y.svg"
								alt=""
								width="24"
								height="24"
							/>
						{/each}
					</div>
				</div>
				<details class="computer-details" open>
					<summary>
						<span class="f">
							<span class="mitr">ดูแหล่งที่มาของคอมพิวเตอร์ <small>(เครื่อง)</small></span>
							<img
								loading="lazy"
								decoding="async"
								class="chevron"
								src="/chevrons/bottom.svg"
								alt=""
								width="24"
								height="24"
							/>
						</span>
					</summary>
					<div class="f" style="margin:8px 0 4px">
						{#if d.computer.learning.source.obec}
							<span style="color:#0c166b">งบประมาณ สพฐ</span>
						{/if}
						{#if d.computer.learning.source.self}
							<span>จัดหาเอง/บริจาค</span>
						{/if}
					</div>
					<RatioChart
						data={[
							{ number: d.computer.learning.source.obec, color: '#0c166b' },
							{ number: d.computer.learning.source.self, color: '#3c55ab' }
						]}
					/>
					<p class="f mb8 fs10 ratio-stat-text">
						{#if d.computer.learning.source.obec}
							<span
								><span class="cv primary-color">{d.computer.learning.source.obec}</span> เครื่อง</span
							>
						{/if}
						{#if d.computer.learning.source.self}
							<span
								><span class="cv primary-color">{d.computer.learning.source.self}</span> เครื่อง</span
							>
						{/if}
					</p>
					<div class="f g8 ais">
						<img
							loading="lazy"
							decoding="async"
							src="/icons/info.svg"
							alt=""
							width="16"
							height="16"
						/>
						<p class="fs10">
							แหล่งที่มาของคอมพิวเตอร์สามารถช่วยประกอบการประเมินได้ว่า สพฐ. หรือ
							ตัวโรงเรียนเองได้จัดสรรงบประมาณที่เพียงพอสำหรับจัดหาคอมพิวเตอร์หรือไม่
						</p>
					</div>
				</details>
			{/if}
		</section>
		<section>
			<h3 class="f jcs g8 mb8">
				<img loading="lazy" decoding="async" src="/icons/wifi.svg" alt="" width="24" height="24" />
				<span
					>อินเทอร์เน็ต {d.internet.speed ?? ''}
					{#if d.internet.speed}<small>Mbps</small>{/if}</span
				>
			</h3>
			<dl class="list-grid">
				<dt>สถานะการใช้งาน:</dt>
				<dd class="f jcs g8">
					{#if d.internet.status}
						<img
							loading="lazy"
							decoding="async"
							src="/icons/check-y.svg"
							alt=""
							width="16"
							height="16"
						/>
						{d.internet.status}
					{:else}
						<span class="no-data">ไม่มีข้อมูล</span>
					{/if}
				</dd>
				<dt>ผู้ให้บริการ:</dt>
				<dd>
					{#if d.internet.provider}
						{d.internet.provider}
					{:else}
						<span class="no-data">ไม่มีข้อมูล</span>
					{/if}
				</dd>
				<dt>งบประมาณ:</dt>
				<dd>
					{#if d.internet.monthly_price}
						{(+d.internet.monthly_price).toLocaleString('th-TH')} บาท/เดือน
					{:else}
						<span class="no-data">ไม่มีข้อมูล</span>
					{/if}
				</dd>
			</dl>
		</section>
		<section>
			<button
				class="teacher-size-btn"
				type="button"
				on:click={() => {
					อุปกรณ์อื่น_modal_open = true;
				}}
			>
				<h3 class="f">
					<span>อุปกรณ์อื่น</span>
					<span class="mla ibm fs10">ดูทั้งหมด</span>
					<img
						loading="lazy"
						decoding="async"
						src="/chevrons/right.svg"
						alt=""
						width="24"
						height="24"
					/>
				</h3>
			</button>
			<ul class="other-appliance-list">
				{#each Object.keys(d.durable_goods.data).filter((k) => !k.match(/โต๊ะเก้าอี้นักเรียน|ครุภัณฑ์การศึกษา/)) as appliance_key (appliance_key)}
					{#if d.durable_goods.data[appliance_key].total}
						<li>
							<span class="mitr">{appliance_key.replace('ครุภัณฑ์', '')}</span>
							<span class="fs10">
								{mergeGoodsName(d.durable_goods.data[appliance_key].list)}
							</span>
						</li>
					{/if}
				{/each}
			</ul>
		</section>
		<Modal title="อุปกรณ์อื่นๆ" bind:isOpen={อุปกรณ์อื่น_modal_open}>
			{#each Object.keys(d.durable_goods.data).filter((k) => !k.match(/โต๊ะเก้าอี้นักเรียน|ครุภัณฑ์การศึกษา/)) as appliance_key (appliance_key)}
				{#if d.durable_goods.data[appliance_key].total}
					<div class="f modal-section-header mitr">{appliance_key}</div>
					{#each d.durable_goods.data[appliance_key].list as good (good.code)}
						<div class="f modal-section">
							<span>{good.name}</span>
							<span class="mitr">{good.total.toLocaleString('th-TH')}</span>
						</div>
					{/each}
				{/if}
			{/each}
		</Modal>

		<ActAiBanner
			margin
			href="https://actai.co/Project?search={encodeURIComponent(`"โรงเรียน${d.name_th}"`)}"
		/>

		<h2 bind:this={el_building_section} id="building-section" class="f">
			<span>สิ่งก่อสร้าง <small>สภาพดีจากทั้งหมด</small></span>
			<span class="f g8">
				<CircularProgress
					percent={(d.building.stats.ดี /
						(d.building.stats.ดี + d.building.stats['พอใช้'] + d.building.stats.ทรุดโทรม)) *
						100}
				/>
				{~~(
					(d.building.stats.ดี /
						(d.building.stats.ดี + d.building.stats['พอใช้'] + d.building.stats.ทรุดโทรม)) *
					100
				)}%
			</span>
		</h2>
		<section style="margin-bottom:0;padding-bottom:0">
			<dl class="f status-color">
				<dt class="usable-color">เหลือง</dt>
				<dd>
					ดี {~~(
						(d.building.stats.ดี /
							(d.building.stats.ดี + d.building.stats['พอใช้'] + d.building.stats.ทรุดโทรม)) *
						100
					)}%
				</dd>
				<dt class="await2-color">เหลืองเข้ม</dt>
				<dd>
					พอใช้ {~~(
						(d.building.stats['พอใช้'] /
							(d.building.stats.ดี + d.building.stats['พอใช้'] + d.building.stats.ทรุดโทรม)) *
						100
					)}%
				</dd>
				<dt class="unusable-color">แดง</dt>
				<dd>
					ทรุดโทรม {~~(
						(d.building.stats.ทรุดโทรม /
							(d.building.stats.ดี + d.building.stats['พอใช้'] + d.building.stats.ทรุดโทรม)) *
						100
					)}%
				</dd>
			</dl>
		</section>
		<section>
			<p class="f mb8">
				<span>สภาพการใช้งาน</span>
				<small>จากการประเมินของโรงเรียน</small>
			</p>
			<RatioChart
				data={[
					{ number: d.building.stats.ดี, color: '#FFC700' },
					{ number: d.building.stats.พอใช้, color: '#7d5b05' },
					{ number: d.building.stats.ทรุดโทรม, color: '#fc5858' }
				]}
			/>
		</section>
		<section style="margin-bottom:0">
			<h3 class="f">
				<span>อาคารการศึกษา <small>(อาคาร)</small></span>
				<span>{d.building.data.อาคารเรียน.length.toLocaleString('th-TH')}</span>
			</h3>
		</section>
		<section>
			<p class="f">
				<span>ห้องทั้งหมด <small>(ห้อง)</small></span>
				<span class="mitr">{d.building.stats.จำนวนห้องในอาคารเรียน.toLocaleString('th-TH')}</span>
			</p>
			<hr />
			<div class="col2-on-desktop">
				{#each d.building.data.อาคารเรียน as b, bi}
					<article class="building-card {getConditionClass(b.current_condition, true)}">
						<img
							loading="lazy"
							decoding="async"
							class="building-image"
							class:no-zoom={building_imgs?.อาคารเรียน?.[bi] === FALLBACK_BUILDING_IMG}
							src={building_imgs?.อาคารเรียน?.[bi] ?? FALLBACK_BUILDING_IMG}
							alt=""
							on:click={() =>
								openLightbox(b.name, building_imgs?.อาคารเรียน?.[bi] ?? FALLBACK_BUILDING_IMG)}
							on:keypress={() =>
								openLightbox(b.name, building_imgs?.อาคารเรียน?.[bi] ?? FALLBACK_BUILDING_IMG)}
						/>
						<div>
							<h4>{b.name} {bi + 1}</h4>
							<p>
								สร้างปี {b.build_at}<br />
								สภาพการใช้งาน
								<span class="building-status cv">{b.current_condition}</span>
							</p>
							<Waffle number={b.room_number ?? 0} />
							<div>
								<span class="mitr">{(b.room_number ?? 0).toLocaleString('th-TH')}</span>
								<span class="fs10">ห้อง</span>
							</div>
						</div>
					</article>
				{/each}
			</div>
		</section>

		<button
			type="button"
			class="teacher-size-btn emp-btn"
			on:click={() => {
				อาคาร_modal_open = true;
			}}
		>
			<h3 class="f">
				<span>อาคารและสิ่งก่อสร้างอื่น</span>
				<span class="mla ibm fs10">ดูรายละเอียด</span>
				<img
					loading="lazy"
					decoding="async"
					src="/chevrons/right.svg"
					alt=""
					width="24"
					height="24"
				/>
			</h3>
		</button>
		<Modal title="อาคารและสิ่งก่อสร้างอื่น" bind:isOpen={อาคาร_modal_open}>
			<dl class="f status-color fs10 mb16">
				<dt class="usable-color">เหลือง</dt>
				<dd>ดี</dd>
				<dt class="await2-color">เหลืองเข้ม</dt>
				<dd>พอใช้</dd>
				<dt class="unusable-color">แดง</dt>
				<dd>ทรุดโทรม</dd>
			</dl>
			{#each Object.keys(d.building.data).filter((k) => !k.match(/อาคาร/)) as buildings_key (buildings_key)}
				{#if d.building.data[buildings_key].length}
					<div class="f modal-section-header mitr">{buildings_key}</div>
					<div class="col2-on-desktop">
						{#each d.building.data[buildings_key] as b, bi}
							<div
								class="modal-section building f jcs ais g8 {getConditionClass(
									b.current_condition,
									true
								)}"
							>
								<img
									loading="lazy"
									decoding="async"
									class="building-image"
									class:no-zoom={building_imgs?.[buildings_key]?.[bi] === FALLBACK_BUILDING_IMG}
									src={building_imgs?.[buildings_key]?.[bi] ?? FALLBACK_BUILDING_IMG}
									alt=""
									on:click={() => {
										อาคาร_modal_open = false;
										openLightbox(
											b.name,
											building_imgs?.[buildings_key]?.[bi] ?? FALLBACK_BUILDING_IMG,
											() => {
												อาคาร_modal_open = true;
											}
										);
									}}
									on:keypress={() => {
										อาคาร_modal_open = false;
										openLightbox(
											b.name,
											building_imgs?.[buildings_key]?.[bi] ?? FALLBACK_BUILDING_IMG,
											() => {
												อาคาร_modal_open = true;
											}
										);
									}}
								/>
								<span class="building-status cv" />
								<div>
									<span>{b.name}</span><br /><small>สร้างปี {b.build_at}</small>
								</div>
							</div>
						{/each}
					</div>
				{/if}
			{/each}
		</Modal>

		<section class="other-buildings">
			<div>
				{#each d.building.data.อาคารทั่วไป as b, bi}
					<article class={getConditionClass(b.current_condition, true)}>
						<img
							class="building-image"
							class:no-zoom={building_imgs?.อาคารทั่วไป?.[bi] === FALLBACK_BUILDING_IMG}
							src={building_imgs?.อาคารทั่วไป?.[bi] ?? FALLBACK_BUILDING_IMG}
							alt=""
							on:click={() =>
								openLightbox(b.name, building_imgs?.อาคารทั่วไป?.[bi] ?? FALLBACK_BUILDING_IMG)}
							on:keypress={() =>
								openLightbox(b.name, building_imgs?.อาคารทั่วไป?.[bi] ?? FALLBACK_BUILDING_IMG)}
						/>
						<h4>{b.name}</h4>
						<p>สร้างปี {b.build_at}</p>
					</article>
				{/each}
			</div>
			<ul class="other-appliance-list">
				{#each Object.keys(d.building.data).filter((k) => !k.match(/อาคาร/)) as buildings_key (buildings_key)}
					{#if d.building.data[buildings_key].length}
						<li>
							<span class="mitr">{buildings_key}</span>
							{#if buildings_key !== 'ห้องน้ำ'}
								<span class="fs10">
									{mergeGoodsName(d.building.data[buildings_key])}
								</span>
							{/if}
						</li>
					{/if}
				{/each}
			</ul>
		</section>

		<ActAiBanner
			margin
			text="ค้นหาข้อมูลการจัดซื้อจัดจ้างเกี่ยวกับอุปกรณ์และการก่อสร้างอาคารของโรงเรียนเพิ่มเติมได้ที่เครื่องมือ"
			href="https://actai.co/Project?search={encodeURIComponent(`"โรงเรียน${d.name_th}"`)}"
		/>

		<h2 bind:this={el_general_section} id="general-section" class="f mb8">
			<span>ข้อมูลทั่วไป</span>
		</h2>

		<div class="col2-on-desktop">
			<section class="contact">
				<h3 class="mb8">ติดต่อ</h3>
				<dl class="list-grid">
					<dt>
						<img
							loading="lazy"
							decoding="async"
							src="/icons/location.svg"
							alt="ที่อยู่"
							width="16"
							height="16"
						/>
					</dt>
					<dd>
						{[
							d.address ?? '',
							d.subdistrict ?? '',
							d.district ?? '',
							d.province ?? '',
							d.postcode ?? ''
						]
							.join(' ')
							.replace(/\s+/g, ' ')
							.trim()}
					</dd>
					<dt>
						<img
							loading="lazy"
							decoding="async"
							src="/icons/phone.svg"
							alt="เบอร์โทรศัพท์"
							width="16"
							height="16"
						/>
					</dt>
					<dd>{d.telephone ?? '—'}</dd>
					<dt>
						<img
							loading="lazy"
							decoding="async"
							src="/icons/globe.svg"
							alt="เว็บไซต์"
							width="16"
							height="16"
						/>
					</dt>
					<dd>
						{#if d.links.length}
							<a
								href={d.links[0].url.includes('http')
									? d.links[0].url
									: `https://${d.links[0].url}`}
								target="_blank"
								rel="nofollow noopener noreferrer">{d.links[0].text}</a
							>
						{:else}
							<span>—</span>
						{/if}
					</dd>
					<dt>
						<img
							loading="lazy"
							decoding="async"
							src="/icons/mail.svg"
							alt="อีเมล์"
							width="16"
							height="16"
						/>
					</dt>
					<dd>
						{#if d.email}
							<a href="mailto:{d.email}" target="_blank" rel="nofollow noopener noreferrer"
								>{d.email}</a
							>
						{:else}
							<span>—</span>
						{/if}
					</dd>
				</dl>
			</section>

			<section class="other-data">
				<img
					loading="lazy"
					decoding="async"
					class="school-logo"
					src={d.logo_image_path}
					alt=""
					width="40"
					height="40"
				/>
				<h3 class="mb8">ข้อมูลอื่น</h3>
				<dl class="list-grid">
					<dt>รหัสโรงเรียน</dt>
					<dd>{$currentSchoolId}</dd>
					<dt>สังกัด</dt>
					<dd>{d.affiliation ?? '—'}</dd>
					<dt>ก่อตั้งเมื่อ</dt>
					<dd>{d.established ?? '—'}</dd>
					<dt>ระดับที่เปิดสอน</dt>
					<dd>{d.grades ?? '—'}</dd>
					<dt>ประเภทโรงเรียน</dt>
					<dd>รัฐบาล</dd>
				</dl>
			</section>
		</div>

		<footer>
			<p use:balancer style="margin:auto">
				สามารถตรวจสอบความถูกต้องของข้อมูลเพื่อใช้ประกอบการอ้างอิงหรือติดต่อหน่วยงานต้นทางข้อมูลได้ที่<br
				/>
			</p>
			<p use:balancer style="margin:auto">
				<a
					href="https://data.bopp-obec.info/emis"
					target="_blank"
					rel="nofollow noopener noreferrer"
				>
					ระบบสารสนเทศเพื่อการบริหารการศึกษา (Education Management Information System : EMIS)
				</a>
			</p>
			<p class="update">อัปเดตข้อมูลล่าสุดเมื่อ {update_date}</p>
		</footer>
	{/if}
</div>

<!-- Lightbox Dialog -->
<Dialog
	open={lightbox_open}
	on:close={() => {
		lightbox_open = false;
		tick().then(lightbox_callback);
	}}
>
	<DialogOverlay class="lightbox-backdrop" />

	<DialogTitle class="sr-only">{lightbox_building_name}</DialogTitle>
	<DialogDescription>ภาพ{lightbox_building_name}</DialogDescription>

	<button
		class="lightbox-close"
		type="button"
		on:click={() => {
			lightbox_open = false;
			tick().then(lightbox_callback);
		}}
	>
		<img
			loading="lazy"
			decoding="async"
			src="/icons/close-w.svg"
			alt="ปิด"
			width="32"
			height="32"
		/>
	</button>
	<img loading="lazy" decoding="async" class="lightbox-image" src={lightbox_url} alt="" />
</Dialog>

<style lang="scss">
	@media screen and (min-width: 768px) {
		.desktop-margin {
			width: 100%;
			max-width: 640px;
			margin: auto;
		}
	}

	.f {
		justify-content: space-between;
	}

	.student-color-1 {
		--std-color: #3f836e;
	}

	.student-color-2 {
		--std-color: #b1a215;
	}

	.student-color-3 {
		--std-color: #f09326;
	}

	.student-color-4 {
		--std-color: #ffc700;
	}

	.primary-color {
		--std-color: #3c55ab;
	}

	.usable-color {
		--std-color: #ffc700;
	}

	.await-color {
		--std-color: #ddab29;
	}

	.await2-color {
		--std-color: #7d5b05;
	}

	.unusable-color {
		--std-color: #fc5858;
	}

	.mb8 {
		margin-bottom: 8px !important;
	}

	.mb16 {
		margin-bottom: 16px !important;
	}

	.mt8 {
		margin-top: 8px !important;
	}

	.fw500 {
		font-weight: 500 !important;
	}

	.fs10 {
		font-size: 0.625rem !important;
	}

	.fs20 {
		font-size: 1.25rem !important;
	}

	.cv {
		color: var(--std-color) !important;
	}

	.g8 {
		gap: 8px !important;
	}

	.tc {
		text-align: center !important;
	}

	.ibm {
		font-family: 'IBM Plex Sans Thai Looped' !important;
	}

	.ais {
		align-items: flex-start !important;
	}

	.jcs {
		justify-content: start !important;
	}

	.mla {
		margin-left: auto;
	}

	small {
		font-weight: 400;
		font-size: 0.625rem;
		line-height: 136%;
		color: #9daad5;

		@media screen and (min-width: 768px) {
			font-size: 0.8125rem;
		}
	}

	.mitr,
	h2,
	h3 {
		font-family: 'Mitr';
		font-weight: 500;
		line-height: 125%;
		letter-spacing: 0.02em;
	}

	h2 {
		font-size: 1.25rem;
		background: #ffe599;
		padding: 16px;

		small {
			font-family: 'IBM Plex Sans Thai Looped';
			color: inherit;
		}
	}

	section {
		background: #fff;
		padding: 16px;
		margin-bottom: 8px;
	}

	hr {
		border: none;
		border-bottom: 1px dashed #ced5ea;
		margin: 8px 0;
	}

	.school-size-detail {
		font-size: 0.625rem;

		@media screen and (min-width: 768px) {
			font-size: 0.8125rem;
		}

		> summary {
			cursor: pointer;

			list-style: none;

			&::-webkit-details-marker {
				display: none;
			}

			> span {
				justify-content: start;
				gap: 8px;
			}
		}

		&[open] > summary > span > .chevron {
			transform: rotate(180deg);
		}
	}

	.school-size-flex {
		display: flex;
		flex-direction: column;
		gap: 16px;
		margin-top: 4px;

		@media screen and (min-width: 768px) {
			flex-direction: row;
		}
	}

	h4 {
		font-weight: 500;
		margin-bottom: 4px;
	}

	.list-grid {
		display: grid;
		gap: 4px 16px;
		grid-template-columns: max-content auto;
		margin: 0;
	}

	.student-chart {
		display: flex;
		gap: 2px;
	}

	.student-size-btn {
		width: 100%;
		padding: 8px 0;
		margin: 16px 0 0;

		&.f {
			justify-content: start;
			gap: 8px;
		}

		> .std-size-color {
			width: 12px;
			height: 12px;
			background: var(--std-color);
			border-radius: 1px;
			display: block;
		}

		> .std-size-count {
			margin-left: auto;
		}
	}

	.compare-chart {
		display: grid;
		align-items: center;
		grid-template-columns: max-content auto max-content;
		gap: 4px;

		> div:nth-child(3n) {
			text-align: right;
			font-weight: 500;
		}
	}

	.teacher-size-btn {
		width: 100%;

		h3 {
			gap: 8px;
		}

		p {
			font-size: 0.625rem;
			color: #9daad5;
			margin-top: 4px;
			text-align: left;

			@media screen and (min-width: 768px) {
				font-size: 0.8125rem;
			}
		}
	}

	.emp-btn {
		padding: 16px;
		background: #fff;
	}

	.directors {
		flex-direction: column;
		align-items: flex-start;
		gap: 4px;
		line-height: 1.2;

		> small {
			margin-bottom: 4px;
		}
	}

	.status-color {
		gap: 4px;
		justify-content: start;
		margin: 0;

		dt {
			font-size: 0;
			border-radius: 1px;
			width: 12px;
			height: 12px;
			flex: 0 0 12px;

			background: var(--std-color);

			&:nth-of-type(2) {
				margin-left: auto;
			}
		}

		dd {
			white-space: nowrap;

			&:nth-of-type(2) {
				margin-right: auto;
			}
		}
	}

	.ratio-chart {
		align-items: flex-start;
		justify-content: flex-start;

		> div {
			flex-wrap: wrap;
			justify-content: flex-start;
		}

		> div.special {
			flex-direction: row-reverse;
			margin-left: auto;
			max-width: 240px;

			@media screen and (min-width: 450px) {
				max-width: 360px;
			}

			@media screen and (min-width: 550px) {
				max-width: 480px;
			}
		}
	}

	.computer-details {
		margin-top: 16px;

		> summary {
			cursor: pointer;

			list-style: none;

			&::-webkit-details-marker {
				display: none;
			}
		}

		&[open] > summary > span > .chevron {
			transform: rotate(180deg);
		}
	}

	.other-appliance-list {
		list-style: none;
		margin: 0;

		> li {
			margin-top: 16px;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
		}
	}

	.building-card {
		display: flex;
		padding: 8px;
		gap: 8px;

		> .building-image {
			width: 50%;
			height: auto;
			aspect-ratio: 1;
			border-top: 2px var(--std-color) solid;
			cursor: zoom-in;
			object-fit: cover;

			&.no-zoom {
				cursor: auto;
			}
		}

		h4 {
			font-weight: 400;
			margin-bottom: 0;
		}

		p {
			color: #9daad5;
			font-size: 0.625rem;
		}
	}

	.building-status {
		&::before {
			content: '';
			display: inline-block;
			width: 8px;
			height: 8px;
			border-radius: 1px;
			background: var(--std-color);
			margin-right: 0.5ch;
		}
	}

	.other-buildings {
		> div {
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: 16px;
			padding: 8px;

			@media screen and (min-width: 768px) {
				grid-template-columns: 1fr 1fr 1fr 1fr;
			}

			> article {
				> .building-image {
					width: 100%;
					height: auto;
					aspect-ratio: 1;
					border-top: 2px var(--std-color) solid;
					cursor: zoom-in;
					object-fit: cover;

					&.no-zoom {
						cursor: auto;
					}
				}

				> h4 {
					font-weight: 400;
					margin: 8px 0 0;
				}

				> p {
					color: #9daad5;
					font-size: 0.625rem;
				}
			}
		}
	}

	.contact {
		> dl {
			gap: 8px;
		}
	}

	.other-data {
		> .school-logo {
			float: right;
			object-fit: contain;
			object-position: center;
		}

		dd {
			font-weight: 500;
		}
	}

	footer {
		padding: 16px;

		text-align: center;
		color: #0c166b;

		.update {
			margin: 16px 0 0;
			color: #9daad5;
		}
	}

	.no-data {
		color: #9daad5;
	}

	.ratio-stat-text {
		margin-top: 4px;
		color: #b1b2b3;
	}

	.modal-section {
		height: 42px;
		font-size: 0.875rem;

		& + & {
			border-top: 1px solid #ddd;
		}

		&.building {
			height: unset;
			padding: 8px 0;

			.building-status::before {
				margin-right: 0;
			}

			.building-image {
				width: 40px;
				height: 40px;
				border-top: 2px var(--std-color) solid;
				cursor: zoom-in;

				&.no-zoom {
					cursor: auto;
				}
			}
		}
	}

	.modal-section-header {
		background: #ecf7f7;
		margin: 0 -16px;
		padding: 0 16px;
		min-height: 42px;

		&.p16 {
			padding: 16px;
		}
	}

	.teacher-list {
		margin: 0;
		padding-left: 24px;
		list-style-position: inside;
	}

	:global(.lightbox-backdrop) {
		position: fixed;
		inset: 0;
		background: rgb(0, 0, 0);
		cursor: zoom-out;

		z-index: 20;
	}

	.lightbox-close {
		position: fixed;
		top: 8px;
		left: 8px;
		z-index: 20;
	}

	.lightbox-image {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: 20;

		object-fit: contain;
		object-position: center;

		cursor: zoom-out;
		pointer-events: none;
	}

	@media screen and (min-width: 768px) {
		.fs10 {
			font-size: 0.8125rem !important;
		}

		.fs20 {
			font-size: 1.5rem !important;
		}

		.lightbox-close {
			top: 32px;
			left: 32px;
		}

		.lightbox-image {
			top: 10vh;
			left: 10vw;
			width: 80vw;
			height: 80vh;
		}
	}

	.director-img {
		border-radius: 999px;
		width: 64px;
		height: 64px;
		object-fit: cover;
	}

	@media screen and (min-width: 768px) {
		.col2-on-desktop {
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: 0 8px;
		}

		.modal-section.building:nth-of-type(2) {
			border-top: none;
		}
	}

	a {
		color: inherit;
	}

	.jumpnav {
		justify-content: center;
		gap: 8px;

		background: #fff;
		list-style: none;
		box-shadow: 0 1px 4px rgba(12, 22, 107, 0.2);

		width: max-content;
		min-width: 100%;

		@media screen and (min-width: 768px) {
			gap: 16px;
		}

		> li > button {
			height: 32px;

			font-family: 'Mitr';
			font-weight: 500;
			font-size: 0.8125rem;
			line-height: 125%;
			letter-spacing: 0.02em;
			white-space: nowrap;

			padding: 2px 8px 0;
			border-bottom: 2px solid #fff;
			color: #9daad5;

			@media screen and (min-width: 768px) {
				height: 48px;
				padding: 2px 16px 0;
				font-size: 1rem;
			}

			&.j-active {
				border-bottom: 2px solid #ffc700;
				color: #3c55ab;
			}
		}
	}

	.jumpnav-compensate {
		height: 32px;

		@media screen and (min-width: 768px) {
			height: 48px;
		}
	}

	.jumpnav-wrapper {
		position: fixed;
		top: calc(var(--navbar-height) + 60px);
		left: 0;
		width: 100%;
		overflow-x: auto;

		transition: top 0.3s;
		will-change: top;
		z-index: 10;

		@media screen and (min-width: 768px) {
			left: calc(50% + 32px);
			transform: translateX(-50%);
			max-width: 640px;
		}
	}

	.std-unit {
		font-family: 'IBM Plex Sans Thai Looped';
		font-weight: 400;
		line-height: 136%;
		color: #9daad5;
	}

	.schoolyear-dropdown-label {
		font-size: 0.8em;
		line-height: 1;
		height: 12px;
		display: block;
		text-align: center;
	}
</style>
