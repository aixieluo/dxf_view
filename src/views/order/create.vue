<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rules" auto-complete="on" label-width="120px">
      <el-form-item label="淘宝订单号" prop="oid">
        <el-input
          ref="oid"
          v-model="form.oid"
        />
      </el-form-item>
      <el-form-item label="收件人信息" prop="recipient_information">
        <el-input
          ref="recipient_information"
          v-model="form.recipient_information"
          type="textarea"
        />
      </el-form-item>
      <el-form-item label="规格型号" prop="sofa_cover_id">
        <el-radio-group
          @change="getSofa"
          ref="sofa_cover_id"
          v-model="form.sofa_cover_id"
        >
          <el-radio v-for="sofa in sofas" :label="sofa.id">{{ sofa.name }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="材料选择" prop="sofa_cover_item_id">
        <el-radio-group
          ref="sofa_cover_item_id"
          v-model="form.sofa_cover_item_id"
        >
          <el-radio v-for="item in sofaItems" :label="item.id">{{ item.chain_name }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注" prop="note">
        <el-input
          ref="note"
          v-model="form.note"
          type="textarea"
        />
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" @click.native="onSubmit">创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {sofaList, sofa } from '../../api/sofa'
import { create } from '../../api/order'

export default {
  data() {
    return {
      form: {
        oid: '',
        recipient_information: '',
        sofa_cover_id: '',
        sofa_cover_item_id: '',
        note: ''
      },
      sofas: [],
      sofaItems: [],
      rules: {
        oid: [{ required: true, trigger: 'blur', message: '淘宝订单号必填' }],
        recipient_information: [{ required: true, trigger: 'blur', message: '收件人信息必填' }],
        sofa_cover_id: [{ required: true, trigger: 'blur', message: '规格型号必填' }],
        sofa_cover_item_id: [{ required: true, trigger: 'blur', message: '材料选择必填' }]
      },
      loading: false
    }
  },
  mounted() {
    sofaList().then(res => {
      const { data } = res
      this.sofas = data
    })
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          create(this.form).then(response => {
            this.$router.push('/order/index')
            this.loading = false
          }).catch(error => {
            console.log(error)
            this.loading = false
          })
        }
      })
    },
    getSofa() {
      sofa(this.form.sofa_cover_id).then(res => {
        const { data } = res
        this.form.sofa_cover_item_id = null
        this.sofaItems = data.items
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

