<script setup>

const { t } = useI18n()
</script>

<template lang='pug'>
.flex.flex-col.flex-auto.relative
  chat-private-list(:title="t('customize.chat_title')" @chat="$router.push(`/chats/${$event}`)")
  router-view(v-slot="{ Component }")
    transition(name="fade")
      component(:is="Component" )
</template>