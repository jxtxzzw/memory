<template>
  <div>
    <Modal
      v-model="modalVisible"
      title="高级搜索"
      class-name="vertical-center-modal"
      :closable="false"
      :mask-closable="false"
      @on-ok="handleSearch('formValidate')"
      @on-visible-change="handleVisibleChange"
    >
      <Alert type="success" show-icon>
        高级搜索
        <span slot="desc">
          同一筛选项支持多选，多选表示满足任意一个条件即为匹配成功。不同筛选选项的筛选条件为同时满足（逻辑与）时的结果。留空表示该选项匹配所有结果。
        </span>
      </Alert>
      <Form :model="formItem" :label-width="80">
        <FormItem label="标题">
          <Input v-model="formItem.title" placeholder="输入标题中包含的关键字" />
        </FormItem>
        <FormItem label="类型">
          <Select
            v-model="formItem.type"
            multiple
            placeholder="请选择"
            not-found-text="无匹配数据"
            filterable
            @on-change="reloadCategory"
          >
            <Option v-for="type in types" :key="type.value" :value="type.value">
              {{ type.label }}
            </Option>
          </Select>
        </FormItem>
        <FormItem label="分类">
          <Select
            v-model="formItem.category"
            multiple
            placeholder="请选择"
            not-found-text="无匹配数据"
            filterable
          >
            <Option v-for="id in categoryIds" :key="id" :value="id">
              {{ CategoryList[id] }}
            </Option>
          </Select>
        </FormItem>
        <FormItem label="更新时间">
          <DatePicker
            v-model="formItem.updatetime"
            type="daterange"
            show-week-numbers
            clearable
            placeholder="请选择更新时间范围"
            style="width: 300px"
          />
        </FormItem>
        <FormItem label="是否已读">
          <RadioGroup v-model="formItem.read">
            <Radio label="both">
              不限
            </Radio>
            <Radio label="read">
              我已看过
            </Radio>
            <Radio label="unread">
              我还没看过
            </Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="评分范围">
          <Slider
            v-model="formItem.ratingRange"
            range
            :min="0.5"
            :max="5"
            :step="0.5"
            show-stops
            show-tip="always"
            style="width: 400px"
            :marks="{
              0.5: '垃圾',
              1: '不推荐',
              2: '一般',
              3: {
                style: {
                  color: '#57A3F3',
                  width: '28px',
                  height: '19px'
                },
                label: this.$createElement('p', '推荐')
              },
              4: {
                style: {
                  color: '#19be6b',
                  width: '28px',
                  height: '19px'
                },
                label: this.$createElement('strong', '力荐')
              },
              5: {
                style: {
                  color: '#F5A623',
                  width: '28px',
                  height: '19px'
                },
                label: this.$createElement('strong', '神作')
              }
            }"
          />
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
export default {
  name: 'AdvancedSearch',
  props: {
    modal: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      modalVisible: false,
      formItem: {
        title: '',
        type: [],
        read: 'both',
        updatetime: [],
        ratingRange: [0, 5],
        category: []
      },
      types: [],
      categoryIds: [],
      CategoryList: {}
    }
  },
  watch: {
    modal: {
      handler (val) {
        this.modalVisible = val
      }
    }
  },
  async mounted () {
    await this.loadTypes()
  },
  methods: {
    async loadTypes () {
      this.types = await this.$axios.$post('/api/Type/getTypeList')
    },
    handleSearch () {
      this.$emit('advancedSearch', this.formItem)
    },
    handleVisibleChange (status) {
      this.$emit('advancedSearchVisibleChange', status)
    },
    async reloadCategory () {
      // 对于每一个 type 请求它的分类
      for (const type of this.formItem.type) {
        // CategoryList 是 []，this.CategoryList 是 {}，类型不一样
        const CategoryList = await this.$axios.$post('api/Category/categoryList', {
          type
        })
        // 需要使用 this.$set 以便 Vue 能知道数据更新了
        for (const category of CategoryList) {
          this.$set(this.CategoryList, category.id, category.name)
        }
        // 取出所有的当前类型下所有的 id，加入到 categoryIds 数组
        const ids = CategoryList.map(el => el.id)
        for (const id of ids) {
          // 由于不同的类型下，分类可能重叠，所以同一个 id 只放一次
          if (!this.categoryIds.includes(id)) {
            this.categoryIds.push(id)
          }
        }
      }
    }
    // 最终，reload 完成时，得到了 categoryIds 为所有可能分类的 id，以及一个 map 映射表 CategoryList
  }
}
</script>
