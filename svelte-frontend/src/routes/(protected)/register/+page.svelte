<script>
    import SuperDebug, {superForm} from 'sveltekit-superforms';
    import {signUpSchema} from "$lib/config/zod-schemas.js";
    import {zodClient} from "sveltekit-superforms/adapters";
    import {Input} from '$lib/components/ui/input/index.js'
    import {dev} from "$app/environment";

    import * as Form from '$lib/components/ui/form/index.js'
    import * as Card from '$lib/components/ui/card/index.js';
    import * as Alert from '$lib/components/ui/alert/index.js';
    import {Loader2} from "lucide-svelte";

    export let data;

    let showPassword = false;
    $: password = showPassword ? 'text' : 'password';

    // Client API:
    const form = superForm(data.form, {
        validators: zodClient(signUpSchema),
        delayMs:500,
        timeoutMs: 9000,
    })

    const {form: formData, enhance: enhance, message: message, errors: errors, delayed: delayed} = form;
</script>

<!--{#if dev}-->
<!--    <SuperDebug data={formData}/>-->
<!--{/if}-->

{#if $message}<h3>{$message}</h3>{/if}

<div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img class="mx-auto h-10 w-auto" src="/logo.png" alt="Luca Home logo">
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Register
        </h2>
    </div>
</div>
<div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form class="space-y-6" method="POST" use:enhance>
        <div>
            <Form.Field {form} name="firstName">
                <Form.Control let:attrs>
                    <Form.Label for="firstName">First Name</Form.Label>
                    <Input {...attrs}
                           id="firstName"
                           type="text"
                           name="firstName"
                           bind:value={$formData.firstName}/>
                </Form.Control>
                <Form.FieldErrors/>
            </Form.Field>
        </div>
        <div>
            <Form.Field {form} name="lastName">
                <Form.Control let:attrs>
                    <Form.Label for="lastName">Last Name</Form.Label>
                    <Input {...attrs}
                           id="lastName"
                           type="text"
                           name="lastName"
                           bind:value={$formData.lastName}/>
                </Form.Control>
                <Form.FieldErrors/>
            </Form.Field>
        </div>
        <div>
            <Form.Field {form} name="username">
                <Form.Control let:attrs>
                    <Form.Label for="username">Username</Form.Label>
                    <Input {...attrs}
                           id="username"
                           type="text"
                           name="username"
                           bind:value={$formData.username}/>
                </Form.Control>

                <Form.FieldErrors />
            </Form.Field>
        </div>
        <div>
            <Form.Field {form} name="email">
                <Form.Control let:attrs>
                    <Form.Label for="email">Email</Form.Label>
                    <Input {...attrs}
                           id="email"
                           type="email"
                           name="email"
                           bind:value={$formData.email}/>
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>
        </div>
        <div>
            <Form.Field {form} name="password">
                <Form.Control let:attrs>
                    <Form.Label for="password">Password</Form.Label>
                    <Input {...attrs}
                           id="password"
                           type={password}
                           name="password"
                           bind:value={$formData.password}
                    />
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>
        </div>
        <div>
            <Form.Field {form} name="confirmPassword">
                <Form.Control let:attrs>
                    <Form.Label for="confirmPassword">Confirm Password</Form.Label>
                    <Input {...attrs}
                           id="confirmPassword"
                           type={password}
                           name="confirmPassword"
                           bind:value={$formData.confirmPassword}
                    />
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>
            <!--        todo: add checkbox for show password-->
        </div>
        <div class="pb-8">
            <Form.Button class="w-full">Register</Form.Button>
            {#if $delayed} <Loader2 />{/if}
        </div>
    </form>
</div>
