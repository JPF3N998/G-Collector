<script setup lang="ts">
import { ContentScriptMessageTypes } from '@/constants'
import { getCurrentTabID } from '@/utils'
import { onMounted } from 'vue';
import { useRouter } from 'vue-router'

const  {
  GET_CONTENT_SCRIPT_STATUS,
  GREET_CONTENT_SCRIPT
} = ContentScriptMessageTypes;

const router = useRouter();

onMounted(async () => {
  try {
    const message = { type: GET_CONTENT_SCRIPT_STATUS };
    const tabId = await getCurrentTabID();
    const response = await chrome.tabs.sendMessage(tabId, message);
    console.log('Content script injected: ', response);
  } catch {
    router.replace({
      path: '/unsupported'
    });
  }
})
</script>

<template>
  <div id="body">
    <header id="header">
      Header
    </header>
    <main id="main">
      <router-view></router-view>
    </main>
    <footer id="footer">Footer</footer>
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
