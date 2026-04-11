<script>
  import { onMount } from 'svelte';
  import { nanoid } from 'nanoid';
  import Modal from '$lib/components/Modal.svelte';
  import FormNavbar from '$lib/components/FormNavbar.svelte';
  import { user_id, email, tier } from "$lib/store.js";
  import { getJSON, postJSON } from "$lib/api.js";
  import { isEmail, isValidWebsite } from "$lib/validation.js";
  import { showToast } from "$lib/toast.svelte.js";

  // --- State ---
  let endpoints = $state([]);
  let submissions = $state(null); // null = loading, [] = empty
  let totalSubmissions = $state(0);

  let selectedId = $state(null);
  let selectedRows = $state([]);

  let isOpenModal = $state(false);
  let isOpenModal2 = $state(false);
  let newFormName = $state('');

  // --- Load initial data ---
  onMount(async () => {
    if (!$user_id) return;

    try {
      endpoints = await getJSON(`endpoints/${$user_id}`);
      const count = await getJSON(`submissions-count/${$user_id}`);
      totalSubmissions = count.totalSubmissions;
    } catch (err) {
showToast({ type: 'error', message: 'Failed to load forms' });
}
});

// --- Load submissions dynamically ---
async function changeEndpoint(id) {
selectedId = id;
submissions = null; // triggers loading UI
selectedRows = [];

try {
submissions = await getJSON(`submissions/${id}`);
} catch (err) {
showToast({ type: 'error', message: 'Failed to load submissions' });
submissions = [];
}
}

// --- Create new form ---
  async function saveEndpoint() {
    if ($tier == 0 && endpoints.length >= 1) {
      showToast({ type: 'error', message: 'Free tier: 1 form limit.' });
      return;
    }

    const id = nanoid(7);
    const payload = { id, name: newFormName, message: 'Success' };

    try {
      await postJSON(`endpoints/${$user_id}`, payload);
      endpoints = [...endpoints, payload];
      isOpenModal = false;
      newFormName = '';
      changeEndpoint(id);
    } catch (err) {
      showToast({ type: 'error', message: 'Failed to create form' });
    }
  }

  // --- Delete submissions ---
  async function deleteSubmissions() {
    const ids = selectedRows.map(r => r[0]);

    try {
      await postJSON(`delete-submissions/${ids}`, {});
      submissions = submissions.filter(s => !ids.includes(s.id));
      selectedRows = [];
      isOpenModal2 = false;
      showToast({ type: 'success', message: 'Deleted' });
    } catch (err) {
      showToast({ type: 'error', message: 'Failed to delete submissions' });
    }
  }

  // --- Reactive table ---
  const table = $derived.by(() => {
    if (!submissions || submissions.length === 0) {
      return { headers: [], rows: [], csvUrl: '' };
    }

    let heads = ['id', 'date created'];

    submissions.forEach(s => {
      if (s.form_data) {
        Object.keys(s.form_data).forEach(k => {
          if (!heads.includes(k)) heads.push(k);
        });
      }
    });

    const rows = submissions.map(s =>
      heads.map(h => {
        if (h === 'id') return s.id;
        if (h === 'date created') return s.created_at;
        return s.form_data?.[h] ?? '';
      })
    );

    const csv = heads.join(',') + '\n' + rows.map(r => r.join(',')).join('\n');
    return {
      headers: heads,
      rows,
      csvUrl: "data:text/csv;charset=utf-8," + encodeURI(csv)
    };
  });

  const activeForm = $derived(endpoints.find(e => e.id === selectedId));
</script>

