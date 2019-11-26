<template>
  <a-comment>
    <a-avatar
      slot="avatar"
      :src="src"
      :alt="alt"
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
</template>

<script>
import moment from 'moment'
export default {
  middleware: ['auth'],
  name: 'ReplyEditor',
  props: {
    src: {
      type: String,
      default: null
    },
    alt: {
      type: String,
      default: null
    },
    target: {
      type: Number,
      default () {
        return 0
      }
    }
  },
  computed: {
    state () {
      return JSON.stringify(this.$auth.$state, undefined, 2)
    }
  },
  data () {
    return {
      moment,
      submitting: false,
      value: ''
    }
  },
  methods: {
    cancelReply () {
      this.$emit('cancelReply')
    },
    async handleSubmit ({ $axios }) {
      this.submitting = true
      if (!this.value) {
        this.$Message.error({
          background: true,
          content: '评论内容不能为空'
        })
        return
      }
      const data = {
        userId: 1,
        itemId: 1,
        content: this.value,
        reply: this.target
      }
      await this.$axios.$post('/api/Comment/Add', data)
      // TODO 考虑是否做成局部刷新
      window.location.reload()
    },
    handleChange (e) {
      this.value = e.target.value
    }
  }
}
</script>

<style scoped>

</style>
