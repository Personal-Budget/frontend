<script lang="ts">
  import { toggleModal } from "../../util/modal/modal_actions";
  import { toggleTheme } from "../../util/theming/switch";
  import "../../styles/landing/navbar/base.scss";
  import Button from "../../components/button.svelte";
  import ThemeButton from "../../components/LightDarkThemeSwitcher.svelte";
  import { goto } from "$app/navigation";

  const isLoggedIn = $state(true);

  const send_to_dashboard = () => goto("/dashboard");

  const toggle_login_modal = () => {
    toggleModal("login");
  };

  const toggle_register_modal = () => {
    toggleModal("register");
  };
</script>

<div class="navbar_root">
  <div class="navbar_wrapper">
    <div class="navbar_elem">
      <div class="logo">Budgeting-inator</div>
    </div>

    <div class="navbar_elem">
      <div class="HotLinks">
        <a href="#" class="hotlink"> Sezione 1 </a>
        <a href="#" class="hotlink"> Sezione 2 </a>
        <a href="#" class="hotlink"> Sezione 3 </a>
      </div>
    </div>

    <div class="navbar_elem">
      <ThemeButton type={"simple"} />
      {#if isLoggedIn}
        <Button type="primary" onClick={send_to_dashboard}>Dashboard</Button>
      {:else}
        <Button type="primary" onClick={toggle_login_modal}>Login</Button>
        <Button type="secondary" onClick={toggle_register_modal}
          >Register</Button
        >
      {/if}
    </div>
  </div>
</div>
