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
      <el-form-item label="姓名" prop="name">
        <el-input ref="name" v-model="form.name" />
      </el-form-item>
      <el-form-item label="职业" prop="position_id">
        <el-select ref="position_id" v-model="form.position_id" placeholder="请选择用户的职位">
          <el-option v-for="(p, v) in positions" :label="p" :value="v" />
        </el-select>
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
    return {
      form: {
        nickname: '',
        name: '',
        position_id: ''
      },
      rules: {
        name: [{ required: true, trigger: 'blur' }],
        position_id: [{ required: true, trigger: 'blur' }]
      },
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
        this.form.name = data.name
        this.form.position_id = data.position.id.toString()
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

