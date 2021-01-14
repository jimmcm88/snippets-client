<template>
  <nuxt-link 
    :to="step ? { 
      query: {
        step: step.uuid
      }
    } : {} "
    class="block bg-blue-500 mb-2 p-3 rounded-lg"
    title="Previous step"
    :class="{
      'opacity-25 pointer-events-none' : !step
    }"
  >
    <slot />
  </nuxt-link>
</template>

<script>
export default {
  props: {
    step: {
      required: true,      
    }
  }
}
</script>
