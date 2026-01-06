/**
 * Cookie Manager Extension - Main Popup Script
 * Handles all UI interactions and cookie management operations
 */

// Global state
let currentCookies = [];
let currentDomain = '';
let currentUrl = '';
let editingCookie = null;
let isLocked = false;

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', async () => {
  // Check lock status first
  await checkLockStatus();
  
  if (!isLocked) {
    await initializeApp();
  }
});

/**
 * Check if extension is locked
 */
async function checkLockStatus() {
  const settings = await StorageUtil.get(['requirePassword', 'isLocked', 'passwordHash']);
  
  if (settings.requirePassword && settings.passwordHash) {
    isLocked = settings.isLocked !== false; // Default to locked
    
    if (isLocked) {
      showLockScreen();
    } else {
      hideLockScreen();
      // Reset activity timer
      chrome.runtime.sendMessage({ action: 'resetLockTimer' });
    }
  } else {
    isLocked = false;
    hideLockScreen();
  }
}

/**
 * Show lock screen
 */
function showLockScreen() {
  document.getElementById('lockScreen').classList.remove('hidden');
  document.getElementById('mainApp').style.display = 'none';
}

/**
 * Hide lock screen
 */
function hideLockScreen() {
  document.getElementById('lockScreen').classList.add('hidden');
  document.getElementById('mainApp').style.display = 'flex';
}

/**
 * Initialize the application
 */
async function initializeApp() {
  // Get current tab info
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  const tab = tabs[0];
  
  if (tab && tab.url) {
    currentUrl = tab.url;
    const url = new URL(tab.url);
    currentDomain = url.hostname;
    document.getElementById('domainInfo').textContent = currentDomain;
  }
  
  // Load settings
  await loadSettings();
  
  // Load cookies
  await loadCookies();
  
  // Setup event listeners
  setupEventListeners();
}

/**
 * Load settings from storage
 */
async function loadSettings() {
  const settings = await StorageUtil.get(['theme', 'autoLockTime']);
  
  // Apply theme
  const theme = settings.theme || 'light';
  document.documentElement.setAttribute('data-theme', theme);
  updateThemeIcon(theme);
}

/**
 * Setup all event listeners
 */
function setupEventListeners() {
  // Lock screen
  document.getElementById('unlockBtn').addEventListener('click', handleUnlock);
  document.getElementById('unlockPassword').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleUnlock();
  });
  
  // Theme toggle
  document.getElementById('themeToggle').addEventListener('click', toggleTheme);
  
  // Credits
  document.getElementById('creditBtn').addEventListener('click', openCreditModal);
  document.getElementById('closeCreditModal').addEventListener('click', () => closeModal('creditModal'));
  document.getElementById('creditCloseBtn').addEventListener('click', () => closeModal('creditModal'));

  // Settings
  document.getElementById('settingsBtn').addEventListener('click', openSettings);
  document.getElementById('closeSettingsModal').addEventListener('click', () => closeModal('settingsModal'));
  document.getElementById('cancelSettings').addEventListener('click', () => closeModal('settingsModal'));
  document.getElementById('saveSettings').addEventListener('click', saveSettings);
  
  // Search and filter
  document.getElementById('searchInput').addEventListener('input', filterCookies);
  document.getElementById('showAllDomains').addEventListener('change', loadCookies);
  document.getElementById('sortBy').addEventListener('change', sortCookies);
  
  // Actions
  document.getElementById('addCookieBtn').addEventListener('click', () => openCookieModal());
  document.getElementById('importBtn').addEventListener('click', openImportModal);
  document.getElementById('exportBtn').addEventListener('click', openExportModal);
  document.getElementById('clearBtn').addEventListener('click', clearAllCookies);
  
  // Cookie modal
  document.getElementById('closeModal').addEventListener('click', () => closeModal('cookieModal'));
  document.getElementById('cancelModal').addEventListener('click', () => closeModal('cookieModal'));
  document.getElementById('saveCookie').addEventListener('click', saveCookie);
  
  // Import modal
  document.getElementById('closeImportModal').addEventListener('click', () => closeModal('importModal'));
  document.getElementById('cancelImport').addEventListener('click', () => closeModal('importModal'));
  document.getElementById('importConfirm').addEventListener('click', importCookies);
  document.getElementById('importFile').addEventListener('change', handleImportFile);
  
  // Export modal
  document.getElementById('closeExportModal').addEventListener('click', () => closeModal('exportModal'));
  document.getElementById('closeExportBtn').addEventListener('click', () => closeModal('exportModal'));
  document.getElementById('copyExport').addEventListener('click', copyExportData);
  document.getElementById('downloadExport').addEventListener('click', downloadExportData);
  document.getElementById('exportFormat').addEventListener('change', updateExportData);
  document.getElementById('exportPassword').addEventListener('input', updateExportData);
  
  // Close modals on backdrop click
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal.id);
      }
    });
  });
}

