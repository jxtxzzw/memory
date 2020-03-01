<template>
  <div>
    <List item-layout="vertical" :split="true">
      <div v-if="activities.length === 0">
        <a-empty
          image="/empty.png"
        >
          <span slot="description">还没有找到任何动态哦</span>
        </a-empty>
      </div>
      <div v-for="activity in activities" v-else :key="activity.id">
        <nuxt-link :to="'/item/' + activity.id">
          <ListItem>
            <ListItemMeta>
              <template slot="avatar">
                <nuxt-link :to="'/user/' + activity.user">
                  <Avatar :src="activity.avatar" />
                </nuxt-link>
              </template>
              <template slot="title">
                <nuxt-link :to="'/user/' + activity.user">
                  {{ activity.title }}
                </nuxt-link>
              </template>
              <template slot="description">
                <Rate allow-half disabled :value="activity.description" show-text />
              </template>
            </ListItemMeta>
            <TextParser :value="activity.content" />
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
          <ListItem />
        </nuxt-link>
      </div>
    </List>
  </div>
</template>

<script>
import TextParser from './TextParser'
export default {
  name: 'MyActivity',
  components: { TextParser },
  props: {
    user: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      avatar: '',
      username: '',
      activities: []
    }
  },
  async mounted () {
    await this.loadData()
  },
  methods: {
    async loadData () {
      this.activities = await this.$axios.$post('/api/User/useractivities', {
        user: this.user
      })
    }
  }
}
</script>

<style scoped>

</style>
