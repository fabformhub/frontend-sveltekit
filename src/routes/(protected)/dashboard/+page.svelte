<script>
  const { data } = $props();
  const user = data.user;
</script>

<section class="max-w-2xl mx-auto mt-12 space-y-8">

  <!-- Header -->
  <header class="flex items-center justify-between">
    <h1 class="text-3xl font-bold text-slate-800">
      Dashboard
    </h1>

    <!-- Logout form -->
    <form method="POST" action="/logout">
      <button
        type="submit"
        class="px-4 py-2 rounded-md bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition"
      >
        Logout
      </button>
    </form>
  </header>

  <!-- User Card -->
  <div class="bg-white shadow-sm border border-slate-200 rounded-lg p-6 space-y-4">
    <h2 class="text-xl font-semibold text-slate-700">Account Details</h2>

    <div class="space-y-2 text-slate-600">
      <p><span class="font-medium text-slate-700">ID:</span> {user.id}</p>
      <p><span class="font-medium text-slate-700">Email:</span> {user.email}</p>
      <p><span class="font-medium text-slate-700">Tier:</span> {user.tier}</p>
    </div>
  </div>

</section>

