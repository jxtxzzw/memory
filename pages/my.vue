<template>
  <div>
    <Row>
      <i-col span="12">
        <ChangeAvatar />
      </i-col>
      <i-col offset="12" span="12">
        <MyActivity />
      </i-col>
    </Row>
  </div>
</template>

<script>
import MyActivity from '../components/MyActivity'
import ChangeAvatar from '../components/ChangeAvatar'
export default {
  middleware: ['auth'],
  name: 'My',
  components: { ChangeAvatar, MyActivity }
}
</script>

<style scoped>

</style>