/**
 * Handle unlock
 */
async function handleUnlock() {
  const password = document.getElementById('unlockPassword').value;
  const errorElement = document.getElementById('lockError');
  
  if (!password) {
    errorElement.textContent = 'Please enter password';
    errorElement.classList.remove('hidden');
    return;
  }
  
  const settings = await StorageUtil.get(['passwordHash']);
  const hashedInput = await StorageUtil.hashPassword(password);
  
  if (hashedInput === settings.passwordHash) {
    // Unlock successful
    await StorageUtil.set({ isLocked: false });
    isLocked = false;
    hideLockScreen();
    await initializeApp();
    
    // Clear password field
    document.getElementById('unlockPassword').value = '';
    errorElement.classList.add('hidden');
    
    // Reset activity timer
    chrome.runtime.sendMessage({ action: 'resetLockTimer' });
  } else {
    errorElement.textContent = 'Incorrect password';
    errorElement.classList.remove('hidden');
  }
}

// Lock Screen Functionality
const lockScreen = document.getElementById('lockScreen');
const mainApp = document.getElementById('mainApp');
const unlockBtn = document.getElementById('unlockBtn');
const unlockPassword = document.getElementById('unlockPassword');
const lockError = document.getElementById('lockError');

// Check if extension is locked on load
window.addEventListener('DOMContentLoaded', async () => {
  const settings = await chrome.storage.local.get('settings');
  const isLocked = await chrome.storage.local.get('isLocked');
  
  if (isLocked.isLocked && settings.settings?.password) {
    showLockScreen();
  }
});

function showLockScreen() {
  lockScreen.classList.remove('hidden');
  mainApp.classList.add('hidden');
  unlockPassword.value = '';
  unlockPassword.focus();
  lockError.classList.add('hidden');
}

function hideLockScreen() {
  lockScreen.classList.add('hidden');
  mainApp.classList.remove('hidden');
}

// Unlock button click handler
unlockBtn.addEventListener('click', handleUnlock);
unlockPassword.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    handleUnlock();
  }
});

async function handleUnlock() {
  const inputPassword = unlockPassword.value;
  
  if (!inputPassword) {
    showLockError('Please enter a password');
    return;
  }
  
  try {
    // Get stored settings
    const settings = await StorageUtil.get(['passwordHash', 'autoLockTime']);
    
    if (!settings || !settings.passwordHash) {
      showLockError('No password configured');
      return;
    }
    
    // Hash the input password using SHA-256
    const inputHash = await StorageUtil.hashPassword(inputPassword);
    
    // Compare with stored hash
    if (inputHash === settings.passwordHash) {
      // Password is correct - unlock extension
      await StorageUtil.set({ isLocked: false });
      
      // Start auto-lock timer
      if (settings.autoLockTime && settings.autoLockTime > 0) {
        startAutoLockTimer(settings.autoLockTime);
      }
      
      // Clear password field and show main app
      unlockPassword.value = '';
      lockError.classList.add('hidden');
      hideLockScreen();
      
      showToast('Extension unlocked', 'success');
      
      // Initialize app after unlock
      await initializeApp();
    } else {
      showLockError('Invalid password');
      unlockPassword.value = '';
      unlockPassword.focus();
    }
  } catch (error) {
    console.error('Unlock error:', error);
    showLockError('Error unlocking extension');
  }
}

