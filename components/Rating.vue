<template>
  <div>
    <List>
      <ListItem v-if="read">
        <ListItemMeta
          avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar"
        >
          <span slot="title">
            <Rate value="3" disabled show-text />
            <Tag type="border" color="success">2 周目</Tag>
          </span>
          <span slot="description">
            我的评价
          </span>
        </ListItemMeta>
        <template slot="action">
          <li>
            <a @click="aaa">修改评价</a>
          </li>
        </template>
      </ListItem>
      <ListItem v-else >
        <ListItemMeta
          avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar"
          title="我没有评价过该内容"
          description="是没有看过吗？我得找个时间看一下"
        />
        <template slot="action">
          <li>
            <a @click="aaa">添加评价</a>
          </li>
        </template>
      </ListItem>
    </List>
  </div>
</template>

<script>
export default {
  name: 'Rating',
  data () {
    return {
      read: true
    }
  },
  methods: {
    aaa () {
      console.log('aaa')
    }
  }
}
</script>

<style scoped>

</style>
