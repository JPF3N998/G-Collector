import { 
  ContentScriptMessageTypes,
} from '@/constants'

const  {
  GET_CONTENT_SCRIPT_STATUS,
  GREET_CONTENT_SCRIPT
} = ContentScriptMessageTypes;

chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
    if (request.type === GET_CONTENT_SCRIPT_STATUS) {
      sendResponse({ status: true });
    }

    if (request.type === GREET_CONTENT_SCRIPT) {
      sendResponse({ reply: '🥱 Yes... I\'m here' });
    }

    return true;
});
