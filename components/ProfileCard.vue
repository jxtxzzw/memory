<template>
  <div>
    <Row>
      <Avatar shape="circle" size="large" :src="avatar" />
      <Button type="text" :ghost="ghost">
        {{ username }}
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
  data () {
    return {
      avatar: '',
      username: ''
    }
  },
  computed: {
    state () {
      return JSON.stringify(this.$auth.$state, undefined, 2)
    }
  },
  async mounted () {
    await this.getUserInfo()
  },
  methods: {
    async getUserInfo () {
      const user = await this.$axios.$post('/api/User/userinfo', {
        user: this.$auth.$state.user.id
      })
      this.avatar = user.avatar
      this.username = user.username
    }
  }
}
</script>

<style scoped>
</style>
