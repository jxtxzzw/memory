<template>
  <div>
    <Input
      v-model="announcement"
      type="textarea"
      :autosize="{minRows: 5, maxRows: 5}"
      placeholder="输入公告"
    />
    <Button long type="success" style="margin-top: 10px" @click="send">
      发送
    </Button>
  </div>
</template>

<script>
export default {
  name: 'Announcement',
  data () {
    return {
      announcement: ''
    }
  },
  methods: {
    send () {
      // 邮件发送发出请求后直接返回，不做 await，否则会等很久
      this.$axios.$post('/api/mailtest', {
        identifier: 'announcement',
        parameter: {
          content: this.announcement
        }
      })
      this.$Message.success({
        background: true,
        content: '已提交邮件发送队列'
      })
      this.announcement = ''
    }
  }
}
</script>

<style scoped>

</style>
