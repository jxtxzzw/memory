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
    <Layout :style="{minHeight: '-webkit-fill-available'}">
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="home">
          <div align="right">
            <div>
              <MenuItem name="home" to="/">
                <Icon type="ios-home" />
                欢迎页
              </MenuItem>
            </div>
            <MenuItem name="memory" to="/memory">
              <Icon type="ios-albums" />
              主页
            </MenuItem>
            <MenuItem name="activity" to="/activity">
              <Icon type="md-search" />
              动态
            </MenuItem>
            <div v-if="$auth.$state.loggedIn">
              <Dropdown @on-click="handleDropdownClick">
                <ProfileCard />
                <DropdownMenu slot="list">
                  <DropdownItem name="my" align="center">
                    我的动态
                  </DropdownItem>
                  <DropdownItem name="profile" align="center">
                    个人设置
                  </DropdownItem>
                  <DropdownItem name="manage" align="center">
                    系统管理
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
        <Card dis-hover :style="{height: cardHeight + 'px', minWidth: '1200px'}">
          <div>
            <nuxt v-if="compatible" />
            <div v-else>
              <Alert type="error" show-icon>
                您的浏览器不被支持
                <span slot="desc">
                  我使用了最新的技术来搭建我的网站，使我的网站更快和更容易使用。不幸的是，您的浏览器不支持这些技术。下载以下一种伟大的浏览器（或者将您的旧版本浏览器升级到最新版本），您就可以正常访问了！
                  <Icon type="help-circled" size="14"></Icon>
                </span>
              </Alert>
              <SupportBrowserList
                :name="sBrowser"
                :version="sBrowserVersion"
              />
            </div>
          </div>
        </Card>
      </Content>
      <Footer class="layout-footer-center">
        2020/03/01 - {{ moment().format('YYYY/MM/DD') }} &copy; 凝神长老
      </Footer>
    </Layout>
  </div>
</template>
<script>
import ProfileCard from '../components/ProfileCard'
import SupportBrowserList from '../components/SupportBrowserList'
import moment from 'moment'
import * as BrowserCompatibility from '~/assets/BrowserCompatibility/BrowserCompatibility'
import config from '~/assets/BrowserCompatibility/config'
export default {
  components: { SupportBrowserList, ProfileCard },
  data () {
    return {
      moment,
      compatible: true,
      sBrowser: '',
      sBrowserVersion: '',
      screenHeight: 0,
      // window.onresize 时候依次执行这里面的函数，以便可以在更新自己的 screenHeight 后，更新子组件的一些数据，例如子组件需要根据窗口大小计算得到的，或者将 screenHeight 的变化传递下去
      onResizeHook: []
    }
  },
  computed: {
    cardHeight () {
      // 137 = 64 header + 69 footer + 2 boarder + 2 boarder，见 Scroll
      return this.screenHeight - 137
    }
  },
  // 添加 watch，观察浏览器窗口变化
  // watch 只在这里添加一次，其他页面不需要观察页面高度变化了，即使他们需要根据页面高度算一些什么东西
  watch: {
    // 更新窗口高度，以保证全局页面的高度
    screenHeight (val) {
      if (!this.timer) {
        this.screenHeight = val
        this.timer = true
        const that = this
        setTimeout(function () {
          that.timer = false
        }, 400)
      }
    }
  },
  mounted () {
    this.checkBrowser()
    this.screenHeight = document.body.clientHeight
    const that = this
    // mounted 的时候增加全局的 hook 表示更新浏览器高度
    this.onResizeHook.push(() => {
      window.screenHeight = document.body.clientHeight
      that.screenHeight = window.screenHeight
    })
    // window.onresize 的内容永远是遍历 hook 数组，并执行其中的函数
    window.onresize = () => {
      for (const f of this.onResizeHook) {
        f()
      }
      // 于是 return 可以为空，() => {}，并注意需要执行该函数，即 (() => {})()
      return (() => {})()
    }
  },
  methods: {
    handleDropdownClick (name) {
      switch (name) {
        case 'logout':
          this.$auth.logout()
          break
        case 'my':
          this.$router.push('/user/' + this.$auth.$state.user.id)
          break
        case 'manage':
          this.$router.push('/manage')
          break
        case 'profile':
          this.$router.push('/profile')
          break
        default:
          break
      }
    },
    showBrowserWarning () {
      this.$Modal.warning({
        width: 800,
        title: '该浏览器的兼容性未经过测试',
        okText: '继续访问',
        render: (h) => {
          return h('div', [
            h('Alert', {
              props: {
                type: 'warning',
                showIcon: true
              }
            }, [
              '您可以继续访问',
              h('span', {
                slot: 'desc' // 作用域 slot 是单独的一个选项，不属于 props
              }, '但我们仍然强烈建议您使用以下浏览器以获得最佳浏览体验')
            ]),
            // 自定义组件的 render 不需要加引号
            h(SupportBrowserList, {
              props: {
                name: this.sBrowser,
                version: this.sBrowserVersion
              }
            }),
            h('div', {
              slot: 'footer'
            }, [
              h('Button', {
                props: {
                  type: 'success',
                  size: 'large',
                  long: true
                },
                on: {
                  click: () => { this.$Modal.remove() }
                }
              }, '继续访问')
            ])
          ])
        }
      })
    },
    checkBrowser () {
      const compatibility = BrowserCompatibility.checkCompatibility()
      const judgement = compatibility[0]
      this.sBrowser = compatibility[1]
      this.sBrowserVersion = compatibility[2]
      if (judgement === config.Accepted) {
        this.compatible = true
      } else if (judgement === config.NotTested) {
        this.compatible = true
        this.showBrowserWarning()
      } else {
        this.compatible = false
      }
    }
  }
}
</script>

<style>
  /* 全局不显示 Modal Instance 的 footer，该样式不会影响 Modal 的 footer */
  /* Modal: ivu-modal-footer, $Modal: ivu-modal-confirm-footer */
 .ivu-modal-confirm-footer {
   display: none;
 }
</style>
