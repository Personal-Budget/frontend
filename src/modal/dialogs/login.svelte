<script lang="ts">
  import "../../styles/modals/login.scss";
  import Button from "$components/button.svelte";
  import Input from "$components/input.svelte";
  import Avatar from "$components/avatar.svelte";

  interface LoginTriggerInterface {
    reset: boolean;
    register: boolean;
    login: boolean;
    verification_code_after_reg: boolean;
  }

  const { ModalProps } = $props();

  const default_triggers: LoginTriggerInterface = {
    reset: false,
    register: false,
    login: true,
    verification_code_after_reg: false,
  };

  const login_triggers = $state(default_triggers);

  // quick view switcher
  const setView = (view: keyof LoginTriggerInterface) => {
    login_triggers.reset = false;
    login_triggers.register = false;
    login_triggers.login = false;
    login_triggers.verification_code_after_reg = false;
    login_triggers[view] = true;
  };

  $effect(() => {
    if (ModalProps.register) {
      setView("register");
    }
  });

  // submit handlers (stub these with real logic later)
  const submitLogin = () => {
    // TODO: auth
  };

  const submitRegister = () => {
    // TODO: register -> then show verification
    setView("verification_code_after_reg");
  };

  const submitReset = () => {
    // TODO: send reset email
    setView("login");
  };

  const submitVerify = () => {
    // TODO: verify code
    setView("login");
  };
</script>

<main>
  {#if login_triggers.login}
    <!-- Login view -->
    <div class="wazzupbeijing">
      <Avatar borderColor="var(--color-primary)" size="xl" />
    </div>

    <div class="input-box">
      <Input type="email" placeholder="Email" label="Email" />
      <div>
        <Input type="password" placeholder="Password" label="Password" />
        <button
          class="forgor linklike"
          type="button"
          on:click={() => setView("reset")}
          aria-label="Forgot password"
        >
          Forgot Password?
        </button>
      </div>
    </div>

    <Button type="primary" style="text-align:center" onClick={submitLogin}>
      Submit
    </Button>

    <p class="subtitle">
      Don't have an account?
      <button
        class="subtitle-emphasis linklike"
        type="button"
        on:click={() => setView("register")}
        aria-label="Create account"
      >
        Create One!
      </button>
    </p>
  {:else if login_triggers.register}
    <!-- Register view -->
    <div class="wazzupbeijing">
      <Avatar size="xl" icon="user" borderColor="var(--color-primary)" />
    </div>

    <div class="input-box">
      <Input type="text" placeholder="Full name" label="Full name" />
      <Input type="email" placeholder="Email" label="Email" />
      <Input type="password" placeholder="Password" label="Password" />
      <Input
        type="password"
        placeholder="Confirm password"
        label="Confirm password"
      />
    </div>

    <Button type="primary" style="text-align:center" on:click={submitRegister}>
      Create account
    </Button>

    <p class="subtitle">
      Already have an account?
      <button
        class="subtitle-emphasis linklike"
        type="button"
        on:click={() => setView("login")}
      >
        Sign in
      </button>
    </p>
  {:else if login_triggers.reset}
    <!-- Password reset view -->
    <div class="wazzupbeijing">
      <Avatar
        borderColor="var(--color-primary)"
        size="xl"
        icon="camera"
        borderStyle="solid"
      />
    </div>

    <div class="input-box">
      <Input type="email" placeholder="Your email" label="Email" />
    </div>

    <Button type="primary" style="text-align:center" on:click={submitReset}>
      Send reset link
    </Button>

    <p class="subtitle">
      Remembered it?
      <button
        class="subtitle-emphasis linklike"
        type="button"
        on:click={() => setView("login")}
      >
        Back to login
      </button>
    </p>
  {:else if login_triggers.verification_code_after_reg}
    <!-- Verification code view -->
    <div class="wazzupbeijing">
      <Avatar
        borderColor="var(--color-primary)"
        size="xl"
        icon="image"
        borderStyle="dashed"
      />
    </div>

    <div class="input-box">
      <Input type="text" placeholder="6-digit code" label="Verification code" />
    </div>

    <Button type="primary" style="text-align:center" on:click={submitVerify}>
      Verify & Continue
    </Button>

    <p class="subtitle">
      Didn’t get a code?
      <button
        class="subtitle-emphasis linklike"
        type="button"
        on:click={submitRegister}
      >
        Resend
      </button>
      <span> · </span>
      <button
        class="subtitle-emphasis linklike"
        type="button"
        on:click={() => setView("login")}
      >
        Back to login
      </button>
    </p>
  {/if}
</main>
