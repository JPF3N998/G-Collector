<script setup lang="ts">
import { useSavedItemsStore } from '@/store/savedItemsStore';
import { useToExportItemsStore } from '@/store/toExportItemsStore';

const savedItemsStore = useSavedItemsStore();
const toExportItemsStore = useToExportItemsStore();
</script>

<template>
  <span v-if="savedItemsStore.itemsCount">
    {{`${toExportItemsStore.itemsCount}/${savedItemsStore.itemsCount} selected`}}
  </span>
</template>