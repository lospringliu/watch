<template>
  <main class="h-screen" :style="style">
    <div ref="navier" class="fixed left-0 top-0 z-400 inset-x-0 opacity-95">
      <NavSocial v-if="globalState.show_social" />
      <Navier v-if="globalState.show_tools" />
      <ReloadPrompt />
    </div>
    <router-view />
    <div ref="navbar" class="fixed left-0 bottom-0 z-400 inset-x-0 opacity-99">
      <NavBar />
    </div>
  </main>
</template>

<script setup lang="ts">
import { globalState } from '../stores/globalState'
const { top } = useScreenSafeArea()
const navbar = ref(null)
const navier = ref(null)
const { height } = useElementSize(navbar)
const { height: heightNavier } = useElementSize(navier)
const style = computed(() => `padding-top: ${Math.floor(heightNavier.value) + parseInt(top.value.replace(/px/,""))}px; padding-bottom: ${Math.floor(height.value)}px;`)
</script>
