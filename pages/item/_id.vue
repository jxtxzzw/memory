<template>
  <div>
    <Row>
      <i-col span="12" :style="{height: itemInfoHeight + 'px', overflowY: 'auto'}">
        <ItemInfo ref="itemInfo" :data="data" />
      </i-col>
      <i-col span="12" :style="{height: itemInfoHeight + 'px', overflowY: 'auto'}">
        <Collapse v-model="value2" accordion>
          <Panel name="1">
            史蒂夫·乔布斯
            <p slot="content">
              史蒂夫·乔布斯（Steve Jobs），1955年2月24日生于美国加利福尼亚州旧金山，美国发明家、企业家、美国苹果公司联合创办人。
            </p>
          </Panel>
          <Panel name="2">
            斯蒂夫·盖瑞·沃兹尼亚克
            <p slot="content">
              斯蒂夫·盖瑞·沃兹尼亚克（Stephen Gary Wozniak），美国电脑工程师，曾与史蒂夫·乔布斯合伙创立苹果电脑（今之苹果公司）。斯蒂夫·盖瑞·沃兹尼亚克曾就读于美国科罗拉多大学，后转学入美国著名高等学府加州大学伯克利分校（UC Berkeley）并获得电机工程及计算机（EECS）本科学位（1987年）。
            </p>
          </Panel>
          <Panel name="3">
            乔纳森·伊夫
            <p slot="content">
              乔纳森·伊夫是一位工业设计师，现任Apple公司设计师兼资深副总裁，英国爵士。他曾参与设计了iPod，iMac，iPhone，iPad等众多苹果产品。除了乔布斯，他是对苹果那些著名的产品最有影响力的人。
            </p>
          </Panel>
        </Collapse>
      </i-col>
    </Row>
    <Row>
      <i-col span="24" :style="{height: itemInfoHeight + 'px', overflowY: 'auto'}">
        <CommentPage v-if="!reload" :item="data.id" @reloadComment="reloadComment" />
      </i-col>
    </Row>
  </div>
</template>

<script>
import ItemInfo from '../../components/ItemInfo'
import CommentPage from '../../components/CommentPage'
export default {
  components: { CommentPage, ItemInfo },
  middleware: ['auth'],
  validate ({ params }) {
    return /^\d+$/.test(params.id)
  },
  data () {
    return {
      screenHeight: 0,
      value2: '',
      reload: false,
      data: {
        id: '',
        type: '',
        note: '',
        cover: '',
        rating: ''
      }
    }
  },
  computed: {
    cardInnerHeight () {
      // cardHeight 与 default layout 计算类似，为屏幕高度减去 137，之后需要再减去 2 个 16 的 padding
      return this.screenHeight - 137 - 32
    },
    itemInfoHeight () {
      return Math.floor(this.cardInnerHeight / 2)
    }
  },
  async mounted () {
    await this.loadData()
    // 如果这里不做 onresize，那么触发 onresize 的时候会不会更新这个组件的 data
    // 如果这里再写 window.onresize = () => {} 就会覆盖掉 default layout 的 onresize 效果
    // 所以只能加钩子
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
      this.screenHeight = defaultLayoutVue.screenHeight
      // 在 default layout 的 onResizeHook 中添加一个函数，表示窗口大小变化时，需要更新该组件的 screenHeight 为 default layout 的 screenHeight
      defaultLayoutVue.onResizeHook.push(() => {
        this.screenHeight = defaultLayoutVue.screenHeight
      })
    },
    async loadData () {
      this.data = await this.$axios.$post('/api/Item/itemInfo', {
        id: this.$route.params.id
      })
    },
    reloadComment () {
      this.reload = true
      // 在组件移除后，重新渲染组件
      // this.$nextTick 可实现在 DOM 状态更新后，执行传入的方法
      this.$nextTick(() => {
        this.reload = false
      })
    }
  }
}
</script>

<style scoped>

</style>
