<script setup lang="ts">
import { SavedItem } from '@/models/SavedItem';
import { useSavedItemsStore } from '@/store/savedItemsStore';
import { useToExportItemsStore } from '@/store/toExportItemsStore';

const savedItemsStore = useSavedItemsStore();
const toExportItemsStore = useToExportItemsStore();

defineProps<{
    item: SavedItem
}>();

function checkboxOnChange(e: Event, _id: string) {
  const { checked } = e.target as HTMLInputElement;

  if (_id && checked) {
    toExportItemsStore.addItemToExport(
      savedItemsStore.savedItems.get(_id)
    );
  } else {
    toExportItemsStore.removeItemFromExport(_id)
  }
}
</script>

<template>
  <div class="item-row">
    <input
      :id="item.url"
      class="checkbox" 
      type="checkbox"
      :checked="toExportItemsStore.itemsToExport.has(item._id)"
      @change="(e) => checkboxOnChange(e, item._id || '')"
    >

    <span
      class="itemTitle"
      :title="item.title"
    >
      {{item.title}}
    </span>
      
    <a
      :href="item.url"
      target="_blank"
      rel="external"
    >
      <span class="material-symbols-outlined">
        open_in_new
      </span>
    </a>
  </div>
</template>

<style scoped>
.item-row {
  align-items: center;
  column-gap: 0.4rem;
  display: flex;
  min-height: 2rem;
  padding: 0.1rem;
  transition: 0.3ms;
}

.item-row:hover {
  background-color: rgb(73, 73, 73);
}

.itemTitle {
  flex-grow: 1;
  max-height: 2.5rem;
  overflow-x: hidden;
  text-overflow: ellipsis;
}

.material-symbols-outlined {
  justify-content: end;
}
</style>