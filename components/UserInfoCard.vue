<template>
  <div>
    <a-card style="width: 300px">
      <img
        alt="example"
        src="http://localhost:3000/default_profile.jpg"
        slot="cover"
      />
      <template slot="actions" class="ant-card-actions">
        <Tooltip :content="'分享过 ' + share + ' 个内容'">
          <a-icon type="edit" />
        </Tooltip>
        <Tooltip :content="'记录过 ' + read + ' 个内容'">
          <a-icon type="eye" />
        </Tooltip>
        <Tooltip :content="'发表了 ' + comment + ' 条评论'">
          <a-icon type="message" />
        </Tooltip>
      </template>
      <a-card-meta :title="username" :description="username + '的个人主页'">
        <a-avatar
          slot="avatar"
          :src="avatar"
        />
      </a-card-meta>
    </a-card>
  </div>
</template>

<script>
export default {
  name: 'UserInfoCard',
  props: {
    user: {
      type: Number,
      default () {
        return 0
      }
    }
  },
  data () {
    return {
      avatar: '',
      username: '',
      share: '',
      read: '',
      comment: ''
    }
  },
  async mounted () {
    const info = await this.$axios.$post('/api/User/userinfocard', {
      user: this.user
    })
    this.share = info.share
    this.username = info.username
    this.avatar = info.avatar
    this.read = info.read
    this.comment = info.comment
  }
}
</script>

<style scoped>

</style>
