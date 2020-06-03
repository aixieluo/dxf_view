<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rules" auto-complete="on" label-width="120px">
      <el-form-item label="账号">
        <el-input
          ref="nickname"
          v-model="form.nickname"
          :disabled="true"
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
      <el-form-item label="确认密码" prop="conform_password">
        <el-input
          :key="passwordType"
          ref="conform_password"
          v-model="form.conform_password"
          :type="passwordType"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" @click.native="onSubmit">更新</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { update, user } from '../../api/users'

export default {
  data() {
    const confirmPassword = (rule, value, callback) => {
      if (this.form.conform_password.length < 1) {
        callback(new Error('确认密码必填'))
      } else if (this.form.password !== this.form.conform_password) {
        callback(new Error('确认密码必须与密码一致'))
      } else {
        callback()
      }
    }
    return {
      form: {
        nickname: '',
        password: '',
        conform_password: ''
      },
      rules: {
        password: [{ required: true, trigger: 'blur', message: '密码必填' }],
        conform_password: [{ required: true, trigger: 'blur', validator: confirmPassword }]
      },
      passwordType: 'password',
      loading: false
    }
  },
  computed: {
    positions() {
      return this.$store.state.app.positions
    },
    id() {
      return this.$route.query.id
    }
  },
  created() {
    this.$store.dispatch('app/initPositions')
    this.getUser()
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
          this.loading = true
          update(this.id, this.form).then(response => {
            this.$router.push('/users/index')
            this.loading = false
          }).catch(error => {
            console.log(error)
            this.loading = false
          })
        }
      })
    },
    getUser() {
      user(this.id).then(response => {
        const { data } = response
        this.form.nickname = data.nickname
      }).catch(error => {
        console.log(error)
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

