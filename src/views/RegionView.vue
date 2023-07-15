<script>

import router from "@/router";
import {useRegionStore} from "@/store/regionStore";
import {deleteRegion} from "@/api/regionApi";

let regionStore = useRegionStore()
export default {
  data() {
    return {
      tableData: regionStore.getRegionTableList(),
      multipleSelection: [],
      total: regionStore.getTotal(),
      currentPage: 1,
      loading: false,
      searchInfo: {
        regionName: '',
        cityName: '',
        address: '',
        createdTime: '',
        beginTime:"",
        finishTime:""
      }
    }
  },

  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    toAddRegion() {
      router.push({name: "addRegion"})
    },

    async onSubmit() {
      this.loading = true
      console.log(this.searchInfo)
      if (this.searchInfo.createdTime!==null){
        this.searchInfo.beginTime = this.searchInfo.createdTime[0]
        this.searchInfo.finishTime = this.searchInfo.createdTime[1]
      }
      await regionStore.initRegionList(this.currentPage,this.searchInfo)
      this.tableData = regionStore.getRegionTableList()
      this.loading = false
      this.total = regionStore.getTotal()
    },

    async handleRemoveRegion() {
      this.loading = true
      for (const region of this.multipleSelection) {
        await deleteRegion(region.id)
      }
      await this.getPageRegion(this.currentPage)
      this.$message({
        message: '删除成功',
        type: "success"
      })
      this.loading = false
    },

    async getPageRegion(newPage) {
      this.loading = true
      await regionStore.initRegionList(newPage)
      this.tableData = regionStore.getRegionTableList()
      this.loading = false
      this.currentPage = newPage
      this.total = regionStore.getTotal()
    },

    toEdit(scope) {
      router.push({
        name: 'editRegion',
        params: {
          id: scope.row.id
        }
      })
    }
  },

  async beforeCreate() {
    this.loading = true
    await regionStore.initRegionList(1)
    this.tableData = regionStore.getRegionTableList()
    this.total = regionStore.getTotal()
    this.loading = false
  }

}
</script>

<template>
  <el-skeleton v-if="loading" :rows="6"/>
  <el-container v-else>
    <el-header>
      <el-button type="primary" @click="toAddRegion">新增</el-button>
      <el-button type="danger" @click="handleRemoveRegion">删除</el-button>
      <el-button @click="toggleSelection()">取消选择</el-button>
    </el-header>

    <el-form :inline="true" :model="searchInfo" class="demo-form-inline">
      <el-form-item label="区域名称">
        <el-input v-model="searchInfo.regionName" placeholder="区域名称"></el-input>
      </el-form-item>
      <el-form-item label="区域名称">
        <el-input v-model="searchInfo.cityName" placeholder="区域名称"></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="searchInfo.address" placeholder="地址"></el-input>
      </el-form-item>
      <el-date-picker
        v-model="searchInfo.createdTime"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-main>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        border
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="序号"
          width="120"
          type="index">

        </el-table-column>
        <el-table-column
          prop="regionName"
          label="区域名称"
          width="120">
        </el-table-column>
        <el-table-column
          prop="cities"
          label="区域城市"
        >
        </el-table-column>
        <el-table-column
          prop="addresses"
          label="地址"
        >
          <template slot-scope="scope">

            <p v-for="address in scope.row.addresses">{{ address }}</p>

          </template>
        </el-table-column>
        <el-table-column
          prop="createdTime"
          label="创建时间"
        ></el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="toEdit(scope)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        :page-size="5"
        :current-page="currentPage"
        @current-change="getPageRegion"
        layout="prev, pager, next"
        :total="total">
      </el-pagination>
    </el-main>

  </el-container>
</template>

<style scoped lang="less">
.el-container {
  height: 96%;
  padding: 10px;
  box-sizing: border-box;
}

.el-header {
  display: flex;
  align-items: center;
}

.el-pagination {
  margin-top: 10px;
}

</style>