<template>
  <div>
    <div v-if="replyTarget===0">
      <ReplyEditor :src="testAvatarSrc" :alt="testAvatarName" :reply="replyTarget" />
    </div>
    <a-comment>
      <span slot="actions" @click="reply(6)">Reply to</span>
      <a slot="author">Han Solo</a>
      <a-avatar
        slot="avatar"
        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        alt="Han Solo"
      />
      <p slot="content">
        We supply a series of design principles, practical patterns and high quality design resources
        (Sketch and Axure).
      </p>
      <div v-if="replyTarget===6">
        <ReplyEditor :src="testAvatarSrc" :alt="testAvatarName" :reply="replyTarget" @cancelReply="cancelReply()"/>
      </div>
      <a-comment>
        <span slot="actions">Reply to</span>
        <a slot="author">Han Solo</a>
        <a-avatar
          slot="avatar"
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          alt="Han Solo"
        />
        <p slot="content">
          We supply a series of design principles, practical patterns and high quality design
          resources (Sketch and Axure).
        </p>
        <a-comment>
          <span slot="actions">Reply to</span>
          <a slot="author">Han Solo</a>
          <a-avatar
            slot="avatar"
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            alt="Han Solo"
          />
          <p slot="content">
            We supply a series of design principles, practical patterns and high quality design
            resources (Sketch and Axure).
          </p>
        </a-comment>
        <a-comment>
          <span slot="actions">Reply to</span>
          <a slot="author">Han Solo</a>
          <a-avatar
            slot="avatar"
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            alt="Han Solo"
          />
          <p slot="content">
            We supply a series of design principles, practical patterns and high quality design
            resources (Sketch and Axure).
          </p>
        </a-comment>
      </a-comment>
    </a-comment>
  </div>
</template>

<script>
import moment from 'moment'
import ReplyEditor from '../../components/ReplyEditor'
export default {
  name: 'Comment',
  components: {
    ReplyEditor
  },
  data () {
    return {
      moment,
      comments: [],
      submitting: false,
      value: '',
      replyTarget: 0,
      testAvatarSrc: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      testAvatarName: 'Han Solo'
    }
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
