import { 
  ContentScriptMessageTypes,
  MessagePortNames
} from '@/constants'

const  {
  GET_CONTENT_SCRIPT_STATUS,
} = ContentScriptMessageTypes;

const { 
  MAIN
} = MessagePortNames;

function handleResponse(port: chrome.runtime.Port) {
  port.onMessage.addListener(request => {
    if (request) {
      console.log('Got: ', request)
    }
  })
}

chrome.runtime.onConnect.addListener((port) => {
    if(port.name === MAIN) {
      handleResponse(port)
    }
})

chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
    if (request.type === GET_CONTENT_SCRIPT_STATUS) {
      sendResponse(true);
    }
    return true;
});
