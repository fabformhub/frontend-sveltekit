<script>
  import './layout.css';
  import favicon from '$lib/assets/favicon.svg';
  import { Toaster } from 'svelte-sonner';

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<main class="flex-1 py-12 px-6">
  <div class="max-w-6xl mx-auto">

    <!-- NEW: svelte-sonner toast system -->
    <Toaster position="top-right" richColors closeButton />

    {@render children()}
  </div>
</main>

