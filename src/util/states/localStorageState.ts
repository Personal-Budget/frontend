import { writable, type Writable } from "svelte/store";

export const localStorageState = (
  key: string,
  fallback = "",
): Writable<string> => {
  const val =
    typeof localStorage !== "undefined" ? localStorage.getItem(key) : null;

  const store = writable(val ?? fallback);

  store.subscribe((value) => {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(key, value);
    }
  });

  return store;
};
