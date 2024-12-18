<!--
@component

Custom buttons for the Putzplan
-->


<script>
    import {Button} from "$lib/components/ui/button/index.js";
    // let status = $props();
    export let data;
    console.log("Got this status: " + status)
</script>

{#if data.status === 'done'}
    <Button variant="outline" class="text-green-600">
        ✅ Erledigt
    </Button>

{:else if data.status === 'open'}
    <Button variant="outline" class="text-yellow-600">
        🕒 Offen
    </Button>

{:else }
    <Button variant="outline">No status selected</Button>

{/if}
