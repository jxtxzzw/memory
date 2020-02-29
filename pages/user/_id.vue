<template>
  <div>
    <Row>
      <Col span="8">
      <UserInfoCard v-if="parseInt(id) > 0" :user="parseInt(id)" />
      </Col>
      <Col span="16">
      <Divider> {{ username }} 的动态 </Divider>
      <MyActivity :user="parseInt($route.params.id)" />
      </Col>
    </Row>
  </div>
</template>

<script>
import MyActivity from '../../components/MyActivity'
import UserInfoCard from '../../components/UserInfoCard'
export default {
  components: { UserInfoCard, MyActivity },
  middleware: ['auth'],
  validate ({ params }) {
    return /^\d+$/.test(params.id)
  },
  data () {
    return {
      username: '',
      avatar: '',
      id: ''
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
      this.avatar = user.avatar
      this.id = user.id
    }
  }
}
</script>

<style>
</style>
