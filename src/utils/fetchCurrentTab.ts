export const fetchCurrentTab = ()=> new Promise<chrome.tabs.Tab | undefined>(resolve => {
  chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    resolve(tabs[0])
  })
})