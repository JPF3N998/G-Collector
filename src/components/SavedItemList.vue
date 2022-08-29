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
  <h1>{{shouldRenderItemList}}</h1>
  <section
    v-if="shouldRenderItemList"
    class="section"
  >
    <div
      v-for="savedItem in savedItemsStore.savedItemsAsArray"
      :key="savedItem.url"
      class="item-row"
    >
      <input type="checkbox" :id="savedItem.url">
      <a
        :href="savedItem.url"
        target="_blank"
      >
        {{savedItem.title}}
      </a>
    </div>
  </section>
</template>

<style scoped>
.item-row {
  display: flex;
  align-items: center;
  min-height: 2rem;
}

.section {
 overflow: auto;
 max-height: 25rem;
 overflow-y: scroll;
}
</style>