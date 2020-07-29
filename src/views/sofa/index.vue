<template>
  <div class="app-container">
    <el-row :gutter="20" type="flex" class="table-header" justify="space-between">
      <el-col :span="20"><div class="grid-content bg-purple" /></el-col>
      <el-col :span="4"><el-button type="primary"><app-link :to="`/sofa/create`">创建新产品</app-link></el-button></el-col>
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
      <el-table-column label="定制类型" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="材料规格数目" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.items_count }}</span>
        </template>
      </el-table-column>
      <el-table-column label="定制规格数目" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.designs_count }}</span>
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
      <el-table-column align="center" label="管理" width="100">
        <template slot-scope="scope">
          <el-button type="text"><app-link :to="`/sofa/${scope.row.id}/items/index`">材料列表</app-link></el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text"><app-link :to="`/sofa/${scope.row.id}/update`">修改信息</app-link></el-button>
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
import { sofas } from '../../api/sofa'
import { serialize } from '@/utils/index'
import AppLink from '../../layout/components/Sidebar/Link'

export default {
  components: { AppLink },
  data() {
    return {
      list: null,
      listLoading: true,
      total: 1,
      filter: {
        perPage: 10,
        page: 1
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      sofas(serialize(this.filter)).then(response => {
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
