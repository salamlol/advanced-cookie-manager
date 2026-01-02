/**
 * Crypto Utility
 * Handles encryption and decryption of cookie data using AES-GCM
 */

const CryptoUtil = {
  /**
   * Derive a key from password using PBKDF2
   * @param {string} password - User password
   * @param {Uint8Array} salt - Salt for key derivation
   * @returns {Promise<CryptoKey>} Derived key
   */
  deriveKey: async (password, salt) => {
    const encoder = new TextEncoder();
    const passwordBuffer = encoder.encode(password);
    
    // Import password as key material
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      passwordBuffer,
      { name: 'PBKDF2' },
      false,
      ['deriveBits', 'deriveKey']
    );
    
    // Derive actual encryption key
    return await crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: salt,
        iterations: 100000,
        hash: 'SHA-256'
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt']
    );
  },

  /**
   * Encrypt data with password
   * @param {string} data - Data to encrypt
   * @param {string} password - Encryption password
   * @returns {Promise<string>} Encrypted data (base64 encoded)
   */
  encrypt: async (data, password) => {
    if (!password || !data) {
      throw new Error('Password and data are required');
    }

    try {
      const encoder = new TextEncoder();
      const dataBuffer = encoder.encode(data);
      
      // Generate random salt and IV
      const salt = crypto.getRandomValues(new Uint8Array(16));
      const iv = crypto.getRandomValues(new Uint8Array(12));
      
      // Derive key from password
      const key = await CryptoUtil.deriveKey(password, salt);
      
      // Encrypt data
      const encryptedBuffer = await crypto.subtle.encrypt(
        {
          name: 'AES-GCM',
          iv: iv
        },
        key,
        dataBuffer
      );
      
      // Combine salt + iv + encrypted data
      const encryptedArray = new Uint8Array(encryptedBuffer);
      const combined = new Uint8Array(salt.length + iv.length + encryptedArray.length);
      combined.set(salt, 0);
      combined.set(iv, salt.length);
      combined.set(encryptedArray, salt.length + iv.length);
      
      // Convert to base64
      return btoa(String.fromCharCode.apply(null, combined));
    } catch (error) {
      throw new Error('Encryption failed: ' + error.message);
    }
  },

  /**
   * Decrypt data with password
   * @param {string} encryptedData - Encrypted data (base64 encoded)
   * @param {string} password - Decryption password
   * @returns {Promise<string>} Decrypted data
   */
  decrypt: async (encryptedData, password) => {
    if (!password || !encryptedData) {
      throw new Error('Password and encrypted data are required');
    }

    try {
      // Decode base64
      const combined = new Uint8Array(
        atob(encryptedData).split('').map(c => c.charCodeAt(0))
      );
      
      // Extract salt, iv, and encrypted data
      const salt = combined.slice(0, 16);
      const iv = combined.slice(16, 28);
      const encryptedBuffer = combined.slice(28);
      
      // Derive key from password
      const key = await CryptoUtil.deriveKey(password, salt);
      
      // Decrypt data
      const decryptedBuffer = await crypto.subtle.decrypt(
        {
          name: 'AES-GCM',
          iv: iv
        },
        key,
        encryptedBuffer
      );
      
      // Convert to string
      const decoder = new TextDecoder();
      return decoder.decode(decryptedBuffer);
    } catch (error) {
      throw new Error('Decryption failed: Wrong password or corrupted data');
    }
  },

  /**
   * Check if data appears to be encrypted
   * @param {string} data - Data to check
   * @returns {boolean} True if appears to be encrypted
   */
  isEncrypted: (data) => {
    try {
      // Try to parse as JSON first
      JSON.parse(data);
      return false; // Valid JSON, probably not encrypted
    } catch {
      // Check if it looks like base64
      const base64Regex = /^[A-Za-z0-9+/]+=*$/;
      return base64Regex.test(data.trim()) && data.length > 50;
    }
  }
};
