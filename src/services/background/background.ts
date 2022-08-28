import { ServiceWorkerMessageTypes } from '@/constants'

const { 
  BG_WORKER_STATUS
} = ServiceWorkerMessageTypes ;

chrome.runtime.onMessage.addListener((request, _sender, sendMessage) => {
  if (request.type === BG_WORKER_STATUS) {
    sendMessage({ status: '✅' })
  }

  return true; // Reply is async
})
