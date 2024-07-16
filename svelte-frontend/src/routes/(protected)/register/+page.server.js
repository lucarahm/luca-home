import {superValidate} from "sveltekit-superforms";
import {zod} from "sveltekit-superforms/adapters";
import {signUpSchema} from "$lib/config/zod-schemas.js";
import {redirect} from "@sveltejs/kit";
import {generateIdFromEntropySize} from "lucia";
import {hash} from "@node-rs/argon2"
import {db} from "$lib/database.js";
import {lucia} from "$lib/server/lucia.js";


export const load = (async (event) => {
    if (event.locals.user && !event.locals.user.isAdmin) {
        redirect(302, '/');
    }
    const form = await superValidate(zod(signUpSchema));

    // Always return { form } in load functions
    return {form};
});

export const actions = {
    default: async ( { request, cookies}) => {
        console.log("In register action.")
        const form = await superValidate(request, zod(signUpSchema));

        const {firstName, lastName, username, email, password} = form.data;
        const userId = generateIdFromEntropySize(10)
        console.log(userId)
        const passwordHash = await hash(password, {
            memoryCost: 19456,
            timeCost: 2,
            outputLen: 32,
            parallelism: 2
        })

        // todo: check if username is already taken

        const user = await db.user.create({
            data: {
                id: userId,
                firstName: firstName,
                lastName: lastName,
                username: username,
                email: email,
                password_hash: passwordHash,
            }
        })
        console.log(user)

        const session = await lucia.createSession(userId, {})
        const sessionCookie = lucia.createSessionCookie(session.id);
        cookies.set(sessionCookie.name, sessionCookie.value, {
            path: ".",
            ...sessionCookie.attributes
        })

        redirect(302, "/");
    }

}