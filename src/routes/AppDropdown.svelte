<script>
  import { clickOutside } from "$lib/clickOutside.js";

  let open = $state(false);

  const toggle = () => (open = !open);
  const close = () => (open = false);

  const onKeydown = (e) => {
    if (e.key === "Escape") close();
  };
</script>

<div
  class="relative inline-block"
  role="presentation"
  use:clickOutside
  onclick_outside={close}
  onkeydown={onKeydown}
>
  <!-- Trigger -->
  <button
    type="button"
    aria-haspopup="true"
    aria-expanded={open}
    onclick={(e) => { e.stopPropagation(); toggle(); }}
    class="flex items-center gap-2 px-3.5 py-2.5 bg-white border border-slate-300 
           rounded-xl shadow-sm hover:bg-slate-50 active:bg-slate-100 
           transition-all select-none text-sm font-medium text-slate-800"
  >
    Menu

    <svg
      class="w-4 h-4 text-slate-500 transition-transform duration-200"
      style:transform={open ? "rotate(180deg)" : "rotate(0deg)"}
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M5 7L10 12L15 7"
        stroke="currentColor"
        stroke-width="1.6"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </button>

  {#if open}
    <div
      class="absolute right-0 mt-2 w-60 bg-white rounded-xl shadow-xl border 
             border-slate-200 overflow-hidden z-50 origin-top-right 
             animate-dropdown backdrop-blur-sm"
      role="menu"
    >
      <!-- Account -->
      <a
        href="/account"
        class="flex items-center gap-3 px-4 py-3 hover:bg-slate-100 
               text-slate-700 transition-colors text-sm"
      >
        <svg class="w-5 h-5 text-slate-600" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="8" r="4" />
          <path d="M6 20c1-3 4-5 6-5s5 2 6 5" />
        </svg>
        Account
      </a>

      <!-- Forms -->
      <a
        href="/forms"
        class="flex items-center gap-3 px-4 py-3 hover:bg-slate-100 
               text-slate-700 transition-colors text-sm"
      >
        <svg class="w-5 h-5 text-slate-600" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M8 9h8M8 13h5" />
        </svg>
        Forms
      </a>

      <!-- Docs -->
      <a
        href="https://docs.fabform.io"
        target="_blank"
        class="flex items-center gap-3 px-4 py-3 hover:bg-slate-100 
               text-slate-700 transition-colors text-sm"
      >
        <svg class="w-5 h-5 text-slate-600" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
          <path d="M7 3h8l5 5v13H7z" />
          <path d="M15 3v5h5" />
        </svg>
        Documentation
      </a>

      <!-- Contact -->
      <a
        href="https://fabform.io/contact/"
        target="_blank"
        class="flex items-center gap-3 px-4 py-3 hover:bg-slate-100 
               text-slate-700 transition-colors text-sm"
      >
        <svg class="w-5 h-5 text-slate-600" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
          <path d="M4 4h16v10H8l-4 4z" />
        </svg>
        Contact Us
      </a>

      <div class="border-t border-slate-200"></div>

      <!-- Logout -->
      <a
        href="/logout"
        class="flex items-center gap-3 px-4 py-3 hover:bg-slate-100 
               text-slate-600 hover:text-slate-800 transition-colors text-sm"
      >
        <svg class="w-5 h-5 text-slate-600" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
          <path d="M15 12H3" />
          <path d="M10 7l5 5-5 5" />
          <path d="M21 5v14a2 2 0 0 1-2 2h-6" />
        </svg>
        Logout
      </a>
    </div>
  {/if}
</div>

<style>
  @keyframes dropdown {
    0% { opacity: 0; transform: translateY(-6px) scale(0.97); }
    100% { opacity: 1; transform: translateY(0) scale(1); }
  }
  .animate-dropdown {
    animation: dropdown 0.14s cubic-bezier(0.16, 1, 0.3, 1);
  }
</style>

