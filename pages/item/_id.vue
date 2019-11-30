<template>
  <div>
    <Row>
      <i-col span="11" :style="{height: itemInfoHeight + 'px', overflowY: 'auto'}">
        <Divider> 基本信息 </Divider>
        <ItemInfo ref="itemInfo" :data="data" @success="handleSuccess" />
        <Divider> 讨论区 </Divider>
        <Button type="info" size="large" ghost long @click="showComment = true">
          查看该内容的讨论区
        </Button>
        <Modal
          v-model="showComment"
          :width="screenWidth / 2"
          title="讨论区"
          class-name="vertical-center-modal"
          :closable="false"
          :mask-closable="false"
          footer-hide
        >
          <CommentPage v-if="!reload" :item="data.id" @reloadComment="reloadComment" />
        </Modal>
      </i-col>
      <i-col offset="2" span="11" :style="{height: itemInfoHeight + 'px', overflowY: 'auto'}">
        <Divider> 我的评价 </Divider>
        <Rating :my="myRating" @success="handleSuccess" />
        <Divider> 所有评价 </Divider>
        <Collapse v-model="ratingName" accordion>
          <Panel v-for="rating in ratings" :key="rating.username" :name="rating.username">
            <Avatar size="small" :src="rating.avatar" />
            {{ rating.user }}
            <Rate :value="rating.rating" disabled show-text style="float: right; margin-right: 10px" />
            <p slot="content">
              {{ rating.review }}
            </p>
          </Panel>
        </Collapse>
      </i-col>
    </Row>
  </div>
</template>

<script>
import ItemInfo from '~/components/ItemInfo'
import CommentPage from '~/components/CommentPage'
import Rating from '~/components/Rating'
export default {
  components: { Rating, CommentPage, ItemInfo },
  middleware: ['auth'],
  validate ({ params }) {
    return /^\d+$/.test(params.id)
  },
  data () {
    return {
      showComment: false,
      screenHeight: 0,
      screenWidth: 0,
      ratingName: '',
      reload: false,
      data: {
        id: 0,
        type: '',
        note: '',
        cover: '',
        rating: 0
      },
      ratings: [],
      myRating: {
        item: 0
      }
    }
  },
  computed: {
    state () {
      return JSON.stringify(this.$auth.$state, undefined, 2)
    },
    cardInnerHeight () {
      // cardHeight 与 default layout 计算类似，为屏幕高度减去 137，之后需要再减去 2 个 16 的 padding
      return this.screenHeight - 137 - 32
    },
    itemInfoHeight () {
      return this.cardInnerHeight
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
      this.screenHeight = document.body.clientHeight
      this.screenWidth = document.body.clientWidth
      // 在 default layout 的 onResizeHook 中添加一个函数，表示窗口大小变化时，需要更新该组件的 screenHeight 为 default layout 的 screenHeight
      defaultLayoutVue.onResizeHook.push(() => {
        this.screenHeight = document.body.clientHeight
        this.screenWidth = document.body.clientWidth
      })
    },
    async loadData () {
      this.data = await this.$axios.$post('/api/Item/itemInfo', {
        id: this.$route.params.id
      })
      this.ratings = await this.$axios.$post('/api/Rating/item', {
        id: this.$route.params.id
      })
      for (const rating of this.ratings) {
        if (rating.user === this.$auth.$state.user.username) {
          this.myRating = rating
        }
      }
      this.myRating.item = this.$route.params.id
    },
    async handleSuccess () {
      await this.loadData()
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

<style>
  .ant-comment-content-detail p {
    white-space: unset;
  }
  /* 如果给 Rate 增加 show-text 属性，则 float: right 从第 2 行开始就会出现错误，依次向左移动，原因不明 */
  /* 解决方案为修改 line-height 变小，从 38 改为 35 可解决该问题，目前样式正常，原因不明 */
  /* TODO: 希望找到问题根源，及其完美解决方案 */
  .ivu-collapse>.ivu-collapse-item>.ivu-collapse-header {
    line-height: 35px;
  }
</style>
