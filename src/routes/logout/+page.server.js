import { redirect } from '@sveltejs/kit';

export const actions = {
  default: async ({ cookies }) => {
    cookies.delete('user', { path: '/' });
    throw redirect(302, '/login');
  }
};

