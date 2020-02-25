<template>
  <div>
    <InputNumber v-model="idx"></InputNumber>
    <Button @click="send">
      发送
    </Button>
  </div>
</template>

<script>

export default {
  name: 'Test',
  data () {
    return {
      idx: 0
    }
  },
  methods: {
    async send () {
      const testcases = [
        {
          identifier: 'announcement',
          parameter: {
            content: '全局公告'
          }
        },
        {
          identifier: 'reply',
          parameter: {
            who: 'zzw',
            replyTo: '被回复的人',
            oldReply: '被回复的评论',
            newReply: '新回复',
            href: 'https://memory.jxtxzzw.com'
          }
        },
        {
          identifier: 'share',
          parameter: {
            who: 'zzw2',
            title: 'book_A',
            image: 'https://www.jxtxzzw.com/qrcodes.png',
            href: 'https://memory.jxtxzzw.com'
          }
        }
      ]
      await this.$axios.$post('/api/mailtest', testcases[this.idx])
    }
  }
}
</script>

<style scoped>

</style>
