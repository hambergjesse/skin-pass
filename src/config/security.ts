import { SecurityConfig } from '../types';

export const securityConfig: SecurityConfig = {
  minPasswordLength: 16,
  minEntropy: 100,
  requiredSpecialChars: true,
  hashIterations: 20000,
  saltLength: 64,
  maxUrlLength: 2048,
  allowedProtocols: ['steam:'],
  allowedDomains: ['steamcommunity.com'],
  rateLimit: {
    maxAttempts: 3,
    timeWindow: 60 * 1000, // 1 minute
  },
  passwordRequirements: {
    minLowercase: 4,
    minUppercase: 4,
    minNumbers: 3,
    minSpecial: 2,
    maxRepeatedChars: 2,
    maxSequentialChars: 2,
  },
  memorySecurity: {
    clearInterval: 3000,
    wipeMemory: true,
    secureAllocation: true,
    memoryProtection: true,
  },
  browserSecurity: {
    preventExtensions: true,
    secureClipboard: true,
    domProtection: true,
  },
};

export const characterSets = {
  // Basic character sets that are universally accepted
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numbers: '0123456789',
  // Common special characters that are accepted by most systems
  special: '!@#$%^&*()_+-=[]{}|;:,.<>?',
  // Remove extended special and unicode as they may cause compatibility issues
};

export const securityHeaders = {
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';",
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
  'Pragma': 'no-cache',
  'Expires': '0',
};

export const memorySecurity = {
  clearSensitiveData: (data: string): void => {
    const randomData = new Uint8Array(data.length);
    for (let i = 0; i < 3; i++) {
      crypto.getRandomValues(randomData);
      data = randomData.toString();
    }
  },

  secureClear: (array: Uint8Array): void => {
    for (let i = 0; i < 3; i++) {
      crypto.getRandomValues(array);
      array.fill(0);
    }
  },

  clearAfterTimeout: (data: string, timeout: number): void => {
    setTimeout(() => {
      memorySecurity.clearSensitiveData(data);
    }, timeout);
  },

  secureAllocation: (size: number): Uint8Array => {
    const array = new Uint8Array(size);
    crypto.getRandomValues(array);
    return array;
  },

  protectMemory: (data: string): string => {
    const encoder = new TextEncoder();
    const dataArray = encoder.encode(data);
    const protectedArray = memorySecurity.secureAllocation(dataArray.length);
    protectedArray.set(dataArray);
    return new TextDecoder().decode(protectedArray);
  },
};

export const browserSecurity = {
  preventExtensionAccess: (): boolean => {
    try {
      // Modern extension detection methods
      const hasExtensions = [
        // Chrome/Edge extensions
        typeof (window as any).chrome !== 'undefined' && 
          ((window as any).chrome.runtime || (window as any).chrome.webstore),
        // Firefox extensions (modern method)
        typeof (window as any).browser !== 'undefined' && 
          (window as any).browser.runtime,
        // Safari extensions
        typeof (window as any).safari !== 'undefined' && 
          (window as any).safari.extension,
        // Check for common extension APIs
        typeof (window as any).browserAction !== 'undefined' ||
        typeof (window as any).extension !== 'undefined' ||
        typeof (window as any).addon !== 'undefined',
        // Check for extension-specific CSS
        document.documentElement.matches(':-moz-any-link, :-webkit-any-link, :-ms-any-link')
      ].some(Boolean);

      return !hasExtensions;
    } catch (e) {
      // If we can't detect extensions, assume they might be present
      return false;
    }
  },

  secureClipboard: async (text: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(text);
      setTimeout(async () => {
        await navigator.clipboard.writeText('');
      }, 5000);
    } catch (e) {
      console.error('Clipboard access denied');
    }
  },

  protectDOM: (): void => {
    try {
      // Use more modern and safer DOM protection methods
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList' || mutation.type === 'attributes') {
            // Prevent unauthorized DOM modifications
            if (mutation.target instanceof HTMLElement) {
              const element = mutation.target as HTMLElement;
              if (element.id === 'password-display' || element.classList.contains('password-field')) {
                // Allow modifications to password-related elements
                return;
              }
              // Prevent other modifications
              mutation.target.dispatchEvent(new Event('security-violation'));
            }
          }
        });
      });

      // Observe the document body for changes
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['class', 'id', 'style']
      });

      // Add event listener for security violations
      document.addEventListener('security-violation', (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.warn('Security violation detected: Unauthorized DOM modification');
      });
    } catch (e) {
      console.error('DOM protection failed:', e);
    }
  },
}; 