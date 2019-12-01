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
    <Button @click="handleUpload">
      上传
    </Button>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="预览" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>
<script>
export default {
  middleware: ['auth'],
  data () {
    return {
      previewVisible: false,
      previewImage: '',
      fileList: []
    }
  },
  methods: {
    handleBeforeUpload (file) {
      this.fileList = [...this.fileList, file]
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
        fileList: this.fileList
      }
      let success = true
      try {
        await this.$axios.$post('/api/User/avatar', data)
      } catch (e) {
        success = false
      }
      if (success) {
        this.$Message.success({
          background: true,
          content: '修改头像成功，您可能需要重新登录才能看到新的头像'
        })
      }
    }
  }
}
</script>
