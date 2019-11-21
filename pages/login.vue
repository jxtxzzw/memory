<template>
  <div>
    <h2 class="text-center">
      登录 {{ $auth.$state.redirect }}
    </h2>
    <Alert v-if="error">
      {{ error + '' }}
    </Alert>
    <Alert v-if="$auth.$state.redirect">
      You have to login before accessing to <strong>{{ $auth.$state.redirect }}</strong>
    </Alert>
    <Row>
      <i-col span="4">
        <Card>
          <busyOverlay />
          <Form ref="login">
            <FormItem prop="username" label="用户名">
              <Input ref="username" v-model="username" placeholder="请输入用户名">
              <Icon slot="prefix" type="ios-person-outline" />
                <!-- 用 slot="prepend" 是前面加一块出来，后果是对不齐，以及会令 4.0 的 maxlength 和 password 失效 -->
                <!-- 这里应该是用 slot="prefix" -->
              </Input>
            </FormItem>
            <FormItem prop="password" label="密码">
              <Input v-model="password" type="password" password placeholder="123">
              <Icon slot="prefix" type="ios-lock-outline" />
              </Input>
            </FormItem>
            <Button type="primary" @click="login">
              登录
            </Button>
          </Form>
        </Card>
      </i-col>
      <i-col span="1">
        <p>
          或者
        </p>
      </i-col>
      <i-col span="4">
        <Card title="使用第三方登录">
          <div v-for="s in strategies" :key="s.key">
            <Button block :style="{background: s.color}" class="login-button" @click="$auth.loginWith(s.key)">
              使用 {{ s.name }} 登录
            </Button>
          </div>
        </Card>
      </i-col>
    </Row>
  </div>
</template>

<style scoped>
.login-button {
  border: 0
}
</style>

<script>
import busyOverlay from '~/components/busy-overlay'

export default {
  middleware: ['auth'],
  components: { busyOverlay },
  data () {
    return {
      username: '',
      password: '123',
      error: null
    }
  },
  computed: {
    strategies: () => ([
    ]),
    redirect () {
      return (
        this.$route.query.redirect &&
        decodeURIComponent(this.$route.query.redirect)
      )
    }
  },
  methods: {
    login () {
      this.error = null
      return this.$auth
        .loginWith('local', {
          data: {
            username: this.username,
            password: this.password
          }
        })
        .catch((e) => {
          this.error = e + ''
        })
    }
  }
}
</script>
