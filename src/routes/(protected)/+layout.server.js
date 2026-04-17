// src/routes/(protected)/+layout.server.js
import { redirect } from '@sveltejs/kit';

export function load({ locals }) {
  // 🔥 DEBUG: See what the server thinks your user is
  console.log("PROTECTED LAYOUT locals.user =", locals.user);

  // If no user, redirect to login
  if (!locals.user) {
    throw redirect(302, '/login');
  }

  // Expose user to the client
  return {
    user: locals.user
  };
}

