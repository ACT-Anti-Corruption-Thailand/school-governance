<script lang="ts">
	import { currentUser } from '../../../../stores/firebaseapp';
</script>

<h1>School Comments</h1>
{#if $currentUser}
	<p>Current user is: {$currentUser.uid}</p>
	<p>You can comment</p>
{:else}
	<p>You are not logged in D:</p>
	<p>No comment</p>
{/if}