function showLockError(message) {
  lockError.textContent = message;
  lockError.classList.remove('hidden');
}

// Auto-lock timer
let autoLockTimer;

function startAutoLockTimer(timeoutMs) {
  // Clear existing timer if any
  if (autoLockTimer) {
    clearTimeout(autoLockTimer);
  }
  
  // Set new timer
  autoLockTimer = setTimeout(async () => {
    await StorageUtil.set({ isLocked: true });
    showLockScreen();
    showToast('Extension auto-locked due to inactivity', 'info');
  }, timeoutMs);
}

// Reset auto-lock timer on user activity
async function resetAutoLockTimer() {
  const settings = await StorageUtil.get(['autoLockTime', 'requirePassword']);
  if (settings.requirePassword && settings.autoLockTime && settings.autoLockTime > 0) {
    startAutoLockTimer(settings.autoLockTime);
  }
}

// Add activity listeners to reset timer
document.addEventListener('click', resetAutoLockTimer);
document.addEventListener('keypress', resetAutoLockTimer);
document.addEventListener('input', resetAutoLockTimer);

/**
 * Toggle theme
 */
async function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  updateThemeIcon(newTheme);
  
  await StorageUtil.set({ theme: newTheme });
}

/**
 * Update theme icon
 */
function updateThemeIcon(theme) {
  const icon = document.getElementById('themeToggle');
  icon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

/**
 * Load cookies
 */
async function loadCookies() {
  showLoading();
  
  const showAllDomains = document.getElementById('showAllDomains').checked;
  
  try {
    if (showAllDomains) {
      // Get all cookies
      currentCookies = await chrome.cookies.getAll({});
    } else {
      // Get cookies for current domain
      if (!currentDomain) {
        currentCookies = [];
      } else {
        currentCookies = await chrome.cookies.getAll({ domain: currentDomain });
      }
    }
    
    sortCookies();
    displayCookies(currentCookies);
    updateCookieCount();
  } catch (error) {
    showToast('Error loading cookies: ' + error.message, 'error');
  }
  
  hideLoading();
}

/**
 * Display cookies
 */
function displayCookies(cookies) {
  const container = document.getElementById('cookieList');
  const emptyState = document.getElementById('emptyState');
  
  // Clear existing content
  container.querySelectorAll('.cookie-item').forEach(el => el.remove());
  
  if (cookies.length === 0) {
    emptyState.classList.remove('hidden');
    emptyState.classList.add('compact');
    container.classList.add('collapsed');
    return;
  }
  
  emptyState.classList.add('hidden');
  emptyState.classList.remove('compact');
  container.classList.remove('collapsed');
  
  cookies.forEach(cookie => {
    const item = createCookieElement(cookie);
    container.appendChild(item);
  });
}

/**
 * Create cookie element
 */
function createCookieElement(cookie) {
  const div = document.createElement('div');
  div.className = 'cookie-item';
  
  // Format expiration date
  let expirationText = 'Session';
  if (cookie.expirationDate) {
    const date = new Date(cookie.expirationDate * 1000);
    expirationText = date.toLocaleString();
  }
  
  // Create badges
  let badges = '';
  if (cookie.secure) {
    badges += '<span class="cookie-badge secure">🔒 Secure</span> ';
  }
  if (cookie.httpOnly) {
    badges += '<span class="cookie-badge httponly">🚫 HttpOnly</span> ';
  }
  if (cookie.sameSite && cookie.sameSite !== 'no_restriction') {
    badges += `<span class="cookie-badge">${cookie.sameSite}</span> `;
  }
  
  div.innerHTML = `
    <div class="cookie-header">
      <div class="cookie-name">${escapeHtml(cookie.name)}</div>
      <div class="cookie-actions">
        <button class="cookie-btn" title="Copy Value" data-action="copy">📋</button>
        <button class="cookie-btn" title="Edit" data-action="edit">✏️</button>
        <button class="cookie-btn" title="Delete" data-action="delete">🗑️</button>
      </div>
    </div>
    <div class="cookie-value">${escapeHtml(cookie.value)}</div>
    <div class="cookie-details">
      <div class="cookie-detail">🌐 <strong>Domain:</strong> ${escapeHtml(cookie.domain)}</div>
      <div class="cookie-detail">📁 <strong>Path:</strong> ${escapeHtml(cookie.path)}</div>
      <div class="cookie-detail">⏰ <strong>Expires:</strong> ${expirationText}</div>
      <div class="cookie-detail">${badges || '<span class="cookie-badge">Session</span>'}</div>
    </div>
  `;
  
  // Add event listeners
  div.querySelectorAll('.cookie-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const action = btn.dataset.action;
      handleCookieAction(action, cookie);
    });
  });
  
  return div;
}

