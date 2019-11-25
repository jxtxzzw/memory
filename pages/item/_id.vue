<template>
  <div>
    <p>{{ $route.params.id }}</p>
  </div>
</template>

<script>
export default {
  validate ({ params }) {
    // TODO 完成校验
  }
}
</script>

<style scoped>

</style>
