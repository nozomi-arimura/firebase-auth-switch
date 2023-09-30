import { fetchCurrentTab } from "./fetchCurrentTab.ts";

export const executeScriptOnTab = async (
  func: () => unknown,
  tabId?: number
) => {
  const targetTabId = tabId || (await fetchCurrentTab())?.id;
  if (!targetTabId) return;
  return chrome.scripting.executeScript({
    target: { tabId: targetTabId },
    func,
  });
};
