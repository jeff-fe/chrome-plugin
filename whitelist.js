export class Whitelist {
  constructor() {
    this.sites = [];
  }

  async load() {
    const data = await chrome.storage.local.get('whitelist');
    this.sites = data.whitelist || [];
    return this.sites;
  }

  async save() {
    await chrome.storage.local.set({ whitelist: this.sites });
  }

  async add(site) {
    site = this.normalizeSite(site);
    if (!this.sites.includes(site)) {
      this.sites.push(site);
      await this.save();
      return true;
    }
    return false;
  }

  async remove(site) {
    site = this.normalizeSite(site);
    const index = this.sites.indexOf(site);
    if (index !== -1) {
      this.sites.splice(index, 1);
      await this.save();
      return true;
    }
    return false;
  }

  normalizeSite(site) {
    return site.replace(/^(https?:\/\/)?(www\.)?/, '').toLowerCase();
  }

  isWhitelisted(site) {
    site = this.normalizeSite(site);
    return this.sites.includes(site);
  }
}