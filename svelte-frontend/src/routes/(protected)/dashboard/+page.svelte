<script>
    import * as Table from "$lib/components/ui/table"
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu"

    import {Button} from "$lib/components/ui/button/index.js";
    import {Ellipsis, Trash2, UserPen} from "lucide-svelte";

    export let data;
</script>
<div class="font-bold">Welcome to the dashboard</div>

<div class="font-bold font-mono">Users:</div>

<Table.Root>
    <Table.Caption>A list of all users</Table.Caption>
    <Table.Header>
        <Table.Row>
            <Table.Head>Username</Table.Head>
            <Table.Head>E-Mail</Table.Head>
            <Table.Head>Created at</Table.Head>
            <Table.Head>Last update</Table.Head>
            <Table.Head>Admin</Table.Head>
        </Table.Row>
    </Table.Header>
    <Table.Body>
        {#each data.users as user}
            <Table.Row>
                <Table.Cell>{user.username}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{user.createdAt.toLocaleString('en-GB', {timeZone: 'CET'})}</Table.Cell>
                <Table.Cell>{user.updatedAt.toLocaleString('en-GB', {timeZone: 'CET'})}</Table.Cell>
                <Table.Cell>{user.isAdmin}</Table.Cell>
                <Table.Cell>
                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger asChild let:builder>
                            <Button builders={[builder]} variant="ghost" class="">
                                <Ellipsis class="w-4 h-4"/>
                            </Button>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content>
                            <DropdownMenu.Group>
                                <DropdownMenu.Item href={"/dashboard/user/" + user.id}>
                                    <UserPen class="mr-2 h-4 w-4"/>
                                    <span>Edit User</span>
                                </DropdownMenu.Item>
                            </DropdownMenu.Group>
                            <DropdownMenu.Separator/>
                            <DropdownMenu.Group>
                                <DropdownMenu.Item disabled>
                                    <Trash2 class="mr-2 h-4 w-4"/>
                                    <span>Delete User</span>
                                </DropdownMenu.Item>
                            </DropdownMenu.Group>
                        </DropdownMenu.Content>

                    </DropdownMenu.Root>
                </Table.Cell>
            </Table.Row>
        {/each}
    </Table.Body>
</Table.Root>
