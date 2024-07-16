import {lucia} from "$lib/server/lucia.js";
import {redirect} from "@sveltejs/kit";

export const handle = async ({event, resolve}) => {
    // const startTimer = Date.now();

    const sessionId = event.cookies.get(lucia.sessionCookieName);

    if (!sessionId) {
        event.locals.user = null;
        event.locals.session = null;
        return resolve(event);
    }

    const {session, user} = await lucia.validateSession(sessionId);
    if(session && session.fresh) {
        const sessionCookie = lucia.createSessionCookie(session.id)
        event.cookies.set(sessionCookie.name, sessionCookie.value, {
            path: '.',
            ...sessionCookie.attributes
        });
    }
    if (!session){
        const sessionCookie = lucia.createBlankSessionCookie();
        event.cookies.set(sessionCookie.name, sessionCookie.value, {
            path: '.',
            ...sessionCookie.attributes
        });
    }
    event.locals.user = user;
    event.locals.session = session;

    if (event.route.id?.startsWith('/(protected)')){
        if (!user) redirect(302, '/login')
        // if (!user.verified) redirect(302, '/login')
    }

    const response = await resolve(event);
    // console.log(response.status, event);
    return response;
}
