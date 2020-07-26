<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rules" auto-complete="on" label-width="120px">
      <el-form-item label="产品名称" prop="sofa_name">
        <el-input
          ref="sofa_name"
          v-model="sofa_name"
          disabled
        />
      </el-form-item>
      <el-form-item label="材料名称" prop="name">
        <el-input
          ref="name"
          v-model="form.name"
        />
      </el-form-item>
      <el-form-item label="材料编号" prop="uid">
        <el-input
          ref="uid"
          v-model="form.uid"
        />
      </el-form-item>
      <el-form-item label="规格名称" prop="color">
        <el-input
          ref="color"
          v-model="form.color"
        />
      </el-form-item>
      <el-form-item label="规格编号" prop="fid">
        <el-input
          ref="fid"
          v-model="form.fid"
        />
      </el-form-item>
      <el-form-item label="材料单价" prop="price">
        <el-input
          ref="price"
          v-model="form.price"
        />
      </el-form-item>
      <el-form-item label="预览图" prop="preview">
        <el-upload
          ref="upload"
          :limit="1"
          :action="`${this.baseUrl}/upload`"
          list-type="picture-card"
          :file-list="files"
          :auto-upload="true"
          :on-success="handleSuccess"
        >
          <i slot="default" class="el-icon-plus" />
          <div slot="file" slot-scope="{file}">
            <img
              class="el-upload-list__item-thumbnail"
              :src="file.url"
              alt=""
            >
            <span class="el-upload-list__item-actions">
              <span
                class="el-upload-list__item-preview"
                @click="handlePictureCardPreview(file)"
              >
                <i class="el-icon-zoom-in" />
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleRemove(file)"
              >
                <i class="el-icon-delete" />
              </span>
            </span>
          </div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" @click.native="onSubmit">更新</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { sofaItem, sofa, updateItem } from '../../api/sofa'

export default {
  data() {
    return {
      form: {
        name: '',
        uid: '',
        color: '',
        fid: '',
        price: '',
        preview: ''
      },
      sofa_name: '',
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      files: [],
      rules: {
        name: [{ required: true, trigger: 'blur', message: '必填' }],
        uid: [{ required: true, trigger: 'blur', message: '必填' }],
        color: [{ required: true, trigger: 'blur', message: '必填' }],
        fid: [{ required: true, trigger: 'blur', message: '必填' }],
        price: [{ required: true, trigger: 'blur', message: '必填' }],
        preview: [{ required: true, trigger: 'blur', message: '必须上传一张图' }]
      },
      loading: false
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    },
    itemId() {
      return this.$route.params.itemId
    },
    baseUrl() {
      return process.env.VUE_APP_BASE_API
    }
  },
  mounted() {
    sofa(this.id).then(res => {
      const { data } = res
      this.sofa_name = data.name
    })
    sofaItem(this.id, this.itemId).then(res => {
      const { data } = res
      this.form = data
      this.files = [{ url: 'http://dxf.ssl' + data.preview, name: 'test' }]
    })
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          updateItem(this.id, this.itemId, this.form).then(response => {
            this.$router.push(`/sofa/${this.id}/items/index`)
            this.loading = false
          }).catch(error => {
            console.log(error)
            this.loading = false
          })
        }
      })
    },
    handleRemove(file, fileList) {
      this.$refs.upload.handleRemove(file)
      this.form.preview = ''
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleSuccess(response, file, fileList) {
      this.form.preview = response.url
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

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

