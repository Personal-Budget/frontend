<script lang="ts">
  import "../../styles/dashboard/Dashboard.scss";
  import Sidebar from "../../components/dashboard/sidebar.svelte";
  import Chart from "../../components/dashboard/Chart.svelte";
  import { SideBarPages } from "$components/dashboard/sidebar/sidebarIndex";
  import { goto } from "$app/navigation";
  import type { Component } from "svelte";
  import { localStorageState } from "../..//util/states/localStorageState";
  import type { Writable } from "svelte/store";

  const LastActivePage = localStorageState(
    "dashboard_lastPage",
    "dashboard_Home",
  ) as Writable<string>;

  let ActiveElementComponent = $state<Component | null>(null);

  const loaders = import.meta.glob(
    "../../components/dashboard/sidebar/*.svelte",
  );

  const SidebarPageCallBack = async (pageId: string) => {
    if (pageId === "logo") {
      goto("../");
      return;
    }

    const page = SideBarPages.find((p) => p.id === pageId);
    if (!page) return;

    const key = `../../components/dashboard/sidebar/${page.relativePath}`;
    const load = loaders[key];
    if (!load) {
      console.warn("No loader for", key);
      return;
    }

    const mod: any = await load();
    ActiveElementComponent = mod.default;
    LastActivePage.set(pageId);
  };

  SidebarPageCallBack($LastActivePage);
</script>

<div class="main-wrapper">
  <div class="sidebarWrapper">
    <Sidebar
      onPageChanged={SidebarPageCallBack}
      pages={SideBarPages}
      activeElementId={$LastActivePage}
    />
  </div>

  <div class="mainContentWrapper">
    {#if ActiveElementComponent}
      <ActiveElementComponent></ActiveElementComponent>
    {/if}
  </div>
</div>
