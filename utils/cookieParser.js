/**
 * Cookie Parser Utility
 * Handles parsing and formatting cookies in various formats
 */

const CookieParser = {
  /**
   * Parse JSON format cookies
   * @param {string} jsonString - JSON string containing cookies
   * @returns {Array<object>} Parsed cookies array
   */
  parseJSON: (jsonString) => {
    try {
      const data = JSON.parse(jsonString);
      // Handle both single object and array
      const cookies = Array.isArray(data) ? data : [data];
      
      // Validate each cookie
      return cookies.map(cookie => {
        if (!cookie.name || !cookie.value) {
          throw new Error('Each cookie must have name and value');
        }
        return {
          name: cookie.name,
          value: cookie.value,
          domain: cookie.domain || '',
          path: cookie.path || '/',
          secure: cookie.secure || false,
          httpOnly: cookie.httpOnly || false,
          sameSite: cookie.sameSite || 'no_restriction',
          expirationDate: cookie.expirationDate || null
        };
      });
    } catch (error) {
      throw new Error(`Invalid JSON format: ${error.message}`);
    }
  },

  /**
   * Parse header string format (key1=value1; key2=value2)
   * @param {string} headerString - Cookie header string
   * @returns {Array<object>} Parsed cookies array
   */
  parseHeader: (headerString) => {
    try {
      const cookies = [];
      const pairs = headerString.split(';').map(s => s.trim()).filter(s => s);
      
      for (const pair of pairs) {
        const equalIndex = pair.indexOf('=');
        
        if (equalIndex === -1) {
          // Cookie without value (name only)
          cookies.push({
            name: pair.trim(),
            value: '',
            domain: '',
            path: '/',
            secure: false,
            httpOnly: false,
            sameSite: 'no_restriction',
            expirationDate: null
          });
        } else {
          const name = pair.substring(0, equalIndex).trim();
          const value = pair.substring(equalIndex + 1); // Don't trim value, preserve spaces
          
          if (!name) {
            continue; // Skip invalid cookies with no name
          }
          
          cookies.push({
            name: name,
            value: value,
            domain: '',
            path: '/',
            secure: false,
            httpOnly: false,
            sameSite: 'no_restriction',
            expirationDate: null
          });
        }
      }
      
      if (cookies.length === 0) {
        throw new Error('No valid cookies found');
      }
      
      return cookies;
    } catch (error) {
      throw new Error(`Invalid header format: ${error.message}`);
    }
  },

  /**
   * Convert cookies array to JSON string
   * @param {Array<object>} cookies - Cookies array
   * @returns {string} JSON string
   */
  toJSON: (cookies) => {
    return JSON.stringify(cookies, null, 2);
  },

  /**
   * Convert cookies array to header string
   * @param {Array<object>} cookies - Cookies array
   * @returns {string} Header string
   */
  toHeader: (cookies) => {
    return cookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; ');
  },

  /**
   * Validate cookie object
   * @param {object} cookie - Cookie object to validate
   * @returns {boolean} Is valid
   */
  validate: (cookie) => {
    if (!cookie.name || typeof cookie.name !== 'string') {
      return false;
    }
    if (cookie.value === undefined || cookie.value === null) {
      return false;
    }
    return true;
  },

  /**
   * Normalize cookie object for chrome.cookies API
   * @param {object} cookie - Cookie object
   * @param {string} url - URL for the cookie
   * @returns {object} Normalized cookie
   */
  normalizeCookie: (cookie, url) => {
    const normalized = {
      url: url,
      name: cookie.name,
      value: String(cookie.value),
      path: cookie.path || '/',
      secure: cookie.secure || false,
      httpOnly: cookie.httpOnly || false,
      sameSite: cookie.sameSite || 'no_restriction'
    };

    // Add domain if specified
    if (cookie.domain) {
      normalized.domain = cookie.domain;
    }

    // Add expiration date if specified
    if (cookie.expirationDate) {
      normalized.expirationDate = cookie.expirationDate;
    }

    return normalized;
  }
};
