<template>
  <div>
    <List>
      <ListItem v-if="read">
        <ListItemMeta>
          <span slot="title">
            <Rate :value="my.rating" disabled show-text />
            <Tag type="border" color="success"> {{ my.recursion }} 周目</Tag>
          </span>
          <span slot="description">
            {{ my.review }}
          </span>
        </ListItemMeta>
        <template slot="action">
          <li>
            <a @click="modalVisible = true">修改评价</a>
          </li>
        </template>
      </ListItem>
      <ListItem v-else>
        <ListItemMeta
          title="我没有评价过该内容"
          description="是没有看过吗？我得找个时间看一下"
        />
        <template slot="action">
          <li>
            <a @click="modalVisible = true">添加评价</a>
          </li>
        </template>
      </ListItem>
    </List>
    <Modal
      v-model="modalVisible"
      title="我的评价"
      class-name="vertical-center-modal"
      :closable="false"
      :masked-closable="false"
      :loading="loading"
      @on-ok="handleEdit('formValidate')"
    >
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate">
        <Alert v-if="formError" type="error" show-icon>
          表单验证失败
          <span slot="desc">
            {{ formError }}
          </span>
        </Alert>
        <FormItem label="评分" prop="rating">
          <Rate v-model="formValidate.rating" allow-half show-text />
        </FormItem>
        <FormItem label="周目" prop="recursion">
          <InputNumber v-model="formValidate.recursion" :editable="false" :min="0" />
        </FormItem>
        <FormItem label="评价">
          <Input v-model="formValidate.review" type="textarea" maxlength="2048" show-word-limit :rows="6" />
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
export default {
  name: 'Rating',
  props: {
    my: {
      type: Object,
      default () {
        return {
          item: 0,
          rating: 0,
          recursion: 2,
          review: ''
        }
      }
    }
  },
  data () {
    return {
      loading: true,
      formValidate: {
        rating: 0,
        recursion: 0,
        review: ''
      },
      ruleValidate: {
        rating: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (value <= 0 || value > 5) { callback(new Error('分值错误')) } else { callback() }
            },
            trigger: 'change'
          }
        ],
        recursion: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (value <= 0) { callback(new Error('周目数必须是一个正整数')) } else { callback() }
            },
            trigger: 'change'
          }
        ]
      },
      formError: null,
      modalVisible: false
    }
  },
  computed: {
    read () {
      return this.my && this.my.recursion > 0
    }
  },
  watch: {
    my: {
      deep: true,
      handler () {
        // 手动赋值，避免 formValidate = my 之后，编辑表单的同时，由于 formValidate 修改了，my 也修改了，后面的显示也就跟着修改了
        this.formValidate.item = this.my.item
        this.formValidate.rating = this.my.rating || 0
        this.formValidate.recursion = this.my.recursion || 0
        this.formValidate.review = this.my.review || ''
      }
    }
  },
  methods: {
    async handleEdit (name) {
      await this.$refs[name].validate(async (valid) => {
        this.loading = false
        this.$nextTick(() => {
          this.loading = true
        })
        if (valid) {
          let success = true
          try {
            console.log(this.formValidate)
            await this.$axios.$post('/api/Rating/rating', this.formValidate)
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
              content: '评价成功'
            })
            this.$emit('success')
          }
        } else {
          this.$Message.error({
            background: true,
            content: '表单验证失败，请检查您输入的内容'
          })
          this.formError = '表单验证失败，请检查您输入的内容'
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
