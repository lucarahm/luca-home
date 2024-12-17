<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/custom/Header.svelte';
	import { ModeWatcher } from 'mode-watcher';

	let { data, children } = $props();
</script>

<ModeWatcher />
<Header loggedIn={data.loggedIn} isAdmin={data.isAdmin} />
<div class="p-4 max-w-screen-xl items-center mx-auto">
	{@render children()}
</div>
