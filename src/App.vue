<template>
  <div id="app">
    <transition name="fade"
                mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import router from "@/router";
export default {
  name: 'app',
  components: {
  },
  methods:{

  },
  beforeMount() {
    router.push({name:'region'})
  }
}
</script>

<style>
#app {
  height: 100vh;
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
