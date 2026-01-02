<div align="center">

# 🍪 Advanced Cookie Manager

**A modern, feature-rich browser extension for managing cookies with beautiful glassmorphism UI**

[![Version](https://img.shields.io/badge/version-1.1.0-blue?style=flat-square)](https://github.com/dominhduy09/advanced-cookie-manager)
[![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)
[![Manifest V3](https://img.shields.io/badge/manifest-V3-purple?style=flat-square)](https://developer.chrome.com/docs/extensions/mv3/)
[![Chrome Extension](https://img.shields.io/badge/chrome-extension-yellow?style=flat-square)](https://chrome.google.com/webstore)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)](CONTRIBUTING.md)

[Features](#-features) • [Installation](#-installation) • [Usage](#-usage) • [Tech Stack](#-tech-stack) • [Contributing](#-contributing)

</div>

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [How It Works](#-how-it-works)
- [Installation](#-installation)
- [Usage](#-usage)
- [Configuration](#-configuration)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [Support](#-support)
- [Author](#-author)
- [License](#-license)
- [Acknowledgments](#-acknowledgments)

---

## 🎯 Overview

**Advanced Cookie Manager** is a modern Chrome extension built with **Manifest V3** that empowers developers and power users to manage browser cookies with precision and elegance. Whether you're debugging authentication flows, testing cookie behavior, or managing session data, this extension provides an intuitive interface with powerful features like import/export, encryption, and password protection.

**Who is this for?**
- 👨‍💻 Web developers testing cookie-based authentication
- 🔒 Security professionals auditing cookie configurations
- 🧪 QA engineers managing test environments
- 💼 Anyone needing fine-grained cookie control

**Why it exists:**
Chrome's built-in cookie management is limited. This extension fills that gap with a developer-friendly UI, multi-format import/export, and security features like AES-256-GCM encryption—all without external dependencies or privacy concerns.

---

## ✨ Features

### 🔍 Core Cookie Management
- **View Cookies** — Display all cookies for current domain or all domains at once
- **Add Cookies** — Create new cookies with full control over name, value, domain, path, expiration, and flags
- **Edit Cookies** — Modify existing cookie values and settings in real-time
- **Delete Cookies** — Remove individual cookies or clear all with a single click
- **Search & Filter** — Quickly find cookies by name, value, or domain using live search
- **Sort Options** — Sort by name, domain, or expiration date for easier navigation

### 📤 Import/Export
- **JSON Format** — Import and export cookies as structured JSON
- **Header String** — Parse and generate cookie header strings (key=value pairs)
- **Netscape Format** — Full support for Netscape cookie file format (standard `.txt` files)
- **Encryption Support** — Encrypt exported cookies with AES-256-GCM for secure sharing
- **Decryption** — Import encrypted cookies with password protection

### 🔐 Security
- **Password Protection** — Optional lock extension with SHA-256 hashed passwords
- **Auto-Lock** — Automatically lock after configurable inactivity period
- **Export Encryption** — AES-256-GCM encryption with random salt and IV
- **PBKDF2 Key Derivation** — 100,000 iterations for strong password-based encryption
- **No Cloud Storage** — All processing happens locally; no external requests

### 🎨 User Experience
- **Glassmorphism Design** — Modern frosted glass aesthetic
- **Dark/Light Themes** — Toggle between themes with persistent settings
- **Smooth Animations** — CSS transitions for polished interactions
- **Toast Notifications** — Real-time success and error feedback
- **Copy to Clipboard** — One-click copy for cookie values and headers

---

## ⚙️ How It Works

### Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│          Chrome Extension (Manifest V3)                  │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  ┌──────────────────────────────────────────────────┐   │
│  │         Popup UI (popup.html/css/js)             │   │
│  │  • Cookie viewing & management                   │   │
│  │  • Import/Export modals                          │   │
│  │  • Settings & password lock                      │   │
│  └──────────────────────────────────────────────────┘   │
│                        ↕                                 │
│  ┌──────────────────────────────────────────────────┐   │
│  │      Background Service Worker (background.js)   │   │
│  │  • Message relay & communication                 │   │
│  │  • Password hashing (SHA-256)                    │   │
│  │  • Auto-lock timer management                    │   │
│  └──────────────────────────────────────────────────┘   │
│                        ↕                                 │
│  ┌──────────────────────────────────────────────────┐   │
│  │          Utility Modules (utils/)                 │   │
│  │  • storage.js — Chrome storage wrapper           │   │
│  │  • cookieParser.js — JSON/Header parsing         │   │
│  │  • netscapeParser.js — Netscape format support   │   │
│  │  • crypto.js — AES-256-GCM encryption            │   │
│  └──────────────────────────────────────────────────┘   │
│                        ↕                                 │
│  ┌──────────────────────────────────────────────────┐   │
│  │       Chrome APIs                                 │   │
│  │  • chrome.cookies — Query & set cookies          │   │
│  │  • chrome.tabs — Get active tab info             │   │
│  │  • chrome.storage.local — Persistent settings    │   │
│  │  • chrome.runtime — Message passing              │   │
│  └──────────────────────────────────────────────────┘   │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

**Data Flow:**
1. User interacts with popup UI
2. Popup communicates with background service worker via `chrome.runtime.sendMessage()`
3. Service worker handles sensitive operations (hashing, password checks)
4. Utilities parse and encrypt/decrypt data as needed
5. Chrome APIs fetch/modify cookies and store settings

---

## 📦 Installation

### Quick Start (Development Mode)

1. **Clone or download** this repository:
   ```bash
   git clone https://github.com/dominhduy09/advanced-cookie-manager.git
   cd advanced-cookie-manager
   ```

2. **Open Chrome/Edge** and navigate to `chrome://extensions/`

3. **Enable Developer Mode** (toggle in top-right corner)

4. **Click "Load unpacked"** and select the `advanced-cookie-manager` folder

5. **Verify** the extension icon appears in your toolbar

### Create Icons (Optional but Recommended)

The extension requires three PNG icon files. See [icons/README.md](icons/README.md) for detailed instructions on:
- Using the icon generator
- Creating custom icons with design tools
- Using emoji-based icons

---

## 🚀 Usage

### Basic Operations

1. **View Cookies**
   - Click the extension icon to open the popup
   - See all cookies for the current website
   - Toggle "All Domains" checkbox to view cookies across all websites

2. **Search & Filter**
   - Use the search bar to filter by cookie name, value, or domain
   - Search is live and case-insensitive

3. **Sort**
   - Click the sort dropdown to organize by:
     - Name (alphabetical)
     - Domain
     - Expiration date

### Adding a Cookie

1. Click **"➕ Add Cookie"** button
2. Fill in required fields:
   - **Name** — Cookie identifier
   - **Value** — Cookie content
3. Optionally set:
   - **Domain** — Cookie scope (e.g., `.example.com`)
   - **Path** — URL path restriction (default: `/`)
   - **Expiration** — Date/time for cookie expiry
   - **Secure** — HTTPS only
   - **HttpOnly** — JavaScript access restriction
   - **SameSite** — CSRF protection (Strict/Lax/None)
4. Click **"Save"**

### Editing a Cookie

1. Click the **"✏️" icon** on any cookie
2. Modify the desired fields
3. Click **"Save"**

### Deleting Cookies

- **Single cookie**: Click the **"🗑️" icon** on the cookie row
- **All cookies**: Click **"🗑️ Clear All"** (confirmation required)

### Importing Cookies

1. Click **"📥 Import"** button
2. Select import format:
   - **JSON** — Structured cookie array
   - **Header String** — Semi-colon separated key=value pairs
   - **Netscape** — Standard cookie file format
3. Paste or select your cookie data
4. If encrypted, enter the decryption password
5. Click **"Import"**

**Examples:**

**JSON:**
```json
[
  {
    "name": "session_id",
    "value": "abc123xyz",
    "domain": ".example.com",
    "path": "/",
    "expirationDate": 1735689600,
    "secure": true,
    "httpOnly": false,
    "sameSite": "Lax"
  }
]
```

**Header String:**
```
session_id=abc123xyz; user_token=xyz789; theme=dark
```

**Netscape:**
```
# Netscape HTTP Cookie File
# This is a generated file!  Do not edit.

.example.com	TRUE	/	TRUE	1735689600	session_id	abc123xyz
.example.com	TRUE	/	FALSE	1735689600	user_token	xyz789
```

### Exporting Cookies

1. Click **"📤 Export"** button
2. Select export format (JSON, Header String, or Netscape)
3. **Optional:** Enter a password to encrypt the export
4. Choose action:
   - **"📋 Copy"** — Copy encrypted/plaintext to clipboard
   - **"💾 Download"** — Save as file to your computer

**Encryption Details:**
- Uses **AES-256-GCM** encryption algorithm
- Derives key from password using **PBKDF2** (100,000 iterations)
- Random **salt** and **IV** generated per encryption
- Output format: **Base64-encoded** for easy sharing
- 🔒 Badge indicates encrypted exports

### Password Protection

1. Click **"⚙️" (Settings)** icon
2. Enter a password (leave blank to disable protection)
3. Set auto-lock timeout in seconds (0 = disabled):
   - Default: 300 (5 minutes)
   - Recommended: 300–600 seconds
4. Click **"Save Settings"**

**When locked:**
- Enter password to unlock the extension
- Timer resets on unlock
- All cookie data remains safe

---

## ⚙️ Configuration

### Theme Customization

Edit CSS variables in `popup/popup.css` to customize colors and appearance:

```css
:root {
  /* Primary gradient background */
  --bg-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  
  /* Glassmorphism effect */
  --glass-bg: rgba(255, 255, 255, 0.25);
  --glass-border: rgba(255, 255, 255, 0.18);
  
  /* Text colors */
  --text-primary: #ffffff;
  --text-secondary: rgba(255, 255, 255, 0.7);
  
  /* Accent colors */
  --accent-success: #10b981;
  --accent-error: #ef4444;
  --accent-warning: #f59e0b;
}
```

### Auto-Lock Timing

Default auto-lock is **5 minutes (300 seconds)**. To change:

**Via Settings UI:**
- Click ⚙️ → Enter new timeout → Save

**Via background.js code:**
```javascript
chrome.storage.local.set({
  autoLockTime: 300000, // milliseconds (300,000 = 5 minutes)
});
```

### Security Settings

- **Password hashing:** SHA-256 (non-reversible)
- **Encryption key derivation:** PBKDF2 with 100,000 iterations
- **Supported cookie flags:** Secure, HttpOnly, SameSite (Strict/Lax/None)
- **Storage location:** `chrome.storage.local` (sandboxed per browser profile)

---

## 🔧 Tech Stack

| Category | Technology | Purpose |
|----------|-----------|---------|
| **Manifest** | Manifest V3 | Latest Chrome extension standard |
| **Frontend** | HTML5, CSS3 | UI structure and styling |
| **JavaScript** | Vanilla JS (no frameworks) | Logic, minimal footprint |
| **APIs** | `chrome.cookies`, `chrome.tabs`, `chrome.storage.local`, `chrome.runtime` | Core extension functionality |
| **Encryption** | Web Crypto API | AES-256-GCM encryption |
| **Parsing** | Built-in JS | JSON, Header string, Netscape formats |

**Browser Support:**
- ✅ Google Chrome (v88+)
- ✅ Microsoft Edge (v88+)
- ✅ Brave Browser
- ✅ Opera (with Chromium)

---

## 📂 Project Structure

```
advanced-cookie-manager/
├── manifest.json                 # Extension configuration (Manifest V3)
├── background.js                 # Service worker (messaging, hashing, timers)
│
├── popup/
│   ├── popup.html               # Main UI structure
│   ├── popup.css                # Glassmorphism styling & themes
│   └── popup.js                 # UI logic and event handlers
│
├── utils/
│   ├── storage.js               # Chrome storage.local wrapper
│   ├── cookieParser.js          # JSON & Header string parsing
│   ├── netscapeParser.js        # Netscape format import/export
│   └── crypto.js                # AES-256-GCM encryption/decryption
│
├── icons/
│   ├── icon16.png               # Extension toolbar icon (16x16)
│   ├── icon48.png               # Extension menu icon (48x48)
│   ├── icon128.png              # Chrome Web Store icon (128x128)
│   └── README.md                # Icon generation instructions
│
└── README.md                     # This file
```

---

## 🗺️ Roadmap

### Current (v1.1.0)
- ✅ Core cookie CRUD operations
- ✅ Multi-format import/export (JSON, Header, Netscape)
- ✅ AES-256-GCM encryption with PBKDF2
- ✅ Password protection & auto-lock
- ✅ Glassmorphism UI with dark/light themes
- ✅ Search, filter, and sort capabilities

### Planned (v1.2.0)
- [ ] Cookie editing history / undo-redo
- [ ] Bulk cookie operations (select multiple)
- [ ] CSV export format support
- [ ] Cookie regex search
- [ ] Keyboard shortcuts
- [ ] Cookie value preview tooltip

### Future Enhancements (v2.0.0)
- [ ] Cloud backup with encryption
- [ ] Cookie sync across devices
- [ ] Advanced cookie analytics
- [ ] Custom cookie templates
- [ ] API for third-party integrations
- [ ] Firefox & Safari support

---

## 🤝 Contributing

We welcome contributions from the community! Here's how:

1. **Fork** the repository on GitHub
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Make** your changes with clear commits
4. **Test** thoroughly in Chrome/Edge
5. **Push** to your fork: `git push origin feature/amazing-feature`
6. **Open a Pull Request** with a detailed description

**Ideas for contributions:**
- Additional export/import formats (CSV, XML)
- Enhanced cookie analytics
- Better accessibility (ARIA labels)
- Performance optimizations
- Localization/translations
- Custom icon sets
- Bug fixes and documentation

**Code Style:**
- Use vanilla JavaScript (no frameworks/libraries)
- Follow existing code patterns in the repo
- Test in multiple browsers if possible
- Document complex functions with comments

---

## 💬 Support

### Getting Help

- **Issues** — Report bugs or request features via [GitHub Issues](https://github.com/dominhduy09/advanced-cookie-manager/issues)
- **Discussions** — Ask questions in [GitHub Discussions](https://github.com/dominhduy09/advanced-cookie-manager/discussions)
- **Email** — Contact: dominhduy09@gmail.com

### Troubleshooting

| Issue | Solution |
|-------|----------|
| **Extension won't load** | Enable Developer Mode at `chrome://extensions/`; check console for errors |
| **Cookies not showing** | Ensure you're on a web page (not `chrome://`); toggle "All Domains" |
| **Password locked out** | Remove and reinstall extension; contact support for recovery |
| **Import fails** | Verify format matches selection; check JSON syntax; ensure tabs in Netscape format |
| **Icons missing** | Create PNG files (16x16, 48x48, 128x128) in `icons/` folder |

---

## 👤 Author

**Minh Duy Do**
- GitHub: [@dominhduy09](https://github.com/dominhduy09)
- Email: dominhduy09@gmail.com

---

## 📜 License

This project is licensed under the **MIT License** — see [LICENSE](LICENSE) file for details.

**TL;DR:** You're free to use, modify, and distribute this project, including commercially, as long as you include the original copyright and license notice.

---

## 🙏 Acknowledgments

- **Design Inspiration** — Glassmorphism UI trends and modern browser extensions
- **Chrome Extension Best Practices** — Manifest V3 documentation and examples
- **Security** — Web Crypto API and OWASP guidelines for password handling
- **Community** — Thanks to all contributors and users providing feedback

---

<div align="center">

---

**Made with 🍪 and ❤️ by the Advanced Cookie Manager**

*Manage your cookies like a pro. Enjoy! 🎉*

[⬆ Back to Top](#-advanced-cookie-manager)

</div>
