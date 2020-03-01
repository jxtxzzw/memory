<style>
  .vertical-center-modal .ant-upload.ant-upload-select-picture-card {
    width: 208px;
    height: 312px;
  }

  .vertical-center-modal .ant-upload-list-picture-card .ant-upload-list-item {
    width: 208px;
    height: 312px;
  }

</style>
<template>
  <div v-if="formValidate != null">
    <Modal
      v-model="modalVisible"
      title="添加"
      class-name="vertical-center-modal"
      :closable="false"
      :mask-closable="false"
      :loading="loading"
      width="50"
      @on-ok="handleUpload('formValidate')"
      @on-cancel="handleCancel"
      @on-visible-change="handleVisibleChange"
    >
      <!-- 宽度是响应式的，当屏幕尺寸小于 768px 时，宽度会变为自动auto。当其值不大于 100 时以百分比显示，大于 100 时为像素 -->
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate">
        <Alert v-if="formError" type="error" show-icon>
          表单验证失败
          <span slot="desc">
            {{ formError }}
          </span>
        </Alert>
        <Row>
          <i-col span="8">
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
          <i-col span="16">
            <FormItem label="标题" prop="title">
              <Input v-model="formValidate.title" type="text" />
            </FormItem>
            <FormItem label="种类" prop="type">
              <Select v-model="formValidate.type" placeholder="请选择类型" @on-change="getCategory">
                <Option v-for="type in typeList" :key="type.label" :value="type.value">
                  {{ type.label }}
                </Option>
              </Select>
            </FormItem>
            <FormItem label="分类" prop="category">
              <br>
              <Card dis-hover>
                <Tag
                  v-for="tag in formValidate.checkedCategory"
                  :key="tag"
                  color="primary"
                  :name="tag"
                  type="dot"
                  :checkable="true"
                  @on-change="uncheckCategory"
                >
                  {{ CategoryList[tag] }}
                </Tag>
              </Card>
              <Card dis-hover>
                <Tag
                  v-for="tag in uncheckedCategory"
                  :key="tag"
                  color="primary"
                  :name="tag"
                  :checkable="true"
                  type="dot"
                  @on-change="checkCategory"
                >
                  {{ CategoryList[tag] }}
                </Tag>
              </Card>
            </FormItem>
            <FormItem label="标签">
              <Tags :tags="formValidate.tags" @add="addTag" @remove="removeTag"></Tags>
            </FormItem>
          </i-col>
        </Row>
        <FormItem label="备注">
          <Input v-model="formValidate.note" type="textarea" maxlength="50" show-word-limit />
        </FormItem>
        <FormItem label="链接">
          <Links :links="formValidate.links" @change="changeLink"></Links>
        </FormItem>
      </Form>
    </Modal>
    <Modal v-model="previewVisible" footer-hide @cancel="handleCancel">
      <img alt="预览" style="width: 100%" :src="previewImage" />
    </Modal>
  </div>
</template>

<script>
import Tags from '~/components/Tags'
import Links from '~/components/Links'

export default {
  middleware: ['auth'],
  components: {
    Links,
    Tags
  },
  props: {
    modal: {
      type: Boolean,
      default: false
    },
    original: {
      type: Object,
      default () {
        return {
          title: '',
          type: 0,
          checkedCategory: [],
          tags: [],
          fileList: [],
          note: '',
          links: []
        }
      }
    }
  },
  data () {
    return {
      formValidate: {
        title: '',
        type: 0,
        checkedCategory: [],
        tags: [],
        fileList: [],
        note: '',
        links: []
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
      formError: null,
      typeList: [],
      uncheckedCategory: [],
      file: '',
      previewVisible: false,
      previewImage: '',
      loading: true,
      CategoryList: {},
      modalVisible: false
    }
  },
  // 增加 watcher 来监控 props 中 category 的修改
  watch: {
    original: {
      // 深度 watcher 以监控 formValidate 的子元素 formValidate.checkedCategory
      deep: true,
      handler () {
        // 从所有分类中去除已经选择的分类
        this.uncheckedCategory = this.uncheckedCategory.filter(id => !this.original.checkedCategory.includes(id))
        this.formValidate = this.original
        // watch 需要 reload，即做初始化加载 category
        this.reloadCategory()
      }
    },
    // 用 watcher 留下 modal 的值，否则模态框开启关闭的时候修改 props 的值就会引起 warning
    modal: {
      handler (val) {
        this.modalVisible = val
      }
    }
  },
  async mounted () {
    await this.load_data()
  },
  methods: {
    async load_data () {
      this.typeList = await this.$axios.$post('/api/Type/getTypeList')
      this.reloadCategory()
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
      // 先移除重复项，再添加，确保不存在重复标签
      this.removeTag(tagName)
      this.formValidate.tags.push(tagName)
      // 过滤空标签
      this.formValidate.tags = this.formValidate.tags.filter(tag => tag.length > 0)
    },
    removeTag (tagName) {
      this.formValidate.tags = this.formValidate.tags.filter(tag => tag !== tagName)
    },
    changeLink (links) {
      this.formValidate.links = links
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
          let success = true
          let res
          // 过滤掉空标签
          try {
            res = await this.$axios.$post('/api/upload', this.formValidate)
          } catch (e) {
            success = false
            this.$Message.error({
              background: true,
              content: '表单提交出现错误：' + e
            })
            this.formError = '表单提交出现错误：' + e
          }
          if (success) {
            this.modalVisible = false
            this.$Message.success({
              background: true,
              content: '编辑成功'
            })
            if (this.original.id === res.id) {
              this.$emit('success')
            } else {
              // 邮件发送发出请求后直接返回，不做 await，否则会等很久
              let image
              if (this.formValidate.fileList.length === 0) {
                // 说明没有传图片
                image = ''
              } else {
                // original.id !== res.id 说明是新建，新建只可能是 thumbUrl
                // 只有修改时没有上传新图才是 url，修改时上传了新图也是 thumbUrl
                image = this.formValidate.fileList[0].thumbUrl
              }
              this.$axios.$post('/api/mailtest', {
                identifier: 'share',
                parameter: {
                  who: this.$auth.$state.user.username,
                  title: this.formValidate.title,
                  image,
                  href: 'https://memory.jxtxzzw.com/item/' + res.id
                }
              })
              this.$router.push('/item/' + res.id)
            }
          }
        } else {
          this.$Message.error({
            background: true,
            content: '表单验证失败，请检查您输入的内容'
          })
          this.formError = '表单验证失败，请检查您输入的内容'
        }
      })
    },
    handleVisibleChange (status) {
      this.$emit('editItemVisibleChange', status)
    },
    async reloadCategory () {
      // CategoryList 是 []，this.CategoryList 是 {}，类型不一样
      const CategoryList = await this.$axios.$post('api/Category/categoryList', {
        type: this.formValidate.type
      })
      for (const category of CategoryList) {
        this.$set(this.CategoryList, category.id, category.name)
      }
      // 做一次 map 留下所有的 id，然后过滤得到所有不在 checked 中的 id 作为 unchecked
      // 对于修改，要保留住原来已经选中的那些分类
      this.uncheckedCategory = CategoryList.map(el => el.id).filter(id => !this.formValidate.checkedCategory.includes(id))
    },
    async getCategory () {
      // 先清空，然后再做 reload
      this.formValidate.checkedCategory = []
      await this.reloadCategory()
    }
  }
}
</script>
