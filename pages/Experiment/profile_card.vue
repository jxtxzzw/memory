<template>
  <Card style="width:320px">
    <div style="text-align:center">
      <img src="~/assets/default.jpg">
      <h3>A high quality UI Toolkit based on Vue.js</h3>
    </div>
  </Card>
</template>

<script>
export default {
  name: 'profile_card',
  data () {
    return {
      avatar: '~/assets/default.jpg',
      username: '游客'
    }
  }
}
</script>

<style scoped>

</style>
