// src/hooks.server.js
export async function handle({ event, resolve }) {
  // Read the user cookie (stringified JSON)
  const userCookie = event.cookies.get('user');

  if (userCookie) {
    try {
      // Parse and attach to locals
      event.locals.user = JSON.parse(userCookie);
    } catch {
      // If cookie is corrupted, treat as logged out
      event.locals.user = null;
    }
  } else {
    event.locals.user = null;
  }

  return resolve(event);
}

