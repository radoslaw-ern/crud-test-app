<script setup lang="ts">
import { computed } from 'vue'
import { useDialogStore } from '@/stores/dialog'

const dialog = useDialogStore()
const isDialogOpen = computed(() => dialog.isDialogOpen)
const content = computed(() => dialog.content)

const onCloseDialog = (): void => {
  dialog.closeDialog()
}

const onConfirm = (): void => {
  content.value.onConfirm()
  dialog.closeDialog()
}
</script>

<template>
  <div>
    <v-dialog v-model="isDialogOpen" class="c-dialog">
      <v-container>
        <v-row>
          <v-col class="d-flex justify-end">
            <v-btn @click="onCloseDialog" aria-label="Close dialog" color="red">
              <v-icon icon="mdi-close"></v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            {{ content?.message }}
          </v-col>
        </v-row>
        <div class="d-flex justify-end mt-4">
          <v-btn @click="onCloseDialog" color="white" class="mr-3 bg-red">
            <v-icon icon="mdi-cancel" class="mr-3"></v-icon>
            <span>Cancel</span>
          </v-btn>
          <v-btn @click="onConfirm" color="white" class="bg-green">
            <v-icon icon="mdi-check"></v-icon>
            <span>Confirm</span>
          </v-btn>
        </div>
      </v-container>
    </v-dialog>
  </div>
</template>
