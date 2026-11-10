<script lang="ts">
  import Zone01Logo from "./icons/Zone01Logo.svelte";
  import EyeIcon from "./icons/EyeIcon.svelte";
  import EyeOffIcon from "./icons/EyeOffIcon.svelte";

  interface Props {
    onlogin: (token: string) => void;
  }

  let { onlogin }: Props = $props();

  let login = $state("");
  let password = $state("");
  let hidePassword = $state(true);

  const handleLogin = async (e?: SubmitEvent) => {
    if (e) e.preventDefault();
    const credentials = btoa(`${login}:${password}`);

    const resp = await fetch("https://learn.zone01oujda.ma/api/auth/signin", {
      method: "POST",
      headers: { Authorization: `Basic ${credentials}` },
    });

    if (!resp.ok) {
      console.error("Login failed:", resp.status, resp.statusText);
      return;
    }

    const token = await resp.json();
    localStorage.setItem("token", token);
    onlogin(token);
  };
</script>

<div class="login-box">
  <div class="logo-container">
    <Zone01Logo size={44} class="zone01-logo" />
  </div>

  <h1 class="heading">Sign in</h1>
  <p class="sub-heading">Use your Zone01 Account</p>

  <form class="signin-form" onsubmit={handleLogin}>
    <!-- Email / Login -->
    <div class="input-group" class:has-value={login.length > 0}>
      <div class="input-outline">
        <input
          id="identifier"
          bind:value={login}
          autocomplete="username"
          required
        />
      </div>
      <label for="identifier">Email or phone</label>
    </div>

    <!-- Password -->
    <div class="input-group" class:has-value={password.length > 0}>
      <div class="input-outline">
        <input
          id="password"
          bind:value={password}
          type={hidePassword ? "password" : "text"}
          autocomplete="current-password"
          required
        />
        <button
          type="button"
          class="toggle-icon"
          onclick={() => (hidePassword = !hidePassword)}
          aria-label={hidePassword ? "Show password" : "Hide password"}
        >
          {#if hidePassword}
            <EyeIcon size={20} />
          {:else}
            <EyeOffIcon size={20} />
          {/if}
        </button>
      </div>
      <label for="password">Enter your password</label>
    </div>

    <!-- Submit Button Row -->
    <div class="button-container">
      <button type="submit" class="next-btn">Next</button>
    </div>
  </form>
</div>
