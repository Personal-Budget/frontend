import type { SvelteComponent } from "svelte";

interface ModalState {
  id: string | null;
}


/* 
 This Component Is Used In The Modal Manager 
 it is used to make sure That we can have a dynamic component 
 with appropriate props passed 
*/
type ExpandedSvelteComponent = new (
  ...args: any[]
) => SvelteComponent<any, any>;

/**
 * Props to configure modal appearance and behavior.
 */
interface ModalManagerProps {
  /**
   * The modal's header text.
   * @example "Settings", "Delete Document", "My Cool Modal"
   */
  title: string | null;

  /**
   * Whether to display the close (✕) button in the top right.
   * @example true
   */
  showCloseButton: boolean;

  /**
   * Type of transition to apply when showing/hiding the modal.
   * Supported: "fade", "fly", "scale"
   * @example "fly"
   */
  transition?: 'fade' | 'fly' | 'scale';

  /**
   * Optional transition parameters.
   * Varies depending on transition type.
   *
   * @example
   * {
   *   duration: 300,
   *   easing: t => t,
   *   y: 20 // for fly
   * }
   *
   * @see https://svelte.dev/docs/transition
   */
  transitionOptions?: {
    delay?: number;
    duration?: number;
    easing?: (t: number) => number;
    css?: (t: number, u: number) => string;
    tick?: (t: number, u: number) => void;

    // For fly
    x?: number;
    y?: number;

    // For scale
    start?: number;
    opacity?: number;
  };
}

export type { ModalManagerProps, ModalState, ExpandedSvelteComponent };
