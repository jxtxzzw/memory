<template>
  <div>
    <TypeCategoryManagement />
    <!--    <UserManagement />-->
    <!--    <Row>-->
    <!--      <i-col span="10">-->
    <!--        <Divider>修改头像</Divider>-->
    <!--        <Alert show-icon>-->
    <!--          修改您的头像-->
    <!--          <span slot="desc">-->
    <!--            上传一张图片来修改您的头像。留空并直接点击“上传”表示使用默认头像。您可能需要重新登录才能看到新的头像。-->
    <!--          </span>-->
    <!--        </Alert>-->
    <!--        <ChangeAvatar />-->
    <!--        <Divider>修改密码</Divider>-->
    <!--        <Alert show-icon>-->
    <!--          修改您的密码-->
    <!--          <span slot="desc">-->
    <!--            在这里修改您的密码-->
    <!--          </span>-->
    <!--        </Alert>-->
    <!--        <ChangePassword />-->
    <!--      </i-col>-->
    <!--      <i-col offset="2" span="10" style="overflow-y: auto">-->
    <!--        <Divider>我的动态</Divider>-->
    <!--        <MyActivity />-->
    <!--      </i-col>-->
    <!--    </Row>-->
  </div>
</template>

<script>
// import MyActivity from '../components/MyActivity'
// import ChangeAvatar from '../components/ChangeAvatar'
// import ChangePassword from '../components/ChangePassword'
// import UserManagement from '../components/UserManagement'
import TypeCategoryManagement from '../components/TypeCategoryManagement'
export default {
  middleware: ['auth'],
  name: 'My',
  components: { TypeCategoryManagement }
  // components: { UserManagement, ChangePassword, ChangeAvatar, MyActivity }
}
</script>

<style scoped>

</style>
