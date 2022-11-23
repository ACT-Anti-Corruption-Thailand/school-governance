<script lang="ts">
	import { page } from '$app/stores';

	$: pageData = $page.params.schoolId;
</script>

<slot />
<nav>
	<a href="/school/{pageData}/">Home</a>
	<a href="/school/{pageData}/data">Data</a>
	<a href="/school/{pageData}/rating">Rating</a>
	<a href="/school/{pageData}/comments">Comments</a>
	<a href="/school/{pageData}/notice">Notice</a>
</nav>
<hr />
<p>School ID: {pageData}</p>
