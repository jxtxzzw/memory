<template>
  <div>
    <a-comment v-if="reply != null" :key="reply.id">
      <span slot="actions" @click="handleReplyTargetChange(reply.id)">回复</span>
      <a slot="author">{{ reply.username }}</a>
      <a-avatar
        slot="avatar"
        :src="reply.avatar"
        :alt="reply.username"
      />
      <p slot="content">
        {{ reply.content }}
      </p>
      <a-tooltip slot="datetime" :title="moment(reply.date).format('YYYY-MM-DD HH:mm:ss')">
        <span>{{ moment(reply.date).fromNow() }}</span>
      </a-tooltip>
      <div v-if="target === reply.id">
        <ReplyEditor :target="target" :item="item" @cancelReply="cancelReply" @reloadComment="reloadComment" />
      </div>
      <Comment
        v-for="child in reply.children"
        :key="child.id"
        :reply="child"
        :target="target"
        :item="item"
        @reloadComment="reloadComment"
        @handleReplyTargetChange="handleReplyTargetChange"
      />
      <!-- 这一层的 Comment 子组件也要传递 emit，否则嵌套的评论将无法显示 Editor -->
    </a-comment>
  </div>
</template>

<script>
import moment from 'moment'
import ReplyEditor from '~/components/ReplyEditor'
export default {
  name: 'Comment',
  components: {
    ReplyEditor
  },
  props: {
    reply: {
      type: Object,
      default: null
    },
    target: {
      type: Number,
      default () {
        return 0
      }
    },
    item: {
      type: Number,
      default: 0
    }
  },
  data () {
    moment.locale('zh-cn')
    return {
      moment,
      testAvatarSrc: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      testAvatarName: 'Han Solo'
    }
  },
  methods: {
    handleReplyTargetChange (newTarget) {
      this.$emit('handleReplyTargetChange', newTarget)
    },
    cancelReply () {
      this.handleReplyTargetChange(0)
    },
    reloadComment () {
      this.$emit('reloadComment')
    }
  }
}
</script>

<style scoped>

</style>
