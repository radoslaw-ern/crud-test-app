<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const isBackButtonAvailable = ref<boolean>(false)

watch(route, (to) => {
  isBackButtonAvailable.value = to.path !== '/'
})

const redirect = () => {
  const redirectionPath = route.path.split('/')

  if (redirectionPath.length === 2) {
    router.push('/')
  } else {
    router.push(`/${redirectionPath[1]}`)
  }
}
</script>

<template>
  <v-app-bar class="c-app-topbar bg-orange-lighten-2">
    <v-btn @click="redirect()" v-if="isBackButtonAvailable" class="mx-0">
      <v-icon icon="mdi-arrow-left"></v-icon>
    </v-btn>
    <v-app-bar-title :class="[`ml-${isBackButtonAvailable ? '0' : '16'}`, 'mr-16', 'text-center']"
      >CRUD Test App</v-app-bar-title
    >
  </v-app-bar>
</template>
