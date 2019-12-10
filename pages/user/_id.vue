<template>
  <div>
    <Divider> {{ username }} 的动态 </Divider>
    <MyActivity :user="parseInt($route.params.id)" />
  </div>
</template>

<script>
import MyActivity from '../../components/MyActivity'
export default {
  components: { MyActivity },
  middleware: ['auth'],
  validate ({ params }) {
    return /^\d+$/.test(params.id)
  },
  data () {
    return {
      username: ''
    }
  },
  async mounted () {
    await this.loadData()
  },
  methods: {
    async loadData () {
      const user = await this.$axios.$post('/api/User/userinfo', {
        user: this.$route.params.id
      })
      this.username = user.username
    }
  }
}
</script>

<style>
</style>
