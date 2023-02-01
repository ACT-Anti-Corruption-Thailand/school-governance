<script lang="ts">
	export let margin = false;
	export let text =
		'ค้นหาข้อมูลเพิ่มเติมเกี่ยวกับวัสดุอุปกรณ์และการก่อสร้างอาคารของโรงเรียนได้ที่นี่';
	export let href = 'https://actai.co/';
</script>

<a {href} class="f act-banner" class:margin target="_blank" rel="nofollow noopener noreferrer">
	<span>{text}</span>
	<img src="/logos/act_upright.png" alt="" width="69" height="48" loading="lazy" decoding="async" />
</a>

<style lang="scss">
	.act-banner {
		padding: 16px;
		background: #000;
		box-shadow: 0px 0px 4px rgba(12, 22, 107, 0.2);
		border-radius: 4px;
		color: #fff;
		text-decoration: none;
		gap: 16px;
		text-align: left;
		justify-content: space-between;
		width: fit-content;
		margin: auto;

		&.margin {
			margin: 16px;

			@media screen and (min-width: 768px) {
				margin: 16px 0;
			}
		}
	}
</style>
