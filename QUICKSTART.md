# Quick Start Guide

Get your Advanced Cookie Manager extension running in 5 minutes!

## Step 1: Generate Icons (2 minutes)

The extension needs icon files. Choose one method:

### Method A: Use the Icon Generator (Easiest)
1. Open `icons/icon-generator.html` in your browser
2. Click each "Download" button (16x16, 48x48, 128x128)
3. Icons will download to your Downloads folder
4. Move them to the `icons/` folder

### Method B: Use Online Tool
1. Visit https://favicon.io/favicon-converter/
2. Upload a cookie emoji or image 🍪
3. Download the generated icons
4. Rename and place in `icons/` folder as:
   - `icon16.png`
   - `icon48.png`
   - `icon128.png`

### Method C: Skip for Now (Temporary)
The extension will show warnings but still work. Add icons later.

## Step 2: Load Extension (1 minute)

1. Open Chrome/Edge browser
2. Navigate to: `chrome://extensions/`
3. Toggle "Developer mode" ON (top-right corner)
4. Click "Load unpacked"
5. Select the `advanced-cookie-manager` folder
6. ✅ Extension loaded!

## Step 3: Test It Out (2 minutes)

1. Navigate to any website (e.g., google.com, github.com)
2. Click the extension icon in your toolbar
3. See all cookies for that website!

### Try These Features:

**Add a Cookie:**
- Click "➕ Add Cookie"
- Name: `test`
- Value: `hello_world`
- Click "Save"

**Export Cookies:**
- Click "📤 Export"
- Choose JSON format
- Click "📋 Copy"

**Toggle Theme:**
- Click "🌙" icon
- Switch to dark mode!

**Set Password (Optional):**
- Click "⚙️" Settings
- Enter a password
- Now extension locks automatically

## That's It! 🎉

You now have a fully functional advanced cookie manager!

## Next Steps

- Read [README.md](README.md) for detailed feature documentation
- Check [TESTING.md](TESTING.md) for comprehensive testing guide
- Customize the CSS in `popup/popup.css` for your own theme

## Common Issues

**Icons not showing?**
- Generate/add the icon files (see Step 1)
- Reload the extension

**Extension not loading?**
- Make sure Developer mode is ON
- Check console for errors at chrome://extensions

**Cookies not appearing?**
- Make sure you're on a regular website (not chrome:// pages)
- Try toggling "All Domains" checkbox

**Need Help?**
- Check the README.md for detailed documentation
- Look at the console (F12) for error messages

---

**Enjoy managing your cookies! 🍪✨**
