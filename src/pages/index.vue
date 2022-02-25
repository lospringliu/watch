<script setup>
import { currentRoom, rootRoom } from '@composables';
</script>

<template lang="pug">
.flex.flex-col

  room-page
  .flex.flex-col.shadow-lg.m-2.rounded-3xl.items-center.z-30.bg-light-200.bg-opacity-95.backdrop-filter.backdrop-blur-md(v-if="currentRoom.pub == rootRoom.pub")

    .flex.flex-col.mx-4.max-w-200.p-8.p-4.rounded-2xl
      .font-bold.text-3xl.mb-4 @gun-vue
      .my-4 Gun-vue is a collection of essential building blocks to create a variety of decentralized apps for online and offline collaboration. It's a moment when we can feel the nature of distributed networking and have fun together!
      .my-2 All the data in the app is stored only on the client side - right in your browser. And it's reactively synced between all simultaneous visitors by Gun. So it's better to share a link to this page with your friend to have a more profound demo experience. 

      .flex.flex-wrap.text-center

        router-link.shadow-md.m-2.p-2.flex-1.flex.flex-col.items-center.bg-light-800.rounded-2xl.justify-center(to="/space/")
          ic-round-filter-center-focus.text-60px.mb-2
          .text-2xl Space
          .p-0 2D meeting space

        router-link.shadow-md.m-2.p-2.flex-1.flex.flex-col.items-center.bg-light-800.rounded-2xl.justify-center(to="/posts/")
          fluent-document-page-number-20-regular.text-60px.mb-2
          .text-2xl Posts
          p Immutable publications

        router-link.shadow-md.m-2.p-2.flex-1.flex.flex-col.items-center.bg-light-800.rounded-2xl.justify-center(to="/rooms/")
          la-layer-group.text-60px.mb-2
          .text-2xl Rooms
          p Open data collections

</template>
