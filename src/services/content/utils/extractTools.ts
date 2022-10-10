import { Collection } from "@/models/Collection";

/**
 * Query selector strings
 */
const SOCIAL_SHARE_BUTTON_IMG_SELECTOR = 'img[src="https://www.gstatic.com/save/icons/share_blue.svg"]';
const COLLECTIONS_QUERY = 'span[role="option"]';
const DATA_ID_ATTR = 'data-id';

/**
 * Index paths for traversing children
 */
const COLLECTION_TITLE_DIV = [0,0,0,1,0];
const COLLECTION_DATAID_DIV = [1];

/**
 * Go up "n" parent nodes from passed element.
 */
const unNestElement = (element: any, levels: number) => {
  let i = 0;
  let destElement = element;
  try {
    while(i < levels) {
      destElement = destElement.parentNode;
      i++;
    }
    return destElement;
  } catch (e) {
    console.error('Error un-nesting element', e);
    return destElement;
  }
}

// Notes, if we want to access a children that is between the traversing path,
// could update to return the target and a second option that is the array of seen
// children (dynamic programming?)
/**
 * Function to traverse children of an element through the indexPath
 * 
 * Ex: indicesPath = [0,1,2] => element.children[0].children[1].children[2]
 * @param element 
 * @param indicesPath array of indices where to traverse children
 * @returns
 */
const traverseChildren = (element: Element, indicesPath: number[]) => {
  let targetElem: Element | null = element;

  try {
    
    indicesPath.forEach((childrenIndex) => {
      if (!targetElem?.hasChildNodes()) {
        throw new Error('Element has no children elements');
      }

      targetElem = targetElem.children[childrenIndex];
    });

    return targetElem;

  } catch (e) {
    throw new Error('Error while traversing children');
  }
}

const locateColumnsWrapper = (savedItemsGrid: any | null) => {
  let columnsWrapperFound = false;
  let div = savedItemsGrid;
  while(!columnsWrapperFound) {
    if (div.childNodes.length > 1) {
      columnsWrapperFound = true;
      break;
    }
    div = div.firstChild;
  }
  return div;
}

const getUserCollections = () => {
  // Helper function
  // @TODO: Recheck typing
  /**
   * Receive <span> element wrapper and extract collection's relevant
   * information
   */
  const extractCollectionData = (collectionElem: HTMLSpanElement) => {
    const divWithDataId = traverseChildren(
      collectionElem,
      COLLECTION_DATAID_DIV
    );

    const _id = divWithDataId.getAttribute(DATA_ID_ATTR);
    const divWithTitle = traverseChildren(
      divWithDataId,
      COLLECTION_TITLE_DIV
    );

    if (!divWithTitle || !_id) {
      throw new Error('Error while getting collection data.');
    }

    return {
      _id,
      name: divWithTitle.textContent || 'Couldn\'t find name'
    }
  };

  // Variables
  const collections: Collection[] = [];
  
  // Logic
  const collectionElements: NodeList = document.querySelectorAll(COLLECTIONS_QUERY);
  collectionElements.forEach((collectionElem) => {
    const data = extractCollectionData(collectionElem as HTMLSpanElement);
    collections.push(data);
  });
  return collections;
}

export {
  SOCIAL_SHARE_BUTTON_IMG_SELECTOR,
  unNestElement,
  locateColumnsWrapper,
  getUserCollections
}