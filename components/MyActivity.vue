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
          <Icon type="ios-thumbs-up-outline" /> {{ activity.RatingCount }}
        </li>
        <li>
          <Icon type="ios-chatbubbles-outline" /> {{ activity.replyCount}}
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
      activities: [
        {
          title: 'This is title 1',
          description: 'This is description, this is description, this is description.',
          avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
          content: 'This is the content, this is the content, this is the content, this is the content.'
        },
        {
          title: 'This is title 2',
          description: 'This is description, this is description, this is description.',
          avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
          content: 'This is the content, this is the content, this is the content, this is the content.'
        },
        {
          title: 'This is title 3',
          description: 'This is description, this is description, this is description.',
          avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
          content: 'This is the content, this is the content, this is the content, this is the content.'
        }
      ]
    }
  },
  computed: {
    state () {
      return JSON.stringify(this.$auth.$state, undefined, 2)
    }
  },
  methods: {
    async loadData () {
      // TODO API
      this.data = await this.$axios.$post('/api/User/MyActivity')
    }
  },
  async mounted () {
    // await this.loadData()
  }
}
</script>

<style scoped>

</style>
