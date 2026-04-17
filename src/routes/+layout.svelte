<script>
  import './layout.css';
  import favicon from '$lib/assets/favicon.svg';
  import { Toaster } from 'svelte-sonner';
  const { children } = $props();
  import AppDropdown from './AppDropdown.svelte';
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<div class="relative min-h-screen w-screen overflow-x-hidden overflow-y-auto bg-slate-50 text-slate-900 p-4 md:p-8">

  <!-- Top-right dropdown -->
  <div class="absolute top-4 right-4 z-50">
    <AppDropdown />
  </div>

  <Toaster position="top-right" richColors closeButton />

  {@render children()}
</div>

