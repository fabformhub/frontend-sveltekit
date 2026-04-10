import { API_LOCATION } from '$lib/config.js';

async function request(method, url, body) {
  const res = await fetch(API_LOCATION + url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined
  });

  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

export const api = {
  get: (url) => request('GET', url),
  post: (url, body) => request('POST', url, body)
};

