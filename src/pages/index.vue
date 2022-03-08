<script setup>
import { currentRoom, rootRoom } from '@composables';
import { useGun } from '@composables';
const gun = useGun()
globalThis.gun = gun
const { t } = useI18n()
</script>

<template lang="pug">
.flex.flex-col

  room-page
  .flex.flex-col.shadow-lg.m-2.rounded-3xl.items-center.z-30.bg-light-200.bg-opacity-95.backdrop-filter.backdrop-blur-md(v-if="currentRoom.pub == rootRoom.pub")

    .flex.flex-col.mx-4.max-w-200.p-4.rounded-2xl
      .font-bold.text-3xl.mb-4 MOI - {{ t('moi') }}
      .my-4 

      .flex.flex-wrap.text-center.justify-around

        router-link.shadow-md.m-2.p-2.flex-1.flex.flex-col.items-center.bg-light-800.rounded-2xl(to="/space/")
          ic-round-filter-center-focus.text-80px.mb-2
          .text-2xl {{ t(`pages.space`) }}
          .p-0 {{ t('pages.space_description')}}

        router-link.shadow-md.m-2.p-2.flex-1.flex.flex-col.items-center.bg-light-800.rounded-2xl(to="/posts/")
          fluent-document-page-number-20-regular.text-80px.mb-2
          .text-2xl {{ t('pages.posts') }}
          p {{ t('pages.posts_description') }}

        router-link.shadow-md.m-2.p-2.flex-1.flex.flex-col.items-center.bg-light-800.rounded-2xl(to="/rooms/")
          la-layer-group.text-80px.mb-2
          .text-2xl {{ t('pages.rooms') }}
          p {{ t('pages.rooms_description') }}

</template>
