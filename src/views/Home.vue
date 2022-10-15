<script setup lang="ts">
import { Collection } from '@/models/Collection';
import { ContentScriptMessageTypes, MessagePortNames } from '@/constants';
import { getCurrentTabID } from '@/utils';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useSavedItemsStore } from '@/store/savedItemsStore';
import { SavedItem } from '@/models/SavedItem';
import SavedItemList from '@/components/SavedItemList.vue';
import TheFooter from '@/components/TheFooter.vue';

const router = useRouter();

const {
  GET_CONTENT_SCRIPT_STATUS,
  GET_COLLECTION_SAVED_ITEMS,
  GET_COLLECTIONS_LIST,
  REDIRECT_TO_COLLECTION,
} = ContentScriptMessageTypes;
const { MAIN } = MessagePortNames;

type Message = {
  type: string;
  opts?: unknown;
};

let tabId: number;
let port: chrome.runtime.Port;
let message: Message;
/**
 * Set tabId and port for component to use
 */
async function init() {
  tabId = await getCurrentTabID();
  port = chrome.tabs.connect(tabId, { name: MAIN });
}

/**
 * Indicates if page has access to the content script
 */
const contentScriptInjected = ref(false);
async function getContentScriptStatus() {
  message = { type: GET_CONTENT_SCRIPT_STATUS };
  await chrome.tabs.sendMessage(tabId, message);
  contentScriptInjected.value = true;
}

const collectionsList = ref(new Map<string, Collection>());
async function getSetCollectionList() {
  message = { type: GET_COLLECTIONS_LIST };

  port.postMessage(message);

  port.onMessage.addListener((response) => {
    if (Array.isArray(response) && response.length > 0) {
      response.forEach((collection: Collection) => {
        // Consider creating a store for only collections?
        collectionsList.value.set(collection._id, collection);
      });
    }
  });
}

onMounted(async () => {
  try {
    await init();
    await getContentScriptStatus();
    await getSetCollectionList();
  } catch (e) {
    alert(e);
    router.replace({
      name: 'unsupported',
    });
  }
});

// End of component setup steps

const savedItemsStore = useSavedItemsStore();

async function collectSavedItems() {
  message = { type: GET_COLLECTION_SAVED_ITEMS };

  port.postMessage(message);

  port.onMessage.addListener((response) => {
    if (Array.isArray(response) && response.length > 0) {
      response.forEach((item: SavedItem) => {
        savedItemsStore.addSavedItem(item);
      });
    } else {
      router.replace({
        name: 'empty',
      });
    }
  });
}

function redirect() {
  const message = {
    type: REDIRECT_TO_COLLECTION,
    url: 'https://www.google.com/save/list/jS-e0Q2rQ2WTwcY8fd7bNg',
  };

  port.postMessage(message);
}
</script>

<template>
  <div id="body">
    <header id="header">
      <button @click="redirect">To Dev Collection</button>
      <button
        v-if="contentScriptInjected"
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