<div class="flex h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">

  <!-- SIDEBAR -->
  <aside class="w-64 bg-white border-r flex flex-col p-4">

    <button onclick={() => (isOpenModal = true)}
      class="w-full bg-slate-900 text-white py-2.5 rounded-xl font-bold hover:bg-black transition mb-4 shadow-sm">
      + New Form
    </button>

    <nav class="flex-1 overflow-y-auto space-y-1">
      {#each endpoints as f (f.id)}
        <button
          onclick={() => changeEndpoint(f.id)}
          class="w-full text-left px-4 py-2.5 rounded-xl text-sm transition-all {selectedId === f.id ? 'bg-slate-100 font-bold border-l-4 border-slate-900' : 'text-slate-500 hover:bg-slate-50'}"
        >
          {f.name}
        </button>
      {/each}
    </nav>

    {#if $tier == 0}
      <div class="mt-auto p-4 bg-slate-50 rounded-2xl border border-slate-100">
        <div class="flex justify-between text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest">
          <span>Usage</span>
          <span>{totalSubmissions}/50</span>
        </div>
        <div class="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
          <div class="bg-blue-600 h-full transition-all duration-500" style="width: {(totalSubmissions/50)*100}%"></div>
        </div>
      </div>
    {/if}
  </aside>

  <!-- MAIN CONTENT -->
  <main class="flex-1 flex flex-col p-4 md:p-8">

    {#if selectedId}
      <header class="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <div>
          <h1 class="text-2xl md:text-3xl font-black tracking-tight">{activeForm?.name}</h1>
          <p class="text-slate-400 text-xs font-mono mt-1 uppercase break-all">ID: {selectedId}</p>
        </div>

        <div class="flex gap-2">
          <a href={table.csvUrl} download="data.csv"
            class="bg-white border border-slate-200 px-4 md:px-5 py-2 rounded-xl text-sm font-bold hover:bg-slate-50 transition shadow-sm">
            Export
          </a>

          <button
            disabled={!selectedRows.length}
            onclick={() => (isOpenModal2 = true)}
            class="bg-red-50 text-red-600 px-4 md:px-5 py-2 rounded-xl text-sm font-bold disabled:opacity-30 hover:bg-red-100 transition"
          >
            Delete ({selectedRows.length})
          </button>
        </div>
      </header>

      <FormNavbar id={selectedId} hideHomeButton={true} />

      <div class="mt-6 bg-white border border-slate-200 rounded-[2rem] shadow-sm flex-1 flex flex-col">

        {#if submissions === null}
          <div class="m-auto text-slate-400 font-bold animate-pulse">Loading data...</div>

        {:else if table.rows.length === 0}
          <div class="m-auto text-center px-10">
            <p class="text-slate-400 font-bold text-lg">No submissions found</p>
          </div>

        {:else}

          <div class="relative h-full overflow-x-auto overflow-y-auto scroll-container">

            <div class="pointer-events-none absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-white z-10"></div>

            <table class="w-max min-w-full text-left text-sm whitespace-nowrap">
              <thead class="bg-slate-50/50 border-b border-slate-100 sticky top-0 z-20">
                <tr>
                  <th class="p-4 w-10 sticky left-0 bg-slate-50/50 z-30">
                    <input
                      type="checkbox"
                      onchange={(e) => selectedRows = e.target.checked ? [...table.rows] : []}
                      checked={selectedRows.length === table.rows.length && table.rows.length > 0}
                    />
                  </th>

                  {#each table.headers as h}
                    <th class="p-4 font-black text-slate-400 uppercase text-[10px] tracking-widest">{h}</th>
                  {/each}
                </tr>
              </thead>

              <tbody>
                {#each table.rows as row (row[0])}
                  <tr class="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td class="p-4 sticky left-0 bg-white z-20">
                      <input type="checkbox" bind:group={selectedRows} value={row} />
                    </td>

                    {#each row as cell}
                      <td class="p-4 text-slate-600 font-medium">
                        <div class="cell-scroll">
                          {#if isEmail(cell)}
                            <a href="mailto:{cell}" class="text-blue-600 hover:underline">{cell}</a>
                          {:else if isValidWebsite(cell)}
                            <a href={cell} target="_blank" class="text-blue-600 hover:underline">{cell}</a>
                          {:else}
                            {cell}
                          {/if}
                        </div>
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

