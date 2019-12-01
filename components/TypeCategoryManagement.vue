<template>
  <div>
    <Row>
      <i-col span="12">
        <Divider>类型管理</Divider>
        <a-select
          v-model="selectedType"
          show-search
          placeholder="请选择类别"
          option-filter-prop="children"
          style="width: 200px"
          :filter-option="filterOption"
          @change="reloadCategory"
          @search="handleTypeSearch"
        >
          <a-select-option v-for="type in types" :key="type.value" :value="type.label">
            {{ type.label }}
          </a-select-option>
        </a-select>
        <span v-if="selectedType !== ''">
          <ButtonGroup v-if="typeExist">
            <Button @click="showTypeInput">
              重命名
            </Button>
            <Button @click="deleteType">
              删除
            </Button>
          </ButtonGroup>
          <Button v-else @click="newType"> 新建 </Button>
        </span>
        <Modal
          v-model="typeInput"
          title="重命名类型"
          class-name="vertical-center-modal"
          :closable="false"
          :mask-closable="false"
          @on-ok="renameType"
        >
          <Form>
            <FormItem label="原名称" prop="oldname">
              <Input disabled readonly :value="selectedType" type="text" />
            </FormItem>
            <FormItem label="新名称" prop="newname">
              <Input v-model="newTypeName" type="text" />
            </FormItem>
          </Form>
        </Modal>
      </i-col>
      <i-col span="12">
        <Divider>分类管理</Divider>
        <a-select
          v-model="selectedCategory"
          show-search
          placeholder="请选择分类"
          option-filter-prop="children"
          style="width: 200px"
          :filter-option="filterOption"
          @search="handleCategorySearch"
        >
          <a-select-option v-for="category in categories" :key="category.id" :value="category.name">
            {{ category.name }}
          </a-select-option>
        </a-select>
        <span v-if="selectedCategory !== ''">
          <ButtonGroup v-if="categoryExist">
            <Button @click="showCategoryInput">
              重命名
            </Button>
            <Button @click="deleteCategory">
              删除
            </Button>
          </ButtonGroup>
          <Button v-else @click="newCategory"> 新建 </Button>
        </span>
        <Modal
          v-model="categoryInput"
          title="重命名分类"
          class-name="vertical-center-modal"
          :closable="false"
          :mask-closable="false"
          @on-ok="renameCategory"
        >
          <Form>
            <FormItem label="原名称" prop="oldname">
              <Input disabled readonly :value="selectedCategory" type="text" />
            </FormItem>
            <FormItem label="新名称" prop="newname">
              <Input v-model="newCategoryName" type="text" />
            </FormItem>
          </Form>
        </Modal>
      </i-col>
    </Row>
  </div>
</template>

<script>
export default {
  name: 'TypeCategoryManagement',
  data () {
    return {
      typeInput: false,
      types: [],
      TypeList: {},
      selectedType: '',
      newTypeName: '',
      categoryInput: false,
      categories: [],
      CategoryList: {},
      selectedCategory: '',
      newCategoryName: ''
    }
  },
  computed: {
    typeExist () {
      return this.TypeList[this.selectedType.toLowerCase()] !== undefined
    },
    categoryExist () {
      return this.CategoryList[this.selectedCategory.toLowerCase()] !== undefined
    }
  },
  async mounted () {
    await this.loadTypes()
  },
  methods: {
    async loadTypes () {
      this.types = await this.$axios.$post('/api/Type/getTypeList')
      for (const type of this.types) {
        this.$set(this.TypeList, type.label.toLowerCase(), type.value)
      }
    },
    async reloadCategory () {
      this.categories = await this.$axios.$post('api/Category/categoryList', {
        type: this.TypeList[this.selectedType.toLowerCase()]
      })
      for (const category of this.categories) {
        this.$set(this.CategoryList, category.name, category.id)
      }
      this.selectedCategory = ''
    },
    filterOption (input, option) {
      return option.componentOptions.children[0].text.toLowerCase().includes(input.toLowerCase())
    },
    handleTypeSearch (input) {
      this.selectedType = input
    },
    async typeAPI (id, name) {
      const data = {
        id,
        name
      }
      await this.$axios.$post('/api/addType', data)
      await this.reload()
    },
    async newType () {
      await this.typeAPI(0, this.selectedType)
    },
    async renameType () {
      await this.typeAPI(this.TypeList[this.selectedType.toLowerCase()], this.newTypeName)
    },
    async deleteType () {
      await this.typeAPI(this.TypeList[this.selectedType.toLowerCase()], undefined)
    },
    showTypeInput () {
      this.newTypeName = ''
      this.typeInput = true
    },
    handleCategorySearch (input) {
      this.selectedCategory = input
    },
    async categoryAPI (id, name, type) {
      const data = {
        id,
        name,
        type
      }
      await this.$axios.$post('/api/Type/getTypeList', data)
      await this.reload()
    },
    async newCategory () {
      await this.categoryAPI(0, this.selectedCategory, this.TypeList[this.selectedType.toLowerCase()])
    },
    async renameCategory () {
      await this.categoryAPI(this.CategoryList[this.selectedCategory.toLowerCase()], this.newCategoryName, this.TypeList[this.selectedType.toLowerCase()])
    },
    async deleteCategory () {
      await this.categoryAPI(this.CategoryList[this.selectedCategory.toLowerCase()], undefined, undefined)
    },
    showCategoryInput () {
      this.newCategoryName = ''
      this.categoryInput = true
    },
    async reload () {
      await this.loadTypes()
    }
  }
}
</script>

<style scoped>

</style>
