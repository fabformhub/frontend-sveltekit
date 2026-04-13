<script>
  const { data } = $props();
  const { files } = data;

  import FormNavbar from '$lib/components/FormNavbar.svelte';
  import { page } from '$app/stores';

  let { id } = $page.params;
</script>

<main class="px-8 py-10">
  <div class="max-w-5xl mx-auto space-y-10">

    <!-- Page Title -->
    <div class="space-y-2">
      <h1 class="text-3xl font-semibold tracking-tight text-slate-900">
        File Uploads
      </h1>
      <p class="text-slate-500">
        Files uploaded for form <span class="font-medium text-slate-700">#{id}</span>
      </p>
    </div>

    <!-- Navbar -->
    <FormNavbar id={id} />

    <!-- Empty State -->
    {#if files.length === 0}
      <div class="mt-20 text-center space-y-4">
        <div class="mx-auto w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
               class="text-slate-400">
            <path d="M4 4h16v16H4z" />
            <path d="M8 8h8M8 12h8M8 16h5" />
          </svg>
        </div>

        <h2 class="text-xl font-medium text-slate-700">No files uploaded yet</h2>
        <p class="text-slate-500 max-w-md mx-auto">
          Files uploaded through this form will appear here. Once users submit uploads, you’ll see them listed with timestamps and download links.
        </p>
      </div>

    {:else}

      <!-- File List -->
      <div class="space-y-6">
        <h2 class="text-xl font-semibold text-slate-800">Uploaded Files</h2>

        <div class="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <table class="w-full text-left">
            <thead class="bg-slate-50 border-b border-slate-200">
              <tr>
                <th class="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Name</th>
                <th class="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Download</th>
                <th class="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Created</th>
              </tr>
            </thead>

            <tbody class="divide-y divide-slate-200">
              {#each files as file (file.name)}
                <tr class="hover:bg-slate-50 transition">
                  <td class="px-6 py-4 font-medium text-slate-800">{file.name}</td>

                  <td class="px-6 py-4">
                    <a
                      target="_blank"
                      href={"https://fabform.io/d/" + file.name}
                      class="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Download
                    </a>
                  </td>

                  <td class="px-6 py-4 text-slate-600">{file.created_at}</td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>

    {/if}
  </div>
</main>

