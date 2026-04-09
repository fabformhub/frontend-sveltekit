<script>
  import { onMount } from "svelte"
  import { goto } from '$app/navigation';
  import { email, user_id, tier } from "$lib/store.js"
  let loading = true
  let data = null

  onMount(async () => {
    try {
      const res = await fetch("https://fabform.io/f/me", {
        credentials: "include"
      })

      data = await res.json()

      if (data && data.email) {
        email.set(data.email)
        user_id.set(data.id)
        tier.set(data.tier)

        // Smooth redirect
        setTimeout(() => {
          goto("/forms")
        }, 600)
      } else {
        router.goto("/login")
        return
      }

    } catch (err) {
      goto("/login")
      return
    }

    loading = false
  })
</script>

<section class="section">
  <div class="container has-text-centered" style="max-width: 420px;">

    <!-- Clean loading state -->
    <div class="box py-6 px-5">

      <span class="icon is-large has-text-primary mb-3">
        <i class="fas fa-spinner fa-pulse fa-3x"></i>
      </span>

      <h1 class="title is-4 mt-3">Signing you in…</h1>
      <p class="subtitle is-6 mb-5">Preparing your dashboard</p>

      <progress class="progress is-small is-primary" max="100">Loading</progress>

    </div>

  </div>
</section>
