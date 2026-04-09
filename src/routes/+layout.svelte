<script>
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import ToastContainer from '$lib/components/ToastContainer.svelte';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
  <main class="flex-1 py-12 px-6">
    <div class="max-w-6xl mx-auto">
    <ToastContainer/>
    {@render children()}
    </div>
  </main>
