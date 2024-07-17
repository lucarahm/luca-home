
export async function load (event) {
    return {
        loggedIn: !!event.locals.user,
    }
}