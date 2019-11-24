<template>
  <div>
    <!-- 无限滚动，ref 是为了下面获取 Content 宽度 -->
    <Scroll
      ref="scroll"
      :on-reach-bottom="handleReachBottom"
      loading-text="加载中……"
      :height="scrollHeight"
    >
      <!-- 对 Row 使用 flex 布局，固定每个 item 的宽度和 item 之间的间距，使用 center 对齐，左右两边留白可变化 -->
      <!-- 增加 margin 为 0 的样式，避免因为 gutter 导致 flex 宽度大于 Content 宽度而出现水平滚动条 -->
      <!-- 另可选样式为使用 flex space-between 样式，为左右留白固定，item 宽度固定，item 间距动态变化 -->
      <Row type="flex" justify="center" :gutter="itemSpan" style="margin-left: 0; margin-right: 0;">
        <!-- 除最后一行以外的 item 在 crowdList 中 -->
        <i-col v-for="(item, index) in crowdList" :key="index">
          <Card :style="{margin: '32px 0', width: itemWidth + 'px', height: itemHeight + 'px'}">
            <div style="text-align:center">
              <img src="https://file.iviewui.com/dist/2ecd3b0452aa197097d5131afacab7b8.png">
              <h3>这是第 {{ index + 1 }} 本书</h3>
            </div>
          </Card>
        </i-col>
      </Row>
      <!-- 处理最后一行 item，使用样式 flex start，从左往右排布 -->
      <!-- gutter 与 style 的处理同上，依然固定 item 之间的间距 -->
      <Row type="flex" justify="start" :gutter="itemSpan" style="margin-left: 0; margin-right: 0;">
        <!-- 最后一行左边留出与上面相等的留白，是一个 div 占位 -->
        <div :style="{width: itemSpanInLastLine + 'px'}"></div>
        <i-col v-for="(item, index) in lastLineList" :key="index">
          <Card :style="{margin: '32px 0', width: itemWidth + 'px', height: itemHeight + 'px'}">
            <div style="text-align:center">
              <img src="https://file.iviewui.com/dist/2ecd3b0452aa197097d5131afacab7b8.png">
              <h3>这是第 {{ index + itemIndexInLastLine + 1 }} 本书</h3>
            </div>
          </Card>
        </i-col>
      </Row>
    </Scroll>
  </div>
</template>
<script>
export default {
  data () {
    return {
      itemSpan: 20, // item 之间的间距
      itemWidth: 220, // item 的宽度
      itemHeight: 420, // item 的高度
      list1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      screenHeight: 1000,
      scrollContentWidth: 0 // 真正存放内容的滚动区域的宽度，动态获取
    }
  },
  computed: {
    scrollHeight () {
      const layoutHeight = this.screenHeight > 170 ? this.screenHeight - 170 : this.screenHeight
      const itemHeight = this.list1.length / 4 * 300
      return itemHeight < layoutHeight ? itemHeight : layoutHeight
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
  // 添加 watch，观察浏览器窗口变化
  watch: {
    // 更新窗口高度，以处理 Scroll 组件中加载区域的的高度
    // 不需要观察浏览器宽度，因为宽度直接通过 Scroll 的成员获得
    screenHeight (val) {
      if (!this.timer) {
        this.screenHeight = val
        this.timer = true
        const that = this
        setTimeout(function () {
          that.init()
          that.timer = false
        }, 400)
      }
    }
  },
  mounted () {
    // mounted 的时候更新内容区域初始宽度
    this.getScrollContentWidth()
    // 记录浏览器窗口初始宽度
    this.screenHeight = document.body.clientHeight
    // 注册 on resize
    const that = this
    window.onresize = () => {
      return (() => {
        // 浏览器窗口大小变化时，Scroll Content 区域也会发生变化，因此需要更新
        this.getScrollContentWidth()
        // 更新浏览器窗口高度
        window.screenHeight = document.body.clientHeight
        that.screenHeight = window.screenHeight
      })()
    }
  },
  methods: {
    // 获取无限滚动的内容区域的宽度
    getScrollContentWidth () {
      const me = this
      // 依然要借助 $nextTick 来做，自定义一个函数
      this.$nextTick(function () {
        // me 是 this，通过上面定义的 Scroll 的 ref 来取出这个组件
        // $el 获取这个组件，通过 div class 的名字 ivu-scroll-content 来获取它内部的一个 div 的元素
        // 是一个数组，由于只有 1 个 div，取出数组[0]元素，获取 clientWidth
        this.scrollContentWidth = me.$refs.scroll.$el.getElementsByClassName('ivu-scroll-content')[0].clientWidth
      })
    },
    // 处理无限滚动区域到达底部的动作
    // TODO 未完成：应当时一个异步请求，从后端获取数据
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
    }
  }
}
</script>
