import { SavedItem } from '@/models/SavedItem'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue';

export const useSavedItemsStore= defineStore('savedItemsStore', () => {
  const savedItems = ref(new Map<string, SavedItem>());
  
  function addSavedItem(newSavedItem: SavedItem) {
    savedItems.value.set(newSavedItem._id, newSavedItem);
  }

  const savedItemsAsArray = computed(() => Array.from(
      savedItems.value,
      ([_, { _id, url, title }]) => ({ _id, url, title })
    ));

  return { 
    addSavedItem,
    savedItems,
    savedItemsAsArray
  };
})