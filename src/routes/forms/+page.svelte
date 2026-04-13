<script>
  import { onMount } from 'svelte';
  import { nanoid } from 'nanoid';
  import FormNavbar from '$lib/components/FormNavbar.svelte';
  import { user_id, tier } from '$lib/store.js';
  import { getJSON, postJSON } from '$lib/api.js';
  import { isEmail, isValidWebsite } from '$lib/validation.js';
  import { showToast } from '$lib/toast.svelte.js';

  let endpoints = $state([]);
  let submissions = $state([]);
  let headers = $state([]);
  let selectedId = $state(null);
  let isLoading = $state(false);

  let isOpenModal = $state(false);
  let newFormName = $state('');

  const activeForm = $derived(endpoints.find((e) => e.id === selectedId));

  onMount(async () => {
    if (!$user_id) return;

    try {
      endpoints = await getJSON(`endpoints/${$user_id}`);
    } catch (err) {
      showToast({ type: 'error', message: 'Failed to load forms' });
    }
  });

  async function changeEndpoint(id) {
    selectedId = id;
    isLoading = true;
    submissions = [];
    headers = [];

    try {
      const data = await getJSON(`submissions/${id}`);

      if (!data || data.length === 0) {
        submissions = [];
        headers = [];
        return;
      }

      const headerSet = new Set(['id', 'date created']);
      const hasValue = new Map();

      for (const s of data) {
        const fd = s.form_data;
        if (!fd) continue;

        for (const k of Object.keys(fd)) {
          if (k.toLowerCase() === 'submit') continue;

          if (!headerSet.has(k)) {
            headerSet.add(k);
            hasValue.set(k, false);
          }

          const v = fd[k];
          if (v !== undefined && v !== null && v !== '') {
            hasValue.set(k, true);
          }
        }
      }

      const finalHeaders = ['id', 'date created'];
      for (const k of headerSet) {
        if (k === 'id' || k === 'date created') continue;
        if (hasValue.get(k)) finalHeaders.push(k);
      }

      headers = finalHeaders;
      submissions = data;
    } catch (err) {
      showToast({ type: 'error', message: 'Failed to load submissions' });
      submissions = [];
      headers = [];
    } finally {
      isLoading = false;
    }
  }

  async function saveEndpoint() {
    if ($tier == 0 && endpoints.length >= 1) {
      showToast({ type: 'error', message: 'Free tier: 1 form limit.' });
      return;
    }

    const id = nanoid(7);
    const payload = { id, name: newFormName };

    try {
      await postJSON(`endpoints/${$user_id}`, payload);
      endpoints = [...endpoints, payload];
      newFormName = '';
      isOpenModal = false;
      changeEndpoint(id);
    } catch (err) {
      showToast({ type: 'error', message: 'Failed to create form' });
    }
  }
</script>

<div class="flex h-screen bg-slate-50 text-slate-900 overflow-hidden">
  <!-- SIDEBAR -->
  <aside class="w-64 bg-white border-r p-4 flex flex-col">
    <button
      onclick={() => (isOpenModal = true)}
      class="w-full bg-slate-900 text-white py-2.5 rounded-xl font-bold hover:bg-black transition mb-4 shadow-sm"
    >
      + New Form
    </button>

    <nav class="flex-1 overflow-y-auto space-y-1">
      {#each endpoints as f (f.id)}
        <button
          onclick={() => changeEndpoint(f.id)}
          class="w-full text-left px-4 py-2.5 rounded-xl text-sm transition-all {selectedId === f.id
            ? 'bg-slate-100 font-bold border-l-4 border-slate-900'
            : 'text-slate-500 hover:bg-slate-50'}"
        >
          {f.name}
        </button>
      {/each}
    </nav>
  </aside>

  <!-- MAIN -->
  <main class="flex-1 flex flex-col p-8 overflow-hidden">
    {#if !selectedId}
      <!-- Premium empty state: no form selected -->
      <div class="m-auto text-center max-w-sm">
        <div class="mx-auto mb-6 w-20 h-20 text-slate-300">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
            class="w-full h-full drop-shadow-sm">
            <rect x="4" y="5" width="16" height="14" rx="3" class="stroke-slate-300" />
            <path d="M7 9h10M7 13h6" class="stroke-slate-400" />
          </svg>
        </div>
        <h2 class="text-2xl font-black mb-2">Select a form to view submissions</h2>
        <p class="text-slate-500">
          Choose a form from the sidebar to see responses and details.
        </p>
      </div>
    {:else}
      <FormNavbar id={selectedId} hideHomeButton={true} />

      <div class="mt-6 bg-white border border-slate-200 rounded-[2rem] shadow-sm flex-1 flex flex-col overflow-hidden">
        {#if isLoading}
          <div class="m-auto text-slate-400 font-bold animate-pulse">Loading submissions…</div>

        {:else if submissions.length === 0}
          <!-- Premium empty state: no submissions -->
          <div class="m-auto text-center max-w-sm">
            <div class="mx-auto mb-6 w-20 h-20 text-slate-300">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
                class="w-full h-full drop-shadow-sm">
                <circle cx="12" cy="12" r="9" class="stroke-slate-300" />
                <path d="M8 12h8M12 8v8" class="stroke-slate-400" />
              </svg>
            </div>
            <h2 class="text-2xl font-black mb-2">No submissions yet</h2>
            <p class="text-slate-500">
              Share your form link to start collecting responses.
            </p>
          </div>

        {:else if !headers.length}
          <div class="m-auto text-center max-w-sm">
            <div class="mx-auto mb-6 w-20 h-20 text-slate-300">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
                class="w-full h-full drop-shadow-sm">
                <rect x="5" y="6" width="14" height="12" rx="2" class="stroke-slate-300" />
                <path d="M8 10h8M8 14h5" class="stroke-slate-400" />
              </svg>
            </div>
            <h2 class="text-2xl font-black mb-2">No visible fields with data</h2>
            <p class="text-slate-500">
              Submissions exist, but none of the fields contain data that can be shown.
            </p>
          </div>

        {:else}
          <div class="relative flex-1 overflow-auto">
            <table class="w-max min-w-full text-left text-sm whitespace-nowrap border-separate border-spacing-0">
              <thead class="bg-slate-50/50 border-b border-slate-100 sticky top-0 z-10">
                <tr>
                  {#each headers as h}
                    <th class="p-3 font-black text-slate-400 uppercase text-[10px] tracking-widest">
                      {h}
                    </th>
                  {/each}
                </tr>
              </thead>

              <tbody>
                {#each submissions as s (s.id)}
                  <tr class="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    {#each headers as h}
                      {@const cell =
                        h === 'id'
                          ? s.id
                          : h === 'date created'
                          ? s.created_at
                          : s.form_data?.[h] ?? ''}

                      <td class="p-3 text-slate-700">
                        {#if isEmail(cell)}
                          <a href="mailto:{cell}" class="text-blue-600 hover:underline">{cell}</a>
                        {:else if isValidWebsite(cell)}
                          <a href={cell} target="_blank" class="text-blue-600 hover:underline">{cell}</a>
                        {:else}
                          {cell}
                        {/if}
                      </td>
                    {/each}
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
        {/if}
      </div>
    {/if}
  </main>
</div>

