<script>
  import { toasts } from "$lib/toast.svelte.js";
</script>

<div class="fixed top-4 left-1/2 -translate-x-1/2 z-50 space-y-3 w-full max-w-sm">
  {#each toasts as t (t.id)}
    <div
      class="
        px-4 py-3 rounded-xl shadow-lg text-white animate-fadeIn
        {t.type === 'success' ? 'bg-green-600' : ''}
        {t.type === 'error' ? 'bg-red-600' : ''}
        {t.type === 'info' ? 'bg-blue-600' : ''}
        {t.type === 'warning' ? 'bg-yellow-600' : ''}
      "
    >
      {t.message}
    </div>
  {/each}
</div>

<style>
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-6px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fadeIn {
    animation: fadeIn 0.18s ease-out;
  }
</style>
