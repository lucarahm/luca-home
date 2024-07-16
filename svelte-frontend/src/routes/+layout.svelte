<script>
	import '../app.css';
    import {ModeWatcher} from "mode-watcher";
    import Header from "$lib/components/custom/Header.svelte";
</script>

<ModeWatcher />
<Header />
<slot></slot>

<style></style>
