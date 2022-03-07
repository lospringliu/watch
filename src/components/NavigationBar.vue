<!-- NavigationBar.vue -->
<template>
<div class="sticky top-0">
    <div
        class="h-safe-area-inset-top"
        :class="{
            'bg-black': !transparent || (transparent && scrollTop > 0)
        }"
    > <button>abc</button> </div>
</div>
</template>

<style>
.h-safe-area-inset-top { height: env(safe-area-inset-top); }
.bg-black { background-color: #444; }
</style>

<script lang="ts">
export default {
  data() {
    return {
      scrollTop: 0
    }
  },
  props: {
    transparent: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    scrollListener(e) {
      this.scrollTop = e.target.scrollTop;
    }
  },
  mounted() {
    window.addEventListener('scroll', this.scrollListener);
  }
}
</script>
