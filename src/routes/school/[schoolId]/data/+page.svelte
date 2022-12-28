<script lang="ts">
	import { currentSchool, currentSchoolId } from 'stores/school';
	import SchoolHeader from 'components/school/SchoolHeader.svelte';
	import Dropdown from 'components/Dropdown.svelte';
	import CircularProgress from 'components/school/CircularProgress.svelte';
	import ActAiBanner from 'components/ActAiBanner.svelte';
	import Waffle from 'components/school/Waffle.svelte';
	import RatioChart from 'components/school/RatioChart.svelte';

	const DROPDOWN_DATA = [
		{ value: '2565' },
		{ value: '2564' },
		{ value: '2563' },
		{ value: '2562' },
		{ value: '2561' }
	];

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
			<span class="mitr">โรงเรียนขนาดใหญ่</span>
			<details class="school-size-detail">
				<summary>
					<span class="f">
						<img src="/icons/info.svg" alt="" width="16" height="16" />
						<span>ดูเกณฑ์การแบ่งขนาดโรงเรียน</span>
						<img class="chevron" src="/chevron/bottom.svg" alt="" width="24" height="24" />
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
				<button type="button" class="mitr f student-size-btn">
					<span class="student-color-1 std-size-color" />
					<span>อนุบาล</span>
					<span class="std-size-count">{d.student.total.อ.toLocaleString()}</span>
					<img src="/chevron/right.svg" alt="" width="24" height="24" />
				</button>
			{/if}
			{#if d.student.total.ป}
				<button type="button" class="mitr f student-size-btn">
					<span class="student-color-2 std-size-color" />
					<span>ประถม</span>
					<span class="std-size-count">{d.student.total.ป.toLocaleString()}</span>
					<img src="/chevron/right.svg" alt="" width="24" height="24" />
				</button>
			{/if}
			{#if d.student.total.มต}
				<button type="button" class="mitr f student-size-btn">
					<span class="student-color-3 std-size-color" />
					<span>มัธยมต้น</span>
					<span class="std-size-count">{d.student.total.มต.toLocaleString()}</span>
					<img src="/chevron/right.svg" alt="" width="24" height="24" />
				</button>
			{/if}
			{#if d.student.total.มป}
				<button type="button" class="mitr f student-size-btn">
					<span class="student-color-4 std-size-color" />
					<span>มัธยมปลาย</span>
					<span class="std-size-count">{d.student.total.มป.toLocaleString()}</span>
					<img src="/chevron/right.svg" alt="" width="24" height="24" />
				</button>
			{/if}
		</section>
		<section>
			<h3 class="mb16">เปรียบเทียบจำนวนนักเรียน 6 ปีที่ผ่านมา</h3>
			<div class="f fw500">
				<span>ปี</span>
				<span>คน</span>
			</div>
			<div class="compare-chart">
				<div>65</div>
				<div class="cmp-chart-body student-chart">
					<div class="student-color-1 student-section" style="--std-chart-ratio:25">250</div>
					<div class="student-color-2 student-section" style="--std-chart-ratio:25">250</div>
					<div class="student-color-3 student-section" style="--std-chart-ratio:25">250</div>
					<div class="student-color-4 student-section" style="--std-chart-ratio:25">250</div>
					<div class="student-section separator" style="--std-chart-ratio:0" />
				</div>
				<div>1000</div>
				<div>64</div>
				<div class="cmp-chart-body student-chart">
					<div class="student-color-1 student-section" style="--std-chart-ratio:20">200</div>
					<div class="student-color-2 student-section" style="--std-chart-ratio:20">200</div>
					<div class="student-color-3 student-section" style="--std-chart-ratio:20">200</div>
					<div class="student-color-4 student-section" style="--std-chart-ratio:20">200</div>
					<div class="student-section separator" style="--std-chart-ratio:20" />
				</div>
				<div>800</div>
				<div>63</div>
				<div class="cmp-chart-body student-chart">
					<div class="student-color-1 student-section" style="--std-chart-ratio:15">150</div>
					<div class="student-color-2 student-section" style="--std-chart-ratio:15">150</div>
					<div class="student-color-3 student-section" style="--std-chart-ratio:15">150</div>
					<div class="student-color-4 student-section" style="--std-chart-ratio:15">150</div>
					<div class="student-section separator" style="--std-chart-ratio:40" />
				</div>
				<div>600</div>
			</div>
		</section>

		<h2 class="f">
			<span>ครู/บุคลากร <small>(คน)</small></span>
			<span>{d.staff.total.toLocaleString()}</span>
		</h2>
		<section>
			<button type="button" class="teacher-size-btn mb8">
				<h3 class="mitr f">
					<span>ครู</span>
					<span class="tch-size-count">{d.staff.ครู.total.toLocaleString()}</span>
					<img src="/chevron/right.svg" alt="" width="24" height="24" />
				</h3>
				<p>ครูทั่วไป, ครูผู้ช่วย, ชำนาญการ, ชำนาญการพิเศษ...</p>
			</button>
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
		<section>
			<h3 class="mb16">เปรียบเทียบจำนวนครู 6 ปีที่ผ่านมา</h3>
			<div class="f fw500">
				<span>ปี</span>
				<span>คน</span>
			</div>
			<div class="compare-chart">
				<div>65</div>
				<div class="cmp-chart-body student-chart mitr">
					<div class="primary-color student-section" style="--std-chart-ratio:100">1:1</div>
					<div class="student-section separator" style="--std-chart-ratio:0" />
				</div>
				<div>1000</div>
				<div>64</div>
				<div class="cmp-chart-body student-chart mitr">
					<div class="primary-color student-section" style="--std-chart-ratio:80">1:2</div>
					<div class="student-section separator" style="--std-chart-ratio:20" />
				</div>
				<div>800</div>
				<div>63</div>
				<div class="cmp-chart-body student-chart mitr">
					<div class="primary-color student-section" style="--std-chart-ratio:60">1:3</div>
					<div class="student-section separator" style="--std-chart-ratio:40" />
				</div>
				<div>600</div>
			</div>
		</section>

		<button type="button" class="teacher-size-btn emp-btn mb8">
			<h3 class="mitr f">
				<span>บุคลากร</span>
				<span class="tch-size-count">{d.staff.พนักงาน.total.toLocaleString()}</span>
				<img src="/chevron/right.svg" alt="" width="24" height="24" />
			</h3>
			<p>พนักงานธุรการ การเงิน บัญชี นักโภชนาการ นักการ-ภารโรง</p>
		</button>

		<section class="f directors">
			<h3>ผู้อำนวยการ 1</h3>
			<p class="fw500">ผศ.ดร. ปัญญา เลิศคุณธรรม</p>
			<small>ตำแหน่งผู้ชำนาญการพิเศษ</small>
			<h3>ผู้อำนวยการ 2</h3>
			<p class="fw500">ผศ.ดร. ปัญญา เลิศคุณธรรม</p>
			<small>ตำแหน่งผู้ชำนาญการพิเศษ</small>
			<h3>รองผู้อำนวยการ</h3>
			<p class="fw500">ผศ. วินัย ภาคเพียรดี</p>
			<small>ตำแหน่งผู้ชำนาญการพิเศษ</small>
		</section>

		<h2 class="f">
			<span>อุปกรณ์ <small>ที่ใช้งานได้จากทั้งหมด</small></span>
			<span class="f g8">
				<CircularProgress
					percent={(d.durable_goods_stats.working / d.durable_goods_stats.total) * 100}
				/>
				{~~((d.durable_goods_stats.working / d.durable_goods_stats.total) * 100)}%
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

		<button type="button" class="teacher-size-btn emp-btn mb8">
			<h3 class="f">
				<span>อุปกรณ์การเรียน</span>
				<span class="tch-size-count ibm">ดูทั้งหมด</span>
				<img src="/chevron/right.svg" alt="" width="24" height="24" />
			</h3>
		</button>

		<section>
			<h3 class="f mb8">
				<span>
					โต๊ะเก้าอี้นักเรียน
					<small>(ตัว)</small>
				</span>
				<span>{d.tables.total.toLocaleString()}</span>
			</h3>
			<RatioChart
				data={[
					{ number: d.tables.working, color: '#ffce4f' },
					{ number: d.tables.to_be_repaired, color: '#ddab29' },
					{ number: d.tables.to_be_removed, color: '#fc5858' }
				]}
			/>
			<p class="mb8 fs10 ratio-stat-text">
				<span class="cv usable-color">{d.tables.working.toLocaleString()}</span> |
				<span class="cv await-color">{d.tables.to_be_repaired.toLocaleString()}</span>
				|
				<span class="cv unusable-color">{d.tables.to_be_removed.toLocaleString()}</span> ตัว
			</p>
			<div class="f">
				<span>สัดส่วนโต๊ะเก้าอี้ ต่อ นักเรียน</span>
				<span class="mitr fs20"
					>1:{Math.ceil(d.student.total.all / d.tables.working).toLocaleString()}</span
				>
			</div>
			<hr />
			<div class="f ratio-chart">
				<div class="f">
					<img src="/icons/chair.svg" alt="" width="24" height="24" />
				</div>
				<div class="f">
					{#each Array(Math.ceil(d.student.total.all / d.tables.working)) as _}
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
						<img class="chevron" src="/chevron/bottom.svg" alt="" width="24" height="24" />
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
			<button class="teacher-size-btn" type="button">
				<h3 class="f">
					<span>อุปกรณ์อื่น</span>
					<span class="mla ibm">ดูทั้งหมด</span>
					<img src="/chevron/right.svg" alt="" width="24" height="24" />
				</h3>
			</button>
			<ul class="other-appliance-list">
				<li>
					<span class="mitr">เครื่องใช้ไฟฟ้า</span>
					<span class="fs10">เครื่องปรับอากาศ, โทรทัศน์, เครื่องขยายเสียง</span>
				</li>
				<li>
					<span class="mitr">ยานพาหนะ</span>
					<span class="fs10">รถโดยสาร 12 ที่นั่ง, รถกระบะ</span>
				</li>
				<li>
					<span class="mitr">สำนักงาน</span>
					<span class="fs10">คอมพิวเตอร์, โต๊ะเก้าอี้, เครื่องถ่ายเอกสาร</span>
				</li>
				<li>
					<span class="mitr">งานบ้าน</span>
					<span class="fs10">เครื่องทำน้ำเย็น, ตู้เย็น, โต๊ะอาหาร...</span>
				</li>
			</ul>
		</section>

		<ActAiBanner margin />

		<h2 class="f">
			<span>สิ่งก่อสร้าง <small>สภาพดีจากทั้งหมด</small></span>
			<span class="f g8">
				<CircularProgress percent={(d.buildings_stats?.ดี / d.buildings_stats?.total) * 100} />
				{~~((d.buildings_stats?.ดี / d.buildings_stats?.total) * 100)}%
			</span>
		</h2>
		<section>
			<dl class="f status-color">
				<dt class="usable-color">เหลือง</dt>
				<dd>ดี {~~((d.buildings_stats?.ดี / d.buildings_stats?.total) * 100)}%</dd>
				<dt class="await-color">เหลืองเข้ม</dt>
				<dd>พอใช้ {~~((d.buildings_stats?.['พอใช้'] / d.buildings_stats?.total) * 100)}%</dd>
				<dt class="unusable-color">แดง</dt>
				<dd>ทรุดโทรม {~~((d.buildings_stats?.ทรุดโทรม / d.buildings_stats?.total) * 100)}%</dd>
			</dl>
		</section>
		<section>
			<p class="f mb8">
				<span>สภาพการใช้งาน</span>
				<small>จากการประเมินของโรงเรียน</small>
			</p>
			<RatioChart
				data={[
					{ number: d.buildings_stats.ดี, color: '#ffce4f' },
					{ number: d.buildings_stats.พอใช้, color: '#ddab29' },
					{ number: d.buildings_stats.ทรุดโทรม, color: '#fc5858' }
				]}
			/>
		</section>
		<section>
			<h3 class="f">
				<span>อาคารการศึกษา <small>(อาคาร)</small></span>
				<span>{d.school_buildings?.length?.toLocaleString()}</span>
			</h3>
		</section>
		<section>
			<p class="f">
				<span>ห้องทั้งหมด <small>(ห้อง)</small></span>
				<span class="mitr">{d.buildings_stats?.school_buildings_rooms?.toLocaleString()}</span>
			</p>
			<hr />
			{#each d.school_buildings as b}
				<article class="building-card {getConditionClass(b.current_condition)}">
					<div
						class="building-image"
						style:--bg0="url({b.image_url_0})"
						style:--bg1="url({b.image_url_1})"
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
		<button type="button" class="teacher-size-btn emp-btn mb8">
			<h3 class="f">
				<span>อาคารและสิ่งก่อสร้างอื่น</span>
				<span class="tch-size-count ibm">ดูทั้งหมด</span>
				<img src="/chevron/right.svg" alt="" width="24" height="24" />
			</h3>
		</button>
		<section class="other-buildings">
			<div>
				{#each d.other_buildings as b}
					<article class={getConditionClass(b.current_condition)}>
						<div
							class="building-image"
							style:--bg0="url({b.image_url_0})"
							style:--bg1="url({b.image_url_1})"
						/>
						<h4>{b.name}</h4>
						<p>สร้างปี {b.build_at}</p>
					</article>
				{/each}
			</div>
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
				<dd>!!! ยังไม่มี !!!</dd>
				<dt>ก่อตั้งเมื่อ</dt>
				<dd>{d.established}</dd>
				<dt>ระดับที่เปิดสอน</dt>
				<dd>{d.grades}</dd>
				<dt>ประเภทโรงเรียน</dt>
				<dd>!!! ยังไม่มี !!!</dd>
				<dt>ลักษณะโรงเรียน</dt>
				<dd>!!! ยังไม่มี !!!</dd>
			</dl>
		</section>

		<footer>
			<p>
				สามารถตรวจสอบความถูกต้องของข้อมูลเพื่อใช้ประกอบการอ้างอิงหรือติดต่อหน่วยงานต้นทางข้อมูลได้ที่ระบบสารสนเทศเพื่อการบริหารการศึกษา
				(Education Management Information System : EMIS) https://data.bopp-obec.info/emis
			</p>
			<p class="update">อัปเดตข้อมูลล่าสุดเมื่อ 30/11/2565</p>
		</footer>
	{/if}
</div>

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

		.student-section {
			border-radius: 2px;
			flex: var(--std-chart-ratio) var(--std-chart-ratio) 0;
			padding: 8px 0;
			text-align: right;
			color: #fff;
			background: var(--std-color);
			min-height: 16px;
		}
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

		> .cmp-chart-body {
			> .student-section {
				white-space: nowrap;
				overflow: hidden;
				padding: 4px;
			}

			> .separator {
				padding: 0;
			}
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
			object-fit: cover;
			border-top: 2px var(--std-color) solid;
			background: var(--bg0), var(--bg1), url(/school/school-placeholder.png);
			background-size: cover;
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

		h4 {
			font-weight: 400;
			margin-bottom: 0;
		}

		p {
			color: #9daad5;
			font-size: 0.625rem;
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
					object-fit: cover;
					border-top: 2px var(--std-color) solid;
					background: var(--bg0), var(--bg1), url(/school/school-placeholder.png);
					background-size: cover;
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
</style>
