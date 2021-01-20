<template>
  <a 
    href="#"
    :to="{}"
    class="block bg-blue-500 mb-2 p-3 rounded-lg"
    title="Delete step"
    @click.prevent="deleteStep"
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 fill-current text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  </a>
</template>

<script>
export default {
  props: {
    snippet: {
      required: true,
      type: Object
    },
    currentStep: {
      required: true,
      type: Object
    }
  },
  methods: {
    async deleteStep() {
      await this.$axios.$delete(`snippets/${this.snippet.uuid}/steps/${this.currentStep.uuid}`)

      this.$emit('stepDeleted', this.currentStep)
    }
  }
  
}
</script>