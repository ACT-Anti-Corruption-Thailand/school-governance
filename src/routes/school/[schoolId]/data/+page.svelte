<script lang="ts">
	import { currentSchool } from 'stores/school';
	import SchoolHeader from 'components/SchoolHeader.svelte';
	import Dropdown from 'components/Dropdown.svelte';

	const DROPDOWN_DATA = [
		{ value: '2565' },
		{ value: '2564' },
		{ value: '2563' },
		{ value: '2562' },
		{ value: '2561' }
	];

	let dropdown_choice = DROPDOWN_DATA[0];
</script>

<SchoolHeader pageData={{ name: 'ข้อมูลโรงเรียน', color: '#DDAB29' }}>
	<Dropdown options={DROPDOWN_DATA} bind:selected_option={dropdown_choice} />
</SchoolHeader>
{#if $currentSchool}
	<h2 class="f">
		<span>นักเรียน <small>(คน)</small></span>
		<span>1000</span>
	</h2>
	<section>
		<div class="f">
			<span>
				เฉลี่ยนักเรียนห้องละ <small>(คน)</small>
			</span>
			<span class="mitr">40</span>
		</div>
		<hr />
		<span class="mitr">โรงเรียนขนาดใหญ่</span>
		<details class="school-size-detail">
			<summary>
				<span class="f">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 16 16"
						width="16"
						height="16"
						><g
							stroke="#3C55AB"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="1.5"
							clip-path="url(#a)"
							><path
								d="M8 14.667A6.667 6.667 0 108 1.333a6.667 6.667 0 000 13.334zM8 10.667V8M8 5.333h.007"
							/></g
						><defs><clipPath id="a"><path fill="#fff" d="M0 0h16v16H0z" /></clipPath></defs></svg
					>
					<span>ดูเกณฑ์การแบ่งขนาดโรงเรียน</span>
					<svg
						class="chevron"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						width="24"
						height="24"
						><path
							stroke="#3C55AB"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="1.5"
							d="M6 9l6 6 6-6"
						/></svg
					>
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
		<div class="student-chart">
			<div class="student-color-1 student-section mitr" style="--std-chart-ratio:10">10%</div>
			<div class="student-color-2 student-section mitr" style="--std-chart-ratio:50">50%</div>
			<div class="student-color-3 student-section mitr" style="--std-chart-ratio:20">20%</div>
			<div class="student-color-4 student-section mitr" style="--std-chart-ratio:20">20%</div>
		</div>
		<button type="button" class="mitr f student-size-btn">
			<span class="student-color-1 std-size-color" />
			<span>อนุบาล</span>
			<span class="std-size-count">100</span>
			<img src="/chevron/right.svg" alt="" width="24" height="24" />
		</button>
		<button type="button" class="mitr f student-size-btn">
			<span class="student-color-2 std-size-color" />
			<span>ประถม</span>
			<span class="std-size-count">100</span>
			<img src="/chevron/right.svg" alt="" width="24" height="24" />
		</button>
		<button type="button" class="mitr f student-size-btn">
			<span class="student-color-3 std-size-color" />
			<span>มัธยมต้น</span>
			<span class="std-size-count">100</span>
			<img src="/chevron/right.svg" alt="" width="24" height="24" />
		</button>
		<button type="button" class="mitr f student-size-btn">
			<span class="student-color-4 std-size-color" />
			<span>มัธยมปลาย</span>
			<span class="std-size-count">100</span>
			<img src="/chevron/right.svg" alt="" width="24" height="24" />
		</button>
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
		<span>60</span>
	</h2>
	<section>
		<button type="button" class="teacher-size-btn mb8">
			<h3 class="mitr f">
				<span>ครู</span>
				<span class="tch-size-count">37</span>
				<img src="/chevron/right.svg" alt="" width="24" height="24" />
			</h3>
			<p>ครูทั่วไป, ครูผู้ช่วย, ชำนาญการ, ชำนาญการพิเศษ...</p>
		</button>
		<div class="f">
			<span>สัดส่วนครู ต่อ นักเรียน</span>
			<span class="mitr fs20">1:20</span>
		</div>
		<hr />
		<div class="f">
			<span>ครู</span>
			<span class="cy">นักเรียน</span>
		</div>
		<div class="f">
			<div>
				<img src="/person-b.svg" alt="" width="24" height="24" />
			</div>
			<div>
				<img src="/person-y.svg" alt="" width="24" height="24" />
				<img src="/person-y.svg" alt="" width="24" height="24" />
				<img src="/person-y.svg" alt="" width="24" height="24" />
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
			<div class="cmp-chart-body student-chart">
				<div class="primary-color student-section" style="--std-chart-ratio:100">1:1</div>
				<div class="student-section separator" style="--std-chart-ratio:0" />
			</div>
			<div>1000</div>
			<div>64</div>
			<div class="cmp-chart-body student-chart">
				<div class="primary-color student-section" style="--std-chart-ratio:80">1:2</div>
				<div class="student-section separator" style="--std-chart-ratio:20" />
			</div>
			<div>800</div>
			<div>63</div>
			<div class="cmp-chart-body student-chart">
				<div class="primary-color student-section" style="--std-chart-ratio:60">1:3</div>
				<div class="student-section separator" style="--std-chart-ratio:40" />
			</div>
			<div>600</div>
		</div>
	</section>
	<button type="button">
		<h3>
			<span>บุคลากร</span>
			<span>23</span>
			<span>ICON</span>
		</h3>
		<p>พนักงานธุรการ การเงิน บัญชี นักโภชนาการ นักการ-ภารโรง</p>
	</button>
	<section>
		<h3>ผู้อำนวยการ 1</h3>
		<p>
			ผศ.ดร. ปัญญา เลิศคุณธรรม<br />
			<small>ตำแหน่งผู้ชำนาญการพิเศษ</small>
		</p>
		<h3>ผู้อำนวยการ 2</h3>
		<p>
			ผศ.ดร. ปัญญา เลิศคุณธรรม<br />
			<small>ตำแหน่งผู้ชำนาญการพิเศษ</small>
		</p>
		<h3>รองผู้อำนวยการ</h3>
		<p>
			ผศ. วินัย ภาคเพียรดี<br />
			<small>ตำแหน่งผู้ชำนาญการพิเศษ</small>
		</p>
	</section>

	<h2 class="f">
		<span>อุปกรณ์ <small>ที่ใช้งานได้จากทั้งหมด</small></span>
		<span>80%</span>
	</h2>
	<section>
		<dl>
			<dt>เหลือง</dt>
			<dd>ใช้งานได้</dd>
			<dt>เหลืองเข้ม</dt>
			<dd>รอซ่อม/จำหน่าย</dd>
			<dt>แดง</dt>
			<dd>ใช้งานไม่ได้</dd>
		</dl>
	</section>
	<button type="button">
		<span>อุปกรณ์การเรียน</span>
		<span>ดูทั้งหมด</span>
		<span>ICON</span>
	</button>
	<section>
		<h3>
			<span>โต๊ะเก้าอี้นักเรียน</span>
			<small>(ตัว)</small>
			<span>999</span>
		</h3>
		<div>
			<div>82%</div>
			<div>a</div>
			<div>b</div>
		</div>
		<p>979 | 20 | 20 ตัว</p>
		<div>
			<span>สัดส่วนโต๊ะเก้าอี้ ต่อ นักเรียน</span>
			<span>1:1</span>
		</div>
		<hr />
		<div>
			<div>ครู</div>
			<div>นักเรียนๆๆๆๆ</div>
		</div>
	</section>
	<section>
		<h3>
			<span>คอมพิวเตอร์</span>
			<small>(เครื่อง)</small>
			<span>151</span>
		</h3>
		<p>ใช้วิธีการวัดคนละแบบกับอุปกรณ์อื่น <span>(ไม่มีสถานะรอซ่อม/จำหน่าย)</span></p>
		<div>
			<div>90%</div>
			<div>a</div>
		</div>
		<p>140 | 11 เครื่อง</p>
		<div>
			<span>สัดส่วนคอมพิวเตอร์ ต่อ นักเรียน</span>
			<span>1:5</span>
		</div>
		<hr />
		<div>
			<div>ครู</div>
			<div>นักเรียนๆๆๆๆ</div>
		</div>
		<details>
			<summary>ดูแหล่งที่มาของคอมพิวเตอร์</summary>
			LOL
		</details>
	</section>
	<section>
		<h3>
			<span>ICON</span>
			<span>อินเทอร์เน็ต 100/30</span>
			<small>Mbps</small>
		</h3>
		<dl>
			<dt>สถานะการใช้งาน:</dt>
			<dd>ปกติ</dd>
			<dt>ผู้ให้บริการ:</dt>
			<dd>3BB</dd>
			<dt>งบประมาณ:</dt>
			<dd>10,000 บาท/เดือน</dd>
		</dl>
	</section>
	<section>
		<button type="button">
			<span>อุปกรณ์อื่น</span>
			<span>ดูทั้งหมด</span>
			<span>ICON</span>
		</button>
		<dl>
			<dt>เครื่องใช้ไฟฟ้า</dt>
			<dd>เครื่องปรับอากาศ, โทรทัศน์, เครื่องขยายเสียง</dd>
			<dt>ยานพาหนะ</dt>
			<dd>รถโดยสาร 12 ที่นั่ง, รถกระบะ</dd>
			<dt>สำนักงาน</dt>
			<dd>คอมพิวเตอร์, โต๊ะเก้าอี้, เครื่องถ่ายเอกสาร</dd>
			<dt>งานบ้าน</dt>
			<dd>เครื่องทำน้ำเย็น, ตู้เย็น, โต๊ะอาหาร...</dd>
		</dl>
	</section>
	<section>ACT LINK</section>

	<h2 class="f">
		<span>สิ่งก่อสร้าง <small>สภาพดีจากทั้งหมด</small></span>
		<span>80%</span>
	</h2>
	<section>
		<dl>
			<dt>เหลือง</dt>
			<dd>ดี 80%</dd>
			<dt>เหลืองเข้ม</dt>
			<dd>พอใช้ 13%</dd>
			<dt>แดง</dt>
			<dd>ทรุดโทรม 7%</dd>
		</dl>
	</section>
	<section>
		<p>
			<span>สภาพการใช้งาน</span>
			<small>จากการประเมินของโรงเรียน</small>
		</p>
		<div>
			<div>80%</div>
			<div>a</div>
			<div>b</div>
		</div>
	</section>
	<section>
		<h3>
			<span>อาคารการศึกษา</span>
			<small>(อาคาร)</small>
			<span>4</span>
		</h3>
	</section>
	<section>
		<p>
			<span>ห้องทั้งหมด</span>
			<small>(ห้อง)</small>
			<span>999</span>
		</p>
		<hr />
		<article>
			<img src="/anon.svg" alt="" />
			<h4>อาคารเรียน 1</h4>
			<p>
				สร้างปี พ.ศ.2545<br />
				สภาพการใช้งาน <span>สี</span> ดี
			</p>
			<div>
				<div>icon</div>
			</div>
			<span>16 ห้อง</span>
		</article>
		<article>
			<img src="/anon.svg" alt="" />
			<h4>อาคารเรียน 1</h4>
			<p>
				สร้างปี พ.ศ.2545<br />
				สภาพการใช้งาน <span>สี</span> ดี
			</p>
			<div>
				<div>icon</div>
			</div>
			<span>16 ห้อง</span>
		</article>
	</section>
	<button type="button">
		<h3>
			<span>อาคารและสิ่งก่อสร้างอื่น</span>
			<span>ดูทั้งหมด</span>
			<span>ICON</span>
		</h3>
	</button>
	<section>
		<div>
			<article>
				<img src="/anon.svg" alt="" />
				<h4>อาคารเรียน 1</h4>
				<p>สร้างปี พ.ศ.2545</p>
			</article>
			<article>
				<img src="/anon.svg" alt="" />
				<h4>อาคารเรียน 1</h4>
				<p>สร้างปี พ.ศ.2545</p>
			</article>
		</div>
		<dl>
			<dt>ห้องน้ำ</dt>
			<dt>บ้านพัก</dt>
			<dd>ครู, ภารโรง, นักเรียน</dd>
			<dt>การเกษตร</dt>
			<dd>เรือนเพาะชำ, บ่อเลี้ยงปลา</dd>
			<dt>สิ่งก่อสร้างอื่น</dt>
			<dd>ถังเก็บน้ำ, ถนน, รางระบายน้ำ</dd>
		</dl>
	</section>
	<section>ACT LINK</section>

	<h2 class="f">
		<span>ข้อมูลทั่วไป</span>
	</h2>
	<section>
		<h3>ติดต่อ</h3>
		<dl>
			<dt>ICON</dt>
			<dd>123 ถนนพญาไท แขวงปทุมวันเขตปทุมวัน กรุงเทพมหานคร 10330</dd>
			<dt>ICON</dt>
			<dd>022311234-5, 0</dd>
			<dt>ICON</dt>
			<dd>www.prongsaischool.ac.th</dd>
			<dt>ICON</dt>
			<dd>info@prongsaischool.ac.th</dd>
		</dl>
	</section>
	<section>
		<h3>ข้อมูลอื่น</h3>
		<img src="/anon.svg" alt="" />
		<dl>
			<dt>รหัสโรงเรียน</dt>
			<dd>1020080005</dd>
			<dt>สังกัด</dt>
			<dd>สพม.กรุงเทพมหานคร เขต 1</dd>
			<dt>ก่อตั้งเมื่อ</dt>
			<dd>01 มกราคม พ.ศ.2500</dd>
			<dt>ระดับที่เปิดสอน</dt>
			<dd>มัธยมปลาย</dd>
			<dt>ประเภทโรงเรียน</dt>
			<dd>รัฐบาล</dd>
			<dt>ลักษณะโรงเรียน</dt>
			<dd>สหศึกษา</dd>
		</dl>
	</section>

	<footer>
		<p>
			สามารถตรวจสอบความถูกต้องของข้อมูลเพื่อใช้ประกอบการอ้างอิงหรือติดต่อหน่วยงานต้นทางข้อมูลได้ที่ระบบสารสนเทศเพื่อการบริหารการศึกษา
			(Education Management Information System : EMIS) https://data.bopp-obec.info/emis
		</p>
		<p>อัปเดตข้อมูลล่าสุดเมื่อ 30/11/2565</p>
	</footer>
{/if}

<style lang="scss">
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

	.mb8 {
		margin-bottom: 8px;
	}

	.mb16 {
		margin-bottom: 16px;
	}

	.fw500 {
		font-weight: 500;
	}

	.fs20 {
		font-size: 1.25rem;
	}

	.cy {
		color: #ffce4f;
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
		gap: 0 16px;
		grid-template-columns: max-content auto;
		margin: 0;
	}

	.student-chart {
		display: flex;
		gap: 2px;

		.student-section {
			border-radius: 2px;
			flex: var(--std-chart-ratio) var(--std-chart-ratio) 0;
			padding: 8px;
			text-align: center;
			color: #fff;
			background: var(--std-color);
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
				text-align: right;
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
</style>
