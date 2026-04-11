<script>
  import { user_id } from "$lib/store.js";
</script>

{#if $user_id}
  <nav
    class="flex items-center gap-6 px-4 h-12 bg-white/80 backdrop-blur-xl border-b border-slate-200/70 shadow-sm"
  >
    <!-- Logo -->
    <a href="/" class="flex items-center gap-2 group">
      <svg
        class="w-6 h-6 text-slate-700 transition-colors group-hover:text-slate-900"
        viewBox="0 0 24 24"
        fill="none"
      >
        <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.6" />
      </svg>

      <span
        class="font-semibold text-slate-800 transition-colors group-hover:text-slate-900"
      >
        Fabform
      </span>
    </a>

    <!-- Navigation -->
    <div class="flex items-center gap-4 ml-auto">
      <!-- Forms -->
      <a
        href="/forms"
        class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 active:scale-[0.97] transition-all"
      >
        <svg
          class="w-5 h-5 text-slate-600 transition-colors group-hover:text-slate-900"
          viewBox="0 0 24 24"
          fill="none"
        >
          <rect x="4" y="4" width="16" height="16" rx="2.5" stroke="currentColor" stroke-width="1.6" />
          <path d="M8 9H16" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
          <path d="M8 13H13" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
        </svg>
        <span class="text-slate-700 font-medium">Forms</span>
      </a>

      <!-- Docs -->
      <a
        href="https://docs.fabform.io"
        target="_blank"
        class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 active:scale-[0.97] transition-all"
      >
        <svg
          class="w-5 h-5 text-slate-600 transition-colors"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path d="M7 4H15L19 8V20H7V4Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" />
          <path d="M15 4V8H19" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" />
        </svg>
        <span class="text-slate-700 font-medium">Docs</span>
      </a>

      <!-- Account -->
      <a
        href="/account"
        class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 active:scale-[0.97] transition-all"
      >
        <svg
          class="w-5 h-5 text-slate-600 transition-colors"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path d="M12 12C14.2 12 16 10.2 16 8C16 5.8 14.2 4 12 4C9.8 4 8 5.8 8 8C8 10.2 9.8 12 12 12Z" stroke="currentColor" stroke-width="1.6" />
          <path d="M5 20C6 17.6 8.4 16 12 16C15.6 16 18 17.6 19 20" stroke="currentColor" stroke-width="1.6" />
        </svg>
        <span class="text-slate-700 font-medium">Account</span>
      </a>

      <!-- Divider -->
      <div class="w-px h-6 bg-slate-300/60 mx-1"></div>

      <!-- Logout -->
      <a
        href="/logout"
        class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-50 active:scale-[0.97] transition-all"
      >
        <svg
          class="w-5 h-5 text-red-600 transition-colors"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path d="M10 5H6C5.4 5 5 5.4 5 6V18C5 18.6 5.4 19 6 19H10" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
          <path d="M14 8L19 12L14 16" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M19 12H10" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
        </svg>
        <span class="text-red-600 font-semibold">Logout</span>
      </a>
    </div>
  </nav>
{/if}

