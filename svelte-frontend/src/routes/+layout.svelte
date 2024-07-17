<svelte:head>
    <title>Luca-Home</title>
</svelte:head>

<script>
	import '../app.css';
    import {ModeWatcher} from "mode-watcher";
    import Header from "$lib/components/custom/Header.svelte";

    export let data;
</script>

<ModeWatcher defaultMode="light"/>
<Header loggedIn={data.loggedIn}/>
<div class="p-4">
    <slot></slot>
</div>

<style></style>
