<template>
  <div>
    <Row>
      <i-col span="12">
        <Avatar shape="square" :src="$auth.$state.user.picture" />
      </i-col>
      <i-col span="12">
        <h3> {{ $auth.$state.user.username }}</h3>
      </i-col>
    </Row>
  </div>
</template>

<script>

export default {
  middleware: ['auth'],
  name: 'ProfileCard',
  computed: {
    state () {
      return JSON.stringify(this.$auth.$state, undefined, 2)
    }
  }
}
</script>

<style scoped>

</style>
