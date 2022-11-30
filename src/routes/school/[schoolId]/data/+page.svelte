<script lang="ts">
	import { currentSchool } from 'stores/school';
	import SchoolHeader from 'components/SchoolHeader.svelte';
</script>

<SchoolHeader pageData={{ name: 'ข้อมูลโรงเรียน', color: '#DDAB29' }} />
{#if $currentSchool}
	<div class="overflow">
		<pre>{JSON.stringify($currentSchool, null, 1)}</pre>
	</div>
{/if}

<style lang="scss">
	.overflow {
		overflow: scroll;
	}
</style>
