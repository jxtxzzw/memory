<template>
  <div>
    <Row>
      <Avatar shape="square" :src="$auth.$state.user.picture" />
      <Button type="text" ghost>
        {{ $auth.$state.user.username }}
      </Button>
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
