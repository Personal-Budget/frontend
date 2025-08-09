<script lang="ts">
  import type { HTMLInputTypeAttribute } from "svelte/elements";
  import "../styles/components/input.scss";

  const {
    onClick = () => {},
    label = "",
    placeholder = "",
    type = "text",
    ...rest
  }: {
    label?: string;
    onClick?: () => void;
    type?: HTMLInputTypeAttribute;
    placeholder?: string;
  } = $props();
</script>

<div class="input-wrapper">
  <p class="input-label">{label}</p>
  <input {type} class={`input-elem`} {placeholder} />
</div>
