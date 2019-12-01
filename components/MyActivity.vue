<template>
  <List item-layout="vertical" :split="true">
    <div v-for="activity in activities" :key="activity.title">
      <nuxt-link :to="'/item/' + activity.id">
        <ListItem>
          <ListItemMeta :avatar="$auth.$state.user.avatar" :title="activity.title">
            <template slot="description">
              <Rate allow-half disabled :value="activity.description" show-text />
            </template>
          </ListItemMeta>
          {{ activity.content }}
          <template slot="action">
            <li>
              <!-- transfer: 是否将弹层放置于 body 内，在 Tabs、带有 fixed 的 Table 列内使用时，建议添加此属性，它将不受父级样式影响，从而达到更好的效果 -->
              <Tooltip transfer :content="'平均评分 ' + activity.rating">
                <Icon type="ios-star-outline" /> {{ activity.rating }}
              </Tooltip>
            </li>
            <li>
              <Tooltip transfer :content="'有 ' + activity.ratingCount + ' 用户对此内容进行过评价'">
                <Icon type="ios-thumbs-up-outline" /> {{ activity.ratingCount }}
              </Tooltip>
            </li>
            <li>
              <Tooltip transfer :content="'该内容有 ' + activity.replyCount + ' 条讨论'">
                <Icon type="ios-chatbubbles-outline" /> {{ activity.replyCount }}
              </Tooltip>
            </li>
          </template>
          <template slot="extra">
            <img :src="activity.itemCover" style="width: 140px">
          </template>
        </ListItem>
        <!-- 如果想要跳转到 item 详情，就要加 nuxt-link
        而加在 ListItem 内，就会使得 template slot 无效，因为 template 上层不是 ListItem 了，是 nuxt-link
        加在 ListItem 上层，就会由于没有 v-for 不得不在更外层套上 div v-for
        然而由于 v-for 的是 div，对于 List 来说，每一个 Item 都是独立的，各自只有 1 个，之后是别的 div，所以就不会有分割线
        如果想要分割线，就必须让 ListItem 重复大于一次
        所以只能加一个自闭合的组件，让分割线出来 -->
        <ListItem/>
      </nuxt-link>
    </div>
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
