<script>
import router from "@/router";
import {useCityStore} from "@/store/cityStore";
import {deleteCity, pageCity} from "@/api/cityApi";

let cityStore = useCityStore()
export default {
  data() {
    return {
      tableData: cityStore.getCityList(),
      multipleSelection: [],
      total: cityStore.getTotal(),
      currentPage: 1,
      loading: false
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
    toAddCity() {
      router.push({name: "addCity"})
    },
    async getPageCity(newPage) {
      this.loading = true
      await cityStore.initCityList(newPage)
      this.tableData = cityStore.getCityList()
      this.loading = false
      this.currentPage = newPage
      this.total = cityStore.getTotal()
    },

    toEditPage(scope) {
      router.push({
        name: 'editCity',
        params: {
          id: scope.row.id
        },
      })
    },

    async doRemoveCity() {
      this.loading = true
      for (const city of this.multipleSelection) {
        await deleteCity(city.id)
      }
      this.$message({
        message:'删除成功',
        type:"success"
      })
      await this.getPageCity(this.currentPage)
      this.loading = false
    }
  },

  async beforeMount() {
    this.loading = true
    await cityStore.initCityList(1)
    this.tableData = cityStore.getCityList()
    this.total = cityStore.getTotal()
    // console.log(this.tableData)
    this.loading = false
    // console.log(cityStore.getCityList())

  }
}

</script>

<template>
  <el-skeleton v-if="loading" :rows="6"/>
  <el-container v-else>
    <el-header>
      <el-button type="primary" @click="toAddCity">新增</el-button>
      <el-button type="danger" @click="doRemoveCity">删除</el-button>
      <el-button @click="toggleSelection()">取消选择</el-button>
    </el-header>
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
          prop="cityName"
          label="城市名称"
          width="120">
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
            <el-button type="text" size="small" @click="toEditPage(scope)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        :page-size="5"
        :current-page="currentPage"
        @current-change="getPageCity"
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