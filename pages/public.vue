<template>
  <div>
    <Alert show variant="success">
      You should see this page without need to authentication!
    </Alert>
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
