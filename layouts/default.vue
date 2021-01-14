<template>
  <div>
    <Navigation></Navigation>
    <Nuxt />
  </div>
</template>

<script>
  import Navigation from '@/components/global/Navigation'

  export default {
    components: {
      Navigation
    }
  }
</script>