<template>
  <div style="text-align: center">
    <ButtonGroup shape="circle" size="large">
      <Button type="info" to="/Experiment/CreateItem">
        添加 ITEM 页面
      </Button>
      <Button type="success" to="/Experiment/CommentPage">
        评论页面
      </Button>
      <Button type="warning" to="/Experiment/Scroll">
        展示页面
      </Button>
      <Button type="error" to="/login">
        登录页面
      </Button>
    </ButtonGroup>
  </div>
</template>

<script>
export default {
  name: 'Test'
}
</script>

<style scoped>

</style>
