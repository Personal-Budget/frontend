<!-- src/routes/+layout.svelte -->
<script lang="ts">
  import { onMount } from "svelte";
  import { registerAllModals } from "../util/modal/register/register";
  import ModalHandler from "../modal/handler/modal_handler.svelte";
  import Nav from "./navbar/nav.svelte"; // Adjust path if necessary
  import "../styles/_variables.scss";
  onMount(() => {
    registerAllModals();
  });
</script>

<ModalHandler />

<slot />
