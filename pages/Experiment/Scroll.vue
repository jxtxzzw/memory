<template>
  <div>
    <!-- 无限滚动，ref 是为了下面获取 Content 宽度 -->
    <!-- 使用计算属性计算出触发滚动处理的高度 -->
    <Scroll
      ref="scroll"
      :on-reach-bottom="handleReachBottom"
      loading-text="加载中……"
      :height="scrollHeight"
    >
      <Button @click="createItemModal = true"> {{createItemModal}} </Button>
      <EditItemModal :modal="createItemModal" @modalVisibleChange="handleModalVisibleChange" />
      <Alert show-icon>
        无限滚动
        <span slot="desc">
          滚动到展示区域最下面，会触发异步加载，加载后面 10 个 Item
        </span>
      </Alert>
      <!-- 对 Row 使用 flex 布局，固定每个 item 的宽度和 item 之间的间距，使用 center 对齐，左右两边留白可变化 -->
      <!-- 增加 margin 为 0 的样式，避免因为 gutter 导致 flex 宽度大于 Content 宽度而出现水平滚动条 -->
      <!-- 另可选样式为使用 flex space-between 样式，为左右留白固定，item 宽度固定，item 间距动态变化 -->
      <Row type="flex" justify="center" :gutter="itemSpan" style="margin-left: 0; margin-right: 0;">
        <!-- 除最后一行以外的 item 在 crowdList 中 -->
        <i-col v-for="item in crowdList" :key="item.id">
          <nuxt-link :to="{name:'item-id', params: {id:item.id}}">
            <Card :style="{margin: itemMargin + 'px 0', width: itemWidth + 'px', height: itemHeight + 'px'}">
              <div style="text-align:center">
                <img :src="'/upload/' + item.cover" />
                <h3>{{ item.title }}</h3>
              </div>
            </Card>
          </nuxt-link>
        </i-col>
      </Row>
      <!-- 处理最后一行 item，使用样式 flex start，从左往右排布 -->
      <!-- gutter 与 style 的处理同上，依然固定 item 之间的间距 -->
      <Row type="flex" justify="start" :gutter="itemSpan" style="margin-left: 0; margin-right: 0;">
        <!-- 最后一行左边留出与上面相等的留白，是一个 div 占位 -->
        <div :style="{width: itemSpanInLastLine + 'px'}"></div>
        <i-col v-for="item in lastLineList" :key="item.id">
          <nuxt-link :to="{name:'item-id', params: {id:item.id}}">
            <Card :style="{margin: itemMargin + 'px 0', width: itemWidth + 'px', height: itemHeight + 'px'}">
              <div style="text-align:center">
                <img :src="'/upload/' + item.cover" style="width: 100%" />
                <h3>{{ item.title }}</h3>
              </div>
            </Card>
          </nuxt-link>
        </i-col>
      </Row>
    </Scroll>
  </div>
