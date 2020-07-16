<template>
  <div class="app-container">
    <el-row :gutter="20" type="flex" class="table-header" justify="space-between">
      <el-col :span="20">
        <div class="block">
          <el-date-picker
            v-model="dates"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @click="pickDates"
          >
          </el-date-picker>
          <el-button type="primary" @click="fetchData">筛选</el-button>
        </div>
      </el-col>
      <el-col :span="4"><el-button type="primary"><a :href="`${baseUrl}/report/user/excel`">导出excel</a></el-button></el-col>
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
      <el-table-column label="人员" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="订单数" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.orders_count }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单金额" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.total || 0 }}</span>
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
  import { user } from '../../api/report'
  import { serialize } from '@/utils/index'
  import AppLink from '../../layout/components/Sidebar/Link'

  export default {
    components: { AppLink },
    data() {
      return {
        list: null,
        listLoading: true,
        total: 1,
        dates: [],
        filter: {
          perPage: 10,
          page: 1,
          start: '',
          end: ''
        }
      }
    },
    computed: {
      baseUrl() {
        return process.env.VUE_APP_BASE_API
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        this.listLoading = true
        user(serialize(this.filter)).then(response => {
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
      pickDates(dates) {
        this.filter.start = dates ? dates[0] : ''
        this.filter.end = dates ? dates[1] : ''
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