/**
 * Handle cookie actions
 */
function handleCookieAction(action, cookie) {
  switch (action) {
    case 'copy':
      copyToClipboard(cookie.value);
      showToast('Cookie value copied!', 'success');
      break;
    case 'edit':
      openCookieModal(cookie);
      break;
    case 'delete':
      deleteCookie(cookie);
      break;
  }
}

/**
 * Filter cookies based on search
 */
function filterCookies() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  
  if (!searchTerm) {
    displayCookies(currentCookies);
    return;
  }
  
  const filtered = currentCookies.filter(cookie => {
    return cookie.name.toLowerCase().includes(searchTerm) ||
           cookie.value.toLowerCase().includes(searchTerm) ||
           cookie.domain.toLowerCase().includes(searchTerm);
  });
  
  displayCookies(filtered);
}

/**
 * Sort cookies
 */
function sortCookies() {
  const sortBy = document.getElementById('sortBy').value;
  
  currentCookies.sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'domain':
        return a.domain.localeCompare(b.domain);
      case 'expiration':
        const aExp = a.expirationDate || 0;
        const bExp = b.expirationDate || 0;
        return aExp - bExp;
      default:
        return 0;
    }
  });
  
  displayCookies(currentCookies);
}

/**
 * Open cookie modal
 */
function openCookieModal(cookie = null) {
  editingCookie = cookie;
  
  const modal = document.getElementById('cookieModal');
  const title = document.getElementById('modalTitle');
  
  if (cookie) {
    title.textContent = 'Edit Cookie';
    
    // Populate form
    document.getElementById('cookieName').value = cookie.name;
    document.getElementById('cookieValue').value = cookie.value;
    document.getElementById('cookieDomain').value = cookie.domain || '';
    document.getElementById('cookiePath').value = cookie.path || '/';
    document.getElementById('cookieSecure').checked = cookie.secure || false;
    document.getElementById('cookieHttpOnly').checked = cookie.httpOnly || false;
    document.getElementById('cookieSameSite').value = cookie.sameSite || 'no_restriction';
    
    // Set expiration date
    if (cookie.expirationDate) {
      const date = new Date(cookie.expirationDate * 1000);
      document.getElementById('cookieExpires').value = formatDateTimeLocal(date);
    } else {
      document.getElementById('cookieExpires').value = '';
    }
  } else {
    title.textContent = 'Add Cookie';
    
    // Clear form
    document.getElementById('cookieName').value = '';
    document.getElementById('cookieValue').value = '';
    document.getElementById('cookieDomain').value = currentDomain ? `.${currentDomain}` : '';
    document.getElementById('cookiePath').value = '/';
    document.getElementById('cookieExpires').value = '';
    document.getElementById('cookieSecure').checked = false;
    document.getElementById('cookieHttpOnly').checked = false;
    document.getElementById('cookieSameSite').value = 'no_restriction';
  }
  
  modal.classList.remove('hidden');
}

/**
 * Save cookie
 */
