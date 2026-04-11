<script>
  const { data } = $props();
  const { files } = data;
  import FormNavbar from '$lib/components/FormNavbar.svelte';
  import { page } from '$app/stores';
  let { id } = $page.params;
</script>

<main>
  <div class="container m-5">
    <div class="row">
      <h1 class="title has-text-centered">File Uploads Form ID: {id}</h1>

      <FormNavbar id={id} />

      {#if files.length === 0}
        <p class="subtitle my-5 has-text-centered">
          There are no file uploads for Form id: {id}
        </p>
      {:else}
        <div>
          <h1 class="title is-3">List of Files</h1>
          <table class="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Download</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {#each files as file (file.name)}
                <tr>
                  <td>{file.name}</td>
                  <td>
                    <a target="_blank" href="https://fabform.io/d/{file.name}">
                      {file.name}
                    </a>
                  </td>
                  <td>{file.created_at}</td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      {/if}
    </div>
  </div>
</main>

