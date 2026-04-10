<script>
  import { page } from '$app/stores';
  import { onMount } from "svelte";
  import Modal from "$lib/components/Modal.svelte";
  import MenuBar from "$lib/components/MenuBar.svelte";
  import UpgradeButton from "$lib/components/UpgradeButton.svelte";

  import { user_id, email, tier } from "$lib/store.js";
  import { removeProtocol } from "$lib/validation.js";
  import { getJSON, postJSON } from "$lib/api.js";
  import { showToast } from "$lib/toast.svelte.js";
  
  let { id } = $page.params;

  let name = $state("");
  let respEmail = $state("");
  let respEmailSubject = $state("");
  let message = $state("Thanks for submitting the form");

  let emailNotification = $state(false);
  let emailTemplate = $state("");

  let autoResp = $state(false);
  let autoRespEmail = $state("");
  let autoRespEmailSubject = $state("");
  let autoRespTemplate = $state("");

  let googleSheetId = $state("");
  let webhookUrl = $state("");
  let redirectUrl = $state("");
  let replyTo = $state("");
  let telegramChatId = $state("");

  let isOpenModal = $state(false);

  function openModal() {
    isOpenModal = true;
  }

  function closeModal() {
    isOpenModal = false;
  }

  // Load settings on mount
  onMount(() => {
    getJSON(`endpoint/${id}`, (data) => {
      name = data.name;
      respEmail = data.resp_email;
      respEmailSubject = data.resp_email_subject;

      autoRespEmail = data.auto_resp_email;
      autoRespEmailSubject = data.auto_resp_email_subject;

      message = data.message;
      replyTo = data.reply_to;

      emailNotification = data.email_notification;
      autoResp = data.auto_resp;

      emailTemplate = data.email_template;
      autoRespTemplate = data.auto_resp_template;

      googleSheetId = data.google_sheet_id;
      webhookUrl = data.webhook_url;
      redirectUrl = data.redirect_url;
      telegramChatId = data.telegram_chat_id;
    });
  });

  function goBack() {
    router.goto("/forms");
  }

  function deleteEndpoint() {
    postJSON(`delete-endpoint/${id}`, {}, () => {
      showToast({
        type: "success",
        message: "Form deleted successfully"
      });
      router.goto("/forms");
    });
  }

  function saveEndpoint() {
    const payload = {
      id,
      name,
      respEmail,
      respEmailSubject,
      message,
      emailNotification,
      autoResp,
      autoRespEmail,
      autoRespEmailSubject,
      emailTemplate,
      autoRespTemplate,
      googleSheetId,
      webhookUrl,
      redirectUrl: removeProtocol(redirectUrl),
      replyTo,
      telegramChatId
    };

    postJSON(`endpoint/${id}`, payload, () => {
      showToast({
        type: "success",
        message: "Changes saved"
      });
      router.goto("/forms");
    });
  }
</script>

