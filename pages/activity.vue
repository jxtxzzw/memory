<template>
  <div>
    <MyActivity :user="undefined" />
  </div>
</template>

<script>
import MyActivity from '../components/MyActivity'
export default {
  middleware: ['auth'],
  name: 'My',
  components: { MyActivity }
}
</script>

<style scoped>

</style>
