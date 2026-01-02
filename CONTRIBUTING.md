# Contributing to Advanced Cookie Manager

Thank you for your interest in contributing to **Advanced Cookie Manager** 🍪
We welcome contributions that improve functionality, security, performance, usability, and documentation.

This project prioritizes **security, clarity, and developer experience**, so please read the guidelines below before contributing.

---

## 📌 Project Principles

When contributing, please keep these principles in mind:

* 🔐 **Security first** — cookies and credentials are sensitive
* ⚡ **Performance matters** — keep the extension lightweight
* 🧼 **Clean UI** — minimal, glassmorphism-based, distraction-free
* 🧩 **Vanilla JavaScript only** — no frameworks or external libraries
* 📦 **Manifest V3 compliant**

---

## 🐛 Reporting Bugs

If you discover a bug:

1. Check existing **Issues** to avoid duplicates
2. Open a new issue and include:

   * Clear description of the problem
   * Steps to reproduce
   * Expected vs actual behavior
   * Browser name & version (Chrome / Edge / Brave / Opera)
   * Screenshots or console errors (if applicable)

⚠️ **Security-related issues** should be reported responsibly.
If the issue involves encryption, password handling, or sensitive data, please describe it clearly and responsibly.

---

## 💡 Feature Requests

Feature suggestions are welcome!

Please open an issue with:

* A clear explanation of the feature
* The problem it solves
* Why it fits an **advanced cookie management** tool
* UI mockups or examples (optional but encouraged)

Examples of good feature requests:

* New import/export formats
* Accessibility improvements
* Performance optimizations
* Developer tooling enhancements

---

## 🧑‍💻 Code Contributions

### 1️⃣ Fork & Clone

```bash
git clone https://github.com/your-username/advanced-cookie-manager.git
cd advanced-cookie-manager
```

---

### 2️⃣ Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
```

---

### 3️⃣ Development Guidelines

Please follow these rules:

#### Code Style

* Use **modern ES6+ JavaScript**
* Prefer readability over clever tricks
* Use meaningful variable and function names
* Comment complex logic (especially crypto-related code)

#### Security Rules (Very Important 🔐)

* Do **NOT** weaken encryption or password handling
* Do **NOT** log sensitive data (cookies, passwords, keys)
* Use **Web Crypto API** only for cryptographic operations
* Maintain:

  * AES-256-GCM
  * PBKDF2 (100,000 iterations)
  * Secure random salt & IV generation

#### UI Guidelines

* Maintain glassmorphism design
* Keep animations subtle and performant
* Ensure dark/light theme compatibility
* Avoid clutter and unnecessary UI elements

---

### 4️⃣ Test Locally

Before submitting a PR, test thoroughly:

1. Open `chrome://extensions`
2. Enable **Developer Mode**
3. Click **Load unpacked**
4. Select the project directory
5. Verify:

   * Cookie CRUD operations
   * Import/export (JSON, Header, Netscape)
   * Encryption & decryption
   * Password lock & auto-lock
   * UI responsiveness and theme switching

---

### 5️⃣ Commit & Push

Use clear, conventional commit messages:

```bash
git commit -m "feat: add CSV export support"
git commit -m "fix: handle invalid Netscape cookie format"
git commit -m "docs: improve encryption documentation"
```

Push your branch:

```bash
git push origin feature/your-feature-name
```

---

### 6️⃣ Open a Pull Request

Your Pull Request should include:

* What was changed
* Why it was changed
* Any security considerations
* Screenshots or GIFs for UI changes

PRs may be requested to revise before merging — this is normal and helps maintain quality 👍

---

## 📂 What You Can Contribute

We especially welcome contributions in these areas:

* 📤 Additional import/export formats (CSV, XML)
* 🔍 Better cookie search & filtering
* ♿ Accessibility improvements (ARIA, keyboard navigation)
* ⚡ Performance optimizations
* 🌍 Localization / translations
* 🧪 Additional test cases
* 📚 Documentation improvements

---

## 🤝 Code of Conduct

Be respectful, inclusive, and constructive.

Harassment, discrimination, or abusive behavior will not be tolerated.
Maintain a professional and welcoming environment for everyone.

---

## 🙏 Thank You

Your contribution helps developers and power users manage cookies **securely and efficiently**.

Happy hacking 🍪🚀
— *Advanced Cookie Manager Team*
