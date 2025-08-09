<script lang="ts">
  import "../styles/components/button.scss";

  const {
    children,
    type = "primary",
    onClick = () => {},
    style = "",
    ...rest
  }: {
    children: any;
    type?: "primary" | "secondary";
    style?: string;
    onClick?: () => void;
  } = $props();
</script>

<div
  onclick={(e) => {
    e.preventDefault();
    e.stopPropagation();
    onClick();
  }}
  {style}
  class={`button-root button-${type}`}
  {...rest}
>
  {@render children?.()}
</div>
