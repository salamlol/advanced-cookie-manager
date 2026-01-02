/**
 * Background Service Worker for Cookie Manager Extension
 * Handles extension lifecycle and background tasks
 */

// Extension installation/update handler
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    console.log('Cookie Manager Extension installed');
    
    // Initialize default settings
    chrome.storage.local.set({
      theme: 'light',
      autoLockTime: 300000, // 5 minutes in milliseconds
      requirePassword: false,
      lastActivity: Date.now()
    });
  } else if (details.reason === 'update') {
    console.log('Cookie Manager Extension updated');
  }
});

// Track activity for auto-lock feature
let lockTimeout = null;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'resetLockTimer') {
    resetLockTimer();
    sendResponse({ success: true });
  } else if (request.action === 'checkLockStatus') {
    checkLockStatus().then(sendResponse);
    return true; // Indicates async response
  }
});

/**
 * Reset the auto-lock timer
 */
function resetLockTimer() {
  // Clear existing timeout
  if (lockTimeout) {
    clearTimeout(lockTimeout);
  }
  
  // Update last activity time
  chrome.storage.local.set({ lastActivity: Date.now() });
  
  // Set new timeout
  chrome.storage.local.get(['autoLockTime', 'requirePassword'], (data) => {
    if (data.requirePassword && data.autoLockTime > 0) {
      lockTimeout = setTimeout(() => {
        // Lock the extension
        chrome.storage.local.set({ isLocked: true });
      }, data.autoLockTime);
    }
  });
}

/**
 * Check if extension should be locked
 */
async function checkLockStatus() {
  return new Promise((resolve) => {
    chrome.storage.local.get(['requirePassword', 'isLocked', 'lastActivity', 'autoLockTime'], (data) => {
      if (!data.requirePassword) {
        resolve({ shouldLock: false });
        return;
      }
      
      const timeSinceActivity = Date.now() - (data.lastActivity || 0);
      const shouldLock = data.isLocked || (timeSinceActivity > (data.autoLockTime || 300000));
      
      if (shouldLock) {
        chrome.storage.local.set({ isLocked: true });
      }
      
      resolve({ shouldLock });
    });
  });
}

// Initialize lock timer on startup
resetLockTimer();
