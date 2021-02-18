<template>
  <div>
    <div class="bg-white mb-16">
      <div class="container mx-auto px-6 lg:px-0 py-10 pb-16">
        <h1 class="text-4xl text-gray-700 font-medium leading-tight mb-4">
          {{ user.name }}
        </h1>
        <div class="text-sm text-gray-600">
          Member since: {{this.joined}}
        </div>
      </div>
    </div>

    <div class="container mx-auto px-6 lg:px-0">
      <h1 class="font-medium text-xl mb-6 text-gray-600">
        Public snippets ({{snippets.length}})
      </h1>

      <SnippetCard 
        v-for="snippet in snippets"
        :key="snippet.uuid"
        :snippet="snippet"
      />
    </div>
  </div>
</template>

<script>
  import moment from 'moment';
  import SnippetCard from '@/components/snippets/SnippetCard'
  export default {
    components: {
      SnippetCard
    },

    head() {
      return {
        title: `Snippets by ${this.user.name}`
      }
    },

    data() {
      return {
        user: null,
        snippets: []
      }
    },

    computed: {
      joined() {
        return moment(this.user.joined).format('Do MMMM YY');
      }
    },

    async asyncData( {app, params} ) {
      let user = await app.$axios.$get(`users/${params.id}`);
      let snippets = await app.$axios.$get(`users/${params.id}/snippets`)


      return {
        user: user.data,
        snippets: snippets.data
      }
    }

  }
</script>
