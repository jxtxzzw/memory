<template>
  <div>
    <Row>
      <i-col span="11">
        <Divider>修改头像</Divider>
        <Alert show-icon>
          修改您的头像
          <span slot="desc">
            上传一张图片来修改您的头像。留空并直接点击“上传”表示使用默认头像。您可能需要刷新页面才能看到新的头像。
          </span>
        </Alert>
        <ChangeAvatar />
        <Divider>修改密码</Divider>
        <Alert show-icon>
          修改您的密码
          <span slot="desc">
            在这里修改您的密码
          </span>
        </Alert>
        <ChangePassword />
      </i-col>
      <i-col offset="2" span="11">
        <Divider>订阅设置</Divider>
        <Subscription />
      </i-col>
    </Row>
  </div>
</template>

<script>
import ChangeAvatar from '../components/ChangeAvatar'
import ChangePassword from '../components/ChangePassword'
import Subscription from '../components/Subscription'
export default {
  middleware: ['auth'],
  name: 'Profile',
  components: { Subscription, ChangePassword, ChangeAvatar }
}
</script>

<style scoped>

</style>
