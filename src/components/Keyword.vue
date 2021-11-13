<script setup lang="ts">
const props = defineProps<{
  keyword: string
}>()
const alertKeyword = () => {
  alert(props.keyword)
}
</script>

<template>
  <p @click="alertKeyword">{{ keyword }}</p>
</template>