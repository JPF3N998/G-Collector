<script setup lang="ts">
import { useSavedItemsStore } from '@/store/savedItemsStore';
import { useToExportItemsStore } from '@/store/toExportItemsStore';
import { computed } from 'vue';

const savedItemsStore = useSavedItemsStore();
const toExportItemsStore = useToExportItemsStore();

const areThereElements = computed(() => savedItemsStore.itemsCount > 0);

</script>

<template>
    <span v-if="savedItemsStore.itemsCount">
      {{`${toExportItemsStore.itemsCount}/${savedItemsStore.itemsCount} selected`}}
    </span>
</template>

<style scoped>
.wrapper {
  align-items: flex-end;
  display: flex;
  justify-content: space-between;
}

</style>