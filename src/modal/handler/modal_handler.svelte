<script lang="ts">
  import { modal, closeModal } from "../../util/modal/modal_actions";
  import { modalRegistry } from "../../util/modal/registry";
  import type { ExpandedSvelteComponent } from "../../util/modal/types";

  let Component: ExpandedSvelteComponent | null = null;
  let componentProps = {};
  let ChildrenComponent: ExpandedSvelteComponent | null = null;

  $: {
    const entry = modalRegistry.get($modal.id ?? "");
    if (entry) {
      Component = entry.component;
      componentProps = entry.props || {};
      ChildrenComponent = entry.children || null;
    } else {
      Component = null;
      ChildrenComponent = null;
    }
  }
</script>

{#key $modal.id}
  {#if Component}
    <svelte:component
      this={Component}
      {...componentProps}
      on:close={closeModal}
    >
      {#if ChildrenComponent}
        <svelte:component this={ChildrenComponent} {...componentProps} />
      {/if}
    </svelte:component>
  {/if}
{/key}
