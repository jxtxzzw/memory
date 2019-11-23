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
    width: 420px;
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
          <div align="right">
            <div>
              <MenuItem name="home">
                <Icon type="ios-home"></Icon>
                主页
              </MenuItem>
            </div>
            <MenuItem name="test" to="/Experiment/CommentPage">
              <Icon type="ios-home"></Icon>
              测试页面
            </MenuItem>
            <div v-if="$auth.$state.loggedIn">
              <Dropdown @on-click="handleDropdownClick">
                <ProfileCard />
                <DropdownMenu slot="list">
                  <DropdownItem name="profile" align="center">
                    个人主页
                  </DropdownItem>
                  <DropdownItem name="logout" align="center">
                    登出
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
            <Button v-else type="text" ghost name="login" to="/login">
              登录
            </Button>
          </div>
        </Menu>
      </Header>
      <Content :style="{padding: '0 50px'}">
        <Card>
          <div style="min-height: 400px;">
            <nuxt v-if="compatible" />
            <div v-else>
              <Alert type="error" show-icon>
                您的浏览器不被支持
                <span slot="desc">
                  我使用了最新的技术来搭建我的网站，使我的网站更快和更容易使用。不幸的是，您的浏览器不支持这些技术。下载以下一种伟大的浏览器（或者将您的旧版本浏览器升级到最新版本），您就可以正常访问了！
                  <Icon type="help-circled" size="14"></Icon>
                </span>
              </Alert>
              <SupportBrowserList />
            </div>
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
import SupportBrowserList from '../components/SupportBrowserList'
import * as BrowserCompatibility from '~/assets/BrowserCompatibility/BrowserCompatibility'
import config from '~/assets/BrowserCompatibility/config'
export default {
  components: { SupportBrowserList, ProfileCard },
  data () {
    return {
      moment,
      compatible: true
    }
  },
  mounted () {
    this.checkBrowser()
  },
  methods: {
    handleDropdownClick (name) {
      if (name === 'logout') {
        this.$auth.logout()
      }
    },
    checkBrowser () {
      const judgement = BrowserCompatibility.checkCompatibility()
      if (judgement === config.Accepted) {
        this.compatible = true
      } else if (judgement === config.NotTested) {
        this.compatible = true
        this.$Notice.warning({
          title: '该浏览器的兼容性未经过测试',
          render: (h) => {
            // 自定义组件不需要加引号
            return h('span', [
              h('Alert', {
                props: {
                  type: 'warning',
                  showIcon: true
                }
              }, '您可以正常访问，但我们依然推荐您使用以下浏览器以获得最佳浏览体验'),
              h(SupportBrowserList)
            ])
          },
          duration: 0
        })
      } else {
        this.compatible = false
      }
    }
  }
}
</script>
