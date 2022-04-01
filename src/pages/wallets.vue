<script setup lang="ts">
const { top } = useScreenSafeArea()
const style = computed(() => `padding-top: ${top.value === "0px" ? +top.value.replace("px","") - 21 : 0}px;`)
</script>

<template>
  <div :style="style">
    <transition :name="'fade'" mode="out-in">
      <Wallet />
    </transition>
  </div>
</template>
