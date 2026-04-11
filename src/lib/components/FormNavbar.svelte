<script>
  let { id, hideHomeButton = false } = $props();
  import { tier, user_id } from "$lib/store.js";

  function getTabs() {
    return [
      { label: "Settings", icon: "M12 8a4 4 0 100 8 4 4 0 000-8z", path: `/settings/${id}` },
      { label: "Files", icon: "M4 4h10l6 6v10H4z", path: `/files/${id}` }
    ];
  }
</script>

<div class="flex items-center gap-3 px-6 py-3 bg-white border-b border-slate-200">
  <!-- Tabs -->
  <div class="flex items-center gap-2">
    {#each getTabs() as t}
      <a
        href={t.path}
        class="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d={t.icon} />
        </svg>
        {t.label}
      </a>
    {/each}
  </div>

  <div class="flex-1"></div>

  <!-- Docs -->
  <a
    href="https://docs.fabform.io"
    target="_blank"
    class="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition text-sm font-medium"
  >
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M4 4h16v16H4z" />
      <path d="M8 8h8M8 12h8M8 16h5" />
    </svg>
    Docs
  </a>

  <!-- Back -->
  {#if !hideHomeButton}
    <a
      href="/forms"
      class="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition text-sm font-medium"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M15 18l-6-6 6-6" />
      </svg>
      Back
    </a>
  {/if}
</div>
