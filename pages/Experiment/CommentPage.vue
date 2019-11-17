<template>
  <div>
    <div v-if="replyTarget===0">
      <ReplyEditor :src="testAvatarSrc" :alt="testAvatarName" :reply="replyTarget" />
    </div>
    <Comment v-for="item in replies" :key="item.id" :reply="item" :target="replyTarget" />
  </div>
</template>

<script>
import moment from 'moment'
import Comment from '~/components/Comment'
import ReplyEditor from '~/components/ReplyEditor'
export default {
  name: 'CommentPage',
  components: {
    Comment,
    ReplyEditor
  },
  data () {
    return {
      moment,
      comments: [],
      submitting: false,
      value: '',
      replyTarget: 0,
      replies: [],
      testAvatarSrc: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      testAvatarName: 'Han Solo'
    }
  },
  mounted () {
    const reply = {
      id: '1',
      username: 'Han Solo',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure).',
      children: []
    }
    this.replies.push(reply)
    console.log(this.replies[0])
    this.replies.push(reply)
    this.replies[1].children.push(reply)
    // this.replies[1].children[0].push(reply)
    // this.replies[1].children[0].push(reply)
  },
  methods: {
    reply (id) {
      this.replyTarget = id
    },
    cancelReply () {
      this.reply(0)
    }
  }
}
</script>

<style scoped>
</style>
