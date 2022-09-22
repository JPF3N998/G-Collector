<script setup lang="ts">
import { useSavedItemsStore } from '@/store/savedItemsStore';
import { computed, Ref, ref, watchEffect } from 'vue';
import SelectAllCheckbox from './SelectAllCheckbox.vue';
import ItemRow from './ItemRow.vue';

const savedItemsStore = useSavedItemsStore();
const shouldRenderItemList = computed(() => savedItemsStore.savedItems.size > 0);

const stickyRow: Ref<HTMLTableRowElement | null> = ref(null);

watchEffect(() => {
  if (stickyRow.value) {
    const intersectionOpts = { threshold: [1] };
    const intersectionCallback: IntersectionObserverCallback = ([e]) => {
      if (stickyRow.value !== null) {
        stickyRow.value.classList.toggle('active', e.intersectionRatio < 1);
      }
    };
    const observer = new IntersectionObserver(
      intersectionCallback,
      intersectionOpts
    );
    
    observer.observe(stickyRow.value);
  }
})

</script>

<template>
<!-- Use suspense element while stuff loads? -->
<!-- Add top-down transition when items are retrieved -->
  <section
    v-if="shouldRenderItemList"
    ref="section"
    class="section"
  >
    <table>
      <tbody>
        <tr
          class="stickyRow"
          ref="stickyRow"
        >
          <SelectAllCheckbox />
        </tr>
        <tr
          v-for="savedItem in savedItemsStore.savedItemsAsArray"
          :key="savedItem.url"
          class="tableRow"
        >
          <td>
            <ItemRow :item="savedItem" />
          </td>
      </tr>
      </tbody>
    </table>
  </section>
</template>

<style scoped>
.tableRow:nth-child(even) {
   background-color: #303030;
}
.section {
  border-radius: 0.3rem;
  box-shadow: 0px 0px 4px 0px #0e0c0c;
  display: flex;
  flex-direction: column;
  margin: 0.5rem 0 0.5rem 0;
  max-height: 20rem;
  max-width: 25rem;
  overflow-x: hidden;
  overflow-y: scroll;
}

.stickyRow {
  position: -webkit-sticky;
  position: sticky;
  top: -1px;
}

.stickyRow.active {
  background-color: #242424;
  z-index: 1;
}
</style>