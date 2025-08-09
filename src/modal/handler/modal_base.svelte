<script lang="ts">
  import { modal, closeModal } from "../../util/modal/modal_actions";
  import type { ModalManagerProps } from "../../util/modal/types";
  import "../../styles/modals/modal.scss";
  import { fade, fly, scale } from "svelte/transition";
  import type { TransitionConfig } from "svelte/transition";
  import { onMount } from "svelte";

  let default_modal_props: ModalManagerProps = {
    title: "defaultTitle",
    showCloseButton: true,
  };

  // Mi Sto pentendo non aver fatto un interface
  let {
    id,
    ModalProps = default_modal_props,
    children,
    size = "sm",
  } = $props();

  let transitionFn: (node: Element, params: any) => TransitionConfig = $derived(
    ModalProps.transition === "fly"
      ? fly
      : ModalProps.transition === "scale"
        ? scale
        : fade,
  );

  let transitionParams: Record<string, any> = $derived(
    ModalProps.transition === "fly"
      ? {
          y: 20,
          duration: 200,
          opacity: 0.2,
          easing: (t: number) => t,
          ...(ModalProps.transitionOptions || {}),
        }
      : ModalProps.transition === "scale"
        ? {
            start: 0.95,
            duration: 250,
            easing: (t: number) => t,
            ...(ModalProps.transitionOptions || {}),
          }
        : {
            duration: 150,
            easing: (t: number) => t,
            ...(ModalProps.transitionOptions || {}),
          },
  );

  let mounted = $state(false);
  onMount(() => {
    mounted = true;
  });

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === "Escape") closeModal();
  };
</script>

<div
  tabindex="-1"
  class="modal-backdrop"
  onclick={closeModal}
  onkeydown={handleKeydown}
  role="menu"
  in:fade={{ duration: 120 }}
  out:fade={{ duration: 120 }}
>
  <div
    in:transitionFn={transitionParams}
    out:transitionFn={transitionParams}
    class={`modal-root ${size}`}
    role="none"
    onclick={(e) => {
      e.preventDefault();
      e.stopPropagation();
    }}
  >
    <div class="modal-titlebar">
      {#if ModalProps.title}
        <p class="modal-title">{ModalProps.title}</p>
      {/if}

      {#if ModalProps.showCloseButton}
        <button
          class="modal-close"
          onclick={closeModal}
          aria-label="Close modal"
        >
          ✕
        </button>
      {/if}
    </div>

    <div class="modal-body">
      {@render children?.()}
    </div>
  </div>
</div>
