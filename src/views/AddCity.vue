<script>

import {addCity, getCityById, updateCity} from "@/api/cityApi";
import router from "@/router";

export default {
  data() {
    return {
      cityName: '',
      loading:false,
      city:''
    }
  },
  methods: {

    async doAddCity() {
      let res
      if (this.$route.params.id!==undefined){
        res = await updateCity({id:this.city.id,cityName:this.cityName})
      }else{
        res = await addCity({cityName: this.cityName})
      }
      if (res.code===200){
        this.$message({
          message:'保存成功',
          type:"success"
        })
        await router.push({name:'city'})
      }else{
        this.$message({
          message:'保存失败',
          type:"error"
        })
      }
    }
  },

  async beforeMount(){
    if (this.$route.params.id!==undefined){
      let res = await getCityById(this.$route.params.id)
      this.cityName = res.data.item.cityName
      this.city = res.data.item
    }
  }
}
</script>

<template>
  <div class="add_city">
    <el-skeleton v-if="loading" :rows="2"/>
    <div v-else class="add_city_item">
      <span>城市:</span>
      <el-input  v-model="cityName" placeholder="请输入城市名称"></el-input>
    </div>
    <el-button type="success" @click="doAddCity">提交</el-button>
  </div>
</template>

<style scoped lang="less">
.add_city {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;


  .add_city_item {
    display: flex;
    width: 400px;

    span {
      width: 50px;
      line-height: 40px;
    }
  }
}
</style>