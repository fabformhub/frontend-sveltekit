<script>
  const { data } = $props();
  const user = data.user;
</script>

<h1>{user.id}</h1>
<h1>{user.email}</h1>
<h1>{user.tier}</h1>

