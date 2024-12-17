<script lang="ts">
	import {Button} from '$lib/components/ui/button';
	let { data } = $props();
</script>

{#if data.loggedIn}
	<h1>Welcome! You are already logged in.</h1>
	<Button href="/">Go Home</Button>
{:else}
	<h1>Welcome. Here you can login.</h1>
{/if}