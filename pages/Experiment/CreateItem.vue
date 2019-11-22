<style>
  .vertical-center-modal {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
<template>
  <div>
    <Button @click="modal = true">
      button
    </Button>
    <Modal
      v-model="modal"
      title="Title"
      class-name="vertical-center-modal"
      :closable="false"
      :masked-closable="false"
    >
      <Form>
        <p v-if="formError" class="Error">
          {{ formError }}
        </p>
        <FormItem label="标题" :required="true">
          <Input v-model="title" type="text" />
        </FormItem>
        <FormItem label="种类" :required="true">
          <Select v-model="typeId" placeholder="请选择类型">
            <Option v-for="type in typeList" :key="type.label" :value="type.value">
              {{ type.label }}
            </Option>
          </Select>
        </FormItem>
        <FormItem label="分类" :required="true">
          <Card>
            <Tag
              v-for="tag in checkedCategory"
              :key="tag"
              color="primary"
              :name="tag"
              :checkable="true"
              @on-change="uncheckCategory"
            >
              {{ tag }}
            </Tag>
          </Card>
          <Card>
            <Tag
              v-for="tag in uncheckedCategory"
              :key="tag"
              color="primary"
              :name="tag"
              :checkable="true"
              @on-change="checkCategory"
            >
              {{ tag }}
            </Tag>
          </Card>
        </FormItem>
        <FormItem label="标签">
          <Tags></Tags>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import Tags from '~/components/Tags'
export default {
  components: {
    Tags
  },
  data () {
    return {
      modal: false,
      formError: null,
      title: '',
      typeId: null,
      typeList: [],
      rating: 0,
      checkedCategory: [],
      uncheckedCategory: []
    }
  },
  async mounted () {
    await this.load_data()
  },
  methods: {
    async load_data () {
      this.typeList = await this.$axios.$post('/api/Type/getTypeList')
      this.uncheckedCategory = await this.$axios.$post('api/Tag/tagList')
    },
    checkCategory (checked, name) {
      this.checkedCategory.push(name)
      this.uncheckedCategory = this.uncheckedCategory.filter(tag => tag !== name)
    },
    uncheckCategory (checked, name) {
      this.checkedCategory = this.checkedCategory.filter(tag => tag !== name)
      this.uncheckedCategory.push(name)
    }
  }
}
</script>
