import { createClient } from '@urql/svelte';

export const clientWithAuthToken = token => createClient({
  url: 'https://graphql.us.fauna.com/graphql',
  fetchOptions: () => {
    console.log('token', token);
    return {
      headers: { authorization: token ? `Bearer ${token}` : '' },
    };
  },
});


export default createClient({
  url: 'https://graphql.us.fauna.com/graphql',
  fetchOptions: () => {
    const token = import.meta.env.VITE_PUBLIC_FAUNA_KEY;
    return {
      headers: { authorization: token ? `Bearer ${token}` : '' },
    };
  },
});