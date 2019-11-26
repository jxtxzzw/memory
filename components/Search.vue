<template>
  <div>
    <Input v-model="searchInput" @on-change="realTimeSearch">
    <Select
      slot="prepend"
      v-model="searchType"
      clearable
      placeholder="搜索全部类型"
      not-found-text="无匹配数据"
      style="width: 120px"
      @on-change="realTimeSearch"
    >
      <Option v-for="type in types" :key="type.value" :value="type.value">
        {{ type.label }}
      </Option>
    </Select>
    </Input>
  </div>
</template>

<script>
export default {
  name: 'Search',
  data () {
    return {
      types: [],
      searchInput: '',
      searchType: []
    }
  },
  async mounted () {
    await this.loadTypes()
  },
  methods: {
    async loadTypes () {
      this.types = await this.$axios.$post('/api/Type/getTypeList')
    },
    realTimeSearch () {
      this.$emit('search', this.searchInput, this.searchType)
    }
  }
}
</script>

<style scoped>

</style>
