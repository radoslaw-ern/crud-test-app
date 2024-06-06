<script setup lang="ts">
import { ref } from 'vue'

const MODULES = [
  {
    name: 'Trucks',
    route: 'trucks',
    available: true
  },
  {
    name: 'Employees',
    route: 'employees',
    available: false
  },
  {
    name: 'Factory',
    route: 'factory',
    available: false
  },
  {
    name: 'Customers',
    route: 'customers',
    available: false
  }
]

const modules = ref(MODULES)
</script>

<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Select a module to manage your data.</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-list class="mt-4">
          <v-list-item v-for="(module, moduleId) in modules" :key="moduleId" class="px-0">
            <v-btn
              :to="module.available ? `/${module.route}` : '/'"
              :disabled="!module.available"
              class="w-100 text-h6 d-block pt-3 pb-8"
              :color="module.available ? 'green' : ''"
              >{{ module.name }}</v-btn
            >
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>
