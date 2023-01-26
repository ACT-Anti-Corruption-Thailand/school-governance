<script lang="ts">
	import { onMount } from 'svelte';

	import {
		Dialog,
		DialogOverlay,
		DialogTitle,
		DialogDescription
	} from '@rgossiaux/svelte-headlessui';
	import SchoolHeader from 'components/school/SchoolHeader.svelte';
	import Dropdown from 'components/Dropdown.svelte';
	import CircularProgress from 'components/school/CircularProgress.svelte';
	import ActAiBanner from 'components/ActAiBanner.svelte';
	import Waffle from 'components/school/Waffle.svelte';
	import RatioChart from 'components/school/RatioChart.svelte';
	import Modal from 'components/Modal.svelte';

	import { currentSchool, currentSchoolId, update_date, years } from 'stores/school';

	const DROPDOWN_DATA = $years?.map((y) => ({ label: y + 543, value: y })) ?? [];
	let dropdown_choice = DROPDOWN_DATA[0];

	$: d = $currentSchool;

	const getConditionClass = (condition: string) => {
		const CONDITIONS_CLASS: Record<string, string> = {
			ดี: 'usable-color',
			พอใช้: 'await-color',
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
	let lightbox_url0 = '';
	let lightbox_url1 = '';

	const openLightbox = (name: string, img0: string, img1: string) => {
		lightbox_building_name = name;
		lightbox_url0 = img0;
		lightbox_url1 = img1;
		lightbox_open = true;
	};

	let [current_year, ...other_years] = [...($years ?? [])];
	let school_other_years_data: { year: number; data: any }[] = [];

	const fetchOtherYearData = () => {
		if (other_years.length > 1) {
			other_years.forEach((year, index) => {
				fetch(`/data/${year}/${currentSchoolId}.json`)
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

	onMount(() => {
		fetchOtherYearData();
	});
</script>

<SchoolHeader pageData={{ name: 'ข้อมูลโรงเรียน', color: '#DDAB29' }}>
	<Dropdown options={DROPDOWN_DATA} bind:selected_option={dropdown_choice} />
</SchoolHeader>
<div class="desktop-margin">
	{#if d}
		<h2 class="f">
			<span>นักเรียน <small>(คน)</small></span>
			<span>{d.student.total.all.toLocaleString()}</span>
		</h2>
		<section>
			<div class="f">
				<span>
					เฉลี่ยนักเรียนห้องละ <small>(คน)</small>
				</span>
				<span class="mitr"
					>{Math.ceil(d.student.total.all / d.student.total.class).toLocaleString()}</span
				>
			</div>
			<hr />
			<span class="mitr">โรงเรียนขนาดใหญ่ <!-- TODO: รอข้อมูลจากฟีน --></span>
			<details class="school-size-detail">
				<summary>
					<span class="f">
						<img src="/icons/info.svg" alt="" width="16" height="16" />
						<span>ดูเกณฑ์การแบ่งขนาดโรงเรียน</span>
						<img class="chevron" src="/chevrons/bottom.svg" alt="" width="24" height="24" />
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
			{#if d.student.total.อ}
				<button
					type="button"
					class="mitr f student-size-btn"
					on:click={() => {
						อ_modal_open = true;
					}}
				>
					<span class="student-color-1 std-size-color" />
					<span>อนุบาล</span>
					<span class="std-size-count">{d.student.total.อ.toLocaleString()}</span>
					<img src="/chevrons/right.svg" alt="" width="24" height="24" />
				</button>
				<Modal title={`อนุบาล ${d.student.total.อ.toLocaleString()} คน`} bind:isOpen={อ_modal_open}>
					<div class="f mitr modal-section-header">
						<span>อนุบาล 1</span>
						<span class="mitr">{d.student.อ1.total.toLocaleString()}</span>
					</div>
					<div class="f modal-section">
						<span>จำนวนห้องเรียน <small>(ห้อง)</small></span>
						<span class="mitr">{d.student.อ1.class.toLocaleString()}</span>
					</div>
					<div class="f modal-section">
						<span>แบ่งตามเพศ</span>
						<span>
							หญิง
							<span class="mitr">{d.student.อ1.women.toLocaleString()}</span>
							ชาย
							<span class="mitr">{d.student.อ1.men.toLocaleString()}</span>
						</span>
					</div>
					<div class="f mitr modal-section-header">
						<span>อนุบาล 2</span>
						<span class="mitr">{d.student.อ2.total.toLocaleString()}</span>
					</div>
					<div class="f modal-section">
						<span>จำนวนห้องเรียน <small>(ห้อง)</small></span>
						<span class="mitr">{d.student.อ2.class.toLocaleString()}</span>
					</div>
					<div class="f modal-section">
						<span>แบ่งตามเพศ</span>
						<span>
							หญิง
							<span class="mitr">{d.student.อ2.women.toLocaleString()}</span>
							ชาย
							<span class="mitr">{d.student.อ2.men.toLocaleString()}</span>
						</span>
					</div>
					<div class="f mitr modal-section-header">
						<span>อนุบาล 3</span>
						<span class="mitr">{d.student.อ3.total.toLocaleString()}</span>
					</div>
					<div class="f modal-section">
						<span>จำนวนห้องเรียน <small>(ห้อง)</small></span>
						<span class="mitr">{d.student.อ3.class.toLocaleString()}</span>
					</div>
					<div class="f modal-section">
						<span>แบ่งตามเพศ</span>
						<span>
							หญิง
							<span class="mitr">{d.student.อ3.women.toLocaleString()}</span>
							ชาย
							<span class="mitr">{d.student.อ3.men.toLocaleString()}</span>
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
					<span>ประถม</span>
					<span class="std-size-count">{d.student.total.ป.toLocaleString()}</span>
					<img src="/chevrons/right.svg" alt="" width="24" height="24" />
				</button>
				<Modal title={`ประถม ${d.student.total.ป.toLocaleString()} คน`} bind:isOpen={ป_modal_open}>
					<div class="f mitr modal-section-header">
						<span>ประถม 1</span>
						<span class="mitr">{d.student.ป1.total.toLocaleString()}</span>
					</div>
					<div class="f modal-section">
						<span>จำนวนห้องเรียน <small>(ห้อง)</small></span>
						<span class="mitr">{d.student.ป1.class.toLocaleString()}</span>
					</div>
					<div class="f modal-section">
						<span>แบ่งตามเพศ</span>
						<span>
							หญิง
							<span class="mitr">{d.student.ป1.women.toLocaleString()}</span>
							ชาย
							<span class="mitr">{d.student.ป1.men.toLocaleString()}</span>
						</span>
					</div>
					<div class="f mitr modal-section-header">
						<span>ประถม 2</span>
						<span class="mitr">{d.student.ป2.total.toLocaleString()}</span>
					</div>
					<div class="f modal-section">
						<span>จำนวนห้องเรียน <small>(ห้อง)</small></span>
						<span class="mitr">{d.student.ป2.class.toLocaleString()}</span>
					</div>
					<div class="f modal-section">
						<span>แบ่งตามเพศ</span>
						<span>
							หญิง
							<span class="mitr">{d.student.ป2.women.toLocaleString()}</span>
							ชาย
							<span class="mitr">{d.student.ป2.men.toLocaleString()}</span>
						</span>
					</div>
					<div class="f mitr modal-section-header">
						<span>ประถม 3</span>
						<span class="mitr">{d.student.ป3.total.toLocaleString()}</span>
					</div>
					<div class="f modal-section">
						<span>จำนวนห้องเรียน <small>(ห้อง)</small></span>
						<span class="mitr">{d.student.ป3.class.toLocaleString()}</span>
					</div>
					<div class="f modal-section">
						<span>แบ่งตามเพศ</span>
						<span>
							หญิง
							<span class="mitr">{d.student.ป3.women.toLocaleString()}</span>
							ชาย
							<span class="mitr">{d.student.ป3.men.toLocaleString()}</span>
						</span>
					</div>
					<div class="f mitr modal-section-header">
						<span>ประถม 4</span>
						<span class="mitr">{d.student.ป4.total.toLocaleString()}</span>
					</div>
					<div class="f modal-section">
						<span>จำนวนห้องเรียน <small>(ห้อง)</small></span>
						<span class="mitr">{d.student.ป4.class.toLocaleString()}</span>
					</div>
					<div class="f modal-section">
						<span>แบ่งตามเพศ</span>
						<span>
							หญิง
							<span class="mitr">{d.student.ป4.women.toLocaleString()}</span>
							ชาย
							<span class="mitr">{d.student.ป4.men.toLocaleString()}</span>
						</span>
					</div>
					<div class="f mitr modal-section-header">
						<span>ประถม 5</span>
						<span class="mitr">{d.student.ป5.total.toLocaleString()}</span>
					</div>
					<div class="f modal-section">
						<span>จำนวนห้องเรียน <small>(ห้อง)</small></span>
						<span class="mitr">{d.student.ป5.class.toLocaleString()}</span>
					</div>
					<div class="f modal-section">
						<span>แบ่งตามเพศ</span>
						<span>
							หญิง
							<span class="mitr">{d.student.ป5.women.toLocaleString()}</span>
							ชาย
							<span class="mitr">{d.student.ป5.men.toLocaleString()}</span>
						</span>
					</div>
					<div class="f mitr modal-section-header">
						<span>ประถม 6</span>
						<span class="mitr">{d.student.ป6.total.toLocaleString()}</span>
					</div>
					<div class="f modal-section">
						<span>จำนวนห้องเรียน <small>(ห้อง)</small></span>
						<span class="mitr">{d.student.ป6.class.toLocaleString()}</span>
					</div>
					<div class="f modal-section">
						<span>แบ่งตามเพศ</span>
						<span>
							หญิง
							<span class="mitr">{d.student.ป6.women.toLocaleString()}</span>
							ชาย
							<span class="mitr">{d.student.ป6.men.toLocaleString()}</span>
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
					<span>มัธยมต้น</span>
					<span class="std-size-count">{d.student.total.มต.toLocaleString()}</span>
					<img src="/chevrons/right.svg" alt="" width="24" height="24" />
				</button>
				<Modal
					title={`มัธยมต้น ${d.student.total.มต.toLocaleString()} คน`}
					bind:isOpen={มต_modal_open}
				>
					<div class="f mitr modal-section-header">
						<span>มัธยม 1</span>
						<span class="mitr">{d.student.ม1.total.toLocaleString()}</span>
					</div>
					<div class="f modal-section">
						<span>จำนวนห้องเรียน <small>(ห้อง)</small></span>
						<span class="mitr">{d.student.ม1.class.toLocaleString()}</span>
					</div>
					<div class="f modal-section">
						<span>แบ่งตามเพศ</span>
						<span>
							หญิง
							<span class="mitr">{d.student.ม1.women.toLocaleString()}</span>
							ชาย
							<span class="mitr">{d.student.ม1.men.toLocaleString()}</span>
						</span>
					</div>
					<div class="f mitr modal-section-header">
						<span>มัธยม 2</span>
						<span class="mitr">{d.student.ม2.total.toLocaleString()}</span>
					</div>
					<div class="f modal-section">
						<span>จำนวนห้องเรียน <small>(ห้อง)</small></span>
						<span class="mitr">{d.student.ม2.class.toLocaleString()}</span>
					</div>
					<div class="f modal-section">
						<span>แบ่งตามเพศ</span>
						<span>
							หญิง
							<span class="mitr">{d.student.ม2.women.toLocaleString()}</span>
							ชาย
							<span class="mitr">{d.student.ม2.men.toLocaleString()}</span>
						</span>
					</div>
					<div class="f mitr modal-section-header">
						<span>มัธยม 3</span>
						<span class="mitr">{d.student.ม3.total.toLocaleString()}</span>
					</div>
					<div class="f modal-section">
						<span>จำนวนห้องเรียน <small>(ห้อง)</small></span>
						<span class="mitr">{d.student.ม3.class.toLocaleString()}</span>
					</div>
					<div class="f modal-section">
						<span>แบ่งตามเพศ</span>
						<span>
							หญิง
							<span class="mitr">{d.student.ม3.women.toLocaleString()}</span>
							ชาย
							<span class="mitr">{d.student.ม3.men.toLocaleString()}</span>
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
					<span>มัธยมปลาย</span>
					<span class="std-size-count">{d.student.total.มป.toLocaleString()}</span>
					<img src="/chevrons/right.svg" alt="" width="24" height="24" />
				</button>
				<Modal
					title={`มัธยมปลาย ${d.student.total.มป.toLocaleString()} คน`}
					bind:isOpen={มป_modal_open}
				>
					{#if d.student.ม4.total + d.student.ม5.total + d.student.ม6.total}
						<div class="f mitr modal-section-header">
							<span>มัธยม 4</span>
							<span class="mitr">{d.student.ม4.total.toLocaleString()}</span>
						</div>
						<div class="f modal-section">
							<span>จำนวนห้องเรียน <small>(ห้อง)</small></span>
							<span class="mitr">{d.student.ม4.class.toLocaleString()}</span>
						</div>
						<div class="f modal-section">
							<span>แบ่งตามเพศ</span>
							<span>
								หญิง
								<span class="mitr">{d.student.ม4.women.toLocaleString()}</span>
								ชาย
								<span class="mitr">{d.student.ม4.men.toLocaleString()}</span>
							</span>
						</div>
						<div class="f mitr modal-section-header">
							<span>มัธยม 5</span>
							<span class="mitr">{d.student.ม5.total.toLocaleString()}</span>
						</div>
						<div class="f modal-section">
							<span>จำนวนห้องเรียน <small>(ห้อง)</small></span>
							<span class="mitr">{d.student.ม5.class.toLocaleString()}</span>
						</div>
						<div class="f modal-section">
							<span>แบ่งตามเพศ</span>
							<span>
								หญิง
								<span class="mitr">{d.student.ม5.women.toLocaleString()}</span>
								ชาย
								<span class="mitr">{d.student.ม5.men.toLocaleString()}</span>
							</span>
						</div>
						<div class="f mitr modal-section-header">
							<span>มัธยม 6</span>
							<span class="mitr">{d.student.ม6.total.toLocaleString()}</span>
						</div>
						<div class="f modal-section">
							<span>จำนวนห้องเรียน <small>(ห้อง)</small></span>
							<span class="mitr">{d.student.ม6.class.toLocaleString()}</span>
						</div>
						<div class="f modal-section">
							<span>แบ่งตามเพศ</span>
							<span>
								หญิง
								<span class="mitr">{d.student.ม6.women.toLocaleString()}</span>
								ชาย
								<span class="mitr">{d.student.ม6.men.toLocaleString()}</span>
							</span>
						</div>
					{/if}
					{#if d.student.ปวช1.total + d.student.ปวช2.total + d.student.ปวช3.total}
						<div class="f mitr modal-section-header">
							<span>ปวช 1</span>
							<span class="mitr">{d.student.ปวช1.total.toLocaleString()}</span>
						</div>
						<div class="f modal-section">
							<span>จำนวนห้องเรียน <small>(ห้อง)</small></span>
							<span class="mitr">{d.student.ปวช1.class.toLocaleString()}</span>
						</div>
						<div class="f modal-section">
							<span>แบ่งตามเพศ</span>
							<span>
								หญิง
								<span class="mitr">{d.student.ปวช1.women.toLocaleString()}</span>
								ชาย
								<span class="mitr">{d.student.ปวช1.men.toLocaleString()}</span>
							</span>
						</div>
						<div class="f mitr modal-section-header">
							<span>ปวช 2</span>
							<span class="mitr">{d.student.ปวช2.total.toLocaleString()}</span>
						</div>
						<div class="f modal-section">
							<span>จำนวนห้องเรียน <small>(ห้อง)</small></span>
							<span class="mitr">{d.student.ปวช2.class.toLocaleString()}</span>
						</div>
						<div class="f modal-section">
							<span>แบ่งตามเพศ</span>
							<span>
								หญิง
								<span class="mitr">{d.student.ปวช2.women.toLocaleString()}</span>
								ชาย
								<span class="mitr">{d.student.ปวช2.men.toLocaleString()}</span>
							</span>
						</div>
						<div class="f mitr modal-section-header">
							<span>ปวช 3</span>
							<span class="mitr">{d.student.ปวช3.total.toLocaleString()}</span>
						</div>
						<div class="f modal-section">
							<span>จำนวนห้องเรียน <small>(ห้อง)</small></span>
							<span class="mitr">{d.student.ปวช3.class.toLocaleString()}</span>
						</div>
						<div class="f modal-section">
							<span>แบ่งตามเพศ</span>
							<span>
								หญิง
								<span class="mitr">{d.student.ปวช3.women.toLocaleString()}</span>
								ชาย
								<span class="mitr">{d.student.ปวช3.men.toLocaleString()}</span>
							</span>
						</div>
					{/if}
				</Modal>
			{/if}
		</section>

		{#if $years && $years.length > 1}
			<section>
				<h3 class="mb16">เปรียบเทียบจำนวนนักเรียน {$years.length} ปีที่ผ่านมา</h3>
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
					<div>{d.student.total.all.toLocaleString()}</div>
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
						<div>{yd.data?.student?.total?.all?.toLocaleString()}</div>
					{/each}
				</div>
			</section>
		{/if}

		<h2 class="f">
			<span>ครู/บุคลากร <small>(คน)</small></span>
			<span>{d.staff.total.toLocaleString()}</span>
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
					<span class="tch-size-count">{d.staff.ครู.total.toLocaleString()}</span>
					<img src="/chevrons/right.svg" alt="" width="24" height="24" />
				</h3>
				<p>ครูทั่วไป, ครูผู้ช่วย, ชำนาญการ, ชำนาญการพิเศษ...</p>
			</button>
			<Modal title={`ครู ${d.staff.ครู.total.toLocaleString()} คน`} bind:isOpen={ครู_modal_open}>
				<div class="modal-section-header p16">
					<div class="f ais fs10 g8">
						<img src="/icons/info.svg" alt="" width="16" height="16" />
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
								<img src="/icons/info.svg" alt="" width="16" height="16" />
								<span>ดูลำดับวิทยาฐานะและระดับตำแหน่งทั้งหมด</span>
								<img class="chevron" src="/chevrons/bottom.svg" alt="" width="24" height="24" />
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
				{#if d.staff.ครู.คศ5.total}
					<div class="f modal-section">
						<span>ครูเชี่ยวชาญพิเศษ</span>
						<span class="mitr">{d.staff.ครู.คศ5.total.toLocaleString()}</span>
					</div>
				{/if}
				{#if d.staff.ครู.คศ4.total}
					<div class="f modal-section">
						<span>ครูเชี่ยวชาญ</span>
						<span class="mitr">{d.staff.ครู.คศ4.total.toLocaleString()}</span>
					</div>
				{/if}
				{#if d.staff.ครู.คศ3.total}
					<div class="f modal-section">
						<span>ครูชำนาญการพิเศษ</span>
						<span class="mitr">{d.staff.ครู.คศ3.total.toLocaleString()}</span>
					</div>
				{/if}
				{#if d.staff.ครู.คศ2.total}
					<div class="f modal-section">
						<span>ครูชำนาญการ</span>
						<span class="mitr">{d.staff.ครู.คศ2.total.toLocaleString()}</span>
					</div>
				{/if}
				{#if d.staff.ครู.คศ1.total}
					<div class="f modal-section">
						<span>ครู คศ. 1</span>
						<span class="mitr">{d.staff.ครู.คศ1.total.toLocaleString()}</span>
					</div>
				{/if}
				{#if d.staff.ครู.ครูผู้ช่วย.total}
					<div class="f modal-section">
						<span>ครูผู้ช่วย</span>
						<span class="mitr">{d.staff.ครู.ครูผู้ช่วย.total.toLocaleString()}</span>
					</div>
				{/if}
			</Modal>
			<div class="f">
				<span>สัดส่วนครู ต่อ นักเรียน</span>
				<span class="mitr fs20"
					>1:{Math.ceil(d.student.total.all / d.staff.ครู.total).toLocaleString()}</span
				>
			</div>
			<hr />
			<div class="f">
				<span>ครู</span>
				<span class="usable-color cv">นักเรียน</span>
			</div>
			<div class="f ratio-chart">
				<div class="f">
					<img src="/icons/person-b.svg" alt="" width="24" height="24" />
				</div>
				<div class="f">
					{#each Array(Math.ceil(d.student.total.all / d.staff.ครู.total)) as _}
						<img src="/icons/person-y.svg" alt="" width="24" height="24" />
					{/each}
				</div>
			</div>
		</section>

		{#if $years && $years.length > 1}
			<section>
				<h3 class="mb16">เปรียบเทียบจำนวนครู {$years.length} ปีที่ผ่านมา</h3>
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
								color: '#ffce4f',
								font_color: '#3c55ab',
								label: `1:${Math.ceil(d.student.total.all / d.staff.ครู.total).toLocaleString()}`
							}
						]}
					/>
					<div>{d.staff.ครู.total.toLocaleString()}</div>
					{#each school_other_years_data as yd}
						<div>{`${yd.year + 543}`.substring(2, 4)}</div>
						<RatioChart
							label_type="value"
							data={[
								{ number: yd.data?.staff?.ครู?.total, color: '#3c55ab', label: '' },
								{
									number: yd.data?.student?.total?.all,
									color: '#ffce4f',
									font_color: '#3c55ab',
									label: `1:${Math.ceil(
										yd.data?.student?.total?.all / yd.data?.staff?.ครู?.total
									).toLocaleString()}`
								}
							]}
						/>
						<div>{yd.data?.staff?.ครู?.total?.toLocaleString()}</div>
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
				<span class="tch-size-count">{d.staff.พนักงาน.total.toLocaleString()}</span>
				<img src="/chevrons/right.svg" alt="" width="24" height="24" />
			</h3>
			<p>พนักงานธุรการ การเงิน บัญชี นักโภชนาการ นักการ-ภารโรง</p>
		</button>
		<Modal
			title={`บุคลากร ${d.staff.พนักงาน.total.toLocaleString()} คน`}
			bind:isOpen={บุคลากร_modal_open}
		>
			<div class="modal-section-header p16">
				<div class="f ais fs10 g8">
					<img src="/icons/info.svg" alt="" width="16" height="16" />
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
					<span class="mitr">{d.staff.พนักงาน.ลูกจ้างประจำ.total.toLocaleString()}</span>
				</div>
			{/if}
			{#if d.staff.พนักงาน.ลูกจ้างชั่วคราว.total}
				<div class="f modal-section">
					<span>ลูกจ้างชั่วคราว</span>
					<span class="mitr">{d.staff.พนักงาน.ลูกจ้างชั่วคราว.total.toLocaleString()}</span>
				</div>
			{/if}
			{#if d.staff.พนักงาน.พนักงานราชการ.total}
				<div class="f modal-section">
					<span>พนักงานราชการ</span>
					<span class="mitr">{d.staff.พนักงาน.พนักงานราชการ.total.toLocaleString()}</span>
				</div>
			{/if}
		</Modal>

		<section class="f directors">
			<h3>ผู้อำนวยการ</h3>
			<p class="fw500">ผศ.ดร. ปัญญา เลิศคุณธรรม</p>
			<small>ตำแหน่งผู้ชำนาญการพิเศษ</small>
			<!-- <h3>ผู้อำนวยการ 2</h3>
			<p class="fw500">ผศ.ดร. ปัญญา เลิศคุณธรรม</p>
			<small>ตำแหน่งผู้ชำนาญการพิเศษ</small>
			<h3>รองผู้อำนวยการ</h3>
			<p class="fw500">ผศ. วินัย ภาคเพียรดี</p>
			<small>ตำแหน่งผู้ชำนาญการพิเศษ</small> -->
		</section>

		<h2 class="f">
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
				<span class="tch-size-count ibm">ดูทั้งหมด</span>
				<img src="/chevrons/right.svg" alt="" width="24" height="24" />
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
					<span>{eduitem.total.toLocaleString()}</span>
				</div>
				<RatioChart
					data={[
						{ number: eduitem.working, color: '#ffce4f' },
						{ number: eduitem.to_be_repaired, color: '#ddab29' },
						{ number: eduitem.to_be_removed, color: '#fc5858' }
					]}
				/>
				<p class="mb8 fs10 ratio-stat-text">
					<span class="cv usable-color">{eduitem.working.toLocaleString()}</span>
					|
					<span class="cv await-color">{eduitem.to_be_repaired.toLocaleString()}</span>
					|
					<span class="cv unusable-color">{eduitem.to_be_removed.toLocaleString()}</span>
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
				<span>{d.durable_goods.data.โต๊ะเก้าอี้นักเรียน.total.toLocaleString()}</span>
			</h3>
			<RatioChart
				data={[
					{ number: d.durable_goods.data.โต๊ะเก้าอี้นักเรียน.working, color: '#ffce4f' },
					{ number: d.durable_goods.data.โต๊ะเก้าอี้นักเรียน.to_be_repaired, color: '#ddab29' },
					{ number: d.durable_goods.data.โต๊ะเก้าอี้นักเรียน.to_be_removed, color: '#fc5858' }
				]}
			/>
			<p class="mb8 fs10 ratio-stat-text">
				<span class="cv usable-color"
					>{d.durable_goods.data.โต๊ะเก้าอี้นักเรียน.working.toLocaleString()}</span
				>
				|
				<span class="cv await-color"
					>{d.durable_goods.data.โต๊ะเก้าอี้นักเรียน.to_be_repaired.toLocaleString()}</span
				>
				|
				<span class="cv unusable-color"
					>{d.durable_goods.data.โต๊ะเก้าอี้นักเรียน.to_be_removed.toLocaleString()}</span
				> ตัว
			</p>
			<div class="f">
				<span>สัดส่วนโต๊ะเก้าอี้ ต่อ นักเรียน</span>
				<span class="mitr fs20"
					>1:{Math.ceil(
						d.student.total.all / d.durable_goods.data.โต๊ะเก้าอี้นักเรียน.working
					).toLocaleString()}</span
				>
			</div>
			<hr />
			<div class="f ratio-chart">
				<div class="f">
					<img src="/icons/chair.svg" alt="" width="24" height="24" />
				</div>
				<div class="f">
					{#each Array(Math.ceil(d.student.total.all / d.durable_goods.data.โต๊ะเก้าอี้นักเรียน.working)) as _}
						<img src="/icons/person-y.svg" alt="" width="24" height="24" />
					{/each}
				</div>
			</div>
		</section>
		<section>
			<h3 class="f mb8">
				<span>
					คอมพิวเตอร์
					<small>(เครื่อง)</small>
				</span>
				<span>{d.computer.learning.total.toLocaleString()}</span>
			</h3>
			<p class="fs10 mb8">
				ใช้วิธีการวัดคนละแบบกับอุปกรณ์อื่น <span class="cv usable-color"
					>(ไม่มีสถานะรอซ่อม/จำหน่าย)</span
				>
			</p>
			<RatioChart
				data={[
					{ number: d.computer.learning.working, color: '#ffce4f' },
					{ number: d.computer.learning.broken, color: '#fc5858' }
				]}
			/>
			<p class="mb8 fs10 ratio-stat-text">
				<span class="cv usable-color">{d.computer.learning.working.toLocaleString()}</span> |
				<span class="cv unusable-color">{d.computer.learning.broken.toLocaleString()}</span> เครื่อง
			</p>
			<div class="f">
				<span>สัดส่วนคอมพิวเตอร์ ต่อ นักเรียน</span>
				<span class="mitr fs20"
					>1:{Math.ceil(d.student.total.all / d.computer.learning.working).toLocaleString()}</span
				>
			</div>
			<hr />
			<div class="f ratio-chart">
				<div class="f">
					<img src="/icons/tv.svg" alt="" width="24" height="24" />
				</div>
				<div class="f">
					{#each Array(Math.ceil(d.student.total.all / d.computer.learning.working)) as _}
						<img src="/icons/person-y.svg" alt="" width="24" height="24" />
					{/each}
				</div>
			</div>
			<details class="computer-details" open>
				<summary>
					<span class="f">
						<span class="mitr">ดูแหล่งที่มาของคอมพิวเตอร์ <small>(เครื่อง)</small></span>
						<img class="chevron" src="/chevrons/bottom.svg" alt="" width="24" height="24" />
					</span>
				</summary>
				<div class="f mt8 mb8">
					{#if d.computer.learning.source.obec}
						<span>งบประมาณ สพฐ</span>
					{/if}
					{#if d.computer.learning.source.self}
						<span>จัดหาเอง/บริจาค</span>
					{/if}
				</div>
				<RatioChart
					data={[
						{ number: d.computer.learning.source.obec, color: '#3c55ab' },
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
					<img src="/icons/info.svg" alt="" width="16" height="16" />
					<p class="fs10">
						แหล่งที่มาของคอมพิวเตอร์สามารถช่วยประกอบการประเมินได้ว่า สพฐ. หรือ
						ตัวโรงเรียนเองได้จัดสรรงบประมาณที่เพียงพอสำหรับจัดหาคอมพิวเตอร์หรือไม่
					</p>
				</div>
			</details>
		</section>
		<section>
			<h3 class="f jcs g8 mb8">
				<img src="/icons/wifi.svg" alt="" width="24" height="24" />
				<span
					>อินเทอร์เน็ต {d.internet.speed ?? ''}
					{#if d.internet.speed}<small>Mbps</small>{/if}</span
				>
			</h3>
			<dl class="list-grid">
				<dt>สถานะการใช้งาน:</dt>
				<dd class="f jcs g8">
					{#if d.internet.status}
						<img src="/icons/check-y.svg" alt="" width="16" height="16" />
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
						{+d.internet.monthly_price.toLocaleString()} บาท/เดือน
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
					<span class="mla ibm">ดูทั้งหมด</span>
					<img src="/chevrons/right.svg" alt="" width="24" height="24" />
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
							<span class="mitr">{good.total.toLocaleString()}</span>
						</div>
					{/each}
				{/if}
			{/each}
		</Modal>

		<ActAiBanner margin />

		<h2 class="f">
			<span>สิ่งก่อสร้าง <small>สภาพดีจากทั้งหมด</small></span>
			<span class="f g8">
				<CircularProgress percent={(d.buildings.stats.ดี / d.buildings.stats.รวม) * 100} />
				{~~((d.buildings.stats.ดี / d.buildings.stats.รวม) * 100)}%
			</span>
		</h2>
		<section>
			<dl class="f status-color">
				<dt class="usable-color">เหลือง</dt>
				<dd>ดี {~~((d.buildings.stats.ดี / d.buildings.stats.รวม) * 100)}%</dd>
				<dt class="await-color">เหลืองเข้ม</dt>
				<dd>พอใช้ {~~((d.buildings.stats['พอใช้'] / d.buildings.stats.รวม) * 100)}%</dd>
				<dt class="unusable-color">แดง</dt>
				<dd>ทรุดโทรม {~~((d.buildings.stats.ทรุดโทรม / d.buildings.stats.รวม) * 100)}%</dd>
			</dl>
		</section>
		<section>
			<p class="f mb8">
				<span>สภาพการใช้งาน</span>
				<small>จากการประเมินของโรงเรียน</small>
			</p>
			<RatioChart
				data={[
					{ number: d.buildings.stats.ดี, color: '#ffce4f' },
					{ number: d.buildings.stats.พอใช้, color: '#ddab29' },
					{ number: d.buildings.stats.ทรุดโทรม, color: '#fc5858' }
				]}
			/>
		</section>
		<section>
			<h3 class="f">
				<span>อาคารการศึกษา <small>(อาคาร)</small></span>
				<span>{d.buildings.data.อาคารเรียน.length.toLocaleString()}</span>
			</h3>
		</section>
		<section>
			<p class="f">
				<span>ห้องทั้งหมด <small>(ห้อง)</small></span>
				<span class="mitr">{d.buildings.stats.จำนวนห้องในอาคารเรียน.toLocaleString()}</span>
			</p>
			<hr />
			{#each d.buildings.data.อาคารเรียน as b}
				<article class="building-card {getConditionClass(b.current_condition)}">
					<div
						class="building-image"
						style:--bg0="url({b.image_url_0})"
						style:--bg1="url({b.image_url_1})"
						on:click={() => openLightbox(b.name, b.image_url_0, b.image_url_1)}
						on:keypress={() => openLightbox(b.name, b.image_url_0, b.image_url_1)}
					/>
					<div>
						<h4>{b.name}</h4>
						<p>
							สร้างปี {b.build_at}<br />
							สภาพการใช้งาน
							<span class="building-status cv">{b.current_condition}</span>
						</p>
						<Waffle number={parseInt(b.room_number)} />
						<div>
							<span class="mitr">{parseInt(b.room_number).toLocaleString()}</span>
							<span class="fs10">ห้อง</span>
						</div>
					</div>
				</article>
			{/each}
		</section>

		<button
			type="button"
			class="teacher-size-btn emp-btn mb8"
			on:click={() => {
				อาคาร_modal_open = true;
			}}
		>
			<h3 class="f">
				<span>อาคารและสิ่งก่อสร้างอื่น</span>
				<span class="tch-size-count ibm">ดูทั้งหมด</span>
				<img src="/chevrons/right.svg" alt="" width="24" height="24" />
			</h3>
		</button>
		<Modal title="สิ่งก่อสร้างอื่นๆ" bind:isOpen={อาคาร_modal_open}>
			<dl class="f status-color fs10 mb16">
				<dt class="usable-color">เหลือง</dt>
				<dd>ดี</dd>
				<dt class="await-color">เหลืองเข้ม</dt>
				<dd>พอใช้</dd>
				<dt class="unusable-color">แดง</dt>
				<dd>ทรุดโทรม</dd>
			</dl>
			{#each Object.keys(d.buildings.data).filter((k) => !k.match(/อาคาร/)) as buildings_key (buildings_key)}
				{#if d.buildings.data[buildings_key].length}
					<div class="f modal-section-header mitr">{buildings_key}</div>
					{#each d.buildings.data[buildings_key] as b}
						<div
							class="modal-section building f jcs ais g8 {getConditionClass(b.current_condition)}"
						>
							<div
								class="building-image"
								style:--bg0="url({b.image_url_0})"
								style:--bg1="url({b.image_url_1})"
							/>
							<span class="building-status cv" />
							<div>
								<span>{b.name}</span><br /><small>สร้างปี {b.build_at}</small>
							</div>
						</div>
					{/each}
				{/if}
			{/each}
		</Modal>

		<section class="other-buildings">
			<div>
				{#each d.buildings.data.อาคารทั่วไป as b}
					<article class={getConditionClass(b.current_condition)}>
						<div
							class="building-image"
							style:--bg0="url({b.image_url_0})"
							style:--bg1="url({b.image_url_1})"
							on:click={() => openLightbox(b.name, b.image_url_0, b.image_url_1)}
							on:keypress={() => openLightbox(b.name, b.image_url_0, b.image_url_1)}
						/>
						<h4>{b.name}</h4>
						<p>สร้างปี {b.build_at}</p>
					</article>
				{/each}
			</div>
			<ul class="other-appliance-list">
				{#each Object.keys(d.buildings.data).filter((k) => !k.match(/อาคาร/)) as buildings_key (buildings_key)}
					{#if d.buildings.data[buildings_key].length}
						<li>
							<span class="mitr">{buildings_key}</span>
							{#if buildings_key !== 'ห้องน้ำ'}
								<span class="fs10">
									{mergeGoodsName(d.buildings.data[buildings_key])}
								</span>
							{/if}
						</li>
					{/if}
				{/each}
			</ul>
		</section>

		<ActAiBanner margin />

		<h2 class="f">
			<span>ข้อมูลทั่วไป</span>
		</h2>
		<section class="contact">
			<h3 class="mb8">ติดต่อ</h3>
			<dl class="list-grid">
				<dt>
					<img src="/icons/location.svg" alt="ที่อยู่" width="16" height="16" />
				</dt>
				<dd>{d.address} {d.subdistrict} {d.district} {d.province} {d.postcode}</dd>
				<dt>
					<img src="/icons/phone.svg" alt="เบอร์โทรศัพท์" width="16" height="16" />
				</dt>
				<dd>{d.telephone}</dd>
				<dt>
					<img src="/icons/globe.svg" alt="เว็บไซต์" width="16" height="16" />
				</dt>
				<dd>{d.website}</dd>
				<dt>
					<img src="/icons/mail.svg" alt="อีเมล์" width="16" height="16" />
				</dt>
				<dd>{d.email}</dd>
			</dl>
		</section>
		<section class="other-data">
			<img class="school-logo" src={d.logo_image_path} alt="" width="40" height="40" />
			<h3 class="mb8">ข้อมูลอื่น</h3>
			<dl class="list-grid">
				<dt>รหัสโรงเรียน</dt>
				<dd>{$currentSchoolId}</dd>
				<dt>สังกัด</dt>
				<dd><!-- TODO: รอข้อมูลจากฟีน --> ไม่มีข้อมูล</dd>
				<dt>ก่อตั้งเมื่อ</dt>
				<dd>{d.established}</dd>
				<dt>ระดับที่เปิดสอน</dt>
				<dd>{d.grades}</dd>
				<dt>ประเภทโรงเรียน</dt>
				<dd>รัฐบาล</dd>
				<dt>ลักษณะโรงเรียน</dt>
				<dd><!-- TODO: ไม่มีในข้อมูล ดีลกับ Design --> ไม่มีข้อมูล</dd>
			</dl>
		</section>

		<footer>
			<p>
				สามารถตรวจสอบความถูกต้องของข้อมูลเพื่อใช้ประกอบการอ้างอิงหรือติดต่อหน่วยงานต้นทางข้อมูลได้ที่ระบบสารสนเทศเพื่อการบริหารการศึกษา
				(Education Management Information System : EMIS)<br />
				<a href="https://data.bopp-obec.info/emis">https://data.bopp-obec.info/emis</a>
			</p>
			<p class="update">อัปเดตข้อมูลล่าสุดเมื่อ {$update_date}</p>
		</footer>
	{/if}
</div>

<!-- Lightbox Dialog -->
<Dialog open={lightbox_open} on:close={() => (lightbox_open = false)}>
	<DialogOverlay class="lightbox-backdrop" />

	<DialogTitle class="sr-only">{lightbox_building_name}</DialogTitle>
	<DialogDescription>ภาพ{lightbox_building_name}</DialogDescription>

	<button class="lightbox-close" type="button" on:click={() => (lightbox_open = false)}>
		<img src="/icons/close-w.svg" alt="ปิด" width="32" height="32" />
	</button>
	<div
		class="lightbox-image"
		style:--bg0="url({lightbox_url0})"
		style:--bg1="url({lightbox_url1})"
	/>
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
		--std-color: #ffce4f;
	}

	.await-color {
		--std-color: #ddab29;
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
		margin: 16px 0;

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
			> .tch-size-count {
				margin-left: auto;
			}
		}

		p {
			font-size: 0.625rem;
			color: #9daad5;
			margin-top: 4px;
			text-align: left;
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
		}

		dd {
			flex: 1 1 0;
			white-space: nowrap;
		}
	}

	.ratio-chart {
		align-items: flex-start;
		justify-content: flex-start;

		> div {
			flex-wrap: wrap;
			justify-content: flex-start;
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
			background: var(--bg0), var(--bg1), url(/school/school-placeholder.png);
			background-size: cover;
			cursor: zoom-in;
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

			> article {
				> .building-image {
					aspect-ratio: 1;
					border-top: 2px var(--std-color) solid;
					background: var(--bg0), var(--bg1), url(/school/school-placeholder.png);
					background-size: cover;
					cursor: zoom-in;
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
				background: var(--bg0), var(--bg1), url(/school/school-placeholder.png);
				background-size: cover;
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

		background: var(--bg0), var(--bg1), url(/school/school-placeholder.png);
		background-size: contain;
		background-repeat: no-repeat;
		background-position: 50%;

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
</style>
