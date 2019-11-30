<template>
  <List item-layout="vertical">
    <ListItem v-for="activity in activities" :key="activity.title">
      <ListItemMeta :avatar="$auth.$state.user.avatar" :title="activity.title" :description="activity.description" />
      {{ activity.content }}
      <template slot="action">
        <li>
          <Icon type="ios-star-outline" /> {{ activity.rating }}
        </li>
        <li>
          <Icon type="ios-thumbs-up-outline" /> {{ activity.ratingCount }}
        </li>
        <li>
          <Icon type="ios-chatbubbles-outline" /> {{ activity.replyCount }}
        </li>
      </template>
      <template slot="extra">
        <img :src="activity.itemCover" style="width: 280px">
      </template>
    </ListItem>
  </List>
</template>

<script>
export default {
  name: 'MyActivity',
  data () {
    return {
      activities: []
    }
  },
  computed: {
    state () {
      return JSON.stringify(this.$auth.$state, undefined, 2)
    }
  },
  async mounted () {
    await this.loadData()
  },
  methods: {
    async loadData () {
      this.activities = await this.$axios.$post('/api/User/userinfo')
    }
  }
}
</script>

<style scoped>

</style>
