<template>
  <div>
    <Scroll
      :on-reach-bottom="handleReachBottom"
      loading-text="加载中……"
      :height="scrollHeight"
    >
      {{ itemNumberPerLine }} <br>
      {{ itemSpanInLastLine }}
      <Row type="flex" justify="center" :gutter="itemSpan">
        <i-col v-for="(item, index) in crowdList" :key="index">
          <Card style="margin: 32px 0; width: 320px">
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
          <Card style="margin: 32px 0; width: 320px">
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
      itemSpan: 70,
      itemWidth: 320,
      itemHeight: 320,
      list1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      screenHeight: 1000,
      screenWidth: 1000
    }
  },
  computed: {
    scrollHeight () {
      const layoutHeight = this.screenHeight > 170 ? this.screenHeight - 170 : this.screenHeight
      const itemHeight = this.list1.length / 4 * 300
      return itemHeight < layoutHeight ? itemHeight : layoutHeight
    },
    layoutWidth () {
      return this.screenWidth - 100 - 1.5
    },
    itemNumberPerLine () {
      return Math.floor(this.layoutWidth / (this.itemWidth + this.itemSpan))
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
      return (this.layoutWidth - this.itemNumberPerLine * this.itemWidth - (this.itemNumberPerLine - 1) * this.itemSpan) / 2 - this.itemSpan / 2
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
    this.screenHeight = document.body.clientHeight
    this.screenWidth = document.body.clientWidth
    const that = this
    window.onresize = () => {
      return (() => {
        window.screenHeight = document.body.clientHeight
        that.screenHeight = window.screenHeight
      })()
    }
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth
        that.screenWidth = window.screenWidth
      })()
    }
  },
  methods: {
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
