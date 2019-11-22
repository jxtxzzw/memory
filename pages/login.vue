<template>
  <div>
    <h2 class="text-center">
      登录 {{ $auth.$state.redirect }}
    </h2>
    <Alert v-if="error">
      出现错误：{{ error + '' }}
    </Alert>
    <Alert v-if="$auth.$state.redirect">
      你必须先登录才能访问 <strong>{{ $auth.$state.redirect }}</strong> 页面
    </Alert>
    <Row>
      <i-col offset="8" span="8">
        <Card :dis-hover="true" :bordered="false">
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
            <Button long type="primary" @click="login">
              登录
            </Button>
          </Form>
        </Card>
      </i-col>
    </Row>
  </div>
</template>

<style scoped>
.text-center {
  text-align: center !important;
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
    redirect () {
      return (
        this.$route.query.redirect &&
        decodeURIComponent(this.$route.query.redirect)
      )
    },
    isCallback () {
      return Boolean(this.$route.query.callback)
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
