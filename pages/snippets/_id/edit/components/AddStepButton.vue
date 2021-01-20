<template>
  <a
    href="#"
    @click.prevent="addStep"
    :to="{}"
    class="block bg-blue-500 mb-2 p-3 rounded-lg"
    :title="`Add step ${position}`"
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 fill-current text-white" viewBox="0 0 24 24" stroke="currentColor">
      <path d="M12 6V12M12 12V18M12 12H18M12 12L6 12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </a>
</template>

<script>
export default {
  props: {
    position: {
      required: true,
      type: String
    },
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
    async addStep() {
      let response = await this.$axios.$post(`snippets/${this.snippet.uuid}/steps`, {
        [this.position]: this.currentStep.uuid
      });

      this.$emit('stepAdded', response.data);
    }
  }
}
</script>