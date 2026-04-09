<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  let {
    isOpenModal,
    title,
    buttonText,
    buttonClass = "bg-slate-900 text-white shadow-[0_3px_0_0_#020617] hover:-translate-y-[1px] transition-transform"
  } = $props();

  function success() {
    dispatch("success");
    closeModal();
  }

  function closeModal() {
    isOpenModal = false;
    dispatch("closeModal", { isOpenModal });
  }

  function handleKeydown(e) {
    if (!isOpenModal) return;
    if (e.key === "Escape") closeModal();
  }
</script>

<svelte:window onkeydown={handleKeydown} />

{#if isOpenModal}
  <div class="fixed inset-0 z-50 flex items-center justify-center">

    <!-- BACKDROP -->
    <div
      class="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-100 transition-opacity"
      onclick={closeModal}
    ></div>

    <!-- MODAL PANEL -->
    <div
      class="relative bg-white rounded-3xl border border-slate-200 shadow-xl w-full max-w-md mx-4 p-8 text-center
             animate-[fadeIn_0.15s_ease-out,scaleIn_0.15s_ease-out]"
    >
      <!-- TITLE -->
      <h2 class="text-2xl font-black tracking-tight text-slate-900 mb-3">
        {title}
      </h2>

      <!-- BODY -->
      <div class="text-slate-600 text-base leading-relaxed mb-6">
        <slot></slot>
      </div>

      <!-- ACTIONS -->
      <div class="flex justify-center gap-3">
        <button
          class={`px-6 py-3 rounded-xl font-semibold ${buttonClass}`}
          onclick={success}
        >
          {buttonText}
        </button>

        <button
          class="px-6 py-3 rounded-xl font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
          onclick={closeModal}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  @keyframes fadeIn {
    from { opacity: 0 }
    to { opacity: 1 }
  }

  @keyframes scaleIn {
    from { transform: scale(0.97); opacity: 0 }
    to { transform: scale(1); opacity: 1 }
  }
</style>
