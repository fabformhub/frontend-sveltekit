<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import Modal from '$lib/components/Modal.svelte';
  import { user_id, email } from "$lib/store.js";
  import { getJSON, postJSON } from "$lib/api.js";
  import { showToast } from "$lib/toast.svelte.js";

  let isOpenModal = false;

  let firstName = "";
  let lastName = "";
  let currentPassword = "";
  let newPassword = "";
  let confirmNewPassword = "";
  let errorMessage = "";

  onMount(() => {
    getJSON(`get-user-info/${$email}`, (data) => {
      firstName = data.first_name;
      lastName = data.last_name;
    });
  });

  function updateUserInfo() {
    const payload = { firstName, lastName, email: $email };

    postJSON("update-user-info", payload, () => {
      showToast({
        type: "success",
        message: "Changes saved successfully"
      });
    });
  }

  function updatePassword() {
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      errorMessage = "All fields are required";
      return;
    }

    if (newPassword !== confirmNewPassword) {
      errorMessage = "New password and confirmation do not match";
      return;
    }

    postJSON("login", { email: $email, password: currentPassword }, (data) => {
      if (data.status === "loggedIn") {
        postJSON("change-password", { email: $email, newPassword }, (data) => {
          if (data.status === "success") {
            showToast({
              type: "success",
              message: "Password updated successfully"
            });

            errorMessage = "";
            currentPassword = "";
            newPassword = "";
            confirmNewPassword = "";
          }
        });
      } else {
        errorMessage = "Your current password is incorrect";
      }
    });
  }

  function deleteAccount() {
    postJSON(`delete-account/${$user_id}`, {}, () => {
      showToast({
        type: "success",
        message: "Your account has been deleted"
      });

      goto("/logout");
    });
  }
</script>

<main class="min-h-screen bg-slate-50 py-12 px-4 flex justify-center">
  <div class="w-full max-w-3xl space-y-10">

    <!-- HEADER -->
    <div class="text-center">
      <h1 class="text-4xl font-extrabold text-slate-900 tracking-tight">
        Account Settings
      </h1>
      <p class="text-slate-600 mt-2">
        Manage your personal information, security, and preferences.
      </p>
    </div>

    <!-- PROFILE CARD -->
    <section class="bg-white shadow-xl rounded-2xl p-8 border border-slate-200">
      <h2 class="text-xl font-bold text-slate-900 mb-6">Profile Information</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">First Name</label>
          <input
            bind:value={firstName}
            type="text"
            class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-black focus:border-black transition"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
          <input
            bind:value={lastName}
            type="text"
            class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-black focus:border-black transition"
          />
        </div>
      </div>

      <button
        on:click={updateUserInfo}
        class="mt-6 bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-900 transition"
      >
        Save Changes
      </button>
    </section>

    <!-- EMAIL CARD -->
    <section class="bg-white shadow-xl rounded-2xl p-8 border border-slate-200">
      <h2 class="text-xl font-bold text-slate-900 mb-4">Email Address</h2>

      <p class="px-4 py-3 bg-slate-100 rounded-xl border border-slate-200 font-medium text-slate-800">
        {$email}
      </p>
    </section>

    <!-- PASSWORD CARD -->
    <section class="bg-white shadow-xl rounded-2xl p-8 border border-slate-200">
      <h2 class="text-xl font-bold text-slate-900 mb-6">Change Password</h2>

      <div class="space-y-4">
        <input
          bind:value={currentPassword}
          type="password"
          placeholder="Current Password"
          class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-black focus:border-black transition"
        />

        <input
          bind:value={newPassword}
          type="password"
          placeholder="New Password"
          class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-black focus:border-black transition"
        />

        <input
          bind:value={confirmNewPassword}
          type="password"
          placeholder="Confirm New Password"
          class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-black focus:border-black transition"
        />

        {#if errorMessage}
          <p class="text-red-600 text-sm font-medium">{errorMessage}</p>
        {/if}

        <button
          on:click={updatePassword}
          class="bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-900 transition"
        >
          Update Password
        </button>
      </div>
    </section>

    <!-- DANGER ZONE -->
    <section class="bg-white shadow-xl rounded-2xl p-8 border border-red-300 bg-red-50">
      <h2 class="text-xl font-bold text-red-700 mb-4">Danger Zone</h2>

      <p class="text-red-700 mb-4">
        Permanently delete your account and all associated data. This action cannot be undone.
      </p>

      <Modal
        isOpenModal={isOpenModal}
        on:closeModal={() => (isOpenModal = false)}
        on:success={deleteAccount}
        title="Are you sure you want to delete this account?"
        buttonText="Delete"
      />

      <button
        on:click={() => (isOpenModal = true)}
        class="bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition"
      >
        Delete Account
      </button>
    </section>

  </div>
</main>
