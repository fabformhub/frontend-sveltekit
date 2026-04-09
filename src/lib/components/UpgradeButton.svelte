<script>
  const url = "https://fabform.io/pricing";
</script>

<div class="relative inline-block">
  <!-- BUTTON -->
  <button
    class="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
  >
    <!-- Gold infinity icon (subtle, bright) -->
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="url(#gold)"
      class="opacity-90"
    >
      <defs>
        <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#f8e38a" />
          <stop offset="50%" stop-color="#d9a93f" />
          <stop offset="100%" stop-color="#b57a1a" />
        </linearGradient>
      </defs>
      <path d="M7 9a4 4 0 100 6c2 0 3.5-1.5 5-3s3-3 5-3a4 4 0 110 6c-2 0-3.5-1.5-5-3s-3-3-5-3z" />
    </svg>

    <span>Upgrade — Lifetime Access</span>
  </button>

  <!-- POPOVER -->
  <div
    class="absolute top-[110%] right-0 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl p-5 z-20 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-150"
  >
    <h3 class="text-sm font-bold text-red-700 mb-1">
      Your Trial Is Being Discontinued
    </h3>

    <p class="text-xs text-slate-600 mb-4 leading-relaxed">
      Upgrade now to keep your forms active and secure your Lifetime price forever.
    </p>

    <!-- FEATURE LIST -->
    <ul class="space-y-2 text-sm text-slate-700">
      <li class="flex items-center gap-2">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#3b82f6">
          <path d="M4 4h16v2H4zm0 7h16v2H4zm0 7h16v2H4z" />
        </svg>
        Unlimited form submissions
      </li>

      <li class="flex items-center gap-2">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#3b82f6">
          <path d="M12 2l4 4h-3v6h-2V6H8zM6 20h12v2H6z" />
        </svg>
        Unlimited file uploads
      </li>

      <li class="flex items-center gap-2">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#3b82f6">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v3m0 14v3m10-10h-3M5 12H2m15.5-7.5l-2.1 2.1M8.6 17.4l-2.1 2.1m0-14.2l2.1 2.1m8.9 8.9l2.1 2.1" />
        </svg>
        Custom branding & white‑label forms
      </li>

      <li class="flex items-center gap-2">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#3b82f6">
          <path d="M4 4h16v10H5.17L4 15.17zM7 18h10v2H7z" />
        </svg>
        Auto‑responses with templates
      </li>

      <li class="flex items-center gap-2">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#3b82f6">
          <path d="M4 4h16v16H4zm8 7l8-5H4z" />
        </svg>
        Email notifications
      </li>

      <li class="flex items-center gap-2">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#3b82f6">
          <path d="M9 12l-1 5 4-3 4 3 3-14z" />
        </svg>
        Telegram instant alerts
      </li>

      <li class="flex items-center gap-2">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#3b82f6">
          <circle cx="12" cy="12" r="3" />
          <path d="M4 4h16v4H4zm0 12h16v4H4z" />
        </svg>
        Webhooks (JSON to any endpoint)
      </li>

      <li class="flex items-center gap-2">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#3b82f6">
          <path d="M10 6h8v8h-2V9.41l-9.29 9.3-1.42-1.42L14.59 8H10z" />
        </svg>
        Redirects to Thank‑You pages
      </li>

      <li class="flex items-center gap-2">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#3b82f6">
          <path d="M4 4h16v16H4zM7 7h10v2H7zm0 4h10v2H7zm0 4h6v2H7z" />
        </svg>
        CSV data export
      </li>

      <li class="flex items-center gap-2">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#3b82f6">
          <path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6z" />
        </svg>
        Spam protection
      </li>

      <li class="flex items-center gap-2">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#3b82f6">
          <circle cx="12" cy="12" r="3" />
          <path d="M4 4h16v4H4zm0 12h16v4H4z" />
        </svg>
        Optional CAPTCHA
      </li>
    </ul>

    <!-- CTA -->
    <div class="mt-5 space-y-2">
      <a
        href={url}
        target="_blank"
        class="block w-full text-center px-4 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold shadow-[0_4px_0_0_#020617] hover:-translate-y-[1px] transition-transform"
      >
        Secure Lifetime Access
      </a>

      <p class="text-xs text-red-600 font-semibold text-center">
        Price increasing soon — lock in your rate forever
      </p>

      <p class="text-[11px] text-red-700 text-center">
        Fewer than 20 Lifetime spots remaining
      </p>

      <p class="text-[11px] text-slate-700 text-center">
        All future features included at no extra cost
      </p>
    </div>
  </div>
</div>

<style>
  /* Tailwind handles everything — this is only for hover activation */
  .group:hover .group-hover\:opacity-100 {
    opacity: 1;
  }
</style>
