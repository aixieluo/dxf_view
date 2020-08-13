<template>
  <div class="app-container">
    <el-steps v-if="step" :active="2" align-center style="margin-bottom: 30px">
      <el-step title="已完成" />
      <el-step title="选择定制规格" />
    </el-steps>
    <div>
      <h5>订单信息</h5>
      <el-form auto-complete="on" label-width="120px">
        <el-form-item label="淘宝订单号" prop="oid">
          <span>{{ order.oid }}</span>
        </el-form-item>
        <el-form-item label="收件人信息" prop="recipient_information">
          <span>{{ order.recipient_information }}</span>
        </el-form-item>
        <el-form-item label="定制类型" prop="sofa_cover_id">
          <span>{{ order.sofa.name }}</span>
        </el-form-item>
        <el-form-item label="材料选择" prop="sofa_cover_item_id">
          <span>{{ order.sofa_item.chain_name }}</span>
        </el-form-item>
        <el-form-item label="订单总额" prop="sofa_cover_item_id">
          <span>{{ order.total }}</span>
        </el-form-item>
        <el-form-item label="数量" prop="sofa_cover_item_id">
          <span>{{ order.count }}</span>
        </el-form-item>
        <el-form-item label="备注" prop="note">
          <span>{{ order.note }}</span>
        </el-form-item>
      </el-form>
      <h5>已定制规格列表</h5>
      <el-form auto-complete="on" label-width="120px">
        <el-form-item v-for="od in ods" :label="od.name">
          <span>{{ od.info }}</span>
        </el-form-item>
      </el-form>
    </div>
    <h5>定制规格</h5>
    <el-tabs v-model="activeIndex" :lazy="true" type="card" @tab-click="handleClick">
      <el-tab-pane v-for="(design, i) in designs" :label="design.name" :design="design" :name="'index' + i">
        <el-form ref="form" :model="form" :rule="rules" label-width="80px">
          <el-form-item label="规格名称">
            <span>{{ design.name }}</span>
          </el-form-item>
          <el-form-item label="示意图">
            <el-image
              style="width: 500px; height: 500px"
              :src="design.url"
              fit="fill"
            />
          </el-form-item>
          <el-tabs v-model="odIndex" :lazy="true" type="card" @tab-click="odTabChange">
            <el-tab-pane v-for="(od, i) in orderDesigns" :label="`方案${i+1}`" :od="od" :i="i" :name="`plan${od.id}`" />
            <el-tab-pane label="新增" name="add" />
          </el-tabs>
          <el-form-item v-for="type in design.types" :label="type">
            <span v-if="order.confirmed_at">{{ form.lengths[type] }}</span>
            <el-input
              v-else
              v-model="form.lengths[type]"
              placeholder="单位：cm"
            />
          </el-form-item>
          <el-form-item label="个数">
            <span v-if="order.confirmed_at">{{ form.count }}</span>
            <el-input v-else :ref="form.count" v-model="form.count" />
          </el-form-item>
          <el-form-item label="耗用布料">
            <span>{{ `${form.width * form.count}` }}</span>
          </el-form-item>
          <el-form-item label="辅料">
            <span>{{ `${form.design.accessories}` }}</span>
          </el-form-item>
          <el-form-item label="辅料个数">
            <span>{{ `${form.design.accessories_count * form.count}` }}</span>
          </el-form-item>
          <el-form-item>
            <el-button v-if="!order.confirmed_at" :loading="loading" type="primary" @click.native="onSubmit">保存</el-button>
            <el-button v-if="!order.confirmed_at && form.od_id" :loading="loading" type="danger" @click.native="onDel">删除</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <el-button v-if="order.confirmed_at" type="primary"><a target="_blank" :href="order.print">打印</a></el-button>
  </div>
</template>

<script>
import { delOrderDesign, order, orderDesign, updateOrderDesign } from '../../api/order'

export default {
  data() {
    return {
      form: {
        od_id: '',
        lengths: {},
        count: '',
        width: '',
        design: {
          accessories: '',
          accessories_count: 0
        }
      },
      order: {
        oid: '',
        recipient_information: '',
        sofa: {},
        sofa_item: {},
        note: '',
        ods: {},
        print: ''
      },
      designs: [
        { id: 0 }
      ],
      activeDesign: {},
      rules: {
        lengths: [{ required: true, trigger: 'blur', message: '边长必填' }],
        count: [{ required: true, trigger: 'blur', message: '个数必填' }]
      },
      loading: false,
      activeIndex: 'index0',
      ods: [],
      orderDesigns: [],
      odIndex: 'add'
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    },
    step() {
      return this.$route.query.step
    }
  },
  mounted() {
    this.freshOrder()
  },
  methods: {
    freshOrder() {
      order(this.id).then(res => {
        const { data } = res
        this.order = data
        this.designs = data.sofa.designs
        this.ods = data.ods
        this.activeDesign = data.sofa.designs[0]
        this.freshDesign()
      })
    },
    handleClick(tab, event) {
      this.activeDesign = tab.$attrs.design
      this.freshOrder()
    },
    freshDesign() {
      orderDesign(this.id, this.activeDesign.id).then(res => {
        const { data } = res
        this.orderDesigns = data.data
        this.ods = data.meta.ods
        this.clearForm()
      })
    },
    onSubmit() {
      for (let i = 0; i < this.activeDesign.types.length; i++) {
        const k = this.activeDesign.types[i]
        if (!this.form.lengths[k]) {
          return this.$message.error(`${k}必须填写`)
        }
      }
      if (!(this.form.count >= 0)) {
        return this.$message.error(`个数必须填写`)
      }
      this.loading = true
      updateOrderDesign(this.id, this.activeDesign.id, this.form).then(response => {
        this.$message('保存成功')
        this.loading = false
        this.freshOrder()
      }).catch(error => {
        console.log(error)
        this.loading = false
      })
    },
    onDel() {
      this.loading = true
      delOrderDesign(this.id, this.activeDesign.id, this.form.od_id).then(res => {
        this.loading = false
        this.ods = res.data
        this.freshOrder()
      }).catch(error => {
        console.log(error)
        this.loading = false
      })
    },
    odTabChange(tab) {
      const i = tab.$attrs.i
      if (tab.name === 'add') {
        this.clearForm()
        return false
      }
      this.form.od_id = tab.$attrs.od.id
      this.form.lengths = this.orderDesigns[i].lengths
      this.form.count = this.orderDesigns[i].count
      this.form.width = this.orderDesigns[i].width
      this.form.design.accessories = this.orderDesigns[i].design ? this.orderDesigns[i].design.accessories : ''
      this.form.design.accessories_count = this.orderDesigns[i].design ? this.orderDesigns[i].design.accessories_count : ''
    },
    clearForm() {
      this.form.od_id = ''
      this.form.lengths = {}
      this.form.count = ''
      this.form.width = ''
      this.form.design.accessories = ''
      this.form.design.accessories_count = ''
      this.odIndex = 'add'
    }
  }
}
</script>

<style lang="scss" scoped>
  $dark_gray:#889aa4;

  .line {
    text-align: center;
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
</style>

