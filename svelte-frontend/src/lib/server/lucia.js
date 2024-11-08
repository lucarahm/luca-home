import {Lucia} from "lucia";
import {PrismaAdapter} from "@lucia-auth/adapter-prisma";
import {dev} from "$app/environment"
import {PrismaClient} from '@prisma/client'

const client = new PrismaClient();

const adapter = new PrismaAdapter(client.session, client.user);

export const lucia = new Lucia(adapter, {
    sessionCookie: {
        attributes: {
            // set to `true` when using HTTPS
            secure: !dev
        }
    },
    getUserAttributes: (attributes) => {
        return {
            username: attributes.username,
            isAdmin: attributes.isAdmin
        }
    }
});
