<script setup lang="ts">
import { ContentScriptMessageTypes, MessagePortNames } from '@/constants'
import { getCurrentTabID } from '@/utils'
import { onMounted } from 'vue';
import { useRouter } from 'vue-router'

const router = useRouter();

const  {
  GET_CONTENT_SCRIPT_STATUS,
  GET_COLLECTION_SAVED_ITEMS
} = ContentScriptMessageTypes;

const {
  MAIN
} = MessagePortNames

let tabId: number;
onMounted(async () => {
  try {
    const message = { type: GET_CONTENT_SCRIPT_STATUS };
    tabId = await getCurrentTabID();
    const response = await chrome.tabs.sendMessage(tabId, message);
    console.log('Content script injected: ', response);
  } catch {
    router.replace({
      path: '/unsupported'
    });
  }
})

async function collectSavedItems() {
  const port =   chrome.tabs.connect(tabId, { name: MAIN });
  const message = { type: GET_COLLECTION_SAVED_ITEMS };
  if (!port) throw Error('Error connecting to port');

  port.postMessage(message);

  port.onMessage.addListener((request) => {
    console.log('Response got:', request);
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
    </main>
        <footer id="footer">
      <button @click="collectSavedItems()">
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
