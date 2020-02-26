<template>
  <div>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate">
      <Alert v-if="formError" type="error" show-icon>
        表单验证失败
        <span slot="desc">
          {{ formError }}
        </span>
      </Alert>
      <FormItem label="原密码" prop="oldPassword">
        <Input v-model="formValidate.oldPassword" type="password" password />
      </FormItem>
      <FormItem label="新密码" prop="newPassword">
        <Input v-model="formValidate.newPassword" type="password" password />
      </FormItem>
      <FormItem label="确认密码" prop="newPasswordConfirm">
        <Input v-model="formValidate.newPasswordConfirm" type="password" password />
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleChangePassword('formValidate')">
          修改密码
        </Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import * as passwordEncrypt from '~/assets/passwordEncrypt'
export default {
  middleware: ['auth'],
  name: 'ChangePassword',
  data () {
    return {
      formValidate: {
        oldPassword: '',
        newPassword: '',
        newPasswordConfirm: ''
      },
      ruleValidate: {
        oldPassword: [
          { required: true, message: '密码不得为空', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '密码不得为空', trigger: 'blur' }
        ],
        newPasswordConfirm: [
          { required: true, message: '密码不得为空', trigger: 'blur' },
          {
            required: true,
            validator: (rule, value, callback) => {
              if (value == null || value === '') {
                callback(new Error('密码不得为空'))
              } else if (this.formValidate.newPassword !== value) {
                callback(new Error('两次密码不匹配'))
              } else {
                callback()
              }
            },
            trigger: 'change'
          }
        ]
      },
      formError: null,
      loading: true
    }
  },
  methods: {
    async handleChangePassword (name) {
      await this.$refs[name].validate(async (valid) => {
        this.loading = false
        this.$nextTick(() => {
          this.loading = true
        })
        if (valid) {
          const passwords = {
            oldPassword: passwordEncrypt.clientEncrypt(this.formValidate.oldPassword),
            newPassword: passwordEncrypt.clientEncrypt(this.formValidate.newPassword)
          }
          const res = await this.$axios.$post('/api/User/change', passwords)
          if (res === 'OK') {
            this.$Message.success({
              background: true,
              content: '密码修改成功，请重新登录'
            })
            this.$auth.logout()
          } else {
            this.$Message.error({
              background: true,
              content: '密码修改失败'
            })
            this.formError = '密码修改失败'
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
