<!-- TODO: 点击 reply action 的时候在适当位置插入回复框，并绑定回复 id -->
<!-- KNOWN ISSUE: nested comment style 已修复，等待发布新版-->

<template>
  <a-comment>
    <span slot="actions">Reply to</span>
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
</template>

<script>
import moment from 'moment'
export default {
  name: 'Comment',
  data () {
    return {
      likes: 0,
      dislikes: 0,
      action: null,
      moment,
      comments: [],
      submitting: false,
      value: ''
    }
  },
  methods: {
    aaa () {
      console.log('sss')
    },
    like () {
      this.likes = 1
      this.dislikes = 0
      this.action = 'liked'
    },
    dislike () {
      this.likes = 0
      this.dislikes = 1
      this.action = 'disliked'
    },

    handleSubmit () {
      if (!this.value) {
        return
      }

      this.submitting = true

      setTimeout(() => {
        this.submitting = false
        this.comments = [
          {
            author: 'Han Solo',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content: this.value,
            datetime: moment().fromNow()
          },
          ...this.comments
        ]
        this.value = ''
      }, 1000)
    },
    handleChange (e) {
      this.value = e.target.value
    }
  }
}
</script>

<style scoped>
</style>
