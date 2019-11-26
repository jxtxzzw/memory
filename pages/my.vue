<template>
  <div>
    <ProfileCard :ghost="false" />
    <ChangePassword />
  </div>
</template>

<script>
import ProfileCard from '../components/ProfileCard'
import ChangePassword from '../components/ChangePassword'
export default {
  name: 'My',
  components: { ChangePassword, ProfileCard }
}
</script>

<style scoped>

</style>
