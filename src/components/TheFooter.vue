<script setup lang="ts">
import { useSavedItemsStore } from '@/store/savedItemsStore';
import { useToExportItemsStore } from '@/store/toExportItemsStore';
import { computed } from 'vue';
import ItemsToExportCounterVue from '@/components/ItemsToExportCounter.vue';

const savedItemsStore = useSavedItemsStore();
const toExportItemsStore = useToExportItemsStore();

const areThereElements = computed(() => savedItemsStore.itemsCount > 0);
const disableExportButton = computed(() => toExportItemsStore.itemsCount <= 0);

/**
 * Get items to export, "blob it", and prompt download as CSV
 */
function exportToCSV() {
  const csvContent = toExportItemsStore.toCsv();
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob);

  // Create hidden <a>
  const hiddenAnchor = document.createElement('a');
  hiddenAnchor.setAttribute('href', url);
  
  // @Todo: Use collections name + date + time for CSV name
  hiddenAnchor.setAttribute('download', 'Favorite pages.csv');
  hiddenAnchor.click();
}
</script>

<template>
  <section class="wrapper">
    <ItemsToExportCounterVue />
    <button
      v-if="areThereElements"
      :disabled="disableExportButton"
      @click="exportToCSV"
    >
    To .csv
    </button>
  </section>
</template>

<style scoped>
.wrapper {
  align-items: flex-end;
  display: flex;
  justify-content: space-between;
}

</style>