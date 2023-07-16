<script>
import {getAllCity} from "@/api/cityApi";
import {addRegion, deleteRegion, getRegionById, updateRegion} from "@/api/regionApi";
import router from "@/router";
import {map} from "core-js/internals/array-iteration";
import {useCityStore} from "@/store/cityStore";
let cityStore = useCityStore();
export default {
  data() {
    return {
      region: {
        regionName: "",
        cityList: []
      },
      allCity: [],
      cityIdList: [],
      loading: false,
    }
  },
  methods: {
    addAddress(city, cityId) {
      this.region.cityList[city].addressList.push({
        address: '',
        cityId: this.region.cityList[city].id
      });
    },
    removeAddress(city, address) {
      this.region.cityList[city].addressList.splice(address, 1)
    },

    addCity() {
      this.region.cityList.push({
        id: null,
        cityName:'',
        addressList: [{
          address: '',
          cityId: null
        }]
      })
    },

    removeCity(cityIndex) {
      this.region.cityList.splice(cityIndex, 1)
    },

    async handleSubmit() {
      this.loading = true
      if (this.region.regionName === "") {
        this.$message({
            message: '请输入区域名称',
            type: "warning"
          }
        )
      }else {
        for (const city of this.region.cityList) {
          if (city.id===""){
            this.$message({
              message:"请输入城市名称",
              type:"warning"
            })
          }else{
            for (const address of city.addressList) {
              if (address.address==="") this.$message({
                message:"请输入地区",
                type:"warning"
              })
              address.cityId = city.id
            }
          }
        }
      }
      let res
      for (let i = 0; i < this.region.cityList.length; i++) {
        this.region.cityList[i].cityName = cityStore.getCityMap().get(this.region.cityList[i].id)
      }
      if (this.$route.params.id===undefined){

        console.log(cityStore.getCityMap())
        console.log(this.region)
        res = await addRegion(this.region)
      }else{
        await deleteRegion(this.region.id)
        res = await addRegion(this.region)
      }

      if (res.code===200){
        this.$message({
          message:'保存成功',
          type:"success"
        })
      }else{
        this.$message({
          message:'保存失败',
          type:"error"
        })
      }
      this.loading = false
      await router.push({name:'region'})
      //
      console.log(this.region)
    }
  },

  async beforeMount() {
    this.loading = true
    if (this.$route.params.id!==undefined){
      let res = await getRegionById(this.$route.params.id)
      this.region = res.data.item
    }
    let res = await getAllCity()
    this.allCity = res.data.list.filter(item=>item.regionId===null)
    await cityStore.initCityList(1)
    this.loading = false
  }
}
</script>

<template>
  <el-skeleton v-if="loading" :rows="6"/>
  <el-container v-else>
    <el-form ref="form" :model="region" label-width="80px">
      <el-form-item label="区域名称"

                    :rules="{
      required: true, message: '区域不能为空', trigger: 'blur'
    }">
        <el-input v-model="region.regionName"></el-input>
      </el-form-item>
      <el-button type="primary" @click="addCity">新增城市</el-button>
      <div class="city">
        <div class="cityItem" v-for="(city,cityIndex) in region.cityList" :key="cityIndex">
          <span style="margin-right: 7px">区域城市{{ cityIndex + 1 }}</span>
          <el-select v-model="city.id" placeholder="请选择">
            <el-option
              v-for="item in allCity"
              :key="item.id"
              :label="item.cityName"
              :value="item.id">
            </el-option>
          </el-select>
          <el-button type="danger" @click="removeCity(cityIndex)">删除</el-button>
          <el-form-item
            style="margin-top: 20px"
            v-for="(address, addressIndex) in region.cityList[cityIndex].addressList"
            :label="'地区' + (addressIndex+1)"
            :key="addressIndex"
            :rules="{
      required: true, message: '地区不能为空', trigger: 'blur'
    }"
          >
            <div style="display: flex">
              <el-input v-model="address.address"></el-input>
              <el-button @click.prevent="removeAddress(cityIndex,addressIndex)">删除</el-button>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button @click="addAddress(cityIndex,city.id)">新增地区</el-button>
          </el-form-item>
        </div>
      </div>

      <el-button type="success" @click="handleSubmit">保存</el-button>
    </el-form>
  </el-container>

</template>

<style scoped lang="less">
.el-container {
  height: 96%;
  padding: 15px 0;
}

.city {
  display: flex;
  padding: 10px;
  width: 100%;
  flex-flow: wrap;

  .cityItem {
    width: 380px;
    padding: 10px;
    margin: 5px 10px;
    background-color: #f8f8f8;
  }
}


</style>