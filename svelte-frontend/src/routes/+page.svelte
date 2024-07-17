<script>
    import * as Card from "$lib/components/ui/card";
    import {Button} from "$lib/components/ui/button/index.js";

    export let data;

    $: isLoggedIn = data.loggedIn
</script>


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