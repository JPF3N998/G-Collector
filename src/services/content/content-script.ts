import { 
  ContentScriptMessageTypes,
  MessagePortNames
} from '@/constants'
import { SavedItem } from '@/models/SavedItem';
import { 
  SOCIAL_SHARE_BUTTON_IMG_SELECTOR,
  locateColumnsWrapper,
  locateNewCollectionButton,
  unNestElement,
} from '@/services/content/utils/extractTools';

import { getUid } from '@/utils'

const  {
  GET_CONTENT_SCRIPT_STATUS,
} = ContentScriptMessageTypes;

const { 
  MAIN
} = MessagePortNames;

chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  if (request.type === GET_CONTENT_SCRIPT_STATUS) {
    sendResponse(true);
  }
  return true;
});

// ---------------- Long-lived connection section ----------------

chrome.runtime.onConnect.addListener((port) => {
  if(port.name === MAIN) {
    handleResponse(port)
  }
})

function handleResponse(port: chrome.runtime.Port) {
  port.onMessage.addListener(request => {
    if (request) {
      port.postMessage(extractSavedItemsData())
    }
  })
}

/**
 * Returns an object with key data where its value is an array of
 * the data of all saved items
 * @param {HTMLDivElement} columnsWrapper 
 * @returns {Array<object>} { data }
 */
 function processItemColumns(columnsWrapper: any) {
  /**
   * Returns an object with href and title of the item (aria-label)
   * @param {*} item 
   * @returns {{ href, ariaLabel}}
   */
  function extractSavedItemData(item:any) {
    const anchorTag = item.lastChild;
    const {
      href,
      ariaLabel
    } = anchorTag;

    let title = ariaLabel;
    let mainUrl: any;
    let processed: SavedItem = {
      _id: '',
      url: '',
      title: ''
    };

    // Test URL
    const re = /(q=).+(?=&)/gm
    mainUrl = re.exec(href);

    if (mainUrl) {
      // @TODO: Improve readibility + TS
      mainUrl = mainUrl[0].split("q=")[1];
    }

    try {
      new URL(mainUrl)
      processed.url = mainUrl;
      processed.title = title;
    } catch {
      processed.url = href;
      processed.title = `⚠️ ${title}`;
    }

    // Test title
    // Title can be got by using reference to <a> and going in one div and second sibling
    if (!title) {
      title = `${processed.url}`;
      processed.url = href
      processed.title = `⚠️ ${title}`;
    }
    
    processed._id = getUid();
    return processed;
  }

  const { childNodes: columns } = columnsWrapper;
  const savedItems: SavedItem[] = [];

  columns.forEach(({ childNodes: items }: any) => {
    items.forEach((item: any) => {
      const extractedInfo: SavedItem = extractSavedItemData(item);
      savedItems.push(extractedInfo);
    })
  });
  return savedItems;
}

/**
 * Main function to traverse DOM to locate saved items URLs and titles
 */
 function extractSavedItemsData() {
  const start = Date.now();
  const socialShareImgElem = document.querySelector(SOCIAL_SHARE_BUTTON_IMG_SELECTOR);
  let data: SavedItem[] = [];
  if (socialShareImgElem) {
    // Div that wraps select, social buttons, AND grid of items
    const contentWrapper = unNestElement(socialShareImgElem, 8);

    // Div that wraps grid of saved items
    const savedItemsGrid = contentWrapper.lastChild;
    
    // Get div that wraps the columns of items
    const columnsWrapper = locateColumnsWrapper(savedItemsGrid);

    data = processItemColumns(columnsWrapper);
  }
  console.log(
    unNestElement(locateNewCollectionButton(), 2)
    );

  console.log('Took ', Date.now() - start ,'ms')

  return data;
}
