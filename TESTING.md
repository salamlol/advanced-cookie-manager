# Testing Guide for Advanced Cookie Manager Extension

## Initial Setup Testing

### 1. Installation Test
- [ ] Load extension in Chrome via "Load unpacked"
- [ ] Extension appears in toolbar
- [ ] No console errors in chrome://extensions
- [ ] Popup opens when clicking extension icon

### 2. First Launch Test
- [ ] Default theme is light
- [ ] Current domain is displayed correctly
- [ ] No password protection is active
- [ ] All buttons are visible and styled correctly

## Cookie Management Tests

### 3. View Cookies
- [ ] Navigate to any website (e.g., google.com)
- [ ] Open extension popup
- [ ] Cookies for current domain are displayed
- [ ] Toggle "All Domains" checkbox
- [ ] Verify all cookies from all sites appear

### 4. Add Cookie
- [ ] Click "➕ Add Cookie"
- [ ] Fill in Name: "test_cookie"
- [ ] Fill in Value: "test_value_123"
- [ ] Set Path: "/"
- [ ] Click "Save"
- [ ] Verify cookie appears in list
- [ ] Verify toast notification appears

### 5. Edit Cookie
- [ ] Click "✏️" on the test cookie
- [ ] Change value to "updated_value_456"
- [ ] Click "Save"
- [ ] Verify value is updated in list
- [ ] Verify toast notification appears

### 6. Copy Cookie Value
- [ ] Click "📋" on any cookie
- [ ] Paste in a text editor
- [ ] Verify correct value was copied
- [ ] Verify toast notification appears

### 7. Delete Cookie
- [ ] Click "🗑️" on test cookie
- [ ] Confirm deletion dialog
- [ ] Verify cookie is removed from list
- [ ] Verify toast notification appears
- [ ] Try canceling deletion (should not delete)

### 8. Clear All Cookies
- [ ] Navigate to a test site with multiple cookies
- [ ] Click "🗑️ Clear All"
- [ ] Confirm dialog
- [ ] Verify all cookies for domain are deleted
- [ ] Verify correct count in toast

## Search and Filter Tests

### 9. Search Functionality
- [ ] Type cookie name in search box
- [ ] Verify only matching cookies appear
- [ ] Clear search
- [ ] Verify all cookies reappear
- [ ] Search by value
- [ ] Search by domain

### 10. Sort Functionality
- [ ] Select "Sort by Name"
- [ ] Verify alphabetical order
- [ ] Select "Sort by Domain"
- [ ] Verify domain-based order
- [ ] Select "Sort by Expiration"
- [ ] Verify expiration-based order

## Import Tests

### 11. Import JSON
- [ ] Click "📥 Import"
- [ ] Select "JSON" format
- [ ] Paste valid JSON:
```json
[
  {
    "name": "imported_json",
    "value": "json_value",
    "domain": ".example.com",
    "path": "/",
    "secure": true
  }
]
```
- [ ] Click "Import"
- [ ] Verify cookie is created
- [ ] Test with invalid JSON (should show error)

### 12. Import Header String
- [ ] Click "📥 Import"
- [ ] Select "Header String" format
- [ ] Paste: `cookie1=value1; cookie2=value2; cookie3=value3`
- [ ] Click "Import"
- [ ] Verify all three cookies are created
- [ ] Test with invalid format (should show error)

### 13. Import Netscape
- [ ] Click "📥 Import"
- [ ] Select "Netscape Cookie File" format
- [ ] Paste valid Netscape format:
```
# Netscape HTTP Cookie File
.example.com	TRUE	/	FALSE	1735689600	netscape_cookie	netscape_value
```
- [ ] Click "Import"
- [ ] Verify cookie is created
- [ ] Test with invalid format (should show error)

## Export Tests

### 14. Export JSON
- [ ] Add a few test cookies
- [ ] Click "📤 Export"
- [ ] Select "JSON" format
- [ ] Verify JSON output is valid
- [ ] Click "📋 Copy" and verify clipboard
- [ ] Click "💾 Download" and verify file

### 15. Export Header String
- [ ] Click "📤 Export"
- [ ] Select "Header String" format
- [ ] Verify format: `key1=value1; key2=value2`
- [ ] Test copy and download functions