async function saveCookie() {
  const name = document.getElementById('cookieName').value.trim();
  const value = document.getElementById('cookieValue').value;
  const domain = document.getElementById('cookieDomain').value.trim();
  const path = document.getElementById('cookiePath').value.trim();
  const expiresInput = document.getElementById('cookieExpires').value;
  const secure = document.getElementById('cookieSecure').checked;
  const httpOnly = document.getElementById('cookieHttpOnly').checked;
  const sameSite = document.getElementById('cookieSameSite').value;
  
  if (!name) {
    showToast('Cookie name is required', 'error');
    return;
  }
  
  // Prepare cookie details
  const cookieDetails = {
    name: name,
    value: value,
    path: path || '/',
    secure: secure,
    httpOnly: httpOnly,
    sameSite: sameSite
  };
  
  // Add domain if specified
  if (domain) {
    cookieDetails.domain = domain;
  }
  
  // Add expiration if specified
  if (expiresInput) {
    const expirationDate = new Date(expiresInput);
    cookieDetails.expirationDate = Math.floor(expirationDate.getTime() / 1000);
  }
  
  // Determine URL
  let url;
  if (editingCookie) {
    // Use existing cookie's URL
    const protocol = editingCookie.secure ? 'https://' : 'http://';
    url = `${protocol}${editingCookie.domain}${editingCookie.path}`;
  } else {
    // Use current URL or construct one
    if (currentUrl) {
      url = currentUrl;
    } else {
      const protocol = secure ? 'https://' : 'http://';
      const cookieDomain = domain || currentDomain || 'example.com';
      url = `${protocol}${cookieDomain.replace(/^\./, '')}${path}`;
    }
  }
  
  cookieDetails.url = url;
  
  try {
    // If editing, delete the old cookie first
    if (editingCookie) {
      await chrome.cookies.remove({
        url: cookieDetails.url,
        name: editingCookie.name
      });
    }
    
    // Set the new cookie
    await chrome.cookies.set(cookieDetails);
    
    showToast('Cookie saved successfully!', 'success');
    closeModal('cookieModal');
    await loadCookies();
  } catch (error) {
    showToast('Error saving cookie: ' + error.message, 'error');
  }
}

/**
 * Delete cookie
 */
async function deleteCookie(cookie) {
  if (!confirm(`Delete cookie "${cookie.name}"?`)) {
    return;
  }
  
  try {
    const protocol = cookie.secure ? 'https://' : 'http://';
    const url = `${protocol}${cookie.domain}${cookie.path}`;
    
    await chrome.cookies.remove({
      url: url,
      name: cookie.name
    });
    
    showToast('Cookie deleted!', 'success');
    await loadCookies();
  } catch (error) {
    showToast('Error deleting cookie: ' + error.message, 'error');
  }
}

/**
 * Clear all cookies
 */
async function clearAllCookies() {
  const showAllDomains = document.getElementById('showAllDomains').checked;
  const confirmMsg = showAllDomains 
    ? 'Delete ALL cookies from ALL domains?' 
    : `Delete all cookies for ${currentDomain}?`;
  
  if (!confirm(confirmMsg)) {
    return;
  }
  
  try {
    const cookies = showAllDomains 
      ? await chrome.cookies.getAll({})
      : await chrome.cookies.getAll({ domain: currentDomain });
    
    for (const cookie of cookies) {
      const protocol = cookie.secure ? 'https://' : 'http://';
      const url = `${protocol}${cookie.domain}${cookie.path}`;
      await chrome.cookies.remove({ url: url, name: cookie.name });
    }
    
    showToast(`${cookies.length} cookies deleted!`, 'success');
    await loadCookies();
  } catch (error) {
    showToast('Error clearing cookies: ' + error.message, 'error');
  }
}

/**
 * Open import modal
 */
function openImportModal() {
  document.getElementById('importModal').classList.remove('hidden');
  document.getElementById('importData').value = '';
  document.getElementById('importPassword').value = '';
  document.getElementById('importError').classList.add('hidden');
  document.getElementById('importFile').value = '';
  document.getElementById('importFileName').textContent = 'No file selected';
}

/**
 * Handle import file selection and load its text into the textarea
 */
async function handleImportFile(event) {
  const fileInput = event.target;
  const file = fileInput.files && fileInput.files[0];
  const fileNameEl = document.getElementById('importFileName');

  if (!file) {
    fileNameEl.textContent = 'No file selected';
    return;
  }

  fileNameEl.textContent = file.name;

  try {
    const text = await file.text();
    document.getElementById('importData').value = text;

    // Auto-select format by file extension when possible
    const lower = file.name.toLowerCase();
    const formatSelect = document.getElementById('importFormat');
    if (lower.endsWith('.json')) {
      formatSelect.value = 'json';
    } else if (lower.endsWith('.txt')) {
      // Keep current selection; Netscape/header often use .txt
    }

    showToast('File loaded. Review data then click Import.', 'success');
  } catch (err) {
    showToast('Failed to read file: ' + err.message, 'error');
  }
}

