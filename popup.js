import { Whitelist } from './whitelist.js';

const whitelist = new Whitelist();

function getSiteParameter(url) {
  const match = url.match(/[?&]site=([^&]+)/);
  return match ? match[1] : null;
}

async function initializePopup() {
  await whitelist.load();
  renderWhitelist();
  setupEventListeners();
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      document.getElementById('newSite').focus();
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const currentTab = tabs[0];
        if (currentTab) {
          document.getElementById('newSite').value = getSiteParameter(currentTab.url);
        }
      });
    }
  });
}

function setupEventListeners() {
  document.getElementById('addSite').addEventListener('click', addNewSite);
  document.getElementById('newSite').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addNewSite();
  });
}

async function addNewSite() {
  const input = document.getElementById('newSite');
  const site = input.value.trim();

  if (site) {
    const added = await whitelist.add(site);
    if (added) {
      input.value = '';
      renderWhitelist();
    }
  }
}

function renderWhitelist() {
  const container = document.getElementById('whitelistContainer');
  container.innerHTML = '';

  whitelist.sites.forEach(site => {
    const item = document.createElement('div');
    item.className = 'site-item';

    const siteText = document.createElement('span');
    siteText.textContent = site;

    const removeButton = document.createElement('button');
    removeButton.textContent = '删除';
    removeButton.onclick = async () => {
      await whitelist.remove(site);
      renderWhitelist();
    };

    item.appendChild(siteText);
    item.appendChild(removeButton);
    container.appendChild(item);
  });
}

document.addEventListener('DOMContentLoaded', initializePopup);