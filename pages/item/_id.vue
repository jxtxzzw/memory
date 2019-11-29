<template>
  <div>
    <Row>
      <i-col span="12">
        <ItemInfo :data="data" />
      </i-col>
      <i-col span="12" >
        <CommentPage v-if="!reload" :item="data.id" @reloadComment="reloadComment" style="overflow-y: auto"/>
      </i-col>
    </Row>
  </div>
</template>

<script>
import ItemInfo from '../../components/ItemInfo'
import CommentPage from '../../components/CommentPage'
export default {
  components: { CommentPage, ItemInfo },
  middleware: ['auth'],
  validate ({ params }) {
    return /^\d+$/.test(params.id)
  },
  data () {
    return {
      reload: false,
      data: {
        id: '',
        type: '',
        note: '',
        cover: '',
        rating: ''
      }
    }
  },
  async mounted () {
    await this.loadData()
  },
  methods: {
    async loadData () {
      this.data = await this.$axios.$post('/api/Item/itemInfo', {
        id: this.$route.params.id
      })
    },
    reloadComment () {
      this.reload = true
      // 在组件移除后，重新渲染组件
      // this.$nextTick 可实现在 DOM 状态更新后，执行传入的方法
      this.$nextTick(() => {
        this.reload = false
      })
    }
  }
}
</script>

<style scoped>

</style>
