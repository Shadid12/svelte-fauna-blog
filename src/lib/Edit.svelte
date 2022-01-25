<script>
  import Cookies from 'js-cookie';
  import { setClient, mutation } from '@urql/svelte';
  import { clientWithAuthToken } from '../client';
  import { goto } from '$app/navigation';

  let userSession = Cookies.get('MY_BLOG_APP_TOKEN');

  if(userSession) {
    const { secret } = JSON.parse(userSession);
    setClient(clientWithAuthToken(secret));
  }


  const updatePost = mutation({
    query: `
      mutation UpdatePost($id: ID!, $title: String!, $content: String!) {
        updatePost(id: $id, data: {
          title: $title,
          content: $content
        }) {
          _id
        }
      }
    `
  })

	export let post;
  let isEdit = false;
  let title = '';
  let content = '';
  let errorMessage = '';

  function toggleEdit() {
    isEdit = !isEdit;
    if(isEdit) {
      title = post.title;
      content = post.content;
    }
  }

  async function onSubmit(e) {
    const updatedPost = await updatePost({ id: post._id, title, content })
    console.log('updatedPost', updatedPost);
    const { data, error } = updatedPost;
    if(error) {
      errorMessage = error.message;
    }
    if(data) {
      alert('Post updated');
      goto(`/`);
    }
  }
</script>


{#if isEdit}
<div>
  <h5>Edit Post</h5>
    {#if errorMessage}
      <p class="error">{errorMessage}</p>
    {/if}
    <form on:submit|preventDefault={onSubmit} >
      <div class="input-blocks">
        <label for="name">Title</label>
        <input
          type="text"
          name="title"
          bind:value={title}
        />
      </div>
      <div class="input-blocks">
        <label for="name">Content</label>
        <textarea
          type="text"
          name="content"
          bind:value={content}
        />
      </div>
      <button class="update" type="submit" disabled={!userSession}>Update</button>
    </form>
</div>
{/if}

<button on:click={toggleEdit} disabled={!userSession}>Edit</button>

<style>
  .error {
    color: coral;
  }
  .update {
    margin-bottom: 10px;
    margin-top: 10px;
  }
</style>