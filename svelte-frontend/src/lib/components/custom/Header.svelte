<script>
    import DarkModeButton from "$lib/components/custom/DarkModeButton.svelte";
    import {page} from '$app/stores';


    const public_pages = [
        {name: 'Home', href: '/',},
    ];

    const protected_pages = [
        {name: 'Dashboard', href: '/dashboard',},
    ];

    $: currentRoute = $page.url.pathname;
</script>
<nav class="flex p-4 bg-white dark:bg-black">
    <a href="/">
        <img src="./logo.png"
             height="150rem"
             width="150rem"
             alt="Luca-Home Logo"
             class="dark:invert"
        >
    </a>
    <div class="hidden lg:flex">
        {#each public_pages as pub_page}
            <div class="rounded-lg px-2 py-1"
                 class:active={currentRoute === pub_page.href}>
                <a href={pub_page.href} class="hover:underline rounded-lg">{pub_page.name}</a>
            </div>
        {/each}
    </div>
    <div class="ml-auto">
        <DarkModeButton/>
    </div>
</nav>