<script>
    import {enhance} from "$app/forms";
    import * as Form from "$lib/components/ui/form/index.js"
</script>

<h2 class="font-bold text-2xl mx-5">
    Are you sure you want to logout?
</h2>

<form method="post" class="p-5" use:enhance>
    <Form.Button>Sign out</Form.Button>
</form>