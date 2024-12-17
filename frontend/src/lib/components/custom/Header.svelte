<script>
	import { page } from '$app/state';
	import DarkModeButton from '$lib/components/custom/DarkModeButton.svelte';

	let { loggedIn, isAdmin } = $props();

	const public_pages = [
		{ name: 'Home', href: '/' },
		{ name: 'About', href: '/about' }
	];

	const admin_pages = [
		{ name: 'Dashboard', href: '/dashboard' },
		{ name: 'Register', href: '/register' }
	];

	const user_pages = [
		{ name: 'WG', href: '/wg' }
	];

	let currentRoute = $derived(page.url.pathname);
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
			<ul
				class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-900 dark:border-gray-700">
				{#each public_pages as pub_page}
					<li class="block py-2 px-3 rounded hover:bg-slate-100 md:hover:bg-transparent"
							class:active={currentRoute === pub_page.href}>
						<a href={pub_page.href} class="hover:font-bold rounded-lg">{pub_page.name}</a>
					</li>
				{/each}
				{#if loggedIn}
					{#each user_pages as user_page}
						<li class="block py-2 px-3 rounded hover:bg-slate-100 md:hover:bg-transparent"
								class:active={currentRoute === user_page.href}>
							<a href={user_page.href} class="hover:font-bold rounded-lg">{user_page.name}</a>
						</li>
					{/each}
				{/if}
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
			<DarkModeButton />
		</div>
	</div>
</nav>

<style>
    .active {
        font-weight: bold;
    }
</style>
