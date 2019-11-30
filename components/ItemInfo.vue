<template>
  <div v-if="data != null">
    <Card style="width:350px" dis-hover>
      <div slot="title" class="item-title">
        <Tag type="border" color="success">
          {{ data.type }}
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
      <Tag v-for="category in data.category"
           :key="category"
           :color="colors[category % colors.length]"
      >
        <!-- category 是一个数字，表示分类在数据库中的 id，对 colors 数组取模，得到随机颜色 -->
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
      colors: [
        'magenta',
        'red',
        'volcano',
        'orange',
        'gold',
        'yellow',
        'lime',
        'green',
        'cyan',
        'blue',
        'geekblue',
        'purple'
      ],
      CategoryList: {},
      showEdit: false,
      editData: null
    }
  },
  async mounted () {
    await this.loadCategoryList()
  },
  methods: {
    async loadCategoryList () {
      const CategoryList = await this.$axios.$post('api/Category/categoryList')
      for (const category of CategoryList) {
        this.CategoryList[category.id] = category.name
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
