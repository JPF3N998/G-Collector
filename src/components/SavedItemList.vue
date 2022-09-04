<script setup lang="ts">
import { useSavedItemsStore } from '@/store/savedItemsStore';
import { useToExportItemsStore } from '@/store/toExportItemsStore';
import { computed } from 'vue';

const savedItemsStore = useSavedItemsStore();
const toExportItemsStore = useToExportItemsStore();

const shouldRenderItemList = computed(() => savedItemsStore.savedItems.size > 0);

function checkboxOnChange(e: Event, _id: string) {
  const { checked } = e.target as HTMLInputElement;

  if (_id && checked) {
    toExportItemsStore.addItemToExport(
      savedItemsStore.savedItems.get(_id)
    );
    console.info('ADDED', toExportItemsStore.itemsToExport);
  } else {
    toExportItemsStore.removeItemFromExport(_id)
    console.info('REMOVED', toExportItemsStore.itemsToExport);
  }
}

</script>

<template>
<!-- Use suspense element while stuff loads? -->
<!-- Add top-down transition when items are retrieved -->
  <section
    v-if="shouldRenderItemList"
    class="section"
  >
    <div
      v-for="savedItem in savedItemsStore.savedItemsAsArray"
      :key="savedItem.url"
      class="item-row"
    >
      <input
        :id="savedItem.url" 
        class="checkbox" 
        type="checkbox"
        @change="(e) => checkboxOnChange(e, savedItem._id || '')"
      >

      <span
        class="itemTitle"
        :title="savedItem.title"
      >
        {{savedItem.title}}
      </span>
        
      <a
        :href="savedItem.url"
        target="_blank"
        rel="external"
      >
        <span class="material-symbols-outlined">
          open_in_new
        </span>
      </a>
    </div>
  </section>
</template>

<style scoped>
.checkbox{
  transform: scale(1.2);
}

.item-row {
  align-items: center;
  column-gap: 0.4rem;
  display: flex;
  min-height: 2rem;
  padding: 0.3rem;
}

.item-row:nth-child(odd) {
  background-color: rgb(73, 73, 73);
}

.itemTitle {
  flex-grow: 1;
  max-height: 2.5rem;
  overflow-x: hidden;
  text-overflow: ellipsis;
}

.section {
  border-radius: 0.3rem;
  display: flex;
  flex-direction: column;
  margin: 0.5rem 0 0.5rem 0;
  max-height: 20rem;
  max-width: 25rem;
  overflow-x: hidden;
  overflow-y: scroll;
}

.material-symbols-outlined {
  justify-content: end;
}
</style>