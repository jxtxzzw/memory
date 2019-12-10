<template>
  <div>
  <Row>
      <i-col span="11">
        <Divider>修改头像</Divider>
        <Alert show-icon>
          修改您的头像
          <span slot="desc">
            上传一张图片来修改您的头像。留空并直接点击“上传”表示使用默认头像。您可能需要重新登录才能看到新的头像。
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
        <Divider>用户管理</Divider>
        <Alert v-if="$auth.state.user.id !== 1" type="error" show-icon>
          您没有权限进行用户管理
          <span slot="desc">
            只有超级管理员可以进行用户管理。如果有任何问题，请联系超级管理员。
          </span>
        </Alert>
        <Alert v-if="$auth.state.user.id === 1" type="info" show-icon>
          进行用户管理
          <span slot="desc">
            增加新的用户，或者重置他们的密码为初始密码。
          </span>
        </Alert>
        <UserManagement v-if="$auth.state.user.id === 1" />
        <Divider>类型与分类管理</Divider>
        <Alert type="info" show-icon>
          进行类型与分类管理
          <span slot="desc">
            增加新的类型或者分类，或者重命名他们。如果删除的项目还有别的使用依赖，则无法被删除。
          </span>
        </Alert>
        <TypeCategoryManagement />
      </i-col>
    </Row>
  </div>
</template>

<script>
import ChangeAvatar from '../components/ChangeAvatar'
import ChangePassword from '../components/ChangePassword'
import UserManagement from '../components/UserManagement'
import TypeCategoryManagement from '../components/TypeCategoryManagement'
export default {
  middleware: ['auth'],
  name: 'My',
  components: { TypeCategoryManagement, UserManagement, ChangePassword, ChangeAvatar }
}
</script>

<style scoped>

</style>
