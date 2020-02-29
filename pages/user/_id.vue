<template>
  <div>
    <Row>
      <Col span="8">
      <UserInfoCard v-if="parseInt(id) > 0" :user="parseInt(id)" />
      </Col>
      <Col span="16">
      <Divider> {{ username }} 的动态 </Divider>
      <div :style="{height: cardInnerHeight + 'px', overflowY: 'auto'}">
        <MyActivity :user="parseInt($route.params.id)" />
      </div>
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
      id: '',
      screenHeight: 0
    }
  },
  computed: {
    cardInnerHeight () {
      // cardHeight 与 default layout 计算类似，为屏幕高度减去 137，之后需要再减去 2 个 16 的 padding
      // 这里还要减去 Divider 的 24 以及它的 2 个 margin
      return this.screenHeight - 137 - 32 - (24 + 16 + 16)
    }
  },
  async mounted () {
    this.addWindowOnResizeHook()
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
    },
    addWindowOnResizeHook () {
      // 找到根元素下面谁是 default layout
      let defaultLayoutVue
      for (let i = 0; i < this.$root.$children.length; i++) {
        if (this.$root.$children[i].onResizeHook) {
          defaultLayoutVue = this.$root.$children[i]
          break
        }
      }
      // 将 default layout 的 screenHeight 留下来，作为初始值
      this.screenHeight = document.body.clientHeight
      this.screenWidth = document.body.clientWidth
      // 在 default layout 的 onResizeHook 中添加一个函数，表示窗口大小变化时，需要更新该组件的 screenHeight 为 default layout 的 screenHeight
      defaultLayoutVue.onResizeHook.push(() => {
        this.screenHeight = document.body.clientHeight
        this.screenWidth = document.body.clientWidth
      })
    }
  }
}
</script>

<style>
</style>
