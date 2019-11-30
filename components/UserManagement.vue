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
      :masked-closable="false"
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
        realname: ''
      },
      ruleValidate: {
        username: [
          { required: true, message: '用户名不得为空', trigger: 'blur' }
        ],
        realname: [
          { required: true, message: '真实姓名不得为空', trigger: 'blur' }
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
          title: '最后一次登录',
          key: 'latest',
          filter: {
            type: 'Input'
          },
          render: (h, params) => {
            const date = new Date(params.row.latest).toLocaleString()
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
                  long: true
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
    await this.requestData()
    this.generateUserData()
  },
  methods: {
    generateUserData (search = null) {
      this.userData = []
      for (const user of this.rawData) {
        let satisfied = true
        if (search != null) {
          if (search.id != null) {
            satisfied = satisfied && user.id.toLowerCase().includes(search.id.toLowerCase())
          }
          if (search.username != null) {
            satisfied = satisfied && user.username.toLowerCase().includes(search.username.toLowerCase())
          }
          if (search.realname != null) {
            satisfied = satisfied && user.realname.toLowerCase().includes(search.realname.toLowerCase())
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
          }
          if (success) {
            this.showCreateUser = false
            this.resetForm()
            this.$Message.success({
              background: true,
              content: '用户创建成功'
            })
          }
        } else {
          this.$Message.error({
            background: true,
            content: '表单验证失败，请检查您输入的内容'
          })
        }
      })
    },
    resetForm () {
      this.formValidate = {
        username: '',
        realname: ''
      }
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
