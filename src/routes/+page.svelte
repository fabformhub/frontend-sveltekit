<script>
  import { goto } from '$app/navigation';
  import { isEmail } from "$lib/validation.js";
  import { postJSON } from "$lib/api.js";
  import { user_id, email, tier } from "$lib/store.js";
  import { showToast } from "$lib/toast.svelte.js";
  import Welcome from './Welcome.svelte';
  import AppDropdown from './AppDropdown.svelte';

  function goToStuff() {
    goto('/stuff');
  }

</script>

<main>
<h1> I am in the app.fabform.io </h1>
<AppDropdown/>
</main>
