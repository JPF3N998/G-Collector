<script setup lang="ts">
import { useSavedItemsStore } from '@/store/savedItemsStore';
import { useToExportItemsStore } from '@/store/toExportItemsStore';
import { computed } from 'vue';
import ItemsToExportCounterVue from '@/components/ItemsToExportCounter.vue';

const savedItemsStore = useSavedItemsStore();
const toExportItemsStore = useToExportItemsStore();

const areThereElements = computed(() => savedItemsStore.itemsCount > 0);
const disableExportButton = computed(() => toExportItemsStore.itemsCount <= 0);

function handleClick() {
  console.log(toExportItemsStore.toCsv());
}
</script>

<template>
  <section class="wrapper">
    <ItemsToExportCounterVue />
    <button
      v-if="areThereElements"
      :disabled="disableExportButton"
      @click="handleClick"
    >
      Export
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