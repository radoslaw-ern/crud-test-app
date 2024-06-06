<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { TruckFormActions, type Truck, TruckStatus } from '@/types/truck'
import { getTruckById, createTruck, updateTruckById } from '@/services/useTrucks'
import { useRouter } from 'vue-router'

const props = defineProps<{ action: TruckFormActions; truckId?: string }>()
const router = useRouter()

const truckId = props.truckId && parseInt(props.truckId)
const form = ref()
const formElement = ref()
const code = Math.random().toString(16).slice(2)
const currentTruck = ref<Truck>({} as Truck)
const statusItems = ref<TruckStatus[]>([TruckStatus.OUT_OF_SERVICE])
const statusOrder = [
  TruckStatus.LOADING,
  TruckStatus.TO_JOB,
  TruckStatus.AT_JOB,
  TruckStatus.RETURNING
]

form.value = {
  name: '',
  nameRules: [(value: string) => !!value || 'Truck name is required.'],
  code,
  status: '',
  statusRules: [(value: string) => !!value || 'Truck status is required.'],
  description: null
}

const onSubmit = async () => {
  const validate = await formElement.value.validate()

  if (validate.valid) {
    // Create truck on submit
    if (props.action === TruckFormActions.CREATE) {
      await createTruck({
        name: form.value.name,
        code: form.value.code,
        status: Object.keys(TruckStatus)[Object.values(TruckStatus).indexOf(form.value.status)],
        ...(form.value.description && { description: form.value.description })
      })
    }

    // Update truck on submit
    if (props.action === TruckFormActions.UPDATE) {
      await updateTruckById(truckId || 0, {
        name: form.value.name,
        status: Object.keys(TruckStatus)[Object.values(TruckStatus).indexOf(form.value.status)],
        ...(form.value.description && { description: form.value.description })
      })
    }

    router.push('/trucks')
  }
}

onMounted(async () => {
  // The form is used to edit a truck
  if (props.action === TruckFormActions.UPDATE) {
    currentTruck.value = await getTruckById(truckId || 0)

    form.value = {
      ...form.value,
      ...currentTruck.value,
      ...{
        status: TruckStatus[currentTruck.value.status as unknown as keyof typeof TruckStatus]
      }
    }

    if (
      TruckStatus[currentTruck.value.status as unknown as keyof typeof TruckStatus] ===
      TruckStatus.OUT_OF_SERVICE
    ) {
      // If current status is OUT_OF_SERVICE allow to use anyvalue
      statusItems.value = [TruckStatus.OUT_OF_SERVICE, ...statusOrder]
    } else {
      // If not, check the current status and prepare items for the select field
      const statusId = statusOrder.indexOf(form.value.status)
      if (statusId === statusOrder.length - 1) {
        statusItems.value.push(statusOrder[0])
      } else {
        statusItems.value.push(statusOrder[statusId + 1])
      }
    }
  }

  // The form is used to create a new truck
  if (props.action === TruckFormActions.CREATE) {
    statusItems.value = [TruckStatus.OUT_OF_SERVICE, ...statusOrder]
  }
})
</script>

<template>
  <v-container :class="`truck-form__container--${action}`">
    <v-row>
      <v-col>
        <h1>{{ action === TruckFormActions.CREATE ? 'Add new' : 'Edit' }} truck</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-form ref="formElement">
          <v-text-field
            v-model="form.name"
            :rules="form.nameRules"
            label="Truck name *"
            required
          ></v-text-field>
          <v-text-field v-model="form.code" label="Code" readonly disabled class="color-disabled" />
          <v-select
            :statusItems="statusItems"
            density="compact"
            label="Truck status *"
            :items="statusItems"
            v-model="form.status"
            :rules="form.statusRules"
            required
          />
          <v-text-field v-model="form.description" label="Description" />
        </v-form>
      </v-col>
    </v-row>
    <v-row class="mt-0">
      <v-col class="pt-0">
        <p class="text-subtitle-2">* required fields</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex justify-end pt-0">
        <v-btn to="/trucks" class="mr-4" color="red">
          <v-icon icon="mdi-cancel" class="mr-3"></v-icon>
          <span>Cancel</span>
        </v-btn>
        <v-btn @click="onSubmit()" color="green">
          <v-icon icon="mdi-check" class="mr-3"></v-icon>
          <span>Submit</span>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
