import algoliasearch from 'algoliasearch/lite';
import { createServerRootMixin } from 'vue-instantsearch';

export default ({ app }, inject) => {
  // const searchClient = algoliasearch(
  //   'VWKO0HCQIF', 
  //   '5ccd1b09090f3d031c2af1df73ff4575'
  // );

  // const { instantsearch } = createServerRootMixin({
  //   searchClient,
  //   indexName: 'snippets',
  // })

  // searchClient.createServerRootMixin({
    
  // })
  
  //inject('instantsearch', instantsearch);

  const algoliaKey = app.$axios.get('keys/algolia')
                      .then((data) => { 
                        return data.data 
                      }); 

  inject('algoliaKey', algoliaKey);
}