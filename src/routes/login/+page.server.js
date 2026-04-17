import { redirect, fail } from '@sveltejs/kit';

export const actions = {
  default: async ({ request, cookies, fetch }) => {
    const form = await request.formData();
    const email = form.get('email')?.trim().toLowerCase();
    const password = form.get('password')?.trim();

    // Same validation as your old code
    if (!email) {
      return fail(400, {
        fieldErrors: { email: 'Email is required', password: '' },
        globalError: ''
      });
    }

    if (!password) {
      return fail(400, {
        fieldErrors: { email: '', password: 'Password is required' },
        globalError: ''
      });
    }

    // Call your real backend directly
    const res = await fetch('https://fabform.io/f/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    // Backend: not verified
    if (data.status === 'notVerified') {
      return fail(400, {
        fieldErrors: { email: '', password: '' },
        globalError: `Please verify your email address with the link sent to ${email}.`
      });
    }

    // Backend: invalid login
    if (data.status !== 'loggedIn') {
      return fail(400, {
        fieldErrors: { email: '', password: '' },
        globalError: 'Invalid username or password'
      });
    }

    // Create a simple session token (since backend doesn't return one)
    const sessionToken = crypto.randomUUID();

    // Store session token (httpOnly)
    cookies.set('session', sessionToken, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      maxAge: 60 * 60 * 24 * 7
    });

    // Store user info (client-readable)
    cookies.set(
      'user',
      JSON.stringify({
        id: data.user_id,
        email: data.email,
        tier: data.tier
      }),
      {
        path: '/',
        httpOnly: false, // client must read this
        sameSite: 'lax',
        secure: true,
        maxAge: 60 * 60 * 24 * 7
      }
    );

    // Redirect to your old destination
    throw redirect(302, '/forms');
  }
};

