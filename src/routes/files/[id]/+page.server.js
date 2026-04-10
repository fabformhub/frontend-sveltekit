// +page.server.js
import { api } from '$lib/server/apiClient.js';

export async function load({ params }) {
  return {
    files: await api.get(`get-files/${params.id}`)
  };
}

