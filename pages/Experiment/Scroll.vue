<template>
  <div style="height: 600px">
    {{ screenHeight }}
    <Scroll :on-reach-bottom="handleReachBottom" :height="screenHeight">
      <Row>
        <i-col v-for="(item, index) in list1" :key="index" span="6">
          <Card style="margin: 32px 0">
            <div style="text-align:center">
              <img src="https://file.iviewui.com/dist/2ecd3b0452aa197097d5131afacab7b8.png">
              <h3>这是第 {{ index }} 本书</h3>
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
      list1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      screenHeight: 1000
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
    }
  },
  mounted () {
    const that = this
    window.onresize = () => {
      return (() => {
        window.screenHeight = document.body.clientHeight
        that.screenHeight = window.screenHeight
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
