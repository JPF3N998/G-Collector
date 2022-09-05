<script setup lang="ts">
import { SavedItem } from '@/models/SavedItem';
import { useSavedItemsStore } from '@/store/savedItemsStore';
import { useToExportItemsStore } from '@/store/toExportItemsStore';
import { computed } from 'vue';

const savedItemsStore = useSavedItemsStore();
const toExportItemsStore = useToExportItemsStore();

const checkboxText = computed(
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
  <section class="selectAllWrapper">
    <input
      v-if="savedItemsStore.itemsCount"
      class="checkbox"
      type="checkbox"
      @change="handleClick()"
    >
    <span
      class="selectAllText"
    >
      {{checkboxText}}
    </span>
  </section>
</template>

<style scoped>
.checkbox{
  transform: scale(1.2);
}
.selectAllText {
  flex-grow: 1;
  font-weight: bolder;
  max-height: 2.5rem;
  overflow-x: hidden;
  text-overflow: ellipsis;
}

.selectAllWrapper {
  align-items: center;
  column-gap: 0.4rem;
  display: flex;
  padding-left: 0.1rem;
}
</style>