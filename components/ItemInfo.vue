<template>
  <div>
    <Card style="width:350px" dis-hover>
      <div slot="title" class="item-title">
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
    <EditItemModal :modal="showEdit" :form-validate="editData" @modalVisibleChange="handleVisibleChange" />
    <Button @click="aaa"> 12334 </Button>
  </div>
</template>

<script>
import EditItemModal from './EditItemModal'
export default {
  name: 'ItemInfo',
  components: { EditItemModal },
  middleware: ['auth'],
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      showEdit: false,
      editData: null
    }
  },
  methods: {
    aaa () {
      console.log(this.data)
    },
    editItem () {
      this.editData = {
        title: this.data.title,
        type: this.data.type,
        checkedCategory: [],
        tags: [],
        fileList: []
      }
      for (const x of this.data.category) {
        this.editData.checkedCategory.push(x)
      }
      for (const x of this.data.tag) {
        this.editData.tags.push(x.id + '')
      }
      this.editData.fileList.push({
        uid: '-1',
        status: 'done',
        url: this.data.cover
      })
      console.log(this.editData)
      this.showEdit = true
      // TODO 打开 EditItem 并设置初始值
      console.log('aaa')
    },
    handleVisibleChange (status) {
      this.showEdit = status
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
