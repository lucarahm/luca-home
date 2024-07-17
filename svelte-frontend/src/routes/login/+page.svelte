<script lang="ts">
    import SuperDebug, {superForm} from 'sveltekit-superforms';
    import {loginSchema} from "$lib/config/zod-schemas.js";
    import {zodClient} from "sveltekit-superforms/adapters";
    import {Control, Field} from "formsnap";
    import {Label} from "$lib/components/ui/label";
    import {Input} from '$lib/components/ui/input'
    import {dev} from "$app/environment";
    import {AlertCircle, Loader2} from "lucide-svelte";

    import * as Alert from "$lib/components/ui/alert/index.js";
    import * as Form from "$lib/components/ui/form"

    export let data;

    let showPassword = false;
    $: password = showPassword ? 'text' : 'password';

    // Client API:
    const form = superForm(data.form, {
        validators: zodClient(loginSchema),
        delayMs: 500,
        timeoutMs: 9000
    })

    const {form: formData, enhance: enhance, message: message, errors: errors, delayed: delayed} = form;
</script>


{#if $message}<h3>{$message}</h3>{/if}

{#if data.loggedIn}
    <div>You are already logged in.</div>
{:else}
    {#if dev}
        <SuperDebug data={formData}/>
    {/if}
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <a href="/">
                <img class="mx-auto h-10 w-auto" src="/logo.png" alt="Luca Home logo">
            </a>
            <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign in to your account
            </h2>
        </div>
    </div>
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {#if $errors?.top}
            <Alert.Root variant="destructive">
                <AlertCircle class="h-4 w-4"/>
                <Alert.Title>Error</Alert.Title>
                <Alert.Description> {$errors?.top} </Alert.Description
                >
            </Alert.Root>
        {/if}
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
                               type={password}
                               name="password"
                               bind:value={$formData.password}
                        />
                    </Control>
                </Field>
                {#if $errors.password}<span class="text-red-600 text-xs">{$errors.password}</span>{/if}
            </div>
            <!--        todo: add checkbox for show password-->
            <div class="pb-8">
                <Form.Button class="w-full">Sign in</Form.Button>
                {#if $delayed}
                    <Loader2 class="animate-spin"/>
                {/if}
            </div>
        </form>
    </div>
{/if}