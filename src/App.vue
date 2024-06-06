<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppTopbar from '@/components/AppTopbar.vue'
import AppDialog from '@/components/AppDialog.vue'
</script>

<template>
  <v-app>
    <AppTopbar />
    <v-main>
      <RouterView class="c-main-content py-12" />
    </v-main>
    <AppDialog />
  </v-app>
</template>
