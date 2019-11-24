<template>
  <div>
    <Scroll
      ref="scroll"
      :on-reach-bottom="handleReachBottom"
      loading-text="加载中……"
      :height="scrollHeight"
    >
      <Row type="flex" justify="center" :gutter="itemSpan">
        <i-col v-for="(item, index) in crowdList" :key="index">
          <Card :style="{margin: '32px 0', width: itemWidth + 'px', height: itemHeight + 'px'}">
            <div style="text-align:center">
              <img src="https://file.iviewui.com/dist/2ecd3b0452aa197097d5131afacab7b8.png">
              <h3>这是第 {{ index + 1 }} 本书</h3>
            </div>
          </Card>
        </i-col>
      </Row>
      <Row type="flex" justify="start" :gutter="itemSpan">
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
      itemSpan: 80,
      itemWidth: 220,
      itemHeight: 420,
      list1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      screenHeight: 1000,
      screenWidth: 1000,
      inputStyWidth: 0,
      scrollContentWidth: 0
    }
  },
  computed: {
    scrollHeight () {
      const layoutHeight = this.screenHeight > 170 ? this.screenHeight - 170 : this.screenHeight
      const itemHeight = this.list1.length / 4 * 300
      return itemHeight < layoutHeight ? itemHeight : layoutHeight
    },
    itemNumberPerLine () {
      return Math.floor((this.scrollContentWidth + this.itemSpan) / (this.itemWidth + this.itemSpan))
    },
    itemIndexInLastLine () {
      return this.list1.length - this.list1.length % this.itemNumberPerLine
    },
    crowdList () {
      return this.list1.slice(0, this.itemIndexInLastLine)
    },
    lastLineList () {
      return this.list1.slice(this.itemIndexInLastLine)
    },
    itemSpanInLastLine () {
      return (this.scrollContentWidth - this.itemNumberPerLine * this.itemWidth - (this.itemNumberPerLine - 1) * this.itemSpan) / 2
    }
  },
  watch: {
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
    },
    screenWidth (val) {
      if (!this.timer) {
        this.screenWidth = val
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
    this.getScrollContentWidth()
    this.screenHeight = document.body.clientHeight
    this.screenWidth = document.body.clientWidth
    const that = this
    window.onresize = () => {
      return (() => {
        this.getScrollContentWidth()
        window.screenWidth = document.body.clientWidth
        that.screenWidth = window.screenWidth
        window.screenHeight = document.body.clientHeight
        that.screenHeight = window.screenHeight
      })()
    }
  },
  methods: {
    getScrollContentWidth () {
      const me = this
      this.$nextTick(function () {
        this.scrollContentWidth = me.$refs.scroll.$el.getElementsByClassName('ivu-scroll-content')[0].clientWidth
      })
      console.log('in method: ' + this.scrollContentWidth)
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
    }
  }
}
</script>
