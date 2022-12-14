const getCurrentTabID = async () => {
  const queryParams = { active: true, currentWindow: true };
  const tabs = await chrome.tabs.query(queryParams);
  return tabs[0].id || -1
};

const getUid = function(){
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export {
  getCurrentTabID,
  getUid
}