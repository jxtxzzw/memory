<template>
  <div>
    <filter-table
      :data="userData"
      :columns="tableColumns"
      @on-search="onSearch"
    />
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
      rawData: [],
      userData: [],
      lackingAuth: false,
      confirmDelete: false,
      modal_loading: false,
      deleteTarget: '',
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
    onSearch (search) {
      this.generateUserData(search)
    },
    async requestData (payload) {
      this.rawData = await this.$axios.$post('/api/User', payload)
    },
    resetPassword (userId) {
      console.log(userId)
    }
  }
}
</script>

<style scoped>

</style>
