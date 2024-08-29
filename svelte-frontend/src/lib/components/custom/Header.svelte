<script>
    import DarkModeButton from "$lib/components/custom/DarkModeButton.svelte";
    import {page} from '$app/stores';
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
    import {Button} from "$lib/components/ui/button/index.js";
    import {CircleUser} from "lucide-svelte";

    export let loggedIn = false;
    export let isAdmin = false;

    const public_pages = [
        {name: 'Home', href: '/',},
        {name: 'About', href: '/about',},
    ];

    const admin_pages = [
        {name: 'Dashboard', href: '/dashboard',},
        {name: 'Register', href: '/register',},
    ];

    $: currentRoute = $page.url.pathname;
</script>

<nav class="bg-white border-gray-200 dark:bg-gray-900">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <!--            Menu for md and larger-->
        <a href="/" class="flex items-center space-x-3 mr-8">
            <img src="/logo.png"
                 alt="Luca-Home Logo"
                 class="h-10 dark:invert"
            >
        </a>
        <div class="hidden md:order-1 w-full md:flex md:w-auto justify-between">
            <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-900 dark:border-gray-700">
                {#each public_pages as pub_page}
                    <li class="block py-2 px-3 rounded hover:bg-slate-100 md:hover:bg-transparent"
                        class:active={currentRoute === pub_page.href}>
                        <a href={pub_page.href} class="hover:font-bold rounded-lg">{pub_page.name}</a>
                    </li>
                {/each}
                {#if isAdmin}
                    {#each admin_pages as admin_page}
                        <li class="block py-2 px-3 rounded hover:bg-slate-100 md:hover:bg-transparent"
                            class:active={currentRoute === admin_page.href}>
                            <a href={admin_page.href} class="hover:font-bold rounded-lg">{admin_page.name}</a>
                        </li>
                    {/each}
                {/if}
            </ul>
        </div>
        <div class="flex gap-3 items-center md:order-3 space-x-3 md:space-x-0 ">
            <DarkModeButton/>

            <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild let:builder>
                    <Button
                            builders={[builder]}
                            variant="outline"
                            size="icon"
                            class="rounded-full"
                    >
                        <CircleUser class="h-5 w-5"/>
                        <span class="sr-only">Toggle user menu</span>
                    </Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content align="end">
                    {#if loggedIn}
                        <DropdownMenu.Label>My Account</DropdownMenu.Label>
                        <DropdownMenu.Separator/>
                        <DropdownMenu.Item href="/settings">Settings</DropdownMenu.Item>
                        <DropdownMenu.Separator/>
                        <DropdownMenu.Item href="/logout">Logout</DropdownMenu.Item>
                    {:else}
                        <DropdownMenu.Label>Not logged in</DropdownMenu.Label>
                        <DropdownMenu.Separator/>
                        <DropdownMenu.Item href="/login">Login</DropdownMenu.Item>
                    {/if}
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        </div>
    </div>
</nav>

<style>
    .active {
        font-weight: bold;
    }
</style>