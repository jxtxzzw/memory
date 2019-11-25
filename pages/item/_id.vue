<template>
  <div>
    <p>{{ $route.params.id }}</p>
  </div>
</template>

<script>
export default {
  validate ({ params }) {
    return /^\d+$/.test(params.id)
  }
}
</script>

<style scoped>

</style>
