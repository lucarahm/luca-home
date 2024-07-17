<script lang="ts">
    import SuperDebug, {superForm} from 'sveltekit-superforms';
    import {loginSchema} from "$lib/config/zod-schemas.js";
    import {zodClient} from "sveltekit-superforms/adapters";
    import {Label} from "$lib/components/ui/label";
    import {Input} from '$lib/components/ui/input'
    import {dev} from "$app/environment";
    import {AlertCircle, Loader2} from "lucide-svelte";

    import * as Alert from "$lib/components/ui/alert/index.js";
    import * as Form from "$lib/components/ui/form/index.js"
    import * as Card from "$lib/components/ui/card/index.js"

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
    <!--{#if dev}-->
    <!--    <SuperDebug data={formData}/>-->
    <!--{/if}-->
    <div class="flex justify-center pt-12">
        <form method="POST" use:enhance>
            <Card.Root class="w-full max-w-sm">
                <Card.Header>
                    <div class="px-6 py-8 lg:px-8">
                        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                            <a href="/">
                                <img class="mx-auto h-10 w-auto dark:invert" src="/logo.png" alt="Luca Home logo">
                            </a>
                            <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100">
                                Sign in to your account
                            </h2>
                        </div>
                    </div>
                    {#if $errors?.top}
                        <Alert.Root variant="destructive">
                            <AlertCircle class="h-4 w-4"/>
                            <Alert.Title>Error</Alert.Title>
                            <Alert.Description> {$errors?.top} </Alert.Description
                            >
                        </Alert.Root>
                    {/if}
                </Card.Header>
                <Card.Content>
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

                        </Form.Field>
                        {#if $errors?.username}<span class="text-red-600 text-xs">{$errors.username}</span>{/if}
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
                        </Form.Field>
                        {#if $errors.password}<span class="text-red-600 text-xs">{$errors.password}</span>{/if}
                    </div>
                    <!--        todo: add checkbox for show password-->
                </Card.Content>
                <Card.Footer>
                    <Form.Button class="block w-full">Sign in</Form.Button>
                    {#if $delayed}
                        <Loader2 class="animate-spin"/>
                    {/if}
                </Card.Footer>
            </Card.Root>
        </form>
    </div>
{/if}