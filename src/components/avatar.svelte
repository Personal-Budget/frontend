<script lang="ts">
  import "../styles/components/avatar.scss";
  import type { SvelteComponent } from "svelte";
  import {
    User as UserIcon,
    Image as ImageIcon,
    Camera,
    UserCircle2,
    Smile,
  } from "lucide-svelte";

  // Props
  export let src: string | null = null;
  export let alt: string = "";
  export let size: number | "xs" | "sm" | "md" | "lg" | "xl" = "md";
  export let borderStyle: "none" | "solid" | "dashed" | "dotted" = "solid";
  export let borderColor: string = "var(--color-border)";
  export let borderWidth: number = 2;
  export let background: string = "var(--color-elevation-2)";
  export let color: string = "var(--color-foreground)";

  /** Choose an icon by:
   *  - passing a lucide component:  icon={User}
   *  - or a string key:             icon="user" | "image" | "camera" | "usercircle" | "smile"
   */
  export let icon: string | typeof SvelteComponent | null = null;
  export let iconSize: number | null = null;
  export let ariaLabel: string = "Avatar";

  // Internal
  let hasError = false;

  const sizeMap = { xs: 24, sm: 32, md: 40, lg: 56, xl: 72 } as const;
  $: resolvedSize =
    typeof size === "number" ? size : (sizeMap[size] ?? sizeMap.md);

  const IconMap = {
    user: UserIcon,
    image: ImageIcon,
    camera: Camera,
    usercircle: UserCircle2,
    smile: Smile,
  } as const;

  $: IconComponent =
    icon == null
      ? UserIcon
      : typeof icon === "string"
        ? (IconMap[icon.toLowerCase() as keyof typeof IconMap] ?? UserIcon)
        : icon;

  function onError() {
    hasError = true;
  }
</script>

<div
  class="avatar-root"
  role="img"
  aria-label={ariaLabel}
  style={`
    --avatar-size:${resolvedSize}px;
    --avatar-border-style:${borderStyle};
    --avatar-border-color:${borderColor};
    --avatar-border-width:${borderWidth}px;
    --avatar-bg:${background};
    --avatar-fg:${color};
  `}
>
  {#if src && !hasError}
    <img class="avatar-image" {src} {alt} on:error={onError} />
  {:else}
    <div class="avatar-fallback">
      <svelte:component
        this={IconComponent}
        class="avatar-icon"
        size={iconSize ?? Math.round(resolvedSize * 0.55)}
      />
    </div>
  {/if}
</div>
