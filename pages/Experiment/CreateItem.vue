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
        <FormItem label="标题" required="true">
          <Input v-model="title" type="text" />
        </FormItem>
        <FormItem label="种类" required="true">
          <Select v-model="typeId" placeholder="请选择类型">
            <Option v-for="type in typeList" :key="type.label" :value="type.value">
              {{ type.label }}
            </Option>
          </Select>
        </FormItem>
      </Form>
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
