<template>
  <div>
    <Alert show variant="warning">
      This is a secure page!
    </Alert>
    <Row>
      <i-col span="8">
        <Card title="State">
          <pre>{{ state }}</pre>
        </Card>
      </i-col>
      <i-col span="4">
        <Card title="Scopes" class="mb-2">
          User: <Button>{{ $auth.hasScope('user') }}</Button>
          Test: <Button>{{ $auth.hasScope('test') }}</Button>
          Admin: <Button>{{ $auth.hasScope('admin') }}</Button>
        </Card>
        <Card title="token">
          {{ $auth.token || '-' }}
        </Card>
      </i-col>
    </Row>
    <hr>
    <Button @click="$auth.fetchUser()">
      Fetch User
    </Button>
    <Button @click="$auth.logout()">
      Logout
    </Button>
  </div>
</template>

<script>
export default {
  middleware: ['auth'],
  computed: {
    state () {
      return JSON.stringify(this.$auth.$state, undefined, 2)
    }
  }
}
</script>
