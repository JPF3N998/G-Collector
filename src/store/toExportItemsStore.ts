import { SavedItem } from '@/models/SavedItem'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue';

export const useToExportItemsStore= defineStore('toExportItemsStore', () => {
  const itemsToExport = ref(new Map<string, SavedItem>());

  const itemsCount = computed(() => itemsToExport.value.size);

  const itemsToExportAsArray = computed(() => Array.from(
    itemsToExport.value,
    ([_, { _id, url, title }]) => ({ _id, url, title })
  ));


  function addItemToExport(savedItem: SavedItem | undefined) {
    if (savedItem && savedItem._id) {
      itemsToExport.value.set(savedItem._id, savedItem);
    }
  }

  function removeItemFromExport(_id: string) {
    const entryExists = itemsToExport.value.has(_id);
    if (entryExists) {
      itemsToExport.value.delete(_id);
    }
  }

  function setItemsToExport(bulkItemsToExport: Map<string, SavedItem>) {
    console.log(itemsToExport);
    itemsToExport.value = bulkItemsToExport;
    console.log(itemsToExport);
  }
  
  function toCsv() {
    const HEADER = 'Title,URL';
    
    let csvOutput = '';
    csvOutput = csvOutput.concat(HEADER+'\n')

    itemsToExportAsArray.value.forEach(({ title, url }) => {

      // [How to use literals with commas on CSVs]{@link https://stackoverflow.com/a/769675}
      csvOutput = csvOutput.concat(`"${title}",${url}\n`);
    });

    return csvOutput;
  }

  return {
    addItemToExport,
    itemsCount,
    itemsToExport,
    removeItemFromExport,
    setItemsToExport,
    toCsv
  };
})