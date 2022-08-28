<script setup lang="ts">
import { ContentScriptMessageTypes, MessagePortNames } from '@/constants'
import { getCurrentTabID } from '@/utils'
import { onMounted, Ref, ref } from 'vue';
import { useRouter } from 'vue-router'
import { useSavedItemsStore } from '@/store/savedItemsStore';
import { SavedItem } from './models/SavedItem';

const router = useRouter();

const  {
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
    console.log('Content script injected: ', response);
    shouldShowExtractButton.value = true;
  } catch {
    router.replace({
      name: 'unsupported'
    });
  }
})
const savedItemsStore = useSavedItemsStore();

async function collectSavedItems() {
  const port =   chrome.tabs.connect(tabId, { name: MAIN });
  const message = { type: GET_COLLECTION_SAVED_ITEMS };
  if (!port) throw Error('Error connecting to port');

  port.postMessage(message);

  port.onMessage.addListener((response) => {
    if (Array.isArray(response) && response.length > 0){
      
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
      Header
    </header>
    <main id="main">
      <router-view></router-view>
      <div style="display: flex; flex-direction: column; row-gap: 0.5rem;">
        <a
          v-for="savedItem in savedItemsStore.savedItemsAsArray"
          :href="savedItem.url"
          target="_blank"
        >
          {{savedItem.title}}
        </a>
      </div>
    </main>
    <footer id="footer">
      <button
        v-if="shouldShowExtractButton"
        @click="collectSavedItems()"
      >
        Collect saved items
      </button>
    </footer>
  </div>
</template>

<style scoped>
#body {
  display: flex;
  flex-direction: column;
  min-height: 25rem;
  min-width: 18rem;
}

#footer {
  flex-grow: 0.1;
}

#header {
  flex-grow: 0.1;
}

#main {
  flex-grow: 1;
}
</style>
