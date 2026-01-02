# Icon Setup Guide

This directory contains the extension icons required for Advanced Cookie Manager. The extension needs three PNG files in specific dimensions to display correctly across Chrome UI elements.

## Required Icon Files

| Filename | Dimensions | Purpose |
|----------|-----------|---------|
| `icon16.png` | 16×16 pixels | Toolbar icon (smallest) |
| `icon48.png` | 48×48 pixels | Extension menu & management pages |
| `icon128.png` | 128×128 pixels | Chrome Web Store & larger displays |

All files must be in **PNG format with transparency** for best results.

---

## Icon Creation Methods

### Method 1: Icon Generator (Recommended for Quick Setup)

1. Open `icon-generator.html` in your web browser
2. The generator displays preview images and download buttons
3. Click each **Download** button to save:
   - `icon16.png`
   - `icon48.png`
   - `icon128.png`
4. Place all three files in this `icons/` directory
5. Continue to [Verification](#verification)

**Advantages:**
- ✅ Instant generation
- ✅ Pre-sized correctly
- ✅ No additional tools needed
- ✅ Consistent cookie theme

---

### Method 2: Custom Icons with Online Tools

For branded or custom icons, use online generators:

1. Visit a favicon/icon generator:
   - [Favicon Generator](https://www.favicon-generator.org/)
   - [Icon Kitchen](https://www.icon-kitchen.app/)
   - [Favicon.io](https://favicon.io/)

2. Upload or create your design:
   - Use a cookie emoji 🍪
   - Use a lock icon (for security theme)
   - Use custom artwork (recommend 128×128 as base)

3. Generate and download icons in multiple sizes

4. Rename downloaded files to match the required names:
   - Smallest size → `icon16.png`
   - Medium size → `icon48.png`
   - Largest size → `icon128.png`

5. Place files in this directory

**Advantages:**
- ✅ Full customization
- ✅ Brand alignment possible
- ✅ No design software required

---

### Method 3: Design Software (Advanced)

If you have design experience, create icons in professional tools:

**Software Options:**
- Figma (free, web-based)
- Adobe Illustrator
- Sketch
- GIMP (free, open-source)
- Photoshop

**Steps:**

1. Create a 128×128 pixel canvas (highest resolution)
2. Design your icon with:
   - Cookie or lock motif
   - Clean, simple shapes
   - High contrast for small sizes
   - Transparent background (PNG with alpha channel)

3. Export as PNG at full size: `icon128.png`

4. Resize and export two additional versions:
   - 48×48 pixels → `icon48.png`
   - 16×16 pixels → `icon16.png`

5. **Important:** Use high-quality downsampling (bicubic/Lanczos) to preserve clarity at smaller sizes

6. Place all three files in this directory

**Design Tips:**
- Avoid fine details in the 16×16 version (they become unreadable)
- Use solid colors or large patterns
- Test at actual size to ensure visibility
- Maintain consistent style across sizes

---

### Method 4: Emoji-Based Icons (Quick Alternative)

For rapid prototyping or testing:

1. Take a screenshot of the cookie emoji: 🍪
2. Open in an image editor (Paint, Preview, Photoshop, GIMP, etc.)
3. Crop the emoji to a square
4. Resize and export to required dimensions:
   - 16×16 pixels → `icon16.png`
   - 48×48 pixels → `icon48.png`
   - 128×128 pixels → `icon128.png`
5. Place in this directory

**Limitations:**
- ⚠️ Emoji rendering varies by OS
- ⚠️ May not look polished in all contexts
- ⚠️ Recommended for development/testing only

---

### Method 5: Temporary Placeholders (Development Only)

For initial testing without proper icons:

1. Obtain any three PNG files (can be unrelated)
2. Rename them:
   - Any small image → `icon16.png`
   - Any medium image → `icon48.png`
   - Any large image → `icon128.png`
3. Place in this directory

**Important:** The extension will function with any PNG files, but placeholder icons will appear in the toolbar and Chrome settings. Replace with proper icons before distribution or sharing.

---

## Verification

After placing icon files in this directory:

1. **File Check**
   ```bash
   ls -la icons/
   # Expected output:
   # icon16.png
   # icon48.png
   # icon128.png
   ```

2. **Reload in Chrome**
   - Navigate to `chrome://extensions/`
   - Locate "Advanced Cookie Manager"
   - Click the **reload** (circular arrow) icon
   - Wait 1–2 seconds for changes to apply

3. **Visual Verification**
   - Check the toolbar for the extension icon (should display your icon)
   - Open `chrome://extensions/` and verify the icon appears next to the extension name
   - Icons should match across all locations

4. **Troubleshooting If Icons Don't Appear**
   - Verify filenames match exactly (case-sensitive on Linux/Mac)
   - Confirm files are in PNG format
   - Ensure transparency is preserved (not white background)
   - Clear browser cache: press `Ctrl+Shift+Delete` (Windows) or `Cmd+Shift+Delete` (Mac)
   - Reload the extension again

---

## Best Practices

| Practice | Reason |
|----------|--------|
| Use PNG with transparency | Blends with toolbar background |
| Keep designs simple | Details disappear in 16×16 size |
| Test at actual display size | Ensure readability on screen |
| Use consistent styling | All three sizes should look unified |
| Avoid thin lines | May render as broken in small sizes |
| Use high contrast | Better visibility on light and dark backgrounds |

---

## File Format Requirements

- **Format:** PNG only
- **Transparency:** Supported (recommended)
- **Color space:** RGB or RGBA
- **Dimensions:** Exact pixel sizes (no scaling by browser)
- **File size:** Keep under 100 KB per icon (typically 5–20 KB)

---

## Next Steps

Once icons are in place:

1. Reload the extension in `chrome://extensions/`
2. Verify icons display correctly
3. Test the extension popup functionality
4. If distributing, ensure high-quality icons for professional appearance

For detailed extension setup, see the main [README.md](../README.md).
