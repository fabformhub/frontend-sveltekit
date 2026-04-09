<script>
  import { isEmail } from "$lib/validation.js";
  import { postJSON } from "$lib/api.js";
  import { user_id, email, tier } from "$lib/store.js";
  import { showToast } from "$lib/toast.svelte.js";
  import { goto } from '$app/navigation';
  let fields = { email: "", password: "" };
  let errors = { email: "", password: "", message: "", code: 0 };
  let valid = false;

  function resendEmailConfirmation() {
    postJSON("resend-email-verification/", { email: fields.email }, () => {
      showToast({
        type: "info",
        message: `Please confirm your email address with the link sent to ${fields.email}.`
      });
    });
  }

  function validate() {
    valid = true;

    if (!fields.email.trim()) {
      errors.email = "Email is required";
      valid = false;
    } else if (!isEmail(fields.email.trim())) {
      errors.email = "Please enter a valid email";
      valid = false;
    } else {
      errors.email = "";
    }

    if (!fields.password.trim()) {
      errors.password = "Password is required";
      valid = false;
    } else {
      errors.password = "";
    }

    return valid;
  }

  function submitHandler() {
    if (!validate()) return;

	  postJSON("login", fields, (data) => {

if (data.status === "loggedIn") {
  user_id.set(data.user_id.toString());
  email.set(data.email.toString());
  tier.set(data.tier.toString());

  showToast("Welcome back!", "success");

  goto("/forms");
}
      else if (data.status === "notVerified") {
        errors.message = `Please verify your email address with the link sent to ${fields.email}.`;
        errors.code = 1;
      }
      else {
        errors.message = "Invalid username or password";
        errors.code = 2;
      }
    });
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
        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" width="18" />
        Continue with Google
      </a>

      <a
        href="https://fabform.io/f/auth/github"
        class="w-full flex items-center justify-center gap-3 bg-white border border-slate-300 rounded-xl py-3 font-medium hover:bg-slate-100 transition"
      >
        <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" width="20" />
        Continue with GitHub
      </a>
    </div>

    <div class="flex items-center my-6">
      <div class="flex-grow h-px bg-slate-300"></div>
      <span class="px-3 text-slate-500 text-sm">or</span>
      <div class="flex-grow h-px bg-slate-300"></div>
    </div>

    <!-- LOGIN FORM -->
    <form on:submit|preventDefault={submitHandler} class="space-y-6">

      <!-- Email -->
      <div>
        <label class="block text-sm font-medium text-slate-700 mb-1">Email</label>
        <input
          type="email"
          bind:value={fields.email}
          placeholder="you@example.com"
          class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-black focus:border-black transition"
        />
        {#if errors.email}
          <p class="text-red-600 text-sm mt-1">{errors.email}</p>
        {/if}
      </div>

      <!-- Password -->
      <div>
        <label class="block text-sm font-medium text-slate-700 mb-1">Password</label>
        <input
          type="password"
          bind:value={fields.password}
          placeholder="••••••••"
          class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-black focus:border-black transition"
        />
        {#if errors.password}
          <p class="text-red-600 text-sm mt-1">{errors.password}</p>
        {/if}
      </div>

      <!-- Forgot password -->
      <div class="text-right">
        <a
          href="/forgot-password"
          on:click={(e) => { e.preventDefault(); goto('/forgot-password'); }}
          class="text-slate-600 hover:text-black text-sm font-medium"
        >
          Forgot password
        </a>
      </div>

      <!-- Login button -->
      <button
        type="submit"
        class="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-900 transition"
      >
        Log In
      </button>

      <!-- Resend verification -->
      {#if errors.code === 1}
        <button
          type="button"
          on:click={resendEmailConfirmation}
          class="w-full bg-slate-200 text-slate-800 py-3 rounded-xl font-semibold hover:bg-slate-300 transition"
        >
          Resend Verification Email
        </button>
      {/if}

      <!-- Error message -->
      {#if errors.message}
        <div class="bg-red-100 text-red-700 px-4 py-3 rounded-xl text-sm">
          {errors.message}
        </div>
      {/if}

    </form>

    <!-- Signup link -->
    <p class="text-center text-sm mt-6">
      Don’t have an account?
      <a
        href="/signup"
        on:click={(e) => { e.preventDefault(); goto('/signup'); }}
        class="text-slate-700 font-semibold hover:text-black"
      >
        Sign up
      </a>
    </p>

  </div>
</section>
