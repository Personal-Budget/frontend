<script>
  import { toggleModal } from "../../util/modal/modal_actions";
  import { toggleTheme } from "../../util/theming/switch";

  const toggle_login_modal = () => {
    toggleModal("login");
  };
</script>

<div>
  <button on:click|preventDefault={toggleTheme}> Dark / Light </button>
  <button on:click|preventDefault={toggle_login_modal}> Login </button>
  <button on:click|preventDefault={toggleTheme}> Signup </button>
</div>
