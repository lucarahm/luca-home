<script>
    import * as Form from '$lib/components/ui/form'
    import {superForm} from "sveltekit-superforms";
    import {Input} from "$lib/components/ui/input/index.js";
    import {zodClient} from "sveltekit-superforms/adapters";
    import {userUpdateSchema} from "$lib/config/zod-schemas.js";
    import {Loader2} from "lucide-svelte";
    export let data;

    const form = superForm(data.form, {
        validators: zodClient(userUpdateSchema),
        resetForm: false,
    });

    const {form: formData, constraints, enhance, errors, message, delayed} = form;

</script>

<div class="text-2xl font-bold">
    Edit User <span class="font-mono">{data.user.username}</span>:
</div>

{#if $message}<h3>{$message}</h3>{/if}

<form method="POST" use:enhance>
    <div class="grid-cols-2">
        <Form.Field {form} name="username">
            <Form.Control let:attrs>
                <Form.Label>Username</Form.Label>
                <Input
                        {...attrs}
                        bind:value={$formData.username}
                        {...$constraints.username}
                />
            </Form.Control>
            <Form.Description />
            <Form.FieldErrors />
        </Form.Field>

        <Form.Field {form} name="email">
            <Form.Control let:attrs>
                <Form.Label>Email</Form.Label>
                <Input
                        {...attrs}
                        bind:value={$formData.email}
                        {...$constraints.email}
                />
            </Form.Control>
            <Form.Description />
            <Form.FieldErrors />
        </Form.Field>
        <Form.Field {form} name="firstName">
            <Form.Control let:attrs>
                <Form.Label>First name</Form.Label>
                <Input
                        {...attrs}
                        bind:value={$formData.firstName}
                        {...$constraints.firstName}
                />
            </Form.Control>
            <Form.Description />
            <Form.FieldErrors />
        </Form.Field>
        <Form.Field {form} name="lastName">
            <Form.Control let:attrs>
                <Form.Label>Last name</Form.Label>
                <Input
                        {...attrs}
                        bind:value={$formData.lastName}
                        {...$constraints.lastName}
                />
            </Form.Control>
            <Form.Description />
            <Form.FieldErrors />
        </Form.Field>
        <Form.Field {form} name="password">
            <Form.Control let:attrs>
                <Form.Label>Password</Form.Label>
                <Input
                        {...attrs}
                        bind:value={$formData.password}
                        {...$constraints.password}
                />
            </Form.Control>
            <Form.FieldErrors />
            <Form.Description >
                Enter a new password in here to update the users password.
            </Form.Description>
        </Form.Field>
        <Form.Button type="submit" class="my-4">Apply Changes</Form.Button>
        {#if $delayed} <Loader2 />{/if}
    </div>
</form>