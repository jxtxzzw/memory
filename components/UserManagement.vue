<template>
  <div>
    <filter-table
      :data="userData"
      :columns="tableColumns"
      @on-search="onSearch"
    />
    <Modal
      v-model="showCreateUser"
      title="添加"
      class-name="vertical-center-modal"
      :closable="false"
      :mask-closable="false"
      :loading="loading"
      @on-ok="handleCreate('formValidate')"
    >
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate">
        <Alert v-if="formError" type="error" show-icon>
          表单验证失败
          <span slot="desc">
            {{ formError }}
          </span>
        </Alert>
        <FormItem label="用户名" prop="username">
          <Input v-model="formValidate.username" type="text" />
        </FormItem>
        <FormItem label="真实姓名" prop="realname">
          <Input v-model="formValidate.realname" type="text" />
        </FormItem>
        <FormItem label="邮箱" prop="email">
          <Input v-model="formValidate.email" type="text" />
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import FilterTable from './FilterTable'
export default {
  middleware: ['auth'],
  name: 'UserManagement',
  components: { FilterTable },
  data () {
    return {
      showCreateUser: false,
      rawData: [],
      userData: [],
      lackingAuth: false,
      confirmDelete: false,
      modal_loading: false,
      deleteTarget: '',
      loading: false,
      formValidate: {
        username: '',
        realname: '',
        email: ''
      },
      ruleValidate: {
        username: [
          { required: true, message: '用户名不得为空', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '邮箱不得为空', trigger: 'blur' }
        ]
      },
      formError: null,
      tableColumns: [
        {
          title: 'ID',
          key: 'id',
          filter: {
            type: 'Input'
          }
        },
        {
          title: '用户名',
          key: 'username',
          filter: {
            type: 'Input'
          }
        },
        {
          title: '真实姓名',
          key: 'realname',
          filter: {
            type: 'Input'
          }
        },
        {
          title: '邮箱',
          key: 'email',
          filter: {
            type: 'Input'
          }
        },
        {
          title: '最后一次登录',
          key: 'latest',
          filter: {
            type: 'Input'
          },
          render: (h, params) => {
            const date = new Date(params.row.latest).toLocaleString('zh-cn', { hour12: false })
            return h('span', date)
          }
        },
        {
          title: '操作',
          key: 'action',
          filter: {
            type: 'Render',
            render: (h) => {
              return h('Button', {
                props: {
                  type: 'success',
                  long: true,
                  disabled: this.rawData.length === 0
                },
                on: {
                  click: () => {
                    this.showCreateUser = true
                  }
                }
              }, '新建')
            }
          },
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'warning',
                  long: true
                },
                style: {
                  margin: '5px 5px 5px 5px'
                },
                on: {
                  click: () => {
                    this.resetPassword(params.row.id)
                  }
                }
              }, '重置密码')
            ])
          }
        }
      ]
    }
  },
  async mounted () {
    await this.loadData()
  },
  methods: {
    generateUserData (search = null) {
      this.userData = []
      for (const user of this.rawData) {
        let satisfied = true
        if (search != null) {
          if (search.id != null) {
            satisfied = satisfied && parseInt(user.id) === parseInt(search.id)
          }
          if (search.username != null) {
            satisfied = satisfied && user.username.toLowerCase().includes(search.username.toLowerCase())
          }
          if (search.realname != null) {
            satisfied = satisfied && user.realname.toLowerCase().includes(search.realname.toLowerCase())
          }
          if (search.email != null) {
            satisfied = satisfied && user.email.toLowerCase().includes(search.email.toLowerCase())
          }
          if (search.latest != null) {
            satisfied = satisfied && user.latest.toLowerCase().includes(search.latest.toLowerCase())
          }
        }
        if (satisfied) {
          this.userData.push(user)
        }
      }
    },
    async handleCreate (name) {
      await this.$refs[name].validate(async (valid) => {
        this.loading = false
        this.$nextTick(() => {
          this.loading = true
        })
        if (valid) {
          let success = true
          try {
            await this.$axios.$post('/api/User/add', this.formValidate)
          } catch (e) {
            success = false
            this.$Message.error({
              background: true,
              content: '表单提交出现错误：' + e
            })
            this.formError = '表单提交出现错误：' + e
          }
          if (success) {
            this.showCreateUser = false
            this.resetForm()
            this.$Message.success({
              background: true,
              content: '用户创建成功'
            })
            await this.loadData()
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
    resetForm () {
      this.formValidate = {
        username: '',
        realname: '',
        email: ''
      }
    },
    async loadData () {
      try {
        await this.requestData()
      } catch (e) {
        this.rawData = []
      }
      this.generateUserData()
    },
    onSearch (search) {
      this.generateUserData(search)
    },
    async requestData (payload) {
      this.rawData = await this.$axios.$post('/api/User/users', payload)
    },
    async resetPassword (userId) {
      const res = await this.$axios.$post('/api/User/reset', {
        userId
      })
      if (res === 'OK') {
        this.$Message.success({
          background: true,
          content: '密码重置成功'
        })
      } else {
        this.$Message.error({
          background: true,
          content: '密码重置失败'
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
