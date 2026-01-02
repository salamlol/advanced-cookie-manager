# Troubleshooting Guide

Common issues and their solutions for the Advanced Cookie Manager extension.

## Installation Issues

### ❌ Extension won't load

**Symptoms:** Error when clicking "Load unpacked"

**Solutions:**
1. Make sure you're selecting the correct folder (the one containing `manifest.json`)
2. Check that `manifest.json` exists and is valid JSON
3. Verify all file paths in manifest.json are correct
4. Enable "Developer mode" in chrome://extensions/
5. Try refreshing the extensions page (F5)

### ❌ Extension loads but shows errors

**Symptoms:** Red error text in chrome://extensions/

**Solutions:**
1. Check the error message for specific file or line number
2. Verify all referenced files exist:
   - background.js
   - popup/popup.html
   - popup/popup.css
   - popup/popup.js
   - utils/*.js files
3. If icon errors: Generate icons or temporarily comment out icon references in manifest.json

### ⚠️ Icon warnings

**Symptoms:** "Could not load icon" warnings

**Solutions:**
1. Generate icons using `icons/icon-generator.html`
2. Or temporarily remove icon references from manifest.json
3. Extension will still work, just without custom icons

## Popup Issues

### ❌ Popup doesn't open

**Symptoms:** Nothing happens when clicking extension icon

**Solutions:**
1. Check browser console (F12) for errors
2. Right-click extension icon → "Inspect popup" to see popup console
3. Verify popup.html exists and loads correctly
4. Check that all script files are loading (no 404 errors)

### ❌ Popup is blank

**Symptoms:** White/empty popup window

**Solutions:**
1. Inspect popup (right-click icon → "Inspect popup")
2. Check console for JavaScript errors
3. Verify all CSS files are loading
4. Make sure popup.js is executing
5. Try reloading the extension

### ❌ Popup shows but no cookies

**Symptoms:** Empty state even though cookies exist

**Solutions:**
1. Make sure you're on a normal website (not chrome:// pages)
2. Check if "All Domains" toggle is off (will only show current domain)
3. Try toggling "All Domains" on
4. Check browser console for permission errors
5. Verify chrome.cookies permission in manifest.json

## Cookie Operation Issues

### ❌ Can't view cookies

**Symptoms:** "No cookies found" when there should be cookies

**Solutions:**
1. Verify you have cookies for that site (check browser DevTools → Application → Cookies)
2. Toggle "All Domains" checkbox
3. Try a different website
4. Check if cookies are HttpOnly (these may not be visible via chrome.cookies API)

### ❌ Can't add cookie

**Symptoms:** Error when saving new cookie

**Solutions:**
1. Make sure Name field is filled
2. Verify Domain format (use `.example.com` with leading dot)
3. Check if URL is valid for the domain
4. Try without expiration date first
5. Make sure you're not on a chrome:// page

### ❌ Can't edit cookie

**Symptoms:** Changes don't save

**Solutions:**
1. Some cookies may be HttpOnly (cannot be modified via JavaScript)
2. Try deleting and recreating instead
3. Check domain and path match exactly
4. Verify Secure flag matches protocol (HTTPS required for secure cookies)

### ❌ Can't delete cookie

**Symptoms:** Cookie remains after deletion

**Solutions:**
1. Check if cookie is HttpOnly
2. Verify domain and path exactly match
3. Try clearing all cookies instead
4. Check if another extension is creating the cookie

## Import/Export Issues

### ❌ Import fails

**Symptoms:** Error message when importing

**Solutions:**

**For JSON:**
1. Validate JSON syntax using jsonlint.com
2. Ensure array format: `[{...}, {...}]`
3. Check required fields: name and value
4. Remove trailing commas

**For Header String:**
1. Use format: `key=value; key2=value2`
2. Separate with semicolons and spaces
3. Don't include extra quotes
4. Make sure no line breaks

**For Netscape:**
1. Use tab characters (not spaces) between fields
2. Include 7 fields per line
3. Skip comment lines (starting with #)
4. Check timestamp format (Unix timestamp)

### ❌ Export shows no data

**Symptoms:** Empty export textarea

**Solutions:**
1. Make sure cookies are loaded first
2. Check if "All Domains" affects what's exported
3. Try switching export formats
4. Verify cookies exist for selected domain

### ❌ Download doesn't work

**Symptoms:** No file downloaded

**Solutions:**
1. Check browser's download settings
2. Allow popups for the extension
3. Try "Copy" instead and save manually
4. Check browser console for errors

## Security/Password Issues

### 🔒 Locked out (forgot password)

**Symptoms:** Can't unlock extension

**Solutions:**
1. **Option A:** Reset extension data
   - Go to chrome://extensions/
   - Find Advanced Cookie Manager
   - Click "Details"
   - Scroll to "Site access"
   - Click "Clear storage"
   - This will remove password but also all settings

2. **Option B:** Reinstall extension
   - Remove extension
   - Add it again
   - All settings will be reset

3. **Prevention:** Write down your password!

### ❌ Password not saving

**Symptoms:** Extension doesn't lock even with password set

**Solutions:**
1. Make sure you clicked "Save Settings"
2. Check that you entered a password (not blank)
3. Verify toast notification appeared
4. Close and reopen popup to test
5. Check chrome.storage permission in manifest

### ❌ Auto-lock not working

**Symptoms:** Extension never locks automatically

**Solutions:**
1. Make sure password is set
2. Check Auto-Lock Time is not 0
3. Wait the full time period
4. Close and reopen popup after waiting
5. Check background.js console for errors

## UI/Visual Issues

### 🎨 Glassmorphism not showing

**Symptoms:** UI looks flat, no blur effect

**Solutions:**
1. Make sure you're on a browser that supports backdrop-filter:
   - Chrome 76+
   - Edge 79+
   - Safari 9+
2. Check if GPU acceleration is enabled
3. Try a different theme (toggle light/dark)
4. Verify CSS file is loading

### 🌓 Theme not changing

**Symptoms:** Dark/light toggle doesn't work

**Solutions:**
1. Check browser console for errors
2. Verify popup.css is loading
3. Try closing and reopening popup
4. Clear browser cache
5. Check if theme preference is saved (chrome.storage)

### 📱 Layout issues

**Symptoms:** UI elements misaligned or overlapping

**Solutions:**
1. Check browser zoom level (should be 100%)
2. Try different window sizes
3. Verify all CSS files loaded
4. Check for CSS console errors
5. Try reloading extension

## Performance Issues

### 🐌 Extension is slow

**Symptoms:** Lag when loading cookies or searching

**Solutions:**
1. If you have 1000+ cookies, try filtering by domain
2. Clear old/unnecessary cookies
3. Use "Clear All" for unused domains
4. Check if another extension is conflicting
5. Try disabling other extensions temporarily

### 💾 High memory usage

**Symptoms:** Browser using lots of RAM

**Solutions:**
1. Close and reopen popup when done
2. Don't keep popup open constantly
3. Clear unnecessary cookies
4. Restart browser

## Browser Compatibility Issues

### Chrome/Edge

**Symptoms:** Features not working on Chrome/Edge

**Solutions:**
1. Update to latest Chrome version (88+)
2. Check manifest version is 3
3. Verify service worker (background.js) is running
4. Check chrome://extensions/ for errors

### Brave Browser

**Symptoms:** Issues specific to Brave

**Solutions:**
1. Check Shields settings
2. Allow extension in Brave Shields
3. Disable Brave's cookie blocking temporarily
4. Check Brave's extension settings

## Error Messages

### "Cannot access chrome:// URLs"

**This is normal!** Chrome doesn't allow extensions to access internal pages (chrome://, chrome-extension://, etc.) for security reasons.

**Solution:** Navigate to a regular website first.

### "Failed to set cookie"

**Possible causes:**
1. Domain/path mismatch
2. Secure cookie on HTTP site
3. Invalid cookie format
4. Browser policy blocking

**Solution:** Check all cookie fields carefully, especially domain and secure flag.

### "Cannot read property of undefined"

**This is a JavaScript error.**

**Solutions:**
1. Check browser console for full error
2. Report the error with steps to reproduce
3. Try reloading extension
4. Check if a required field is missing

## Debug Mode

To get more information about issues:

1. **Open popup console:**
   - Right-click extension icon
   - Click "Inspect popup"
   - Check Console tab

2. **Check background console:**
   - Go to chrome://extensions/
   - Find Advanced Cookie Manager
   - Click "Inspect views: service worker"
   - Check Console tab

3. **Check for errors:**
   - Look for red error messages
   - Note file names and line numbers
   - Copy error text for reporting

## Still Having Issues?

If none of these solutions work:

1. **Collect Information:**
   - Browser name and version
   - Extension version
   - Steps to reproduce
   - Error messages from console
   - Screenshots if UI issue

2. **Try Clean Install:**
   - Remove extension completely
   - Clear browser cache
   - Restart browser
   - Reinstall extension

3. **Check Documentation:**
   - README.md for feature details
   - TESTING.md for test procedures
   - FEATURES.md for implementation status

4. **Report Issue:**
   - Create detailed bug report
   - Include all information above
   - Mention what you've already tried

---

## Quick Fixes Summary

| Problem | Quick Fix |
|---------|-----------|
| Won't load | Check Developer mode is ON |
| No cookies | Toggle "All Domains" |
| Import fails | Check format syntax |
| Forgot password | Clear extension storage |
| Slow performance | Clear old cookies |
| Theme not working | Reload extension |
| Icons missing | Use icon generator |
| Blank popup | Check console errors |

---

**Most issues can be solved by reloading the extension or checking the console for specific errors!**
