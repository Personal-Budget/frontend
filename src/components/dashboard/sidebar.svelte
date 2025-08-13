<script lang="ts">
  import { LogOut, User } from "lucide-svelte";
  import "../../styles/dashboard/sidebar.scss";
  import { type SideBarProps, type SideBarElement } from "../../types/dashbord";
  import ThemeButton from "../../components/LightDarkThemeSwitcher.svelte";
  import Avatar from "../../components/avatar.svelte";
  const { onPageChanged, pages, activeElementId }: SideBarProps = $props();
</script>

<div class="SideBarElemRoot">
  <div
    tabindex="0"
    role="button"
    class="logo_dashboard"
    onkeypress={() => {}}
    onclick={() => {
      onPageChanged("logo");
    }}
  >
    Logo
  </div>
  <div class="SideBarMainPages">
    <div class="SideBarPageWrapper">
      {#each pages as page}
        <div
          tabindex="0"
          role="button"
          onkeypress={() => {}}
          onclick={(e) => {
            onPageChanged(page.id);
          }}
          class={`sidebarCompInner ${activeElementId === page.id ? "sideBarSelected" : ""}`}
        >
          <svelte:component this={page.icon} />
          <p>{page.label}</p>
        </div>
      {/each}
    </div>

    <div class="SideBarMainBottomButton">
      <ThemeButton type="extended" />
    </div>
  </div>
  <div class="sideBarBottom">
    <div class="sideBarAction">
      <Avatar alt="Budget Profile" size="sm" />
      Davide The. White
    </div>

    <div class="sideBarAction sidebarActionLogout">
      <LogOut />
      Logout
    </div>
  </div>
</div>
