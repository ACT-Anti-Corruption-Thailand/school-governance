<script lang="ts">
	export let percent = 60;
</script>

<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="24" height="24">
	<circle cx="12" cy="12" r="10" stroke="#fff" stroke-width="4" />
	<circle
		cx="12"
		cy="12"
		r="10"
		stroke="#3C55AB"
		stroke-width="4"
		stroke-dasharray="{(percent / 100) * 63} 63"
		stroke-linecap="round"
		stroke-linejoin="round"
		style="transform:rotate(-90deg);transform-origin:center"
	/>
</svg>
