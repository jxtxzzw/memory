<template>
  <div>
    <b-alert show variant="success">
      You should see this page without need to authentication!
    </b-alert>
    <div>
      User status:
      <Button>{{ $auth.$state.loggedIn ? 'Logged In' : 'Guest' }}</Button>
    </div>
  </div>
</template>

<script>
export default {
  middleware: ['auth'],
  options: {
    auth: false
  }
}
</script>
