<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rules" auto-complete="on" label-width="120px">
      <el-form-item label="产品名称" prop="name">
        <el-input
          ref="name"
          v-model="form.name"
        />
      </el-form-item>
      <el-form-item label="规格型号" prop="templates">
        <el-checkbox-group
          ref="templates"
          v-model="form.templates"
        >
          <el-checkbox v-for="designItem in designList" :label="designItem.id">
            <div style="display: flex;flex-direction: column">
              <el-image
                style="width: 100px; height: 100px"
                :src="designItem.url"
                fit="fill"></el-image>
              {{ designItem.name }}
            </div>
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" @click.native="onSubmit">创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { create, designs } from '../../api/sofa'

export default {
  data() {
    return {
      form: {
        name: '',
        templates: []
      },
      designList: [],
      rules: {
        name: [{ required: true, trigger: 'blur', message: '产品名称必填' }],
        templates: [{ required: true, trigger: 'blur', message: '必须选择至少一项' }]
      },
      loading: false
    }
  },
  mounted() {
    designs().then(res => {
      const { data } = res
      this.designList = data.list
    })
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          create(this.form).then(response => {
            this.$router.push('/sofa/index')
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