/**
 * Import cookies
 */
async function importCookies() {
  const format = document.getElementById('importFormat').value;
  let data = document.getElementById('importData').value.trim();
  const password = document.getElementById('importPassword').value;
  const errorElement = document.getElementById('importError');
  
  if (!data) {
    errorElement.textContent = 'Please paste cookie data';
    errorElement.classList.remove('hidden');
    return;
  }
  
  try {
    // Check if data is encrypted and decrypt if password provided
    if (CryptoUtil.isEncrypted(data)) {
      if (!password) {
        errorElement.textContent = 'This data appears to be encrypted. Please enter the decryption password.';
        errorElement.classList.remove('hidden');
        return;
      }
      
      try {
        // Decrypt the data
        data = await CryptoUtil.decrypt(data, password);
        showToast('Data decrypted successfully!', 'success');
      } catch (error) {
        errorElement.textContent = error.message;
        errorElement.classList.remove('hidden');
        return;
      }
    }
    
    let cookies;
    
    // Parse based on format
    switch (format) {
      case 'json':
        cookies = CookieParser.parseJSON(data);
        break;
      case 'header':
        cookies = CookieParser.parseHeader(data);
        break;
      case 'netscape':
        cookies = NetscapeParser.parse(data);
        break;
      default:
        throw new Error('Invalid format');
    }
    
    // Import each cookie
    let successCount = 0;
    let errorCount = 0;
    
    for (const cookie of cookies) {
      try {
        // Determine URL
        const domain = cookie.domain || currentDomain || 'example.com';
        const protocol = cookie.secure ? 'https://' : 'http://';
        const url = `${protocol}${domain.replace(/^\./, '')}${cookie.path || '/'}`;
        
        const cookieDetails = CookieParser.normalizeCookie(cookie, url);
        await chrome.cookies.set(cookieDetails);
        successCount++;
      } catch (error) {
        console.error('Error importing cookie:', cookie.name, error);
        errorCount++;
      }
    }
    
    showToast(`Imported ${successCount} cookies${errorCount > 0 ? ` (${errorCount} failed)` : ''}. Reloading in 3 seconds...`, 'success');
    closeModal('importModal');
    
    // Wait 3 seconds then reload cookies and current tab
    setTimeout(async () => {
      await loadCookies();
      
      // Reload the current tab
      try {
        const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
        if (tabs[0]) {
          chrome.tabs.reload(tabs[0].id);
          showToast('Page reloaded!', 'info');
        }
      } catch (error) {
        console.error('Error reloading tab:', error);
      }
    }, 3000);
  } catch (error) {
    errorElement.textContent = error.message;
    errorElement.classList.remove('hidden');
  }
}

/**
 * Open export modal
 */
async function openExportModal() {
  document.getElementById('exportModal').classList.remove('hidden');
  document.getElementById('exportPassword').value = '';
  document.getElementById('encryptedBadge').classList.add('hidden');
  await updateExportData();
}

/**
 * Update export data
 */
async function updateExportData() {
  const format = document.getElementById('exportFormat').value;
  const password = document.getElementById('exportPassword').value;
  const showAllDomains = document.getElementById('showAllDomains').checked;
  const encryptedBadge = document.getElementById('encryptedBadge');
  
  try {
    const cookies = showAllDomains 
      ? await chrome.cookies.getAll({})
      : await chrome.cookies.getAll({ domain: currentDomain });
    
    let exportData;
    
    switch (format) {
      case 'json':
        exportData = CookieParser.toJSON(cookies);
        break;
      case 'header':
        exportData = CookieParser.toHeader(cookies);
        break;
      case 'netscape':
        exportData = NetscapeParser.stringify(cookies);
        break;
      default:
        exportData = '';
    }
    
    // Encrypt if password is provided
    if (password) {
      try {
        exportData = await CryptoUtil.encrypt(exportData, password);
        encryptedBadge.classList.remove('hidden');
        showToast('Data encrypted successfully!', 'success');
      } catch (error) {
        showToast('Encryption failed: ' + error.message, 'error');
        encryptedBadge.classList.add('hidden');
      }
    } else {
      encryptedBadge.classList.add('hidden');
    }
    
    document.getElementById('exportData').value = exportData;
  } catch (error) {
    showToast('Error generating export: ' + error.message, 'error');
  }
}

