<script>
  import { goto } from '$app/navigation';
  import { showToast } from "$lib/toast.svelte.js";
  import { user_id, email, tier } from "$lib/store.js";

  user_id.set(null);
  email.set(null);
  tier.set(null);

  showToast("You have successfully logged out", "success");

  goto("/");
</script>

<div class="p-6 text-center text-slate-600 text-sm">
  Logging out…
</div>
