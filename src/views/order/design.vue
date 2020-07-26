<template>
  <div class="app-container">
    <el-steps v-if="step" :active="2" align-center style="margin-bottom: 30px">
      <el-step title="已完成" />
      <el-step title="选择订单使用模板" />
    </el-steps>
    <el-collapse>
      <el-collapse-item title="订单信息" name="1">
        <el-form auto-complete="on" label-width="120px">
          <el-form-item label="淘宝订单号" prop="oid">
            <span>{{ order.oid }}</span>
          </el-form-item>
          <el-form-item label="收件人信息" prop="recipient_information">
            <span>{{ order.recipient_information }}</span>
          </el-form-item>
          <el-form-item label="规格型号" prop="sofa_cover_id">
            <span>{{ order.sofa.name }}</span>
          </el-form-item>
          <el-form-item label="材料选择" prop="sofa_cover_item_id">
            <span>{{ order.sofa_item.chain_name }}</span>
          </el-form-item>
          <el-form-item label="备注" prop="note">
            <span>{{ order.note }}</span>
          </el-form-item>
        </el-form>
      </el-collapse-item>
    </el-collapse>
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
          <el-form-item label="耗材(cm)">
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
            <el-button v-if="!order.confirmed_at && form.width" :loading="loading" type="danger" @click.native="onDel">删除</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <el-button v-if="order.confirmed_at" type="primary"><a target="_blank" :href="order.print">打印</a></el-button>
  </div>
</template>

<script>
import { order, orderDesign, updateOrderDesign, delOrderDesign } from '../../api/order'

export default {
  data() {
    return {
      form: {
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
      activeIndex: 'index0'
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
    order(this.id).then(res => {
      const { data } = res
      this.order = data
      this.designs = data.sofa.designs
      this.activeDesign = data.sofa.designs[0]
      this.freshDesign()
    })
  },
  methods: {
    handleClick(tab, event) {
      this.activeDesign = tab.$attrs.design
      this.freshDesign()
    },
    freshDesign() {
      orderDesign(this.id, this.activeDesign.id).then(res => {
        const { data } = res
        this.form.lengths = data.lengths || {}
        this.form.count = data.count || ''
        this.form.width = data.width || ''
        this.form.design.accessories = data.design ? data.design.accessories : ''
        this.form.design.accessories_count = data.design ? data.design.accessories_count : ''
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
        const { data } = response
        this.form.lengths = data.lengths || {}
        this.form.count = data.count || ''
        this.form.width = data.width || ''
      }).catch(error => {
        console.log(error)
        this.loading = false
      })
    },
    onDel() {
      this.loading = true
      delOrderDesign(this.id, this.activeDesign.id).then(res => {
        this.loading = false
        this.form = {
          lengths: {},
          count: '',
          width: '',
          design: {
            accessories: '',
            accessories_count: 0
          }
        }
      }).catch(error => {
        console.log(error)
        this.loading = false
      })
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

