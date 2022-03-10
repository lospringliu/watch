<template>
  <Dialog :open="isOpen" @close="setIsOpen">
    <DialogOverlay />

    <DialogTitle>Deactivate account</DialogTitle>
    <DialogDescription>
      This will permanently deactivate your account
    </DialogDescription>

    <p>
      Are you sure you want to deactivate your account? All of your data will be
      permanently removed. This action cannot be undone.
    </p>

    <button @click="setIsOpen(false)">Deactivate</button>
    <button @click="setIsOpen(false)">Cancel</button>
  </Dialog>
</template>

<script setup lang="ts">
  import {
    Dialog,
    DialogOverlay,
    DialogTitle,
    DialogDescription,
  } from '@headlessui/vue'
  const isOpen = ref(true)
  function setIsOpen(value) {
    isOpen.value = value
  }
</script>