export const getCurrentTabID = async () => {
  const queryParams = { active: true, currentWindow: true };
  const tabs = await chrome.tabs.query(queryParams);
  return tabs[0].id || -1
};
