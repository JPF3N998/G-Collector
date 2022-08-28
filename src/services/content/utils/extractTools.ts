const SOCIAL_SHARE_BUTTON_IMG_SELECTOR = 'img[src="https://www.gstatic.com/save/icons/share_blue.svg"]';
/**
 * Go up "n" parent nodes from passed element.
 */
const unNestElement = (element: any, levels = 7) => {
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

export {
  SOCIAL_SHARE_BUTTON_IMG_SELECTOR,
  unNestElement,
  locateColumnsWrapper
}