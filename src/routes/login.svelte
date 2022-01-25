<script>
  import { setClient, mutation } from '@urql/svelte';
  import client from '../client';
  import Cookies from 'js-cookie';
  import { goto } from '$app/navigation';

  setClient(client);

  const loginMutation = mutation({
    query: `
      mutation ($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          secret
          ttl
          data {
            _id
            email
          }
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
    const resp = await loginMutation({ email, password })
    
    if(resp.data.login.data) {
      Cookies.set(
        'MY_BLOG_APP_TOKEN', 
        JSON.stringify({
          id: resp.data.login.data._id,
          secret: resp.data.login.secret
        }), 
        { expires: resp.data.login.data.ttl }
      );
      alert('Login Successful');
      goto('/')
    }
  }
</script>

<div>
  <h3>Login Form</h3>
  <form on:submit|preventDefault={onSubmit} >
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
    <button type="submit">Submit</button>
  </form>
</div>
