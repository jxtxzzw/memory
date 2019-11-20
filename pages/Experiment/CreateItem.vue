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
      <form>
        <p v-if="formError" class="Error">
          {{ formError }}
        </p>
        <p>标题<Input v-model="title" type="text" /></p>
        <p>
          种类<Select v-model="typeId" placeholder="请选择类型">
            <Option v-for="type in typeList" :key="type.label" :value="type.value">
              {{ type.label }}
            </Option>
          </Select>
        </p>
        <p>打分: <Rate v-model="rating" allow-half /></p>
      </form>
    </Modal>
  </div>
</template>

<script>
export default {
  data () {
    return {
      modal: false,
      formError: null,
      title: '',
      typeId: null,
      typeList: [],
      rating: 0
    }
  },
  async mounted () {
    await this.load_data()
  },
  methods: {
    async load_data () {
      this.typeList = await this.$axios.$post('/api/Type/getTypeList')
    }
  }
}
</script>
