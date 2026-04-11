// src/lib/toast.svelte.js
import { toast } from "svelte-sonner";

export function showToast({ message, type = "info" }) {
  if (type === "success") return toast.success(message);
  if (type === "error") return toast.error(message);
  if (type === "warning") return toast.warning(message);
  return toast(message);
}

