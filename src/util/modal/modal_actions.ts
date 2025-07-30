import { writable } from "svelte/store";
import type { ModalState } from "./types";

export const modal = writable<ModalState>({ id: null });

export const openModal = (id: string) => {
  modal.set({ id });
};

export const toggleModal = (id: string) => {
  modal.update((prev) => ({
    id: prev.id === id ? null : id,
  }));
};

export const closeModal = () => {
  modal.set({ id: null });
};
