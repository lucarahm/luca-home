import {setError, superValidate} from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import {fail, redirect} from "@sveltejs/kit";
import {loginSchema} from "$lib/config/zod-schemas.js";
import {findByUsername} from "$lib/database.js";
import {verify} from "@node-rs/argon2";
import {lucia} from "$lib/server/lucia.js";

const sleep = (delay) => new Promise(resolve => setTimeout(resolve, delay));

export const load = (async () => {
    const form = await superValidate(zod(loginSchema));

    // Always return { form } in load functions
    return {
        form: form,
    };
});

export const actions = {
    default: async ({request, cookies, url}) => {
        const form = await superValidate(request, zod(loginSchema));
        console.log(form);

        if (!form.valid) {
            return fail(400, {form});
        }

        const {username, password} = form.data;

        const existingUser = await findByUsername(username);
        if (!existingUser){
            return setError(form, 'top', 'username or password incorrect')
        }
        console.log(existingUser)

        const validPassword = await verify(existingUser.password_hash, password, {
            memoryCost: 19456,
            timeCost: 2,
            outputLen: 32,
            parallelism: 2
        })

        if (!validPassword){
            await sleep(1000)
            return setError(form, 'top', 'Username or password incorrect')
        }
        const session = await lucia.createSession(existingUser.id, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        cookies.set(sessionCookie.name, sessionCookie.value, {
            path: ".",
            ...sessionCookie.attributes
        });


        throw redirect(303, url.searchParams.get('redirectTo')??'/');
    }
}