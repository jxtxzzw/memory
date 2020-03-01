<template>
  <div>
    <a-card style="width: 300px">
      <img
        slot="cover"
        alt="example"
        src="/default_profile.jpg"
      />
      <template slot="actions" class="ant-card-actions">
        <Tooltip :content="'分享过 ' + info.share + ' 个内容'">
          <a-icon type="edit" />
        </Tooltip>
        <Tooltip :content="'记录过 ' + info.read + ' 个内容'">
          <a-icon type="eye" />
        </Tooltip>
        <Tooltip :content="'发表了 ' + info.comment + ' 条评论'">
          <a-icon type="message" />
        </Tooltip>
      </template>
      <a-card-meta :title="info.username">
        <span slot="description">
          {{ info.username }}
          最后一次现身是
          <Time :time="info.latest" />
        </span>
        <a-avatar
          slot="avatar"
          :src="info.avatar"
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
      info: {
        avatar: '',
        username: '',
        share: '',
        read: '',
        comment: '',
        latest: ''
      }
    }
  },
  async mounted () {
    this.info = await this.$axios.$post('/api/User/userinfocard', {
      user: this.user
    })
  }
}
</script>

<style scoped>

</style>