/**
 * Copy export data
 */
function copyExportData() {
  const data = document.getElementById('exportData').value;
  copyToClipboard(data);
  showToast('Copied to clipboard!', 'success');
}

/**
 * Download export data
 */
function downloadExportData() {
  const data = document.getElementById('exportData').value;
  const format = document.getElementById('exportFormat').value;
  
  const extensions = {
    json: 'json',
    header: 'txt',
    netscape: 'txt'
  };
  
  const filename = `cookies_${currentDomain || 'all'}_${Date.now()}.${extensions[format]}`;
  
  const blob = new Blob([data], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
  
  showToast('Download started!', 'success');
}

/**
 * Open settings modal
 */
async function openSettings() {
  const settings = await StorageUtil.get(['autoLockTime']);
  
  document.getElementById('settingsPassword').value = '';
  document.getElementById('autoLockTime').value = (settings.autoLockTime || 300000) / 1000;
  
  document.getElementById('settingsModal').classList.remove('hidden');
}

/**
 * Save settings
 */
async function saveSettings() {
  const password = document.getElementById('settingsPassword').value;
  const autoLockTime = parseInt(document.getElementById('autoLockTime').value) * 1000;
  
  const settingsToSave = {
    autoLockTime: autoLockTime
  };
  
  if (password) {
    // Password is being set or changed
    const passwordHash = await StorageUtil.hashPassword(password);
    settingsToSave.passwordHash = passwordHash;
    settingsToSave.requirePassword = true;
    settingsToSave.isLocked = false; // Unlock after setting password
  } else {
    // Check if password was previously set
    const currentSettings = await StorageUtil.get(['passwordHash']);
    if (currentSettings.passwordHash) {
      // User is clearing the password
      const confirmed = confirm('Remove password protection?');
      if (!confirmed) {
        return; // Cancel the save operation
      }
      // User confirmed password removal
      settingsToSave.requirePassword = false;
      settingsToSave.isLocked = false;
      settingsToSave.passwordHash = null; // Explicitly null it
      await StorageUtil.remove(['passwordHash']);
    }
  }
  
  await StorageUtil.set(settingsToSave);
  
  showToast('Settings saved!', 'success');
  closeModal('settingsModal');
  
  // Reset activity timer with new settings
  chrome.runtime.sendMessage({ action: 'resetLockTimer' });
}

/**
 * Close modal
 */
function closeModal(modalId) {
  document.getElementById(modalId).classList.add('hidden');
}

/**
 * Open credits modal
 */
function openCreditModal() {
  document.getElementById('creditModal').classList.remove('hidden');
}

/**
 * Show toast notification
 */
function showToast(message, type = 'info') {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = `toast glass-panel ${type}`;
  toast.classList.remove('hidden');
  
  setTimeout(() => {
    toast.classList.add('hidden');
  }, 3000);
}

/**
 * Show loading state
 */
function showLoading() {
  document.getElementById('loading').classList.remove('hidden');
}

/**
 * Hide loading state
 */
function hideLoading() {
  document.getElementById('loading').classList.add('hidden');
}

/**
 * Update cookie count
 */
function updateCookieCount() {
  const count = currentCookies.length;
  document.getElementById('cookieCount').textContent = `${count} cookie${count !== 1 ? 's' : ''}`;
}

/**
 * Copy to clipboard
 */
function copyToClipboard(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
}

/**
 * Escape HTML
 */
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Format date for datetime-local input
 */
function formatDateTimeLocal(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

// Track activity for auto-lock
document.addEventListener('click', () => {
  if (!isLocked) {
    chrome.runtime.sendMessage({ action: 'resetLockTimer' });
  }
});
