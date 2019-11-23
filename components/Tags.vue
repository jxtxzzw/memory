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
  name: 'Tags',
  data () {
    return {
      tags: [],
      inputVisible: false,
      inputValue: ''
    }
  },
  methods: {
    handleClose (event, removedTag) {
      this.tags = this.tags.filter(tag => tag !== removedTag)
      this.$emit('cancel', removedTag)
    },
    // 点击添加标签时，出现一个相等大小的输入框覆盖在 Tag 上，以便可以输入内容
    showInput () {
      this.inputVisible = true
      this.$nextTick(function () {
        this.$refs.input.focus()
      })
    },
    // 实时更新输入内容
    handleInputChange (e) {
      this.inputValue = e.target.value
    },
    // 按下回车，或输入框失去焦点时，确认输入内容
    handleInputConfirm () {
      const inputValue = this.inputValue
      let tags = this.tags
      // tags 中的内容不能重复
      if (inputValue && !tags.includes(inputValue)) {
        tags = [...tags, inputValue]
      }
      // 对 Object 重新赋值，清空输入框，并根据新 tags 刷新页面
      Object.assign(this, {
        tags,
        inputVisible: false,
        inputValue: ''
      })
      this.$emit('add', inputValue)
    }
  }
}
</script>

<style scoped>

</style>
