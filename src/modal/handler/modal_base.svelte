<script lang="ts">
  import { modal, closeModal } from "../../util/modal/modal_actions";
  import type { ModalManagerProps } from "../../util/modal/types";
  import "../../styles/modals/modal.scss";
  import { fade, fly, scale } from "svelte/transition";
  import type { TransitionConfig } from "svelte/transition";

  let transitionFn: (node: Element, params: any) => TransitionConfig =
    $state(fade); // default
  let transitionParams: Record<string, any> = $state({});

  let default_modal_props: ModalManagerProps = {
    title: "defaultTitle",
    showCloseButton: true,
  };

  let { id, ModalProps = default_modal_props, children } = $props();

  $effect(() => {
    switch (ModalProps.transition) {
      case "fly":
        transitionFn = fly;
        transitionParams = {
          y: 20,
          duration: 200,
          opacity: 0.2,
          easing: (t: number) => t,
          ...(ModalProps.transitionOptions || {}),
        };
        break;
      case "scale":
        transitionFn = scale;
        transitionParams = {
          start: 0.95,
          duration: 250,
          easing: (t: number) => t,
          ...(ModalProps.transitionOptions || {}),
        };
        break;
      case "fade":
      default:
        transitionFn = fade;
        transitionParams = {
          duration: 123,
          easing: (t: number) => t,
          ...(ModalProps.transitionOptions || {}),
        };
    }
  });

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === "Escape") closeModal();
  };
</script>

{#if $modal.id === id && id != null}
  <div
    tabindex="-1"
    class="modal-backdrop"
    onclick={closeModal}
    onkeydown={handleKeydown}
    role="menu"
  >
    <div
      transition:transitionFn={transitionParams}
      class="modal-root"
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
{/if}
