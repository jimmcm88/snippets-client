<template>
  <div>
    <div class="bg-white mb-16">
      <div class="container mx-auto flex px-6 lg:px-0 py-16 lg:py-32">
        <div class="w-full lg:w-1/2">
          <h1 class="text-5xl font-medium text-gray-700 leading-tight mb-6">
            Browse and create code snippets
          </h1>
          <p class="text-xl text-gray-600">
            Snippets are a small collection of steps for things you do not need to remember 
          </p>

          <nuxt-link :to="{
            name: 'snippets-id',
            params: {
              id: SNIPPETS_EXAMPLE_UUID
            }
          }" class="inline-block text-lg rounded-lg text-white bg-blue-500 px-4 py-3">
            Check out an example snippet &rarr;
          </nuxt-link>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-6 lg:px-0">
      <h1 class="text-xl text-gray-600 mb-6">
        Latest snippets
      </h1>

      <LatestSnippetCard 
        v-for="snippet in snippets"
        :key="snippet.uuid"
        :snippet="snippet"
      />
    </div>
  </div>
</template>

<script>
  import LatestSnippetCard from './home/components/LatestSnippetCard';

  export default {
    head() {
      return {
        titleTemplate: ''
      }
    },

    components: {
      LatestSnippetCard
    },

    data() {
      return {
        snippets: [],
        SNIPPETS_EXAMPLE_UUID: process.env.SNIPPETS_EXAMPLE_UUID
      }
    },

    async asyncData({ app }) {
      let snippets = await app.$axios.$get('snippets?limit=10');

      return {
        snippets: snippets.data
      }
    }
  }
</script>
