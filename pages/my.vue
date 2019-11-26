<template>
  <div>
    <ProfileCard :ghost="false" />
    <ChangePassword />
    <Search @search="handleSearch"/>
  </div>
</template>

<script>
import ProfileCard from '../components/ProfileCard'
import Search from '../components/Search'
import ChangePassword from '../components/ChangePassword'
export default {
  name: 'My',
  components: { ChangePassword, ProfileCard, Search },
  methods: {
    handleSearch (searchInput, searchType) {
      const data = {
        searchInput,
        searchType,
        offset: 0,
        limit: 10
      }
      console.log(data)
    }
  }
}
</script>

<style scoped>

</style>
