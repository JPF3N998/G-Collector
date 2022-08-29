<script setup lang="ts">
import { useSavedItemsStore } from '@/store/savedItemsStore';
import { computed, onUpdated } from 'vue';

const savedItemsStore = useSavedItemsStore();

const shouldRenderItemList = computed(() => savedItemsStore.savedItems.size > 0);

onUpdated(() => {
  console.log(shouldRenderItemList.value);
})
</script>

<template>
<!-- Use suspense element while stuff loads? -->
  <section
    v-if="shouldRenderItemList"
    class="section"
  >
    <div
      v-for="savedItem in savedItemsStore.savedItemsAsArray"
      :key="savedItem.url"
      class="item-row"
    >
      <input class="checkbox" type="checkbox" :id="savedItem.url">
      <!-- Replace anchor text with an icon to avoid accidental
      clicks and forcing user to re do everything -->

      <span>{{savedItem.title}}</span>
        
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
  padding-right: 0.3rem;
}

.item-row > span {
  flex-grow: 1;
  max-height: 2.5rem;
  max-width: 90%;
  overflow-x: hidden;
  text-overflow: ellipsis;
}

.section {
  display: flex;
  flex-direction: column;
  max-height: 20rem;
  max-width: 25rem;
  overflow-x: hidden;
  overflow-y: scroll;
  row-gap: 0.8rem;
}

.material-symbols-outlined {
  justify-content: end;
}
</style>