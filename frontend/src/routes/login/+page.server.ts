import { type ServerLoadEvent } from '@sveltejs/kit';

export function load(event: ServerLoadEvent) {
	if (event.locals.user) {
		return { loggedIn: true };
	}
	return { loggedIn: false };
}
