<script>
  import { goto } from '$app/navigation';
  import { showToast } from "$lib/toast.svelte.js";
  let email = "";
  let loading = false;

  async function submit() {
    if (!email.trim()) {
      showToast("Please enter your email address", "error");
      return;
    }

    loading = true;

    try {
      const res = await fetch("https://fabform.io/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      const data = await res.json();

      if (!res.ok) {
        showToast(data.message || "Something went wrong", "error");
        loading = false;
        return;
      }

      showToast("Password reset email sent!", "success");
      goto("/login");
    } catch (err) {
      showToast("Network error — please try again", "error");
    }

    loading = false;
  }
</script>

<div class="max-w-md mx-auto bg-white rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.06)] p-10 border border-white">
  <h1 class="text-3xl font-black tracking-tight mb-6 text-center">
    Reset Your Password
  </h1>

  <p class="text-slate-600 text-center mb-8 leading-relaxed">
    Enter your email address and we’ll send you a link to reset your password.
  </p>

  <div class="space-y-5">
    <div>
      <label class="block text-sm font-semibold text-slate-700 mb-2">
        Email Address
      </label>
      <input
        type="email"
        bind:value={email}
        class="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900"
        placeholder="you@example.com"
      />
    </div>

    <button
      on:click={submit}
      class="w-full px-6 py-3.5 rounded-2xl bg-black text-white font-semibold shadow-[0_6px_0_0_#000] hover:-translate-y-[1px] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={loading}
    >
      {loading ? "Sending..." : "Send Reset Link"}
    </button>

    <button
      on:click={() => goto("/login")}
      class="w-full px-6 py-3.5 rounded-2xl bg-slate-100 text-slate-800 font-semibold hover:bg-slate-200 transition-all"
    >
      Back to Login
    </button>
  </div>
</div>
