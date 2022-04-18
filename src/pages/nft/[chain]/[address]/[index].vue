<script setup>
const props = defineProps({
  chain: { type: String },
  address: { type: String },
  index: { type: Number, default: 1 },
  list_tokens: { type: Boolean, default: true}
})
</script>

<template lang="pug">
.text-left
  nft(:chain="chain" :address="address", :index="index" :list_tokens="list_tokens")
</template>
