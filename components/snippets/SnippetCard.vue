<template>
  <div class="flex flex-wrap lg:flex-nowrap justify-between items-center bg-white p-8 rounded-lg w-full mb-2">
    <div class="mr-8 mb-2 lg:mb-0">
      <h2 class="text-gray-600 text-xl leading-snug">
        <nuxt-link 
          class="text-gray-600"
          :to="{
            name: 'snippets-id',
            params: {
              id: snippet.uuid
            }
          }"
        >
          {{ snippet.title || 'Untitled Snippet' }}
        </nuxt-link>
      </h2>

      <div class="text-gray-500 font-medium mr-6">
        {{ snippet.steps_count }} steps
      </div>
    </div>
    <div>
      <slot />
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      snippet: {
        required: true,
        type: Object
      }
    }
  }
</script>