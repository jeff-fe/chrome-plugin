import { Whitelist } from './whitelist.js';

chrome.webNavigation.onBeforeNavigate.addListener(async (details) => {
  if (details.frameId !== 0) return;

  const whitelist = new Whitelist();
  await whitelist.load();

  const url = new URL(details.url);
  const hostname = url.hostname.replace(/^www\./, '');

  if (!whitelist.isWhitelisted(hostname)) {
    chrome.action.setBadgeText({ text: '!' });
    chrome.action.setBadgeBackgroundColor({ color: '#FF0000' });
    chrome.tabs.update(details.tabId, {
      url: chrome.runtime.getURL('blocked.html') + '?site=' + encodeURIComponent(hostname)
    });
    // chrome.action.openPopup();
  }
});