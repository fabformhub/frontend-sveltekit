
export const toasts = $state([]);

export function showToast(message, type = "info", duration = 3000) {
  const id = crypto.randomUUID();

  toasts.push({
    id,
    message,
    type,
    duration
  });

  setTimeout(() => {
    removeToast(id);
  }, duration);
}

export function removeToast(id) {
  // mutate instead of reassign
  const filtered = toasts.filter(t => t.id !== id);
  toasts.splice(0, toasts.length, ...filtered);
}