</template>
<script>
import EditItemModal from '~/components/EditItemModal'
export default {
  components: { EditItemModal },
  middleware: ['auth'],
  data () {
    return {
      createItemModal: false,
      // 自定义 item 样式
      itemMargin: 32, // 每一层之间的间距，应用在 Card 组件的 margin
      itemSpan: 20, // item 之间的间距，应用在 Row 组件的 gutter
      itemWidth: 220, // item 的宽度
      itemHeight: 420, // item 的高度
      // 内容数组
      list1: [],
      // 动态获取内容展示的宽度和高度
      screenHeight: 0,
      scrollContentWidth: 0 // 真正存放内容的滚动区域的宽度，动态获取
    }
  },
  computed: {
    // 计算触发滚动的高度
    scrollHeight () {
      // 浏览器窗口高度减去 2 个高度为 1 的 boarder 得到 layout
      // 再减去 64 的 layout header 和 69 的 layout footer 高度，得到 layout content 高度
      // 再减去高度 2 个高度为 1 的 bordered card，和 2 个高为 16 的 card body padding
      // 总计 169，魔术数
      const aroundArea = 169
      // 计算最大滚动区域大小，确保整个滚动区域在浏览器窗口高度内，即不会出现垂直滚动条
      const maxScrollHeight = this.screenHeight - aroundArea
      // item 个数除以每一行的 item 个数，向上取整，得到总行数
      // 每一个 item 的实际高度，等于 itemHeight 加上上下 2 个 margin 的 itemMargin，相乘得到 item 占用高度
      const itemHeight = Math.ceil(this.list1.length / this.itemNumberPerLine) * (this.itemHeight + 2 * this.itemMargin)
      // 如果 item 所占高度不足以撑满整个滚动区域，则触发滚动高度应为 item 所占高度，否则，触发滚动的高度应为整个滚动区域的高度
      return itemHeight < maxScrollHeight ? itemHeight : maxScrollHeight
    },
    // 计算每一行能够放多少个 item，由于 item 宽度和间距固定，可使用下面公式，向下取整
    itemNumberPerLine () {
      return Math.floor((this.scrollContentWidth + this.itemSpan) / (this.itemWidth + this.itemSpan))
    },
    // 计算最后一行的 item 从哪一个 index 开始
    itemIndexInLastLine () {
      return this.list1.length - this.list1.length % this.itemNumberPerLine
    },
    // crowdList 存放除最后一行以外的其他 item，对总 list 做切片
    crowdList () {
      return this.list1.slice(0, this.itemIndexInLastLine)
    },
    // 最后一行的 item，对 list 做切片
    lastLineList () {
      return this.list1.slice(this.itemIndexInLastLine)
    },
    // 计算左右留白的大小，为内容区域大小，先减去各 item 的宽度和，再减去 (item - 1) 个间距的宽度和，得到结果的二分之一
    itemSpanInLastLine () {
      return (this.scrollContentWidth - this.itemNumberPerLine * this.itemWidth - (this.itemNumberPerLine - 1) * this.itemSpan) / 2
    }
  },
  mounted () {
    this.loadData()
    // mounted 的时候更新内容区域初始宽度
    this.getScrollContentWidth()
    // window.onresize 如果这里再做一次，就会抵消掉 default layout 设置的 onresize，所以只能通过增加钩子的方法来达到目的
    this.addWindowOnResizeHook()
  },
  methods: {
    // 更新窗口高度 screenHeight，以处理 Scroll 组件中加载区域的的高度
    // 不需要观察浏览器宽度，因为宽度直接通过 Scroll 的成员获得
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
      this.screenHeight = defaultLayoutVue.screenHeight
      // 在 default layout 的 onResizeHook 中添加一个函数，表示窗口大小变化时，需要更新该组件的 screenHeight 为 default layout 的 screenHeight
      defaultLayoutVue.onResizeHook.push(() => {
        this.screenHeight = defaultLayoutVue.screenHeight
      })
    },
    // 获取无限滚动的内容区域的宽度
    getScrollContentWidth () {
      const me = this
      // 依然要借助 $nextTick 来做，自定义一个函数
      // 使用 nextTick 为了保证 DOM 元素都已经渲染完毕
      this.$nextTick(function () {
        // me 是 this，通过上面定义的 Scroll 的 ref 来取出这个组件
        // $el 获取这个组件，通过 div class 的名字 ivu-scroll-content 来获取它内部的一个 div 的元素
        // 是一个数组，由于只有 1 个 div，取出数组[0]元素，获取 clientWidth
        this.scrollContentWidth = me.$refs.scroll.$el.getElementsByClassName('ivu-scroll-content')[0].clientWidth
      })
    },
    // 处理无限滚动区域到达底部的动作
    // TODO 未完成：应当时一个异步请求，从后端获取数据
    async loadData (type) {
      this.list1 = await this.$axios.$post('/api/Item/itemList', { type })
    },
    handleReachBottom () {
      return new Promise((resolve) => {
        setTimeout(() => {
          const last = this.list1[this.list1.length - 1]
          for (let i = 1; i < 11; i++) {
            this.list1.push(last + i)
          }
          resolve()
        }, 2000)
      })
    },
    handleModalVisibleChange (status) {
      this.createItemModal = status
    }
  }
}
</script>
