<script>
    import * as Card from "$lib/components/ui/card";
    import {Button} from "$lib/components/ui/button/index.js";
</script>


<div class="p-4 text-center ">
    <h1 class="font-bold">Welcome to my personal Website</h1>
    <div class="bg-gray-200 container mx-auto">
        <p>My name is Luca and i'm a computer science student.</p>
        <p>This Website is currently being built and i want to use it to try out a few things. By the time you will see
            it grow.</p>
    </div>
</div>

<h2 class="font-bold text-2xl mx-5">
    What do you want to do?
</h2>

<div class="grid mx-5">
    <Card.Root class="w-1/3">
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
</div>