<script>

import router from "@/router";

export default {
  name: "White",
  beforeMount() {
    setTimeout(()=>{
      router.back()
    },500)
  }
}
</script>

<template>

</template>

<style scoped lang="less">

</style>