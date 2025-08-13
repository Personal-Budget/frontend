<script lang="ts">
  import { localStorageState } from "../util/states/localStorageState";
  import "../styles/components/themeSwitcer.scss";
  import { Sun, Moon } from "lucide-svelte";
  import { type Writable } from "svelte/store";
  import { toggleTheme } from "../util/theming/switch";

  const themeState = localStorageState("theme", "light") as Writable<
    "dark" | "light"
  >;

  const { type = "simple" }: { type: "extended" | "simple" } = $props();

  const IconMatch = {
    dark: Sun,
    light: Moon,
  };

  // keep DOM class in sync on first load
  $effect(() => {
    if (typeof document !== "undefined") {
      document?.documentElement?.classList.toggle(
        "dark-theme",
        $themeState === "dark",
      );
    }
  });
</script>

<div
  class={`${type === "extended" ? "switcher-extended" : "switcher"}`}
  aria-label="switch-theme"
  tabindex="0"
  role="button"
  onkeypress={() => {}}
  onclick={(e) => {
    e.preventDefault();
    e.stopPropagation();
    if ($themeState == "dark") {
      themeState.set("light");
      toggleTheme();
    } else {
      themeState.set("dark");
      toggleTheme();
    }
  }}
>
  {#key $themeState}
    {#if $themeState === "dark"}
      <Sun class="switcher-component" aria-label="Switch to light" />
    {:else}
      <Moon class="switcher-component" aria-label="Switch to dark" />
    {/if}
  {/key}
</div>
