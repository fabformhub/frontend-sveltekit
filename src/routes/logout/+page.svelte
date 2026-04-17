<script>
  // Auto‑submit the logout POST action as soon as the page loads
  $effect(() => {
    document.getElementById('auto-logout')?.submit();
  });
</script>

<p class="text-center text-slate-600 mt-10">
  Logging out…
</p>

<form id="auto-logout" method="POST"></form>

