<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rules" auto-complete="on" label-width="120px">
      <el-form-item label="淘宝订单号" prop="oid">
        <el-input
          disabled
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
      <el-form-item label="定制类型" prop="sofa_cover_id">
        <el-radio-group
          disabled
          ref="sofa_cover_id"
          v-model="form.sofa_cover_id"
        >
          <el-radio v-for="sofa in sofas" :label="sofa.id">{{ sofa.name }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="材料选择" prop="sofa_cover_item_id">
        <el-radio-group
          disabled
          ref="sofa_cover_item_id"
          v-model="form.sofa_cover_item_id"
        >
          <el-radio v-for="item in sofaItems" :label="item.id">
            <el-image
              style="width: 100px; height: 100px"
              :src="item.url"
              fit="fill"></el-image>
            <span>{{ item.chain_name }}</span>
          </el-radio>
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
        <el-button :loading="loading" type="primary" @click.native="onSubmit">更新</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { order, update } from '../../api/order'
import { sofa, sofaList } from '../../api/sofa'

export default {
  data() {
    return {
      form: {
        recipient_information: '',
        note: ''
      },
      sofas: [],
      sofaItems: [],
      rules: {
        recipient_information: [{ required: true, trigger: 'blur' }],
      },
      loading: false
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    }
  },
  mounted() {
    sofaList().then(res => {
      const { data } = res
      this.sofas = data
    })
    order(this.id).then(res => {
      const { data } = res
      this.form = data
      sofa(data.sofa_cover_id).then(res => {
        const { data } = res
        this.sofaItems = data.items
      })
    })
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          update(this.id, this.form).then(response => {
            this.$router.push('/order/index')
            this.loading = false
          }).catch(error => {
            console.log(error)
            this.loading = false
          })
        }
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

