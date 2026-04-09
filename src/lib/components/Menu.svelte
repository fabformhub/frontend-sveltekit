<script>
  import { user_id, email } from "$lib/store.js";
  import { clickOutside } from "$lib/clickOutside.js";

  let show = $state(false);

  const toggleDropdown = () => (show = !show);
  const onKeydown = (event) => {
    if (event.key === "Escape") show = false;
  };
  const closeMenu = () => (show = false);

  const userInitial = $derived($email ? $email.charAt(0).toUpperCase() : 'U');
</script>

{#if $user_id}
  <div
    class="relative inline-block"
    use:clickOutside
    onclick_outside={closeMenu}
    onkeydown={onKeydown}
  >
    <button
      type="button"
      class="flex items-center gap-3 pl-2 pr-4 py-2 bg-white/80 backdrop-blur-md border border-slate-200 rounded-full shadow-sm hover:shadow-md hover:border-indigo-200 transition-all active:scale-95 group"
      aria-haspopup="true"
      aria-expanded={show}
      onclick={toggleDropdown}
    >
      <div class="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-xs font-black shadow-inner shadow-black/10">
        {userInitial}
      </div>
      
      <span class="text-xs font-black uppercase tracking-widest text-slate-700 group-hover:text-indigo-600">Account</span>
      
      <svg
        class="w-4 h-4 text-slate-400 transition-transform duration-300 {show ? 'rotate-180' : ''}"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>

    {#if show}
      <div
        class="absolute right-0 mt-4 w-64 bg-white/90 backdrop-blur-2xl rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white overflow-hidden z-50 origin-top-right transition-all"
        role="menu"
      >
        <div class="px-6 py-5 bg-slate-50/50 border-b border-slate-100">
          <p class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Active Session</p>
          <p class="text-sm font-bold text-slate-800 truncate">{$email || 'User'}</p>
        </div>

        <div class="p-2">
          <a href="/account" class="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white hover:shadow-sm transition-all text-slate-600 hover:text-indigo-600 group">
            <div class="w-8 h-8 rounded-xl bg-slate-100 group-hover:bg-indigo-50 flex items-center justify-center transition-colors">
               <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            </div>
            <span class="text-xs font-black uppercase tracking-wider">Profile</span>
          </a>

          <a href="/forms" class="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white hover:shadow-sm transition-all text-slate-600 hover:text-indigo-600 group">
            <div class="w-8 h-8 rounded-xl bg-slate-100 group-hover:bg-indigo-50 flex items-center justify-center transition-colors">
               <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M7 8h10M7 12h10M7 16h10" /></svg>
            </div>
            <span class="text-xs font-black uppercase tracking-wider">Dashboards</span>
          </a>

          <div class="my-2 border-t border-slate-100/50"></div>

          <a href="https://docs.fabform.io" target="_blank" class="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white hover:shadow-sm transition-all text-slate-600 hover:text-indigo-600 group">
            <div class="w-8 h-8 rounded-xl bg-slate-100 group-hover:bg-indigo-50 flex items-center justify-center transition-colors">
               <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5S19.832 5.477 21 6.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            </div>
            <span class="text-xs font-black uppercase tracking-wider">Help Docs</span>
          </a>
        </div>

        <div class="p-2 bg-slate-50/50">
          <a href="/logout" class="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white border border-rose-100 text-rose-500 hover:bg-rose-500 hover:text-white transition-all group shadow-sm">
            <div class="w-8 h-8 rounded-xl bg-rose-50 group-hover:bg-rose-400 flex items-center justify-center transition-colors">
               <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            </div>
            <span class="text-xs font-black uppercase tracking-wider">Sign Out</span>
          </a>
        </div>
      </div>
    {/if}
  </div>
{/if}
