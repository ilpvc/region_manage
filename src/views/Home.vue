<script>

import router from "@/router";
export default {

  methods:{
    goBack() {
      router.back()
    },

  },
  components: {},
  beforeMount() {
  }

}
</script>

<template>
  <el-container>
    <el-header>
      <div class="title">
        区域管理功能
      </div>
      <a href="#" class="exit">
        退出
      </a>
    </el-header>
    <el-container>
      <!--      侧边栏-->
      <el-aside width="200px">
        <el-col>
          <el-menu
            router
            default-active="1"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-menu-item index="1" route="region">
              <i class="el-icon-document"></i>
              <span slot="title">区域管理</span>
            </el-menu-item>
            <el-menu-item index="2" route="city">
              <i class="el-icon-setting"></i>
              <span slot="title">城市信息</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-aside>
      <el-container>
        <el-main>
          <el-page-header @back="goBack" :content="$route.meta">
          </el-page-header>
          <transition name="fade"
                      mode="out-in">
            <router-view></router-view>
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<style scoped lang="less">
.el-container {
  height: 100%;
  box-sizing: border-box;
}
.el-aside{
  height: 100%;
  background-color: #545c64;
}

//头部样式
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #545c64;
  .title {
    font-size: 20px;
    font-weight: 900;
    color: white;
  }

  .exit {
    color: white;
  }
}

.el-main{
  height: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition: all .2s ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

</style>