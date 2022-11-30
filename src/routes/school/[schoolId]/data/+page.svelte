<script lang="ts">
	import { currentSchool } from 'stores/school';
</script>

{#if $currentSchool}
	<pre>{JSON.stringify($currentSchool, null, 1)}</pre>
{/if}
