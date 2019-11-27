<template>
  <div>
    <p>{{ $route.params.id }}</p>
  </div>
</template>

<script>
export default {
  middleware: ['auth'],
  validate ({ params }) {
    return /^\d+$/.test(params.id)
  }
}
</script>

<style scoped>

</style>
