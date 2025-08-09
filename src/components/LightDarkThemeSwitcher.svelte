<script lang="ts">
  import { localStorageState } from "../util/states/localStorageState";
  import "../styles/components/themeSwitcer.scss";
  import { Sun, Moon } from "lucide-svelte";
  import { type Writable } from "svelte/store";
  import { toggleTheme } from "../util/theming/switch";
  import { onMount } from "svelte";

  const themeState = localStorageState("theme", "light") as Writable<
    "dark" | "light"
  >;

  const IconMatch = {
    dark: Sun,
    light: Moon,
  };

  // keep DOM class in sync on first load
  $: {
    if (typeof document !== "undefined") {
      document?.documentElement?.classList.toggle(
        "dark-theme",
        $themeState === "dark",
      );
    }
  }
</script>

<div class="switcher">
  {#key $themeState}
    {#if $themeState === "dark"}
      <Sun
        onclick={(e: any) => {
          e.preventDefault();
          e.stopPropagation();
          themeState.set("light");
          toggleTheme();
        }}
        class="switcher-component"
        aria-label="Switch to light"
      />
    {:else}
      <Moon
        onclick={(e: any) => {
          e.preventDefault();
          e.stopPropagation();
          themeState.set("dark");
          toggleTheme();
        }}
        class="switcher-component"
        aria-label="Switch to dark"
      />
    {/if}
  {/key}
</div>
