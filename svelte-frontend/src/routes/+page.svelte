<script>
    import {Button} from "$lib/components/ui/button/index.js";
    import {asciiApe} from "$lib/other/ascii-art.js";

    export let data;

    $: isLoggedIn = data.loggedIn

    // Easter egg for devs
    console.log(asciiApe)

</script>

<h1 class="text-4xl font-bold text-center text-gradient bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-500 to-purple-600">
    Welcome to <span class="text-red-500">/root</span>!
</h1>
<p class="mt-2 text-gray-600 dark:text-gray-400 text-center">
    Still gotta think of something funny for here
</p>
<h2 class="font-bold text-2xl mb-4">
    What do you want to do?
</h2>

<div class="grid grid-cols-2 gap-4">
    {#if !(isLoggedIn)}
        <Card.Root class="">
            <Card.Header>
                <Card.Title>Log in</Card.Title>
                <Card.Description>Log in to your user account to access more features</Card.Description>
            </Card.Header>
            <Card.Content>
                <a href="/login">
                    <Button>Click</Button>
                </a>
            </Card.Content>
        </Card.Root>
    {/if}
    <Card.Root class="">
        <Card.Header>
            <Card.Title>About</Card.Title>
            <Card.Description>Read something about this website</Card.Description>
        </Card.Header>
        <Card.Content>
            <Button href='/about'>Click</Button>
        </Card.Content>
    </Card.Root>
</div>