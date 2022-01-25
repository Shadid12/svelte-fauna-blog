<script lang="js">
  import { operationStore, query, setClient } from '@urql/svelte';
  import { page } from '$app/stores';
	import client from '../../client'
  import Delete from '$lib/Delete.svelte';
  import Edit from '$lib/Edit.svelte';

	setClient(client);

  const currentPost = operationStore(`
    query GetPostById($id: ID!) {
      findPostByID(id: $id) {
        _id
        title
        content
        author {
          email
        }
      }
    }
  `,
  { id: $page.params.id },
  { requestPolicy: 'network-only' }
  )

  query(currentPost)

  export let post = null;

  currentPost.subscribe(({data}) => {
    if(data) {
      post = data.findPostByID;
    }
  })

</script>

{#if $currentPost.fetching}
<p>Loading...</p>
{:else}

<h2>{$currentPost.data.findPostByID.title}</h2>
<p>By <b>{currentPost.data.findPostByID.author.email}</b></p>
<p>{$currentPost.data.findPostByID.content}</p>
<Edit post={post}/>
<Delete />
{/if}