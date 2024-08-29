export async function load ({locals}) {
    const user = locals.user;
    console.log("loggedIN: " + !!user)
    let admin = false;
    if (user){
        admin = user.isAdmin
    }
    console.log("admin: " + admin)
    return {
        loggedIn: !!user,
        isAdmin: admin,
    }
}