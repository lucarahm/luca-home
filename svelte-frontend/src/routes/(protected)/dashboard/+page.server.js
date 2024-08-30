import {getAllUsers} from "$lib/database.js";

export async function load(){
    let users = await getAllUsers();

    return {
        users: users,
    };
}
