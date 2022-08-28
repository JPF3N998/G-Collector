<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { 
  ContentScriptMessageTypes,
  ServiceWorkerMessageTypes
} from '@/constants'

defineProps<{ msg: string }>()

const count = ref(0)

const  {
  GET_CONTENT_SCRIPT_STATUS,
  GREET_CONTENT_SCRIPT
} = ContentScriptMessageTypes;

const {
  BG_WORKER_STATUS
} = ServiceWorkerMessageTypes ;

const serviceWorkerStatus = ref('(Click to test)');

async function getServiceWorkerStatus() {
  const message = { type: BG_WORKER_STATUS };
  const response = await chrome.runtime.sendMessage(message);
  if (response.status) {
    serviceWorkerStatus.value = response.status;
  } else {
    serviceWorkerStatus.value = '❌';
  }
}

const isContentScriptInjected = ref(false)
const contentScriptBtnText = ref('Content Script you there?')

let tabId: number;

async function greetContentScript() {

  const message = { type: GREET_CONTENT_SCRIPT };

  const response = await chrome.tabs.sendMessage(tabId, message)
  
  if (response?.reply) {
    contentScriptBtnText.value = response.reply
  }
}

onMounted(async () => {
  tabId = await (async () => {
    const queryParams = { active: true, currentWindow: true };
    const tabs = await chrome.tabs.query(queryParams);
    return tabs[0].id || -1
  })();

  try {
    const message = { type: GET_CONTENT_SCRIPT_STATUS };
    const response = await chrome.tabs.sendMessage(tabId, message)
    if (response?.status) {
      isContentScriptInjected.value = true
    }
  } catch {
    /* NOOP */
  }
})
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
  <section>
    <button @click="getServiceWorkerStatus()">
      Service Worker Status: {{ serviceWorkerStatus }}
    </button>

    <div>
      <span>Is Content Script injected?: {{ isContentScriptInjected }}</span>

      <button
        v-if="isContentScriptInjected"
        @click="greetContentScript()"
      >
        {{ contentScriptBtnText }}
      </button>

      <p v-if="!isContentScriptInjected">
        You may want to run the extension in another web page.<wbr>
        chrome:// and similar browser "settings" pages can't run content scripts.
        If not on this type of pages, a page refresh could help.
      </p>
    </div>
  </section>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