### 16. Export Netscape
- [ ] Click "📤 Export"
- [ ] Select "Netscape Cookie File" format
- [ ] Verify format includes header comments
- [ ] Verify tab-separated values
- [ ] Test copy and download functions

## Theme Tests

### 17. Theme Toggle
- [ ] Click "🌙" theme button
- [ ] Verify switch to dark theme
- [ ] All text is readable
- [ ] All UI elements are visible
- [ ] Click "☀️" to switch back
- [ ] Verify light theme restored
- [ ] Close and reopen popup
- [ ] Verify theme persists

## Security/Password Tests

### 18. Set Password
- [ ] Click "⚙️" Settings
- [ ] Enter password: "TestPassword123"
- [ ] Set Auto-Lock Time: 10 seconds
- [ ] Click "Save Settings"
- [ ] Verify toast notification

### 19. Password Lock
- [ ] Wait 10 seconds
- [ ] Close and reopen popup
- [ ] Verify lock screen appears
- [ ] Try wrong password
- [ ] Verify error message
- [ ] Enter correct password
- [ ] Verify unlocks successfully

### 20. Disable Password
- [ ] Open Settings
- [ ] Leave password field blank
- [ ] Confirm removal dialog
- [ ] Verify password removed
- [ ] Close and reopen popup
- [ ] Verify no lock screen

## Edge Cases

### 21. Empty States
- [ ] Clear all cookies
- [ ] Verify "No cookies found" message
- [ ] Verify empty state icon displays

### 22. Special Characters
- [ ] Create cookie with name: `test@cookie!#$`
- [ ] Create cookie with value: `<script>alert('xss')</script>`
- [ ] Verify proper HTML escaping
- [ ] Verify no XSS issues

### 23. Long Values
- [ ] Create cookie with 1000+ character value
- [ ] Verify displays correctly
- [ ] Verify scrolling works
- [ ] Verify copy works

### 24. Expiration Dates
- [ ] Create cookie with future expiration (1 year)
- [ ] Verify date displays correctly
- [ ] Create session cookie (no expiration)
- [ ] Verify shows "Session"

### 25. Cookie Flags
- [ ] Create cookie with Secure flag
- [ ] Verify "🔒 Secure" badge appears
- [ ] Create cookie with HttpOnly flag
- [ ] Verify "🚫 HttpOnly" badge appears
- [ ] Set SameSite to "Strict"
- [ ] Verify badge appears

## Performance Tests

### 26. Many Cookies
- [ ] Import 100+ cookies
- [ ] Verify list renders without lag
- [ ] Test search performance
- [ ] Test sort performance
- [ ] Test clear all performance

### 27. Quick Actions
- [ ] Rapidly click theme toggle
- [ ] Verify no errors
- [ ] Quickly open/close modals
- [ ] Verify no memory leaks

## Browser Compatibility

### 28. Chrome
- [ ] Test all features in Chrome
- [ ] Verify no console errors
- [ ] Check responsive design

### 29. Edge
- [ ] Test all features in Edge
- [ ] Verify compatibility

### 30. Brave
- [ ] Test all features in Brave
- [ ] Verify no conflicts with Brave Shields

## Error Handling

### 31. Invalid Cookie Operations
- [ ] Try to create cookie with empty name
- [ ] Verify error message
- [ ] Try to import malformed data
- [ ] Verify error message

### 32. Permission Issues
- [ ] Try to access chrome:// pages
- [ ] Verify graceful handling
- [ ] Try to set cookie on restricted domain
- [ ] Verify error handling

## Final Checklist

- [ ] All UI elements aligned properly
- [ ] All buttons have hover effects
- [ ] All animations smooth
- [ ] No console errors or warnings
- [ ] Extension works on http and https sites
- [ ] All modals can be closed
- [ ] All forms validate input
- [ ] Toast notifications appear and disappear
- [ ] Glassmorphism effects visible
- [ ] Extension icon displays correctly

## Known Limitations

1. Cannot access cookies on chrome:// pages (browser restriction)
2. HttpOnly cookies cannot be read via JavaScript (security feature)
3. Some cookies may be protected by browser policies

## Reporting Issues

If you find bugs during testing:
1. Note the browser version
2. Note the steps to reproduce
3. Check console for errors
4. Take screenshots if UI issues

---

**Happy Testing! 🍪**
