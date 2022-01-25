<script lang="js">
  import Cookies from 'js-cookie';
  import { setClient, mutation } from '@urql/svelte';
  import { clientWithAuthToken } from '../../client';
  import { goto } from '$app/navigation';


  let userSession = Cookies.get('MY_BLOG_APP_TOKEN');

  if(userSession) {
    const { secret } = JSON.parse(userSession);
    setClient(clientWithAuthToken(secret));
  }

  const newPost = mutation({
    query: `
    mutation CreatePost($title: String!, $content: String! $authorId: ID!) {
      createPost(data: {
        title: $title
        content: $content
        author: {
          connect: $authorId
        }
      }) {
        _id
        title
        content
        author {
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

    const { content, title } = data;
    try {
      const { id } = JSON.parse(userSession);
      console.log('authorId', id);
      if(!id) {
        alert('You must be logged in to create a post');
        return;
      }
      const resp = await newPost({ title, content, authorId: id }); 
      if(resp.data.createPost) {
        alert('Post created successfully')
        goto('/')
      }
    } catch (error) {
      console.log(error);
    }
  }
</script>

<div>
  <h3>New Post</h3>
  {#if !userSession}
    <p class="login-promt">You must be logged in to create a post</p>
  {/if}
  <form on:submit|preventDefault={onSubmit} >
    <div class="input-blocks">
      <label for="name">Title</label>
      <input
        type="text"
        name="title"
        value=""
      />
    </div>
    <div class="input-blocks">
      <label for="name">Content</label>
      <textarea
        type="text"
        name="content"
        value=""
      />
    </div>
    <button type="submit">Submit</button>
  </form>
</div>

<style>
  .input-blocks {
    display: flex;
    flex-direction: column;
    max-width: 300px;
    margin-bottom: 1em;
  }
  .login-promt {
    color: coral;
  }
</style>