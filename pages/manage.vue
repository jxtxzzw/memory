<template>
  <div>
    <Row>
      <i-col span="9">
        <Divider>类型与分类管理</Divider>
        <Alert type="info" show-icon>
          进行类型与分类管理
          <span slot="desc">
            增加新的类型或者分类，或者重命名它们。<br />
            直接输入文本可筛选已存在内容，若无已存在内容，可直接添加。<br />
            如果删除的项目还有别的使用依赖，则无法被删除。<br />
          </span>
        </Alert>
        <TypeCategoryManagement />
      </i-col>
      <i-col offset="1" span="14">
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
        <Divider>发送全体公告</Divider>
      </i-col>
    </Row>
  </div>
</template>

<script>
import UserManagement from '../components/UserManagement'
import TypeCategoryManagement from '../components/TypeCategoryManagement'
export default {
  middleware: ['auth'],
  name: 'Manage',
  components: { TypeCategoryManagement, UserManagement }
}
</script>

<style scoped>

</style>
