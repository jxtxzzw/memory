<template>
  <div>
    <Tag v-for="item in tags" :key="item" :name="item" closable @on-close="handleClose">
      {{ item }}
    </Tag>
    <Input
      v-if="inputVisible"
      ref="input"
      type="text"
      size="small"
      :style="{ width: '78px' }"
      :value="inputValue"
      @on-change="handleInputChange"
      @on-blur="handleInputConfirm"
      @on-enter="handleInputConfirm"
    />
    <Button v-else icon="ios-add" type="dashed" size="small" @click="showInput">
      添加标签
    </Button>
  </div>
</template>

<script>
export default {
  name: 'Demo',
  data () {
    return {
      tags: ['Tag 1', 'Tag 2', 'Tag 3'],
      inputVisible: false,
      inputValue: ''
    }
  },
  methods: {

    handleClose (event, removedTag) {
      const tags = this.tags.filter(tag => tag !== removedTag)
      this.tags = tags
    },

    showInput () {
      this.inputVisible = true
      this.$nextTick(function () {
        this.$refs.input.focus()
      })
    },

    handleInputChange (e) {
      this.inputValue = e.target.value
    },

    handleInputConfirm () {
      const inputValue = this.inputValue
      let tags = this.tags
      if (inputValue && !tags.includes(inputValue)) {
        tags = [...tags, inputValue]
      }
      Object.assign(this, {
        tags,
        inputVisible: false,
        inputValue: ''
      })
    }
  }
}
</script>

<style scoped>

</style>
