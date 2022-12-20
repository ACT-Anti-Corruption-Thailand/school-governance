<script lang="ts">
	import { currentUser } from 'stores/firebaseapp';
	import SchoolHeader from 'components/SchoolHeader.svelte';
</script>

<SchoolHeader pageData={{ name: 'ความคิดเห็น', color: '#6BC9FF' }}>
	<div class="f comment-header">
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" width="20" height="20"
			><path
				fill="#6BC9FF"
				stroke="#6BC9FF"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="1.5"
				d="M17.5 9.583a6.983 6.983 0 01-.75 3.167 7.084 7.084 0 01-6.333 3.917 6.983 6.983 0 01-3.167-.75L2.5 17.5l1.583-4.75a6.983 6.983 0 01-.75-3.167A7.083 7.083 0 017.25 3.25a6.983 6.983 0 013.167-.75h.416A7.067 7.067 0 0117.5 9.167v.416z"
			/></svg
		>
		<span class="comment-header-val">50</span>
	</div>
</SchoolHeader>
<div class="desktop-margin">
	{#if $currentUser}
		<p>Current user is: {$currentUser.uid}</p>
		<p>You can comment</p>
	{:else}
		<p>You are not logged in D:</p>
		<p>No comment</p>
	{/if}
	<p>
		Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic neque ea beatae quibusdam
		praesentium quo fuga, asperiores laudantium tenetur autem! Et incidunt asperiores unde ex.
		Dolore facilis iure alias vitae.
	</p>
</div>

<style lang="scss">
	.comment-header {
		gap: 4px;
	}

	.comment-header-val {
		font-family: 'Mitr';
		font-weight: 500;
		font-size: 1.5625rem;
		line-height: 125%;
		letter-spacing: 0.02em;
		color: #3c55ab;
	}
</style>
