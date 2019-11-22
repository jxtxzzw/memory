<style scoped>
  .layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }
  .layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
  }
  .layout-nav{
    /* 每个 MenuItem 的长度为 105*/
    width: 315px;
    margin: 0 auto;
    margin-right: 20px;
  }
  .layout-footer-center{
    text-align: center;
  }
</style>
<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="home">
          <div class="layout-logo">
            <Button @click="$auth.logout()">
              这里放用户头像
            </Button>
          </div>
          <div class="layout-nav">
            <MenuItem name="home">
              <Icon type="ios-home"></Icon>
              主页
            </MenuItem>
            <MenuItem name="test" to="/Experiment/CommentPage">
              <Icon type="ios-home"></Icon>
              测试页面
            </MenuItem>
            <div v-if="$auth.$state.loggedIn">
              <Dropdown @on-click="handleDropdownClick">
                <ProfileCard />
                <DropdownMenu slot="list">
                  <DropdownItem name="profile">个人主页</DropdownItem>
                  <DropdownItem name="logout">登出</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
            <MenuItem v-else name="login" to="/login">
              登录
            </MenuItem>
          </div>
        </Menu>
      </Header>
      <Content :style="{padding: '0 50px'}">
        <Card>
          <div style="min-height: 200px;">
            <nuxt />
          </div>
        </Card>
      </Content>
      <Footer class="layout-footer-center">
        2019/MM/DD - {{ moment().format('YYYY/MM/DD') }} &copy; jxtxzzw
      </Footer>
    </Layout>
  </div>
</template>
<script>
import moment from 'moment'
import ProfileCard from '../components/ProfileCard'

export default {
  components: { ProfileCard },
  data () {
    return {
      moment
    }
  },
  methods: {
    handleDropdownClick (name) {
      console.log(name)
      if (name === 'logout') {
        this.$auth.logout()
      }
    }
  }
}
</script>
