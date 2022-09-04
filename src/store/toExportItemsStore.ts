import { SavedItem } from '@/models/SavedItem'
import { defineStore } from 'pinia'
import { Ref, ref } from 'vue';

export const useToExportItemsStore= defineStore('toExportItemsStore', () => {
  const itemsToExport = ref(new Map<string, SavedItem>());

  function addItemToExport(savedItem: SavedItem | undefined) {
    if (savedItem && savedItem._id) {
      itemsToExport.value.set(savedItem._id, savedItem);
    }
  }

  function removeItemFromExport(_id: string) {
    const entryExists = itemsToExport.value.has(_id);
    if (entryExists) {
      itemsToExport.value.delete(_id);
    }
  }

  return {
    addItemToExport,
    itemsToExport,
    removeItemFromExport
  };
})