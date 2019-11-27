<template>
  <div>
    <p>{{ data.id }}</p>
    <p>{{ data.title }}</p>
    <p>{{ data.type }}</p>
    <p>{{ data.note }}</p>
    <p>{{ data.cover }}</p>
    <p>{{ data.rating }}</p>
  </div>
</template>

<script>
export default {
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
    }
  }
}
</script>

<style scoped>

</style>
