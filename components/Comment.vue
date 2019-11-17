// TODO: 递归嵌套 Comment
// TODO: replyTarget 的传值，根据回复位置自动调整子组件的 prop，从而显示或消失

<template>
  <div>
    <a-comment v-if="reply != null" :key="reply.id">
      <span slot="actions" @click="handleReply(reply.id)">Reply to</span>
      <a slot="author">{{ reply.username }}</a>
      <a-avatar
        slot="avatar"
        :src="reply.avatar"
        :alt="reply.username"
      />
      <p slot="content">
        {{ reply.content }}
      </p>
      <div v-if="target === reply.id">
        <ReplyEditor :src="testAvatarSrc" :alt="testAvatarName" :target="target" @cancelReply="cancelReply()" />
      </div>
      <Comment v-for="child in reply.children" :key="child.id" :reply="child" :target="target" />
    </a-comment>
  </div>
</template>

<script>
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
    }
  },
  data () {
    return {
      testAvatarSrc: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      testAvatarName: 'Han Solo'
    }
  },
  methods: {
    handleReply (target) {
      this.target = target
    },
    cancelReply () {
      this.$emit('cancelReply')
    }
  }
}
</script>

<style scoped>

</style>
