<script>
	import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@rgossiaux/svelte-headlessui';
</script>

<TabGroup>
	<TabList class="school-tablist">
		<Tab>นักเรียน</Tab>
		<Tab>ครู/บุคลากร</Tab>
		<Tab>อุปกรณ์</Tab>
		<Tab>สิ่งก่อสร้าง</Tab>
		<Tab>ทั่วไป</Tab>
	</TabList>
	<TabPanels class="school-tabpanel">
		<TabPanel>
			1. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae quis ipsum soluta
			accusantium eos quaerat debitis fugiat dignissimos, ad eveniet sapiente quia iusto quae non,
			excepturi repellat cumque! Molestias, quidem?
		</TabPanel>
		<TabPanel>
			2. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora id quo, nihil sunt vitae
			quas porro voluptates itaque inventore aliquid harum distinctio ullam molestiae exercitationem
			ipsum animi modi sequi excepturi!
		</TabPanel>
		<TabPanel>
			3. Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa maxime, ab voluptatibus
			nihil sequi neque doloribus illum, repellendus et rerum magni commodi? Sint mollitia maxime,
			accusamus error recusandae consectetur nisi.
		</TabPanel>
		<TabPanel>
			4. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis asperiores autem consequuntur
			recusandae veniam sit cupiditate voluptas tenetur fuga consectetur. Iste in quidem sed sequi
			sit voluptatibus distinctio consequatur laudantium?
		</TabPanel>
		<TabPanel>
			5. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem illo repellendus eius
			delectus, numquam autem voluptatibus in unde adipisci, accusamus dicta consectetur nisi error!
			Perspiciatis ab reprehenderit deserunt impedit maiores!
		</TabPanel>
	</TabPanels>
</TabGroup>

<style lang="scss">
	:global(.school-tablist) {
		position: sticky;
		top: 26px;
	}

	:global(.school-tabpanel) {
		width: 100px;
		overflow: hidden auto;
	}
</style>
