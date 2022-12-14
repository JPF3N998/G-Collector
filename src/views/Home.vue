<script setup lang="ts">
import { ContentScriptMessageTypes, MessagePortNames } from '@/constants'
import { getCurrentTabID } from '@/utils'
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router'
import { useSavedItemsStore } from '@/store/savedItemsStore';
import { SavedItem } from '@/models/SavedItem';
import SavedItemList from '@/components/SavedItemList.vue';
import TheFooter from '@/components/TheFooter.vue';

const router = useRouter();

const {
  GET_CONTENT_SCRIPT_STATUS,
  GET_COLLECTION_SAVED_ITEMS
} = ContentScriptMessageTypes;

const {
  MAIN
} = MessagePortNames

let tabId: number;
const shouldShowExtractButton = ref(false)
onMounted(async () => {
  try {
    const message = { type: GET_CONTENT_SCRIPT_STATUS };
    tabId = await getCurrentTabID();
    const response = await chrome.tabs.sendMessage(tabId, message);
    shouldShowExtractButton.value = true;
  } catch {
    router.replace({
      name: 'unsupported'
    });
  }
})
const savedItemsStore = useSavedItemsStore();

async function collectSavedItems() {
  const port = chrome.tabs.connect(tabId, { name: MAIN });
  const message = { type: GET_COLLECTION_SAVED_ITEMS };
  if (!port) throw Error('Error connecting to port');

  port.postMessage(message);

  port.onMessage.addListener((response) => {
    if (Array.isArray(response) && response.length > 0) {

      response.forEach((item: SavedItem) => {
        savedItemsStore.addSavedItem(item)
      })

    } else {
      router.replace({
        name: 'empty'
      });
    }
  });
}
</script>

<template>
  <div id="body">
    <header id="header">
      <button
        v-if="shouldShowExtractButton"
        class="CTA"
        @click="collectSavedItems()"
      >
        Collect saved items
      </button>
    </header>
    <main id="main">
      <SavedItemList />
    </main>
    <footer id="footer">
      <TheFooter />
    </footer>
  </div>
</template>

<style scoped>
#body {
  display: flex;
  flex-direction: column;
  min-width: 25rem;
  max-height: 35rem;
}

#footer {
  flex-grow: 0.01;
}

#header {
  display: flex;
  height: min-content;
  flex-grow: 0.1;
  justify-content: space-between;
}

#main {
  flex-grow: 1;
}
</style>
