<script setup lang="ts">
import { globalState } from '../stores/globalState'
</script>

<template>
  <div class="m-8 rounded-xl break-all">
      <code>
        <pre>
          {{ globalState?.version}}
          {{ globalState?.language}}
          {{ globalState.platform }}
        </pre>
      </code>
  </div>
</template>
