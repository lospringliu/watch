<template>
  <main :style="style">
    <div ref="navbar" class="fixed left-0 top-0 z-400 inset-x-0 opacity-95">
      <nav-bar />
    </div>
    <ReloadPrompt />
    <router-view />
  </main>
</template>
<script setup lang="ts">
  const navbar = ref(null)
  const { height } = useElementSize(navbar)
  // const style = computed(() => `pt-${Math.floor(height.value)}px`)
  const style = computed(() => `padding-top: ${Math.floor(height.value)}px;`)
</script>