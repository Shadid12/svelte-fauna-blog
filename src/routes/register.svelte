<script lang="js">
  import { setClient, mutation } from '@urql/svelte';
  import client from '../client'
  import { goto } from '$app/navigation';

  setClient(client);

  const registerMutation = mutation({
    query: `
      mutation ($email: String!, $password: String!) {
        register(email: $email, password: $password) {
          email
          _id
        }
      }
    `,
  });

  async function onSubmit(e) {
    const formData = new FormData(e.target);

    const data = {};
    for (let field of formData) {
      const [key, value] = field;
      data[key] = value;
    }
    const { email, password } = data;
    const resp = await registerMutation({ email, password })
    if (resp.data.register) {
      goto('/');
    } 
    if(resp.error) {
      alert(resp.error.message);
      console.log(resp.error);
    }
  }
</script>

<div class="wrap">
  <h3>Register New User</h3>
  <form on:submit|preventDefault={onSubmit}>
    <div>
        <label for="name">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          value=""
        />
    </div>
    <div>
      <label for="name">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        value=""
      />
    </div>
    <button type="submit">Register</button>
  </form>
</div>