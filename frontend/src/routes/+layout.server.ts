export function load(event){
	return{
		loggedIn: !!event.locals.user,
		isAdmin: false // todo: adjust this later
	}
}