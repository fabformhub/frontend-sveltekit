<script>
  const { id, hideHomeButton = false } = $props();
</script>

<nav
  class="flex items-center gap-3 px-4 py-3 bg-white/70 backdrop-blur-xl border border-slate-200/70 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
>

  <!-- SETTINGS -->
  <a
    href={"/settings/" + id}
    class="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-indigo-600 transition-all"
  >
    <i class="fa-solid fa-gear text-[13px]"></i>
    <span>Settings</span>
  </a>

  <!-- FILES -->
  <a
    href={"/files/" + id}
    class="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-indigo-600 transition-all"
  >
    <i class="fa-solid fa-file text-[13px]"></i>
    <span>Files</span>
  </a>

  <!-- DOCS -->
  <a
    href="https://docs.fabform.io"
    target="_blank"
    class="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-indigo-600 transition-all"
  >
    <i class="fas fa-book text-[13px]"></i>
    <span>Docs</span>
  </a>

  <!-- BACK -->
  {#if !hideHomeButton}
    <a
      href="/"
      class="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-indigo-600 transition-all"
    >
      <i class="fa-solid fa-arrow-left text-[13px]"></i>
      <span>Back</span>
    </a>
  {/if}

</nav>
