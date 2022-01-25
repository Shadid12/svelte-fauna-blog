<script lang="js">
  import { userSession } from '../store.js';
  import Cookies from 'js-cookie';
  let user;
  userSession.subscribe(val => {
    user = val;
  });

  function logout() {
    userSession.update(() => null);
    Cookies.remove('MY_BLOG_APP_TOKEN');
  }
</script>

<nav>
  <a href="/">Home</a>
  {#if user}
  <!-- svelte-ignore a11y-invalid-attribute -->
  <a href="#" on:click={logout}>Logout</a>
  {:else}
  <a href="/login">Login</a>
  <a href="/register">Register</a>
  {/if}
  <hr />
</nav>