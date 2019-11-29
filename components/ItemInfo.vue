<template>
  <div>
    <Card style="width:350px" dis-hover>

      <div slot="title" class="item-title" >
        {{ data.title }}
        <Tag type="border" color="success">
          {{ data.type }}
        </Tag>
      </div>
      <a slot="extra" href="#" @click.prevent="editItem">
        修改
      </a>
      <div style="text-align:center">
        <img :src="data.cover" style="width: 100%">
        <Rate allow-half :value="data.rating" disabled show-text />
      </div>
      <span>
        {{ data.note }}
      </span>
    </Card>
  </div>
</template>

<script>
export default {
  name: 'ItemInfo',
  middleware: ['auth'],
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  methods: {
    editItem () {
      // TODO 打开 EditItem 并设置初始值
      console.log('aaa')
    }
  }
}
</script>

<style scoped>
.item-title {
  font-size: 16px;
  color: #17233d;
  font-weight: 500;
}
</style>
