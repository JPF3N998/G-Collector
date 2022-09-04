import { SavedItem } from '@/models/SavedItem'
import { defineStore } from 'pinia'
import { Ref, ref } from 'vue';

export const useSavedItemsStore= defineStore('savedItemsStore', () => {
  const itemsToExport: Ref<SavedItem[]> = ref([]);

  function selectForExport(savedItem: SavedItem) {
    itemsToExport.value.push(savedItem);
  }

  return { 
    itemsToExport,
    selectForExport
  };
})