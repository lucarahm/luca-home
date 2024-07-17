import {redirect} from "@sveltejs/kit";

export function load({locals, url}){
    // protect from not logged-in users
    if (!locals.user){
        redirect(303, `/login?redirectTo=${url.pathname}`)
    }
}