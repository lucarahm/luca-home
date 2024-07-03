import {message, superValidate} from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import {fail} from "@sveltejs/kit";
import {schema} from "./loginSchema.js";

export const load = (async () => {
    const form = await superValidate(zod(schema));

    // Always return { form } in load functions
    return {form};
});

export const actions = {
    default: async ({request}) => {
        const form = await superValidate(request, zod(schema));
        console.log(form);

        if (!form.valid) {
            return fail(400, {form});
        }

        return message(form, "Form posted successfully!");
    }
}