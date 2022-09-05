import { SavedItem } from '@/models/SavedItem'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue';

export const useSavedItemsStore= defineStore('savedItemsStore', () => {
  const savedItems = ref(new Map<string, SavedItem>());
  
  const savedItemsAsArray = computed(() => Array.from(
    savedItems.value,
    ([_, { _id, url, title }]) => ({ _id, url, title })
  ));

  const itemsCount = computed(() => savedItems.value.size);

  function addSavedItem(newSavedItem: SavedItem) {
    savedItems.value.set(newSavedItem._id, newSavedItem);
  }

  return { 
    addSavedItem,
    itemsCount,
    savedItems,
    savedItemsAsArray
  };
})