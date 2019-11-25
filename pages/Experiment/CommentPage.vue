<template>
  <!-- 引用该组件的父组件，需要指定 height 或通过动态计算得到 height 并指定 overflow-y 为 auto，以避免评论内容超出组件 -->
  <div>
    <div v-if="loading">
      <a-skeleton :active="true" :avatar="true" :paragraph="{rows: 4}" />
    </div>
    <div v-else>
      <div v-if="replyTarget===0">
        <ReplyEditor :src="testAvatarSrc" :alt="testAvatarName" :target="replyTarget" />
      </div>
      <Comment v-for="item in replies" :key="item.id" :reply="item" :target="replyTarget" @handleReplyTargetChange="handleReplyTargetChange" />
      <!-- emit 的 v-on 不需要带括号，参数会依次自动填入 method 的 params -->
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import Comment from '~/components/Comment'
import ReplyEditor from '~/components/ReplyEditor'
export default {
  middleware: ['auth'],
  name: 'CommentPage',
  components: {
    Comment,
    ReplyEditor
  },
  data () {
    return {
      moment,
      loading: true,
      comments: [],
      value: '',
      replyTarget: 0,
      replies: [],
      testAvatarSrc: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      testAvatarName: 'Han Solo'
    }
  },
  async mounted () {
    await this.loadData()
  },
  methods: {
    cancelReply () {
      this.reply(0)
    },
    handleReplyTargetChange (newTarget) {
      this.replyTarget = newTarget
    },
    async loadData () {
      this.loading = true
      const data = {
        itemId: 1
      }
      this.replies = await this.$axios.$post('/api/Comment/Query', data)
      setTimeout(() => {
        this.loading = false
      }, 1000)
    }
  }
}
</script>

<style scoped>
</style>
