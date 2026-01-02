/**
 * Netscape Cookie File Format Parser
 * Handles parsing and formatting cookies in Netscape format
 */

const NetscapeParser = {
  /**
   * Parse Netscape cookie file format
   * Format: domain flag path secure expiration name value
   * @param {string} content - Netscape format content
   * @returns {Array<object>} Parsed cookies array
   */
  parse: (content) => {
    try {
      const cookies = [];
      const lines = content.split('\n');
      
      for (const line of lines) {
        // Skip comments and empty lines
        if (!line.trim() || line.trim().startsWith('#')) {
          continue;
        }
        
        // Split by tab, but also handle multiple spaces/tabs
        const parts = line.trim().split(/\t+/);
        
        // Netscape format requires at least 7 fields
        if (parts.length < 7) {
          // Try splitting by whitespace if tab splitting didn't work
          const spaceParts = line.trim().split(/\s+/);
          if (spaceParts.length >= 7) {
            parts.length = 0;
            parts.push(...spaceParts);
          } else {
            continue;
          }
        }
        
        const [domain, flag, path, secure, expiration, name, ...valueParts] = parts;
        const value = valueParts.join('\t'); // Rejoin in case value contained tabs
        
        // Validate required fields
        if (!domain || !name) {
          continue;
        }
        
        // Convert expiration timestamp to seconds (Chrome uses seconds)
        const expirationDate = parseInt(expiration);
        
        cookies.push({
          name: name.trim(),
          value: value || '',
          domain: domain.trim(),
          path: path || '/',
          secure: secure && secure.toUpperCase() === 'TRUE',
          httpOnly: false, // Netscape format doesn't support httpOnly
          sameSite: 'no_restriction',
          expirationDate: !isNaN(expirationDate) && expirationDate > 0 ? expirationDate : null
        });
      }
      
      if (cookies.length === 0) {
        throw new Error('No valid cookies found in Netscape format');
      }
      
      return cookies;
    } catch (error) {
      throw new Error(`Invalid Netscape format: ${error.message}`);
    }
  },

  /**
   * Convert cookies array to Netscape format
   * @param {Array<object>} cookies - Cookies array
   * @returns {string} Netscape format string
   */
  stringify: (cookies) => {
    let output = '# Netscape HTTP Cookie File\n';
    output += '# This is a generated file! Do not edit.\n';
    output += '# https://curl.haxx.se/rfc/cookie_spec.html\n\n';
    
    for (const cookie of cookies) {
      // Skip cookies without required fields
      if (!cookie.name) {
        continue;
      }
      
      // Domain (use .domain.com format if no domain specified)
      const domain = cookie.domain || '.localhost';
      
      // Domain flag (TRUE if domain starts with ., FALSE otherwise)
      const flag = domain.startsWith('.') ? 'TRUE' : 'FALSE';
      
      // Path
      const path = cookie.path || '/';
      
      // Secure flag
      const secure = cookie.secure ? 'TRUE' : 'FALSE';
      
      // Expiration date (0 for session cookies)
      const expiration = cookie.expirationDate || 0;
      
      // Value (handle empty values)
      const value = cookie.value !== undefined && cookie.value !== null ? cookie.value : '';
      
      // Format: domain flag path secure expiration name value
      output += `${domain}\t${flag}\t${path}\t${secure}\t${expiration}\t${cookie.name}\t${value}\n`;
    }
    
    return output;
  },

  /**
   * Validate Netscape format content
   * @param {string} content - Content to validate
   * @returns {boolean} Is valid
   */
  validate: (content) => {
    try {
      const lines = content.split('\n');
      let hasValidCookie = false;
      
      for (const line of lines) {
        if (!line.trim() || line.trim().startsWith('#')) {
          continue;
        }
        
        const parts = line.trim().split('\t');
        if (parts.length === 7) {
          hasValidCookie = true;
          break;
        }
      }
      
      return hasValidCookie;
    } catch (error) {
      return false;
    }
  }
};
