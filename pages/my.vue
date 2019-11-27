<template>
  <div>
    <UserManagement />
    <ProfileCard :ghost="false" />
    <ChangePassword />
    <Search @search="handleSearch" />
    <AdvancedSearch />
  </div>
</template>

<script>
import ProfileCard from '../components/ProfileCard'
import Search from '../components/Search'
import ChangePassword from '../components/ChangePassword'
import AdvancedSearch from '../components/AdvancedSearch'
import UserManagement from '../components/UserManagement'
export default {
  middleware: ['auth'],
  name: 'My',
  components: { UserManagement, AdvancedSearch, ChangePassword, ProfileCard, Search },
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
