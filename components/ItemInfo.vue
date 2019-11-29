<template>
  <div v-if="data != null">
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
    <EditItemModal :modal="showEdit" :original="editData" @modalVisibleChange="handleVisibleChange" />
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
      default () {
        return {
          title: '',
          type: 0,
          note: '',
          cover: '',
          rating: 0
        }
      }
    }
  },
  data () {
    return {
      showEdit: false,
      editData: null
    }
  },
  methods: {
    editItem () {
      this.editData = {
        title: this.data.title,
        type: this.data.type,
        checkedCategory: [],
        tags: [],
        fileList: []
      }
      for (const x of this.data.category) {
        this.editData.checkedCategory.push(x.id)
      }
      for (const x of this.data.tag) {
        this.editData.tags.push(x.id + '')
      }
      // fileList @type UploadFile[]，经 Props 查 PropsTypes.arrayOf(PropsTypes.custom(UploadFile))
      // 其中 interface UploadFile { uid: string | number; name: string; }
      // 因此必须给出 name 和 uid，否则会报 warning
      this.editData.fileList.push({
        uid: '-1',
        status: 'done',
        url: this.data.cover,
        name: this.data.title
      })
      this.showEdit = true
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
