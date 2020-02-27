<template>
  <div>
    <Table :columns="columns" :data="linkList">
      <!-- 有正在编辑的行时，不允许新增链接 -->
      <Button
        slot="footer"
        icon="ios-add"
        type="dashed"
        long
        :disabled="editingIndex !== -1"
        @click="addLink"
      >
        添加链接
      </Button>
    </Table>
  </div>
</template>

<script>
export default {
  name: 'Links',
  props: {
    links: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      editingIndex: -1, // -1 表示不在编辑状态
      editingDiscription: '',
      editingLink: '',
      columns: [
        {
          title: '描述',
          key: 'discription',
          render: (h, params) => {
            if (this.editingIndex !== params.index) {
              return h('span', params.row.discription)
            } else {
              // 这里需要先把 params 的值赋给 data，否则输入框会显示 value 但其实 editing 还是空，如果此时直接点击保存就会丢失数据
              this.editingDiscription = params.row.discription
              // render 函数中没有与 v-model 的直接对应，如果要在 render 函数中使用 v-model 的话，要自己绑定 input 的事件来实现
              return h('Input', {
                // 如果是 HTML 原生 <input>，这里就是 domProps
                // 这里用了 iView 的 <Input>，所以是 props
                props: {
                  // 这里直接给 data 的 this.XXX 会出现问题，所以给 params.row.XXX 的值
                  // 当 domProps 时，导致无法输入的问题
                  // 当 props 时，可以输入，但是不会触发 on-input，即输入的数据没有被双向绑定
                  value: params.row.discription
                },
                on: {
                  input: (event) => {
                    // v-model="someProperty" 其实是 :value="someProperty" @input="someProperty = $event" 的简写
                    // 在组件自定义事件上，$event 即为事件传出的值，这里既非原生 <input> 元素，也没有使用 .native 事件修饰符，所以不需要 $event.target.value 的
                    this.editingDiscription = event
                    // 如果是 HTML 原生 <input> 而不是 iView 的 <Input>，那么这里就是 XXX = event.target.value
                  }
                }
              })
            }
          }
        },
        {
          title: '链接',
          key: 'link',
          render: (h, params) => {
            if (this.editingIndex !== params.index) {
              return h('span', params.row.link)
            } else {
              this.editingLink = params.row.link
              return h('Input', {
                props: {
                  value: params.row.link
                },
                on: {
                  input: (event) => {
                    this.editingLink = event
                  }
                }
              })
            }
          }
        },
        {
          title: '操作',
          key: 'option',
          render: (h, params) => {
            if (this.editingIndex !== params.index) {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    ghost: true,
                    // 如果有别的行正在被编辑，则禁用按钮
                    disabled: this.editingIndex !== -1
                  },
                  style: {
                    margin: '5px 5px 5px 5px'
                  },
                  on: {
                    click: () => {
                      this.editLink(params.index)
                    }
                  }
                }, '编辑'),
                h('Button', {
                  props: {
                    type: 'error',
                    ghost: true,
                    // 如果有别的行正在被编辑，则禁用按钮
                    disabled: this.editingIndex !== -1
                  },
                  style: {
                    margin: '5px 5px 5px 5px'
                  },
                  on: {
                    click: () => {
                      this.deleteLink(params.index)
                    }
                  }
                }, '删除')
              ])
            } else {
              // 正在被编辑的状态，则显示保存和取消
              return h('div', [
                h('Button', {
                  props: {
                    type: 'success',
                    ghost: true
                  },
                  style: {
                    margin: '5px 5px 5px 5px'
                  },
                  on: {
                    click: () => {
                      this.saveEdit()
                    }
                  }
                }, '保存'),
                h('Button', {
                  props: {
                    type: 'primary',
                    ghost: true
                  },
                  style: {
                    margin: '5px 5px 5px 5px'
                  },
                  on: {
                    click: () => {
                      this.exitEdit()
                    }
                  }
                }, '取消')
              ])
            }
          }
        }
      ],
      linkList: [],
      inputVisible: false,
      inputValue: ''
    }
  },
  watch: {
    links: {
      deep: true,
      handler () {
        this.linkList = []
        for (const link of this.links) {
          this.linkList = [...this.linkList, link]
        }
      }
    }
  },
  methods: {
    handleClose (event, removedLink) {
      this.linkList = this.linkList.filter(link => link !== removedLink)
      this.$emit('remove', removedLink)
    },
    // 点击添加链接时，push 一个空的对象到 linkList，并设置 editingIndex 为 linkList.length - 1
    addLink () {
      this.linkList.push({
        discription: '',
        link: ''
      })
      // 先 push 后改 index 避免任何可能存在的数组下标越界
      this.editLink(this.linkList.length - 1)
    },
    // 点击编辑时，只需要设置 editingIndex，其他操作 render 会做好
    editLink (index) {
      this.editingIndex = index
    },
    // 退出编辑时只需要设置 editingIndex 为 -1
    exitEdit () {
      // 重置信息
      this.editingIndex = -1
      this.editingLink = ''
      this.editingDiscription = ''
      // 过滤掉没有信息的行
      this.linkList = this.linkList.filter(e => e.discription !== '' && e.link !== '')
      this.emitChange()
    },
    // 保存编辑时，需要将 editing 的数据保存到 linkList 的对应下标处
    saveEdit () {
      this.linkList[this.editingIndex].discription = this.editingDiscription
      this.linkList[this.editingIndex].link = this.editingLink
      // 保存后退出编辑模式
      this.exitEdit()
    },
    // 删除时需要删除数组对应下标的数据
    deleteLink (index) {
      // 从当前编辑的位置删除一个元素
      // splice 是在原数组上操作的，返回的是删除的元素
      this.linkList.splice(index, 1)
      // 删除一定是在非编辑状态下进行的，这里调用 exitEdit 是为了清空 editing 的数据（如果有）
      this.exitEdit()
    },
    // 向父组件通知修改，增删改操作都要触发该动作
    emitChange () {
      this.$emit('change', this.linkList)
    }
  }
}
</script>

<style scoped>

</style>
