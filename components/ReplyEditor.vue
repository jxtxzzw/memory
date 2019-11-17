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
          Add Comment
        </a-button>
        <a-button v-if="target !== 0" @click="cancelReply">
          cancelReply
        </a-button>
      </a-form-item>
    </div>
  </a-comment>
</template>

<script>
import moment from 'moment'
export default {
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
  data () {
    return {
      moment,
      comments: [],
      submitting: false,
      value: ''
    }
  },
  methods: {
    cancelReply () {
      this.$emit('cancelReply')
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
