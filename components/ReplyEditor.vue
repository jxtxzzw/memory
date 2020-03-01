<template>
  <div>
    <Alert type="info" show-icon>
      <span slot="desc">
        可以使用 [spoiler] 这里是剧透内容 [/spoiler] 标签来防止剧透
        <Button ghost type="primary" @click="insertSpoiler">插入剧透标签</Button>
      </span>
    </Alert>
    <a-comment>
      <a-avatar
        slot="avatar"
        :src="avatar"
        :alt="username"
      />
      <div slot="content">
        <a-form-item>
          <a-textarea :rows="4" :value="value" @change="handleChange" />
        </a-form-item>
        <a-form-item>
          <a-button html-type="submit" :loading="submitting" type="primary" @click="handleSubmit">
            发表评论
          </a-button>
          <a-button v-if="target !== 0" @click="cancelReply">
            取消回复指定评论
          </a-button>
        </a-form-item>
      </div>
    </a-comment>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  middleware: ['auth'],
  name: 'ReplyEditor',
  props: {
    target: {
      type: Number,
      default () {
        return 0
      }
    },
    item: {
      type: Number,
      default () {
        return 0
      }
    }
  },
  data () {
    return {
      moment,
      submitting: false,
      value: '',
      avatar: '',
      username: ''
    }
  },
  computed: {
    state () {
      return JSON.stringify(this.$auth.$state, undefined, 2)
    }
  },
  async mounted () {
    await this.getUserInfo()
  },
  methods: {
    insertSpoiler () {
      this.value += '[spoiler]  [/spoiler]'
    },
    cancelReply () {
      this.$emit('cancelReply')
    },
    async handleSubmit () {
      this.submitting = true
      if (!this.value) {
        this.$Message.error({
          background: true,
          content: '评论内容不能为空'
        })
        this.submitting = false
        return
      }
      const data = {
        userId: this.$auth.$state.user.id,
        itemId: this.item,
        content: this.value,
        reply: this.target
      }
      await this.$axios.$post('/api/Comment/Add', data)
      this.submitting = false
      if (this.target !== 0) {
        // 新建评论不会触发邮件，回复评论才触发
        const oldReply = await this.$axios.$post('/api/Comment/Get', { id: this.target })
        // 邮件发送发出请求后直接返回，不做 await，否则会等很久
        this.$axios.$post('/api/mailtest', {
          identifier: 'reply',
          parameter: {
            who: this.$auth.$state.user.username,
            oldReply,
            newReply: this.value,
            href: 'https://memory.jxtxzzw.com/item/' + this.item
          }
        })
      }
      this.$emit('reloadComment')
    },
    handleChange (e) {
      this.value = e.target.value
    },
    async getUserInfo () {
      const user = await this.$axios.$post('/api/User/userinfo', {
        user: this.$auth.$state.user.id
      })
      this.avatar = user.avatar
      this.username = user.username
    }
  }
}
</script>

<style scoped>

</style>
