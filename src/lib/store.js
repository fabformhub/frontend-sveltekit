// src/helpers/store.js
import { writable } from "svelte/store";

function persistent(key, initial = null) {
  let stored = null;

  if (typeof localStorage !== "undefined") {
    stored = localStorage.getItem(key);
  }

  // Normalize stored values
  const startValue =
    stored === null || stored === "null" || stored === ""
      ? initial
      : stored;

  const store = writable(startValue);

  store.subscribe((value) => {
    if (typeof localStorage === "undefined") return;

    if (value === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, value);
    }
  });

  return {
    ...store,
    // Force Svelte 5 to treat updates as real updates
    set(v) {
      store.set(v === "" ? null : v);
    }
  };
}

export const user_id = persistent("user_id", null);
export const email = persistent("email", null);
export const tier = persistent("tier", 0);
