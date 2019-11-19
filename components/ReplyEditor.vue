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
// const axios = require('axios')
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
    async handleSubmit ({ $axios }) {
      if (!this.value) {
        return
      }
      this.submitting = true

      const data = {
        userId: 1,
        itemId: 1,
        content: this.value,
        reply: this.target
      }
      await this.$axios.$post('/api/Comment/Add', data)
    },
    handleChange (e) {
      this.value = e.target.value
    }
  }
}
</script>

<style scoped>

</style>
