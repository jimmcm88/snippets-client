<template>
  <SnippetCard :snippet="snippet">
    <nuxt-link :to="{
        name: 'author-id',
        params: {
          id: snippet.author.data.username
        }
      }"
    >
      {{ snippet.author.data.name }}
    </nuxt-link>
  </SnippetCard>
</template>

<script>
  import SnippetCard from '@/components/snippets/SnippetCard';
  
  export default {
    props: {
      snippet: {
        required: true,
        type: Object
      }
    },
    components: {
      SnippetCard
    },
  }
</script>