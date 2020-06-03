<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rules" auto-complete="on" label-width="120px">
      <el-form-item label="账号" prop="nickname">
        <el-input
          ref="nickname"
          v-model="form.nickname"
        />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          :key="passwordType"
          ref="password"
          v-model="form.password"
          :type="passwordType"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input ref="name" v-model="form.name" />
      </el-form-item>
      <el-form-item label="职业" prop="position_id">
        <el-select ref="position_id" v-model="form.position_id" placeholder="请选择用户的职位">
          <el-option v-for="(p, v) in positions" :label="p" :value="v" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" @click.native="onSubmit">创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { create } from '../../api/users'

export default {
  data() {
    return {
      form: {
        nickname: '',
        name: '',
        password: '',
        position_id: ''
      },
      rules: {
        nickname: [{ required: true, trigger: 'blur', message: '账号必填' }],
        name: [{ required: true, trigger: 'blur', message: '姓名必填' }],
        password: [{ required: true, trigger: 'blur', message: '密码必填' }],
        position_id: [{ required: true, trigger: 'blur', message: '职位必选' }]
      },
      passwordType: 'password',
      loading: false
    }
  },
  computed: {
    positions() {
      return this.$store.state.app.positions
    }
  },
  created() {
    this.$store.dispatch('app/initPositions')
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          console.log(valid)
          this.loading = true
          create(this.form).then(response => {
            this.$router.push('/users/index')
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

