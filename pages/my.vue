<template>
  <div>
    <Row>
      <i-col offset="12" span="12">
        <MyActivity />
      </i-col>
    </Row>
  </div>
</template>

<script>
import MyActivity from '../components/MyActivity'
export default {
  middleware: ['auth'],
  name: 'My',
  components: { MyActivity }
}
</script>

<style scoped>

</style>
