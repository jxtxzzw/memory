<template>
  <div v-if="data != null">
    {{ TypeList }}
    {{ CategoryList }}
    <Card style="width:350px" dis-hover>
      <div slot="title" class="item-title">
        <Tag type="border" color="success">
          {{ TypeList[data.type] }}
        </Tag>
        {{ data.title }}
      </div>
      <a slot="extra" href="#" @click.prevent="editItem">
        修改
      </a>
      <div style="text-align:center">
        <img :src="data.cover" style="width: 100%">
        <Rate allow-half :value="data.rating" disabled show-text />
      </div>
      <Row>
        <Tag
          v-for="category in data.category"
          :key="category"
          color="primary"
          type="dot"
        >
          {{ CategoryList[category] }}
        </Tag>
      </Row>
      <Row>
        <Tag
          v-for="tag in data.tag"
          :key="tag"
        >
          {{ tag }}
        </Tag>
      </Row>
      <Row>
        <span>
          {{ data.note }}
        </span>
      </Row>
    </Card>
    <EditItemModal :modal="showEdit" :original="editData" @success="handleSuccess" @editItemVisibleChange="handleVisibleChange" />
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
          id: 0,
          title: '',
          type: 0,
          note: '',
          cover: '',
          rating: 0,
          category: [],
          tag: []
        }
      }
    }
  },
  data () {
    return {
      CategoryList: {},
      TypeList: {},
      showEdit: false,
      editData: null
    }
  },
  // 需要使用 watcher 来侦听 type 的变化，并触发 loadCategoryList，否则 mounted 的时候可能 type 为 0 或者 ''
  watch: {
    data: {
      deep: true,
      async handler () {
        await this.loadCategoryList()
      }
    }
  },
  async mounted () {
    await this.loadTypeList()
    await this.loadCategoryList()
  },
  methods: {
    // 需要使用 this.$set 以便 Vue 能知道数据更新了
    async loadCategoryList () {
      const CategoryList = await this.$axios.$post('api/Category/categoryList', {
        type: this.data.type
      })
      for (const category of CategoryList) {
        this.$set(this.CategoryList, category.id, category.name)
      }
    },
    async loadTypeList () {
      const TypeList = await this.$axios.$post('api/Type/getTypeList')
      for (const type of TypeList) {
        this.$set(this.TypeList, type.value, type.label)
      }
    },
    editItem () {
      this.editData = {
        id: this.data.id,
        title: this.data.title,
        type: this.data.type,
        checkedCategory: [],
        tags: [],
        fileList: [],
        note: this.data.note
      }
      for (const x of this.data.category) {
        this.editData.checkedCategory.push(x)
      }
      for (const x of this.data.tag) {
        this.editData.tags.push(x)
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
    handleSuccess () {
      this.$emit('success')
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
