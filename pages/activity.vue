<template>
  <div :style="{height: cardInnerHeight + 'px', overflowY: 'auto'}">
    <MyActivity :user="undefined" />
  </div>
</template>

<script>
import MyActivity from '../components/MyActivity'
export default {
  middleware: ['auth'],
  name: 'My',
  components: { MyActivity },
  data () {
    return {
      screenHeight: 0
    }
  },
  computed: {
    cardInnerHeight () {
      // cardHeight 与 default layout 计算类似，为屏幕高度减去 137，之后需要再减去 2 个 16 的 padding
      return this.screenHeight - 137 - 32
    }
  },
  mounted () {
    this.addWindowOnResizeHook()
  },
  methods: {
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

<style scoped>

</style>
