<template>
  <div>
    <List>
      <ListItem>
        <template slot="action">
          <i-switch :value="true" disabled/>
        </template>
        用户账户相关通知
      </ListItem>
      <ListItem>
        接受全局通知
        <template slot="action">
          <i-switch :value="true" disabled/>
        </template>
      </ListItem>
      <ListItem>
        有新内容被分享时邮件提醒
        <template slot="action">
          <i-switch :value="true" disabled/>
        </template>
      </ListItem>
      <ListItem>
        我的评论被回复时邮件提醒
        <template slot="action">
          <i-switch :value="true" disabled/>
        </template>
      </ListItem>
    </List>
  </div>
</template>

<script>
export default {
  name: 'Subscription'
}
</script>

<style scoped>

</style>
