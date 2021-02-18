<template>
  <div class="container mx-auto px-6 lg:px-0 mt-16">
    <div class="flex justify-between">
      <h1 class="font-medium text-xl mb-6 text-gray-600">
        Your snippets ({{ snippets.length }})
      </h1>
      <a href="#" @click.prevent="createSnippet">
        + Create snippet
      </a>
    </div>

    <div v-if="snippets.length === 0">
      You currently have no snippets saved.
    </div>

    <DashboardSnippetCard 
      v-for="snippet in snippets"
      :key="snippet.uuid"
      :snippet="snippet"
      @deleted="handleSnippetDeleted"
    />
    
  </div>
</template>

<script>
  import DashboardSnippetCard from './components/DashboardSnippetCard';

  export default {
    components: {
      DashboardSnippetCard
    },
    data() {
      return {
        snippets: []
      }
    },
    middleware: [
      'auth'
    ],
    methods: {
      async createSnippet() {
        let snippet = await this.$axios.$post('snippets');

        this.$router.push({
          name: 'snippets-id-edit',
          params: {
            id: snippet.data.uuid
          }
        });
      },
      handleSnippetDeleted(snippet) {
        this.snippets = this.snippets.filter((s) => s.uuid !== snippet.uuid);
      }
    },
    async asyncData({ app }) {
      let snippets = await app.$axios.$get('me/snippets');

      return {
        snippets: snippets.data
      }
    }
    
  }
</script>