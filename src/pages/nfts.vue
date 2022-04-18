<script setup lang="ts">
import { useRouter } from "vue-router"
const currentRoute = useRouter().currentRoute
function click() { 
  console.log(currentRoute.value)
}
</script>

<template lang="pug">
.flex.flex-col.place-content-center.h-full
  router-link.text-gray-700.dark_text-gray-400.text-center.text-xl.font-bold.m-2(to="/nft/polygon/0x67Baa8575168623822106dee880a2c63B0EBE705") Golden Sands 金沙
</template>
