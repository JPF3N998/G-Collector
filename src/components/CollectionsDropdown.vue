<script setup lang="ts">
import { Collection } from '@/models/Collection';
import { emit } from 'process';
import { computed, ref } from 'vue';

const emit = defineEmits(['collectionSelect']);

const props = defineProps<{
  options: Map<string, Collection>;
}>();

const optionsAsArray = computed(() => {
  return Array.from(props.options, ([_, { _id, name }]) => ({ _id, name }));
});

// span[aria-selected="true"] to get currently selected collection
const selectedCollection = ref('');

function selectCollection() {
  const collection = props.options.get(selectedCollection.value);
  emit('collectionSelect', collection);
}
</script>

<template>
  <input
    list="collectionsDatalist"
    type="search"
    v-model="selectedCollection"
    @change="selectCollection"
  />
  <datalist id="collectionsDatalist">
    <option
      v-for="collectionOpt in optionsAsArray"
      :key="collectionOpt._id"
      :value="collectionOpt.name"
    ></option>
  </datalist>
</template>
