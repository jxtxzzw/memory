<template>
  <div class="clearfix">
    <a-upload
      list-type="picture-card"
      :file-list="fileList"
      :before-upload="handleBeforeUpload"
      @preview="handlePreview"
      @change="handleChange"
    >
      <div v-if="fileList.length === 0">
        <a-icon type="plus" />
        <div class="ant-upload-text">
          上传
        </div>
      </div>
    </a-upload>
    <Input v-model="title" placeholder="标题"></Input>
    <Input v-model="type" placeholder="类型"></Input>
    <Input v-model="category" placeholder="类型"></Input>
    <Button @click="handleUpload">
      上传
    </Button>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="预览" style="width: 100%" :src="previewImage" />
    </a-modal>
    <SupportBrowserList></SupportBrowserList>
  </div>
</template>
<script>
import SupportBrowserList from '../../components/SupportBrowserList'
export default {
  components: { SupportBrowserList },
  data () {
    return {
      title: '',
      type: '',
      category: '',
      file: '',
      previewVisible: false,
      previewImage: '',
      fileList: []
    }
  },
  methods: {
    handleBeforeUpload (file) {
      this.fileList = [...this.fileList, file]
      return false
    },
    handleCancel () {
      this.previewVisible = false
    },
    handlePreview (file) {
      this.previewImage = file.url || file.thumbUrl
      this.previewVisible = true
    },
    handleChange ({ fileList }) {
      this.fileList = fileList
    },
    async handleUpload () {
      const data = {
        file: this.fileList[0],
        title: this.title,
        type: this.type,
        category: this.category,
        tag: ['三体', '刘慈欣']
      }
      const result = await this.$axios.$post('/api/upload', data)
      console.log(result)
    }
  }
}
</script>
<style>
  /* you can make up upload button and sample style by using stylesheets */
  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }

  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }
</style>
