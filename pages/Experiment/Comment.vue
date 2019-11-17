<!-- TODO: 点击 reply action 的时候在适当位置插入回复框，并绑定回复 id -->
<!-- KNOWN ISSUE: nested comment style 已修复，等待发布新版-->

<template>
  <div>
    <div v-if="replyTarget===0">
      <a-comment>
        <a-avatar
          slot="avatar"
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          alt="Han Solo"
        />
        <div slot="content">
          <a-form-item>
            <a-textarea :rows="4" :value="value" @change="handleChange" />
          </a-form-item>
          <a-form-item>
            <a-button html-type="submit" :loading="submitting" type="primary" @click="handleSubmit">
              Add Comment
            </a-button>
          </a-form-item>
        </div>
      </a-comment>
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
        <a-comment>
          <a-avatar
            slot="avatar"
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            alt="Han Solo"
          />
          <div slot="content">
            <a-form-item>
              <a-textarea :rows="4" :value="value" @change="handleChange" />
            </a-form-item>
            <a-form-item>
              <a-button html-type="submit" :loading="submitting" type="primary" @click="handleSubmit">
                Add Comment
              </a-button>
            </a-form-item>
          </div>
        </a-comment>
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
      value: '',
      replyTarget: 0
    }
  },
  methods: {
    reply (id) {
      console.log(id)
      this.replyTarget = id
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
