<script setup>
const props = defineProps({
  video: String,
  gateway: { type: String, default: "https://ipfs.infura.io" }
});
</script>

<template lang="pug">
.iframe-container
  iframe.shadow-2xl.rounded-2xl.overflow-hidden.mx-auto(
    :src="`${gateway}/${video}`", 
    title="Ipfs video player", 
    frameborder="0", 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture", 
    allowfullscreen
    )
</template>

<style scoped>
.iframe-container {
  overflow: hidden;
  /* 16:9 aspect ratio */
  padding-top: 56.25%;
  position: relative;
}

.iframe-container iframe {
  border: 0;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
}
</style>