<!-- MAIN WRAPPER -->
<div class="space-y-6">

  <!-- MENUBAR (consistent with Forms.svelte) -->
  <MenuBar id={id} hideHomeButton={true} />

  <!-- HEADER -->
  <header class="flex items-center justify-between">
    <div>
      <h1 class="text-3xl font-black tracking-tight text-slate-900">Form Settings</h1>
      <p class="text-sm text-slate-500 mt-1">
        Form ID: <span class="font-mono text-slate-700">{id}</span>
      </p>
    </div>
  </header>

  <!-- SETTINGS CONTENT -->
  <div class="space-y-8">

    <!-- ========================= -->
    <!-- FORM BASICS -->
    <!-- ========================= -->
    <section class="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
      <h2 class="text-xs font-semibold text-slate-500 uppercase tracking-[0.18em]">
        Form Basics
      </h2>

      <div class="space-y-2">
        <label class="text-sm font-semibold text-slate-700">Form Name</label>
        <input
          bind:value={name}
          placeholder="Give your form a name"
          class="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
        />
      </div>

      <div class="space-y-2">
        <label class="text-sm font-semibold text-slate-700">Form Message</label>
        <textarea
          bind:value={message}
          rows="5"
          placeholder="Message shown after form submission"
          class="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
        ></textarea>
      </div>

      <div class="flex items-center justify-between py-2">
        <label class="text-sm font-semibold text-slate-700">Send Auto‑response Email</label>
        <input type="checkbox" bind:checked={autoResp} class="h-4 w-4 rounded border-slate-300 text-slate-900" />
      </div>

      {#if $tier == 0}
        <UpgradeButton />
      {/if}
    </section>

    <!-- ========================= -->
    <!-- TELEGRAM NOTIFICATIONS -->
    <!-- ========================= -->
    <section class="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
      <h2 class="text-xs font-semibold text-slate-500 uppercase tracking-[0.18em]">
        Telegram Notifications
      </h2>

      <div class="space-y-2">
        <label class="text-sm font-semibold text-slate-700">Telegram Chat ID</label>
        <input
          bind:value={telegramChatId}
          placeholder="Enter your Telegram Chat ID"
          class="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
        />
      </div>

      <div class="text-sm text-slate-600 space-y-2">
        <p class="font-semibold">Enable Telegram notifications:</p>
        <ol class="list-decimal list-inside space-y-1">
          <li>
            Open <a href="https://t.me/fabform_bot" target="_blank" class="text-slate-900 font-semibold underline"> @fabform_bot </a> and press <code>/start</code>.
          </li>
          <li>
            Get your Chat ID from <a href="https://t.me/userinfobot" target="_blank" class="text-slate-900 font-semibold underline">@userinfobot</a>.
          </li>
          <li>Enter your Chat ID above.</li>
        </ol>
      </div>
    </section>

    <!-- ========================= -->
    <!-- EMAIL NOTIFICATIONS -->
    <!-- ========================= -->
    <section class="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
      <h2 class="text-xs font-semibold text-slate-500 uppercase tracking-[0.18em]">
        Email Notifications
      </h2>

      <div class="space-y-2">
        <label class="text-sm font-semibold text-slate-700">Notifications Email</label>
        <input
          bind:value={respEmail}
          type="email"
          placeholder="Where to send submission notifications"
          class="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
        />
      </div>

      <div class="space-y-2">
        <label class="text-sm font-semibold text-slate-700">Email Subject</label>
        <input
          bind:value={respEmailSubject}
          placeholder="Subject for notification emails"
          class="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
        />
      </div>

      <div class="flex items-center justify-between py-2">
        <label class="text-sm font-semibold text-slate-700">Send Email Notifications</label>
        <input type="checkbox" bind:checked={emailNotification} class="h-4 w-4 rounded border-slate-300 text-slate-900" />
      </div>

      <div class="text-sm text-slate-600">
        You can insert form field values using their <strong>name</strong> attribute.  
        Example: <code>{`{firstName}`}</code>
      </div>

      <div class="space-y-2">
        <label class="text-sm font-semibold text-slate-700">Email Template</label>
        <textarea
          bind:value={emailTemplate}
          rows="6"
          placeholder="Template for notification emails"
          class="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
        ></textarea>
      </div>
    </section>

    <!-- ========================= -->
    <!-- AUTORESPONSE EMAIL -->
    <!-- ========================= -->
    <section class="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
      <h2 class="text-xs font-semibold text-slate-500 uppercase tracking-[0.18em]">
        Autoresponse Email
      </h2>

      <div class="space-y-2">
        <label class="text-sm font-semibold text-slate-700">Autoresponse Subject</label>
        <input
          bind:value={autoRespEmailSubject}
          placeholder="Subject for autoresponse emails"
          class="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
        />
      </div>

      <div class="text-sm text-slate-600">
        Use form field names to include user‑submitted values.  
        Example: <code>{`{firstName}`}</code>
      </div>

      <div class="space-y-2">
        <label class="text-sm font-semibold text-slate-700">Autoresponse Template</label>
        <textarea
          bind:value={autoRespTemplate}
          rows="6"
          placeholder="Template for autoresponse emails"
          class="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
        ></textarea>
      </div>
    </section>

    <!-- ========================= -->
    <!-- REDIRECTS & WEBHOOKS -->
    <!-- ========================= -->
    <section class="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
      <h2 class="text-xs font-semibold text-slate-500 uppercase tracking-[0.18em]">
        Redirects & Webhooks
      </h2>

      <div class="space-y-2">
        <label class="text-sm font-semibold text-slate-700">Redirect URL</label>
        <input
          bind:value={redirectUrl}
          placeholder="Page to redirect users after submission"
          class="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
        />
      </div>

      <div class="space-y-2">
        <label class="text-sm font-semibold text-slate-700">Webhook URL</label>
        <input
          bind:value={webhookUrl}
          placeholder="Webhook to call after submission"
          class="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
        />
      </div>
    </section>

    <!-- ========================= -->
    <!-- DANGER ZONE -->
    <!-- ========================= -->
    <section class="bg-red-50 rounded-3xl border border-red-200 shadow-sm p-6 space-y-4">
      <h2 class="text-xs font-semibold text-red-700 uppercase tracking-[0.18em]">
        Danger Zone
      </h2>

      <p class="text-sm text-red-700">
        Deleting this form is permanent. All submissions and files will be removed.
      </p>

      <button
        class="px-4 py-2 rounded-2xl text-sm font-semibold border border-red-500 text-red-600 bg-white hover:bg-red-100 transition"
        on:click={openModal}
      >
        Delete Form
      </button>
    </section>

    <!-- DELETE MODAL -->
    <Modal
      isOpenModal={isOpenModal}
      on:closeModal={closeModal}
      on:success={deleteEndpoint}
      title="Are you sure you want to delete this form?"
      buttonText="Delete"
      buttonClass="is-danger"
    />
  </div>
</div>

<!-- STICKY SAVE BAR -->
<div class="sticky bottom-0 left-0 right-0 bg-white border-t border-slate-200 py-4 px-6 flex justify-end">
  <button
    class="px-5 py-2.5 bg-slate-900 text-white rounded-2xl text-sm font-semibold shadow-[0_4px_0_0_#020617] hover:-translate-y-[1px] transition-transform"
    on:click={saveEndpoint}
  >
    Save Changes
  </button>
</div>
