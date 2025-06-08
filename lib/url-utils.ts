/**
 * Utility functions for URL handling and formatting
 */

/**
 * Ensures a URL has the proper https:// protocol prefix.
 * Prevents double https:// if the URL already includes a protocol.
 * 
 * @param url - The URL to format
 * @returns A properly formatted URL with https:// protocol
 * 
 * @example
 * ensureHttpsProtocol('example.com') // Returns 'https://example.com'
 * ensureHttpsProtocol('https://example.com') // Returns 'https://example.com'
 * ensureHttpsProtocol('http://example.com') // Returns 'http://example.com'
 */
export function ensureHttpsProtocol(url: string): string {
  if (!url) return '';
  
  // If URL already has any protocol, return as-is
  if (url.includes('://')) {
    return url;
  }
  
  // Add https:// if no protocol is present
  return `https://${url}`;
}

/**
 * Formats a URL for display, removing protocol if desired for cleaner display
 * 
 * @param url - The URL to format for display
 * @param removeProtocol - Whether to remove the protocol for display
 * @returns A formatted URL string for display
 * 
 * @example
 * formatUrlForDisplay('https://example.com') // Returns 'https://example.com'
 * formatUrlForDisplay('https://example.com', true) // Returns 'example.com'
 */
export function formatUrlForDisplay(url: string, removeProtocol: boolean = false): string {
  if (!url) return '';
  
  if (removeProtocol) {
    return url.replace(/^https?:\/\//, '');
  }
  
  return url;
}

/**
 * Validates if a string is a valid URL
 * 
 * @param url - The URL string to validate
 * @returns True if the URL is valid, false otherwise
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(ensureHttpsProtocol(url));
    return true;
  } catch {
    return false;
  }
}
