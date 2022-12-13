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
	<h2>
		<span>นักเรียน <small>คน</small></span>
		<span>1000</span>
	</h2>
	<section>
		<div>
			<span>
				เฉลี่ยนักเรียนห้องละ <small>(คน)</small>
			</span>
			<span>40</span>
		</div>
		<hr />
		<span>โรงเรียนขนาดใหญ่</span>
		<details>
			<summary>ICON ดูเกณฑ์การแบ่งขนาดโรงเรียน DROPICON</summary>
			<h4>ขนาดโรงเรียนสังกัดสำนักงานเขตพื้นที่ประถมศึกษา</h4>
			<dl>
				<dt>เล็ก</dt>
				<dd>มีนักเรียน 1 &ndash; 120 คน</dd>
				<dt>กลาง</dt>
				<dd>มีนักเรียน 121 &ndash; 600 คน</dd>
				<dt>ใหญ่</dt>
				<dd>มีนักเรียน 601 &ndash; 1,500 คน</dd>
				<dt>ใหญ่พิเศษ</dt>
				<dd>มีนักเรียน 1,501 คนขึ้นไป</dd>
			</dl>
			<h4>ขนาดโรงเรียนสังกัดสำนักงานเขตพื้นที่มัธยมศึกษา</h4>
			<dl>
				<dt>เล็ก</dt>
				<dd>มีนักเรียน 1 &ndash; 499 คน</dd>
				<dt>กลาง</dt>
				<dd>มีนักเรียน 500 &ndash; 1,499 คน</dd>
				<dt>ใหญ่</dt>
				<dd>มีนักเรียน 1,500 &ndash; 2,499 คน</dd>
				<dt>ใหญ่พิเศษ</dt>
				<dd>มีนักเรียน 2,500 คนขึ้นไป</dd>
			</dl>
		</details>
	</section>
	<section>
		สัดส่วนจากนักเรียนทั้งหมด
		<div>
			<div>10%</div>
			<div>50%</div>
			<div>20%</div>
			<div>20%</div>
		</div>
		<button type="button">
			<span>COLOR</span>
			<span>อนุบาล</span>
			<span>100</span>
			<span>ICON</span>
		</button>
		<button type="button">
			<span>COLOR</span>
			<span>ประถม</span>
			<span>100</span>
			<span>ICON</span>
		</button>
		<button type="button">
			<span>COLOR</span>
			<span>มัธยมต้น</span>
			<span>100</span>
			<span>ICON</span>
		</button>
		<button type="button">
			<span>COLOR</span>
			<span>มัธยมปลาย</span>
			<span>100</span>
			<span>ICON</span>
		</button>
	</section>
	<section>
		<h3>เปรียบเทียบจำนวนนักเรียน 6 ปีที่ผ่านมา</h3>
		<div>
			<span>ปี</span>
			<span>คน</span>
		</div>
		<div>
			<span>65</span>
			<div>10%</div>
			<div>50%</div>
			<div>20%</div>
			<div>20%</div>
			<span>1000</span>
		</div>
	</section>

	<h2>
		<span>ครู/บุคลากร <small>(คน)</small></span>
		<span>60</span>
	</h2>
	<section>
		<button type="button">
			<h3>
				<span>ครู</span>
				<span>37</span>
				<span>ICON</span>
			</h3>
			<p>ครูทั่วไป, ครูผู้ช่วย, ชำนาญการ, ชำนาญการพิเศษ...</p>
		</button>
		<div>
			<span>สัดส่วนครู ต่อ นักเรียน</span>
			<span>1:20</span>
		</div>
		<hr />
		<div>
			<span>ครู</span><span>นักเรียน</span>
		</div>
		<div>
			<div>ครู</div>
			<div>นักเรียนๆๆๆๆ</div>
		</div>
	</section>
	<section>
		<h3>เปรียบเทียบจำนวนครู 6 ปีที่ผ่านมา</h3>
		<div>
			<span>ปี</span>
			<span>คน</span>
		</div>
		<div>
			<span>65</span>
			<div>1:20</div>
			<span>1000</span>
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

	<h2>
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

	<h2>
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

	<h2>
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
	// .overflow {
	// 	overflow: scroll;
	// }
</style>
