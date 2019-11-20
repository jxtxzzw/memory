<template>
  <div>
    <h2 class="text-center">
      Login
    </h2>
    <hr>
    <Alert v-if="error" show variant="danger">
      {{ error + '' }}
    </Alert>
    <Alert v-if="$auth.$state.redirect" show>
      You have to login before accessing to <strong>{{ $auth.$state.redirect }}</strong>
    </Alert>
    <Row align-h="center pt-4">
      <i-col span="4">
        <Card>
          <busy-overlay />
          <Form @keydown.enter="login">
            <FormItem label="Username">
              <Input ref="username" v-model="username" placeholder="anything" />
            </FormItem>

            <FormItem label="Password">
              <Input v-model="password" type="password" placeholder="123" />
            </FormItem>

            <div class="text-center">
              <Button variant="primary" block @click="login">
                Login
              </Button>
            </div>
          </Form>
        </Card>
      </i-col>
      <i-col span="1" align-self="center">
        <div class="text-center">
          <Button pill>
            OR
          </Button>
        </div>
      </i-col>
      <i-col span="4" class="text-center">
        <Card title="Social Login" bg-variant="light">
          <div v-for="s in strategies" :key="s.key" class="mb-2">
            <Button block :style="{background: s.color}" class="login-button" @click="$auth.loginWith(s.key)">
              Login with {{ s.name }}
            </Button>
          </div>
        </Card>
      </i-col>
    </Row>
  </div>
</template>

<style scoped>
.login-button {
  border: 0;
};
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
