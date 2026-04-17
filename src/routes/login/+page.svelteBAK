<script>
  import { isEmail } from "$lib/validation.js";
  import { postJSON } from "$lib/api.js";
  import { user_id, email, tier } from "$lib/store.js";
  import { showToast } from "$lib/toast.svelte.js";
  import { goto } from "$app/navigation";

  let fields = $state({ email: "", password: "" });
  let fieldErrors = $state({ email: "", password: "" });
  let globalError = $state("");
  let isSubmitting = $state(false);

  let emailInput;
  let passwordInput;

  function validate() {
    fieldErrors.email = "";
    fieldErrors.password = "";
    globalError = "";

    const emailVal = fields.email.trim().toLowerCase();
    const passVal = fields.password.trim();

    if (!emailVal) {
      fieldErrors.email = "Email is required";
      emailInput.focus();
      return false;
    }

    if (!isEmail(emailVal)) {
      fieldErrors.email = "Please enter a valid email";
      emailInput.focus();
      return false;
    }

    if (!passVal) {
      fieldErrors.password = "Password is required";
      passwordInput.focus();
      return false;
    }

    fields.email = emailVal;
    return true;
  }

  async function resendEmailConfirmation() {
    try {
      await postJSON("resend-email-verification/", { email: fields.email });
      showToast({
        type: "info",
        message: `Please confirm your email address with the link sent to ${fields.email}.`
      });
    } catch {
      showToast({ type: "error", message: "Failed to resend verification email" });
    }
  }

  async function handleLogin() {
    if (!validate()) return;

    isSubmitting = true;

    try {
      const data = await postJSON("login", fields);

      if (data.status === "loggedIn") {
        user_id.set(String(data.user_id));
        email.set(String(data.email));
        tier.set(String(data.tier));

        showToast({ type: "success", message: "Welcome back!" });
        goto("/forms");
        return;
      }

      if (data.status === "notVerified") {
        globalError = `Please verify your email address with the link sent to ${fields.email}.`;
        return;
      }

      globalError = "Invalid username or password";

    } catch {
      globalError = "Login failed — please try again";
    } finally {
      isSubmitting = false;
    }
  }
</script>

<section class="min-h-screen flex items-center justify-center bg-slate-50 px-4">
  <div class="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">

    <h1 class="text-3xl font-bold text-center mb-2 tracking-tight">
      Welcome Back
    </h1>
    <p class="text-center text-slate-600 mb-6">
      Log in to continue to your dashboard
    </p>

    <!-- SOCIAL LOGIN -->
    <div class="space-y-3 mb-6">
      <a
        href="https://fabform.io/f/auth/google"
        class="w-full flex items-center justify-center gap-3 bg-white border border-slate-300 rounded-xl py-3 font-medium hover:bg-slate-100 transition"
      >
        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" width="18" alt="Google logo" />
        Continue with Google
      </a>

      <a
        href="https://fabform.io/f/auth/github"
        class="w-full flex items-center justify-center gap-3 bg-white border border-slate-300 rounded-xl py-3 font-medium hover:bg-slate-100 transition"
      >
        <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" width="20" alt="GitHub logo" />
        Continue with GitHub
      </a>
    </div>

    <div class="flex items-center my-6">
      <div class="flex-grow h-px bg-slate-300"></div>
      <span class="px-3 text-slate-500 text-sm">or</span>
      <div class="flex-grow h-px bg-slate-300"></div>
    </div>

    <!-- LOGIN FORM -->
    <form onsubmit={e => { e.preventDefault(); handleLogin(); }} class="space-y-6">

      <!-- Email -->
      <div>
        <label for="email" class="block text-sm font-medium text-slate-700 mb-1">Email</label>
        <input
          id="email"
          type="email"
          bind:this={emailInput}
          bind:value={fields.email}
          placeholder="you@example.com"
          class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-black focus:border-black transition"
        />
        {#if fieldErrors.email}
          <p class="text-red-600 text-sm mt-1">{fieldErrors.email}</p>
        {/if}
      </div>

      <!-- Password -->
      <div>
        <label for="password" class="block text-sm font-medium text-slate-700 mb-1">Password</label>
        <input
          id="password"
          type="password"
          bind:this={passwordInput}
          bind:value={fields.password}
          placeholder="••••••••"
          class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-black focus:border-black transition"
        />
        {#if fieldErrors.password}
          <p class="text-red-600 text-sm mt-1">{fieldErrors.password}</p>
        {/if}
      </div>

      <!-- Forgot password -->
      <div class="text-right">
        <a
          href="/forgot-password"
          onclick={e => { e.preventDefault(); goto('/forgot-password'); }}
          class="text-slate-600 hover:text-black text-sm font-medium"
        >
          Forgot password
        </a>
      </div>

      <!-- Login button -->
      <button
        type="submit"
        class="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-900 transition disabled:opacity-50"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Logging in…" : "Log In"}
      </button>

      <!-- Resend verification -->
      {#if globalError.includes("verify your email")}
        <button
          type="button"
          onclick={resendEmailConfirmation}
          class="w-full bg-slate-200 text-slate-800 py-3 rounded-xl font-semibold hover:bg-slate-300 transition"
        >
          Resend Verification Email
        </button>
      {/if}

      <!-- Global error -->
      {#if globalError}
        <div class="bg-red-100 text-red-700 px-4 py-3 rounded-xl text-sm">
          {globalError}
        </div>
      {/if}

    </form>

    <!-- Signup link -->
    <p class="text-center text-sm mt-6">
      Don’t have an account?
      <a
        href="/signup"
        onclick={e => { e.preventDefault(); goto('/signup'); }}
        class="text-slate-700 font-semibold hover:text-black"
      >
        Sign up
      </a>
    </p>

  </div>
</section>

