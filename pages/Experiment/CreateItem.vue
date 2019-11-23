<style>
  .ant-upload.ant-upload-select-picture-card {
    width: 208px;
    height: 312px;
  }
  .ant-upload-list-picture-card .ant-upload-list-item {
    width: 208px;
    height: 312px;
  }
</style>
<template>
  <div>
    <Button @click="modal = true">
      button
    </Button>
    <Modal
      v-model="modal"
      title="添加"
      class-name="vertical-center-modal"
      :closable="false"
      :masked-closable="false"
      :loading="loading"
      @on-ok="handleUpload('formValidate')"
      @on-cancel="handleCancel"
    >
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate">
        <Row>
          <i-col span="12">
            <a-upload
              list-type="picture-card"
              :file-list="formValidate.fileList"
              :before-upload="handleBeforeUpload"
              @preview="handlePreview"
              @change="handleChange"
            >
              <div v-if="formValidate.fileList.length === 0">
                <a-icon type="plus" />
                <div class="ant-upload-text">
                  上传
                </div>
              </div>
            </a-upload>
          </i-col>
          <i-col span="12">
            <p v-if="formError" class="Error">
              {{ formError }}
            </p>
            <FormItem label="标题" prop="title">
              <Input v-model="formValidate.title" type="text" />
            </FormItem>
            <FormItem label="种类" prop="type">
              <Select v-model="formValidate.type" placeholder="请选择类型">
                <Option v-for="type in typeList" :key="type.label" :value="type.value">
                  {{ type.label }}
                </Option>
              </Select>
            </FormItem>
            <FormItem label="分类" prop="category">
              <br>
              <Card>
                <Tag
                  v-for="tag in formValidate.checkedCategory"
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
              <Tags @add="addTag" @remove="removeTag"></Tags>
            </FormItem>
          </i-col>
        </Row>
      </Form>
    </Modal>
    <Modal v-model="previewVisible" footer-hide @cancel="handleCancel">
      <img alt="预览" style="width: 100%" :src="previewImage" />
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
      formValidate: {
        title: '',
        type: 0,
        checkedCategory: [],
        tags: [],
        fileList: []
      },
      ruleValidate: {
        title: [
          { required: true, message: '标题不得为空', trigger: 'blur' }
        ],
        type: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (value === 0) { callback(new Error('类型不得为空')) } else { callback() }
            },
            trigger: 'change'
          }
        ]
      },
      modal: false,
      formError: null,
      typeList: [],
      uncheckedCategory: [],
      file: '',
      previewVisible: false,
      previewImage: '',
      loading: true
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
      this.formValidate.checkedCategory.push(name)
      this.uncheckedCategory = this.uncheckedCategory.filter(tag => tag !== name)
    },
    uncheckCategory (checked, name) {
      this.formValidate.checkedCategory = this.formValidate.checkedCategory.filter(tag => tag !== name)
      this.uncheckedCategory.push(name)
    },
    addTag (tagName) {
      this.formValidate.tags.push(tagName)
    },
    removeTag (tagName) {
      this.formValidate.tags = this.formValidate.tags.filter(tag => tag !== tagName)
    },
    handleBeforeUpload (file) {
      this.formValidate.fileList = [...this.formValidate.fileList, file]
    },
    handleCancel () {
      this.previewVisible = false
    },
    handlePreview (file) {
      this.previewImage = file.url || file.thumbUrl
      this.previewVisible = true
    },
    handleChange ({ fileList }) {
      this.formValidate.fileList = fileList
    },
    async handleUpload (name) {
      await this.$refs[name].validate(async (valid) => {
        this.loading = false
        this.$nextTick(() => {
          this.loading = true
        })
        if (valid) {
          await this.$axios.$post('/api/upload', this.formValidate)
          this.modal = false
        } else {
          this.$Message.error({
            background: true,
            content: '表单验证失败，请检查您输入的内容'
          })
          this.modal = true
        }
      })
    }
  }
}
</script>
