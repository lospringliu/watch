<template>
  <Popover class="relative">
    <PopoverPanel class="absolute z-500">
      <div class="grid grid-cols gap-2 pt-12">
        <router-link to="/space"><ph-hands-clapping /></router-link>
        <router-link to="/posts">Posts</router-link>
        <router-link to="/chats">Chats</router-link>
        <router-link to="/rooms">Rooms</router-link>
        <router-link to="/users">Users</router-link>
      </div>
    </PopoverPanel>
    <PopoverButton>Social</PopoverButton>
  </Popover>
</template>

<script setup lang="ts">
  import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
</script>