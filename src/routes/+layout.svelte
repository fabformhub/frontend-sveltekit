<script>
  import './layout.css';
  import favicon from '$lib/assets/favicon.svg';
  import { Toaster } from 'svelte-sonner';
  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>



<div class="min-h-screen w-screen overflow-x-hidden overflow-y-auto bg-slate-50 text-slate-900 p-4 md:p-8">
  <Toaster position="top-right" richColors closeButton />
  {@render children()}
</div>


