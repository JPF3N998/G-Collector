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
  <header>
      <router-link to="/error"> Go to error</router-link>
  </header>
  <main>
    <router-view></router-view>
  </main>
  <footer></footer>

</template>

<style scoped>
</style>
