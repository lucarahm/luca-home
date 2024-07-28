<svelte:head>
    <title>{title}</title>
    <meta name="description" content={description}>

</svelte:head>

<script>
	import '../app.css';
    import {ModeWatcher} from "mode-watcher";
    import Header from "$lib/components/custom/Header.svelte";
    import {title, description} from "$lib/config.js";

    export let data;
</script>

<ModeWatcher defaultMode="light"/>
<Header loggedIn={data.loggedIn}/>
<div class="p-4 max-w-screen-xl items-center mx-auto">
    <slot></slot>
</div>

<style></style>
