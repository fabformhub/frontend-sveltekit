import { API_LOCATION } from '$lib/config.js';

export async function getJSON(url) {
  const res = await fetch(API_LOCATION + url);

  if (!res.ok) {
    throw new Error(`GET ${url} failed with ${res.status}`);
  }

  return res.json();
}

export async function postJSON(url, payload) {
  const res = await fetch(API_LOCATION + url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    throw new Error(`POST ${url} failed with ${res.status}`);
  }

  const text = await res.text();
  return text ? JSON.parse(text) : null;
}
