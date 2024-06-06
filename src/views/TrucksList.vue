<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getAllTrucks, deleteTruckById } from '@/services/useTrucks'
import { type Truck, TruckStatus } from '@/types/truck'
import { useDialogStore } from '@/stores/dialog'

const dialog = useDialogStore()
const trucks = ref<Truck[]>()

const removeTruckById = async (id: number) => {
  const truck = trucks.value?.find((truck) => truck.id === id)

  dialog.openDialog({
    title: `${truck?.name}`,
    message: `Are you sure you want to remove ${truck?.name} (${truck?.code})?`,
    onConfirm: async () => {
      await deleteTruckById(id)
      trucks.value = await getAllTrucks()
    }
  })
}

onMounted(async () => {
  trucks.value = await getAllTrucks()
})
</script>

<template>
  <v-container class="c-trucks-list">
    <v-row>
      <v-col>
        <h1>List of trucks</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex justify-end">
        <v-btn to="/trucks/create" color="green">
          <v-icon icon="mdi-plus" class="mr-3"></v-icon>
          <span>Add new truck</span>
        </v-btn>
      </v-col>
    </v-row>
    <v-list class="mt-4">
      <v-list-item v-for="truck in trucks" :key="truck.id" class="px-0">
        <v-divider class="my-2" />
        <v-card class="w-100">
          <v-card-title class="px-0">
            <span>{{ truck.name }}</span>
          </v-card-title>
          <v-card-subtitle class="d-flex justify-space-between px-0">
            <span> Code: {{ truck.code }} </span>
            <span>
              Status: {{ TruckStatus[truck.status as unknown as keyof typeof TruckStatus] }}
            </span>
          </v-card-subtitle>
          <v-card-text class="px-0">
            <p>{{ truck.description }}</p>
          </v-card-text>
          <v-card-actions class="px-0 d-flex justify-end">
            <v-btn @click="removeTruckById(truck.id || 0)" color="white" class="mr-2 bg-red">
              <v-icon icon="mdi-delete-outline" class="mr-3"></v-icon>
              <span>Remove</span>
            </v-btn>
            <v-btn :to="`/trucks/update/${truck.id}`" color="white" class="bg-green">
              <v-icon icon="mdi-pencil" class="mr-3"></v-icon>
              <span>Edit</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-list-item>
    </v-list>
  </v-container>
</template>
