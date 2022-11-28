<script lang="ts">
	import 'styles/main.scss';

	import Firebase from 'components/firebase.svelte';
	import MainNav from 'components/navbar/MainNav.svelte';
</script>

<Firebase />
<MainNav />
<main id="#main">
	<slot />
	<section style="background:red;height:100vh" />
</main>
