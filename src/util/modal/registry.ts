// registry.ts
import type { SvelteComponent } from 'svelte';

export interface ModalRegistryEntry {
  component: new (...args: any[]) => SvelteComponent;
  props?: Record<string, any>;
  children?: new (...args: any[]) => SvelteComponent;
}

export const modalRegistry = new Map<string, ModalRegistryEntry>();

export function registerModal(
  id: string,
  component: new (...args: any[]) => SvelteComponent,
  props?: Record<string, any>,
  children?: new (...args: any[]) => SvelteComponent,
) {
  let b_props = { ModalProps: { ...props }, id }

  modalRegistry.set(id, { component, props: b_props, children });
}




