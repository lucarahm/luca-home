import {db, findUserById} from "$lib/database.js";
import {message, superValidate} from "sveltekit-superforms";
import {userUpdateSchema} from "$lib/config/zod-schemas.js";
import {zod} from "sveltekit-superforms/adapters";
import {fail} from "@sveltejs/kit";
import {hash} from "@node-rs/argon2";

export async function load({params}){
    let user = await findUserById(params.slug);
    const form = await superValidate(user, zod(userUpdateSchema));

    return {
        user: user,
        form: form
    }
}

export const actions = {
    default: async ({request}) => {
        const form = await superValidate(request, zod(userUpdateSchema));
        if (!form.valid) return fail(400, { form });

        const updatedUser = await db.user.update({
            where:{
                username: form.data.username
            },
            data:{
                ...form.data,
            }
        })

        if(form.data.password){
            const passwordHash = await hash(form.data.password, {
                memoryCost: 19456,
                timeCost: 2,
                outputLen: 32,
                parallelism: 2
            })

            await db.user.update({
                where:{
                    username: form.data.username
                },
                data:{
                    password_hash: passwordHash,
                }
            })
        }
        return message(form, "User updated!")
    }
}