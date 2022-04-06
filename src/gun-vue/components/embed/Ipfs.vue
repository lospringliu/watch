<script setup>
defineProps(['video']);
// const gateway = ref(`https://ipfs.infura.io`)
//    loading="lazy"
</script>

<template lang="pug">
.iframe-container
  iframe.shadow-2xl.rounded-2xl.overflow-hidden.mx-auto(
    :src="`https://ipfs.infura.io/ipfs/${video}`", 
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
