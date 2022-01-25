<script lang="js">
	import { operationStore, query, setClient, mutation } from '@urql/svelte';
	import client from '../client'
  
	setClient(client);

  const allPosts = operationStore(`
    query GetAllPosts($size: Int!, $cursor: String) {
      listPosts(_size: $size, _cursor: $cursor) {
        data {
          _id
          title
          author {
            email
          }
        }
      }
    }
  `,
  { size: 100 },
  { requestPolicy: 'network-only' }
  );
  query(allPosts);

  
</script>


<a href="/posts/new">New Post</a>

<h1>Posts</h1>

{#if $allPosts.fetching}
<p>Loading...</p>
{:else if $allPosts.error}
<p>Oh no... {$allPosts.error.message}</p>
{:else}


{#each $allPosts.data.listPosts.data as post}

<div class="post-wrap">
  <a href={`/posts/${post._id}`}>
    <div>{post.title}</div>
  </a>
  <span>by {post.author.email}</span>
</div>

{/each}

{/if}

<style>
  .post-wrap {
    margin-bottom: 1rem;
  }
</style>