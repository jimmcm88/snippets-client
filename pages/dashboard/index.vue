<template>
  <div class="container mx-auto px-6 lg:px-0 mt-16">
    <div class="flex justify-between">
      <h1 class="font-medium text-xl mb-6 text-gray-600">
        Your snippets (1)
      </h1>
      <a href="#" @click.prevent="createSnippet">
        + Create snippet
      </a>
    </div>
    
  </div>
</template>

<script>
export default {
  methods: {
    async createSnippet() {
      let snippet = await this.$axios.$post('snippets');

      this.$router.push({
        name: 'snippets-id-edit',
        params: {
          id: snippet.data.uuid
        }
      });
    }
  }
}
</script>