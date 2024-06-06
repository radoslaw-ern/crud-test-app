import { ref } from 'vue'
import { defineStore } from 'pinia'
import { type Dialog } from '@/types/dialog'

export const useDialogStore = defineStore('dialog', () => {
  const isDialogOpen = ref<boolean>(false)
  const content = ref<Dialog>({} as Dialog)

  const toggleDialog = (): void => {
    isDialogOpen.value = !isDialogOpen.value
  }

  const openDialog = (payload: Dialog): void => {
    content.value = payload
    isDialogOpen.value = true
  }

  const closeDialog = (): void => {
    isDialogOpen.value = false
  }

  return { isDialogOpen, toggleDialog, openDialog, closeDialog, content }
})
