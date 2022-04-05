<script setup>

const { t } = useI18n()
</script>

<template lang='pug'>
.flex.flex-col.flex-auto.relative.z-300
  chat-private-list(:title="t('customize.chat_title')" @chat="$router.push(`/my/chat/${$event}`)")
</template>