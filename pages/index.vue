<template>
  <div class="container mx-auto px-6 lg:px-0">
    <h1 class="font-medium text-2xl">Home</h1>
    <p>
      Test <a>Click me</a>
    </p>
  </div>
</template>

<script>
export default {
  head() {
    return {
      titleTemplate: ''
    }
  },
  mounted() {
    console.log(process.env);
  }
}
</script>
