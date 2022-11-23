<script lang="ts">
	import { currentUser } from '../../stores/firebaseapp';
</script>

<h1>School</h1>
{#if $currentUser}
	<p>Current user is: {$currentUser.uid}</p>
{:else}
	<p>You are not logged in D:</p>
{/if}
