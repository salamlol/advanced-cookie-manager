/**
 * Storage Utility
 * Handles chrome.storage operations with promises
 */

const StorageUtil = {
  /**
   * Get data from chrome.storage.local
   * @param {string|string[]|null} keys - Keys to retrieve
   * @returns {Promise<any>}
   */
  get: (keys) => {
    return new Promise((resolve) => {
      chrome.storage.local.get(keys, (result) => {
        resolve(result);
      });
    });
  },

  /**
   * Set data in chrome.storage.local
   * @param {object} items - Items to store
   * @returns {Promise<void>}
   */
  set: (items) => {
    return new Promise((resolve) => {
      chrome.storage.local.set(items, () => {
        resolve();
      });
    });
  },

  /**
   * Remove data from chrome.storage.local
   * @param {string|string[]} keys - Keys to remove
   * @returns {Promise<void>}
   */
  remove: (keys) => {
    return new Promise((resolve) => {
      chrome.storage.local.remove(keys, () => {
        resolve();
      });
    });
  },

  /**
   * Clear all data from chrome.storage.local
   * @returns {Promise<void>}
   */
  clear: () => {
    return new Promise((resolve) => {
      chrome.storage.local.clear(() => {
        resolve();
      });
    });
  },

  /**
   * Hash a password using SHA-256
   * @param {string} password - Password to hash
   * @returns {Promise<string>} Hashed password
   */
  hashPassword: async (password) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  }
};
