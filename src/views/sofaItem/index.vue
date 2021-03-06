<template>
  <div class="app-container">
    <el-row :gutter="20" type="flex" class="table-header" justify="space-between">
      <el-col :span="6">
        <h3>{{ sofa_name }}</h3>
      </el-col>
      <el-col :span="14">
        <div class="grid-content bg-purple" />
      </el-col>
      <el-col :span="4">
        <el-button type="primary">
          <app-link :to="`/sofa/${id}/items/create`">创建新规格</app-link>
        </el-button>
      </el-col>
    </el-row>
    <el-table
      v-loading="listLoading"
      class="table-top"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="材料名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="材料编号" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.uid }}</span>
        </template>
      </el-table-column>
      <el-table-column label="规格名称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.color }}</span>
        </template>
      </el-table-column>
      <el-table-column label="规格编号" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.fid }}</span>
        </template>
      </el-table-column>
      <el-table-column label="材料单价" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="创建时间">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.created_at }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="updated_at" label="更新时间">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.updated_at }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="text">
            <app-link :to="`/sofa/${id}/items/${scope.row.id}/update`">修改信息</app-link>
          </el-button>
          <el-popconfirm
            v-if="scope.row.del"
            confirm-button-text="好的"
            cancel-button-text="不用了"
            icon="el-icon-info"
            icon-color="red"
            title="是否删除这个材料，删除后不可恢复"
            @onConfirm="delSofaItem(scope)"
          >
            <el-button slot="reference" type="text">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="el-pagination__editor pagination"
      :hide-on-single-page="true"
      background
      layout="sizes, total, prev, pager, next, jumper"
      :total="total"
      :page-size.sync="filter.perPage"
      :page-sizes="[10, 15, 20]"
      :current-page.sync="filter.page"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
  </div>
</template>

<script>
  import { sofaItems, sofa, delItem } from '../../api/sofa'
import { serialize } from '@/utils/index'
import AppLink from '../../layout/components/Sidebar/Link'

export default {
  components: { AppLink },
  data() {
    return {
      list: null,
      listLoading: true,
      total: 1,
      sofa_name: '',
      filter: {
        perPage: 10,
        page: 1
      }
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    }
  },
  mounted() {
    if (!this.id) {
      return this.$router.push('/sofa/index')
    }
    sofa(this.id).then(res => {
      const { data } = res
      this.sofa_name = data.name
    })
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      sofaItems(this.id, serialize(this.filter)).then(response => {
        this.list = response.data.list.data
        this.total = response.data.list.total
        this.filter.page = response.data.list.current_page
        this.listLoading = false
      })
    },
    handleCurrentChange() {
      this.fetchData()
    },
    handleSizeChange() {
      this.fetchData()
    },
    delSofaItem(rows) {
      delItem(this.id, rows.row.id).then(res => {
        this.list.splice(rows.$index, 1)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .table-top {
    margin-top: 24px;
  }

  .pagination {
    margin-top: 24px;
  }
</style>
