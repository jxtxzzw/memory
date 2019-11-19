<template>
  <div>
    <div v-if="replyTarget===0">
      <ReplyEditor :src="testAvatarSrc" :alt="testAvatarName" :target="replyTarget" />
    </div>
    <Comment v-for="item in replies" :key="item.id" :reply="item" :target="replyTarget" @handleReplyTargetChange="handleReplyTargetChange" />
    <!-- emit 的 v-on 不需要带括号，参数会依次自动填入 method 的 params -->
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
      value: '',
      replyTarget: 0,
      replies: [],
      testAvatarSrc: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      testAvatarName: 'Han Solo'
    }
  },
  async mounted () {
    const data = {
      itemId: 1
    }
    this.replies = await this.$axios.$post('/api/Comment/Query', data)
    console.log(this.replies)
    // const reply1 = {
    //   id: 1,
    //   username: '1111',
    //   avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    //   content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure).',
    //   children: []
    // }
    // const reply2 = {
    //   id: 2,
    //   username: '2222',
    //   avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    //   content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure).',
    //   children: []
    // }
    // const reply3 = {
    //   id: 3,
    //   username: '3333',
    //   avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    //   content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure).',
    //   children: []
    // }
    // const reply4 = {
    //   id: 4,
    //   username: '4444',
    //   avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    //   content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure).',
    //   children: []
    // }
    // this.replies.push(reply1)
    // this.replies.push(reply2)
    // this.replies[1].children.push(reply3)
    // this.replies[1].children[0].children.push(reply4)
  },
  methods: {
    cancelReply () {
      this.reply(0)
    },
    handleReplyTargetChange (newTarget) {
      this.replyTarget = newTarget
      console.log('handleReplyTargetChange ' + newTarget)
    }
  }
}
</script>

<style scoped>
</style>
