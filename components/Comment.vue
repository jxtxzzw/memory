<template>
  <div>
    <a-comment v-if="reply != null" :key="reply.id">
      <span slot="actions">Reply to</span>
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
        <ReplyEditor :src="testAvatarSrc" :alt="testAvatarName" :reply="reply.id" @cancelReply="cancelReply()" />
      </div>
    </a-comment>
  </div>
</template>

<script>
// import ReplyEditor from '~/components/ReplyEditor'
export default {
  name: 'Comment',
  components: {
    // ReplyEditor
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
    cancelReply () {
      this.$emit('cancelReply')
    }
  }
}
</script>

<style scoped>

</style>
