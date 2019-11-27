<template>
  <div>
    <Row>
      {{ $auth.$state.user.avatar }}
      <Avatar shape="circle" size="large" :src="$auth.$state.user.avatar" />
      <Button type="text" :ghost="ghost">
        {{ $auth.$state.user.username }}
      </Button>
    </Row>
  </div>
</template>

<script>

export default {
  middleware: ['auth'],
  name: 'ProfileCard',
  props: {
    ghost: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    state () {
      return JSON.stringify(this.$auth.$state, undefined, 2)
    }
  }
}
</script>

<style scoped>
</style>
