<script lang="ts">
	import { currentUser } from 'stores/firebaseapp';
	import SchoolHeader from 'components/SchoolHeader.svelte';
</script>

<SchoolHeader pageData={{ name: 'ความคิดเห็น', color: '#6BC9FF' }} />
{#if $currentUser}
	<p>Current user is: {$currentUser.uid}</p>
	<p>You can comment</p>
{:else}
	<p>You are not logged in D:</p>
	<p>No comment</p>
{/if}
<p>
	Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic neque ea beatae quibusdam
	praesentium quo fuga, asperiores laudantium tenetur autem! Et incidunt asperiores unde ex. Dolore
	facilis iure alias vitae.
</p>
