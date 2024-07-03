<script lang="ts">
    import SuperDebug, {superForm} from 'sveltekit-superforms';
    import {schema} from "./loginSchema.js";
    import {zodClient} from "sveltekit-superforms/adapters";
    import {Control, Field} from "formsnap";
    import {Label} from "$lib/components/ui/label";
    import {Input} from '$lib/components/ui/input'
    import {Button} from '$lib/components/ui/button'

    export let data;

    // Client API:
    const form = superForm(data.form, {
        validators: zodClient(schema),
    })

    const {form: formData, enhance: enhance, message: message, errors: errors} = form;
</script>

<SuperDebug data={formData}/>

{#if $message}<h3>{$message}</h3>{/if}

<div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img class="mx-auto h-10 w-auto" src="/logo.png" alt="Luca Home logo">
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
        </h2>
    </div>
</div>
<div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form class="space-y-6" method="POST" use:enhance>
        <div>
            <Field {form} name="username">
                <Control let:attrs>
                    <Label for="username">Username</Label>
                    <Input {...attrs}
                           id="username"
                           type="text"
                           name="username"
                           bind:value={$formData.username}/>
                </Control>

            </Field>
            {#if $errors?.username}<span class="text-red-600 text-xs">{$errors.username}</span>{/if}
        </div>

        <div>
            <Field {form} name="password">
                <Control let:attrs>
                    <Label for="password">Password</Label>
                    <Input {...attrs}
                           id="password"
                           type="password"
                           name="password"
                           bind:value={$formData.password}
                    />
                </Control>
            </Field>
            {#if $errors.password}<span class="text-red-600 text-xs">{$errors.password}</span>{/if}
        </div>

        <div>
            <Button class="w-full">Sign in</Button>
        </div>
    </form>

</div>
