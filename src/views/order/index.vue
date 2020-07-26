<template>
  <div class="app-container">
    <el-row :gutter="20" type="flex" class="table-header" justify="space-between">
      <el-col :span="20">
        <div class="block">
          <el-select v-model="filter.sofa_id" placeholder="产品类型">
            <el-option
              v-for="(item, key) in sofas"
              :label="item"
              :value="key"
            />
          </el-select>
          <el-date-picker
            v-model="dates"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="pickDates"
          />
          <el-input v-model="filter.name" type="text" style="width: 180px;" placeholder="订单号或提交人姓名" />
          <el-button type="primary" @click="fetchData">搜索</el-button>
        </div>
      </el-col>
      <el-col :span="4"><el-button v-if="del" type="primary"><app-link :to="`/order/create`">创建新订单</app-link></el-button></el-col>
    </el-row>
    <el-table
      v-loading="listLoading"
      class="table-top"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      :row-class-name="rowClass"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
        align="center"
      />
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="淘宝订单号" align="center">
        <template slot-scope="scope">
          {{ scope.row.oid }}
        </template>
      </el-table-column>
      <!--      <el-table-column label="日期" align="center">-->
      <!--        <template slot-scope="scope">-->
      <!--          <span>{{ scope.row.id }}</span>-->
      <!--        </template>-->
      <!--      </el-table-column>-->
      <el-table-column label="提交人" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.user.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="产品类型" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.sofa.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订金总额" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.total }}</span>
        </template>
      </el-table-column>
      <el-table-column label="数量" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.count }}</span>
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
      <el-table-column align="center" label="定制规格" width="100">
        <template slot-scope="scope">
          <el-button type="text"><app-link :to="`/order/${scope.row.id}/design/update`">详情</app-link></el-button>
          <div>{{ scope.row.designs_count< 1 ? '(定制数0)' : '' }}</div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button v-if="!scope.row.confirmed_at && del" type="text"><app-link :to="`/order/${scope.row.id}/update`">修改</app-link></el-button>
          <el-popconfirm
            v-if="!scope.row.confirmed_at"
            confirm-button-text="好的"
            cancel-button-text="不用了"
            icon="el-icon-info"
            icon-color="red"
            title="是否确认这笔订单，确认后不可修改"
            @onConfirm="confirmOrder(scope.row)"
          >
            <el-button slot="reference" type="text">确认</el-button>
          </el-popconfirm>
          <el-button v-if="scope.row.confirmed_at" type="text"><a :href="`${baseUrl}/order/${scope.row.id}/drawing/download`">下载绘图</a></el-button>
          <el-popconfirm
            v-if="del"
            confirm-button-text="好的"
            cancel-button-text="不用了"
            icon="el-icon-info"
            icon-color="red"
            title="是否删除这笔订单，删除后不可恢复"
            @onConfirm="delOrder(scope)"
          >
            <el-button slot="reference" type="text">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin: 20px 0">
      <el-alert
        title="绿色的行才可以下载绘图，不是绿色的即使选中了也不会加入到现在的集合里"
        style="margin-bottom: 20px;width: 600px"
        type="info"
        show-icon
        v-if="showInfo"
        @close="closeD"
      />
      <el-button type="primary" :disabled="pickId.length < 1" @click="downloadZip">下载绘图合集</el-button>
    </div>
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
import { orders, confirm, del } from '../../api/order'
import { serialize } from '@/utils/index'
import AppLink from '../../layout/components/Sidebar/Link'
import { checkPermission } from '../../utils/auth'

export default {
  components: { AppLink },
  data() {
    return {
      list: null,
      sofas: [],
      listLoading: true,
      total: 1,
      dates: [],
      pickId: [],
      filter: {
        perPage: 10,
        page: 1,
        u: 1,
        start: '',
        end: '',
        sofa_id: '',
        name: ''
      }
    }
  },
  computed: {
    del() {
      return checkPermission(['admin', 'operator', 'sale'])
    },
    baseUrl() {
      return process.env.VUE_APP_BASE_API
    },
    showInfo() {
      return !localStorage.getItem('orderDownload')
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      orders(serialize(this.filter)).then(response => {
        this.list = response.data.list.data
        this.sofas = response.data.sofas
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
    confirmOrder(order) {
      confirm(order.id).then(res => {
        order.confirmed_at = res.data.confirmed_at
        order.count = res.data.count
        order.total = res.data.total
      })
    },
    delOrder(rows) {
      del(rows.row.id).then(res => {
        this.list.splice(rows.$index)
      })
    },
    pickDates(dates) {
      this.filter.start = dates ? dates[0] : ''
      this.filter.end = dates ? dates[1] : ''
    },
    rowClass({ row, index }) {
      if (row.confirmed_at) {
        return 'success-row'
      }
    },
    handleSelectionChange(val) {
      this.pickId = []
      for (let i = 0; i < val.length; i++) {
        if (val[i]['confirmed_at']) {
          this.pickId.push(val[i]['id'])
        }
      }
    },
    downloadZip() {
      let query = '?'
      for (let i = 0; i < this.pickId.length; i++) {
        if (i > 0) {
          query += `&ids[]=${this.pickId[i]}`
        } else {
          query += `ids[]=${this.pickId[i]}`
        }
      }
      location.href = `${this.baseUrl}/order/drawing/zip/download${query}`
    },
    closeD() {
      localStorage.setItem('orderDownload', 1)
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
