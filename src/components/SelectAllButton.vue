<script setup lang="ts">
import { SavedItem } from '@/models/SavedItem';
import { useSavedItemsStore } from '@/store/savedItemsStore';
import { useToExportItemsStore } from '@/store/toExportItemsStore';
import { computed } from 'vue';

const savedItemsStore = useSavedItemsStore();
const toExportItemsStore = useToExportItemsStore();

const buttonText = computed(
  () => (areAllItemsSelected.value ? 'Unselect all' : 'Select all')
);

const areAllItemsSelected = computed(
  () => (savedItemsStore.itemsCount === toExportItemsStore.itemsCount)
);

function handleClick() {
  if (areAllItemsSelected.value) {
    unselectAllItems();
  } else {
    selectAllItems();
  }
}

function selectAllItems() {
  const savedItemsDeepClone: Map<string, SavedItem> = new Map(
    JSON.parse(
      JSON.stringify(
        Array.from(savedItemsStore.savedItems)
      )
    )
  );

  toExportItemsStore
    .setItemsToExport(savedItemsDeepClone);
}

function unselectAllItems() {
  toExportItemsStore.itemsToExport.clear()
}
</script>

<template>
  <button
    v-if="savedItemsStore.itemsCount"
    @click="handleClick()"
  >
    {{buttonText}}
  </button>
</template>