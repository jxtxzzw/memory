<template>
  <div>
    <ItemInfo :data="data" />
    <CommentPage :item="data.id" />
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
      console.log(this.data)
    }
  }
}
</script>

<style scoped>

</style>
