<template>
  <Card style="width:160px ">
    <div style="text-align:center">
      <Row>
        <i-col span="12">
          <Avatar shape="square" src="../../assets/default.jpg" />
        </i-col>
        <i-col span="12">
          <h3> {{ username }}</h3>
        </i-col>
      </Row>
    </div>
  </Card>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ProfileCard',
  props: {
    id: {
      type: Number,
      default () {
        return 0
      }
    }
  },
  data () {
    return {
      avatar: '~assets/default.jpg',
      username: '游客'
    }
  },
  mounted () {
    this.getUser()
  },
  methods: {
    getUser () {
      axios.get() // 请求用户数据
    }
  }
}
</script>

<style scoped>

</style>
