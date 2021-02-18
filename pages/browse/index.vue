<template>
  <div>
    <div class="bg-white mb-16">
      <div class="container mx-auto px-6 lg:px-0 py-10 pb-16">
        <h1 class="text-4xl text-gray-700 font-medium leading-tight mb-4">
          Snippets
        </h1>
      </div>
    </div>

    <div class="container mx-auto px-6 lg:px-0">
      <h1 class="font-medium text-xl mb-6 text-gray-600">
        All snippets ({{ snippets.length }})
      </h1>

      <BrowseSnippetCard
        v-for="snippet in snippets" 
        :key="snippet.uuid" 
        :snippet="snippet"
      >
      </BrowseSnippetCard>
    </div>
  </div>
</template>

<script>
  import BrowseSnippetCard from './components/BrowseSnippetCard';

  export default {
    components: {
      BrowseSnippetCard
    },
    data() {
      return {
        snippets: []
      }
    },
    async asyncData({ app }) {
      let snippets = await app.$axios.$get(`snippets`);

      return {
        snippets: snippets.data
      }
    }
  }
</script>