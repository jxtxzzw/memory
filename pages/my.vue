<template>
  <div>
    <Row>
      <i-col span="12">
        <UserManagement />
      </i-col>
      <i-col offset="12" span="12">
        <MyActivity />
      </i-col>
    </Row>
  </div>
</template>

<script>
import MyActivity from '../components/MyActivity'
import UserManagement from '../components/UserManagement'
export default {
  middleware: ['auth'],
  name: 'My',
  components: { UserManagement, MyActivity }
}
</script>

<style scoped>

</style>
