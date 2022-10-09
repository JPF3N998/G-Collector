const SOCIAL_SHARE_BUTTON_IMG_SELECTOR = 'img[src="https://www.gstatic.com/save/icons/share_blue.svg"]';
const MATERIAL_ICONS_CLASS = 'material-icons-extended';
const ICONS_SELECTOR = `i.${MATERIAL_ICONS_CLASS}`;
const TARGET_ICON_TEXT_CONTENT = 'add';

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

const locateNewCollectionButton = () => {
  let targetIcon;
  const icons = document.querySelectorAll(ICONS_SELECTOR);
  
  icons.forEach(icon => {
    if (icon.textContent === TARGET_ICON_TEXT_CONTENT) {
      targetIcon = icon;
    }
  });

  return targetIcon;
}

export {
  SOCIAL_SHARE_BUTTON_IMG_SELECTOR,
  unNestElement,
  locateColumnsWrapper,
  locateNewCollectionButton,
}