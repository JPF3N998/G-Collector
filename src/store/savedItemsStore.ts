import { SavedItem } from '@/models/SavedItem'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue';

export const useSavedItemsStore= defineStore('savedItemsStore', () => {
  const savedItems = ref(new Map<string, SavedItem>());
  
  function addSavedItem(newSavedItem: SavedItem) {
    savedItems.value.set(newSavedItem.url, newSavedItem);
  }

  const savedItemsAsArray = computed(() => Array.from(savedItems.value, ([_, { url, title }]) => ({ url, title })))

  return { 
    addSavedItem,
    savedItems,
    savedItemsAsArray
  };
})