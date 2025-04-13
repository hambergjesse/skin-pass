import { securityConfig } from '../config/security';

export class KeyManager {
  private static instance: KeyManager;
  private keyCache: Map<string, CryptoKey> = new Map();
  private readonly keyLifetime = 5 * 60 * 1000; // 5 minutes

  private constructor() {
    // Private constructor for singleton
  }

  public static getInstance(): KeyManager {
    if (!KeyManager.instance) {
      KeyManager.instance = new KeyManager();
    }
    return KeyManager.instance;
  }

  private async deriveKeyFromPassword(password: string, salt: Uint8Array): Promise<CryptoKey> {
    const encoder = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      encoder.encode(password),
      'PBKDF2',
      false,
      ['deriveBits', 'deriveKey']
    );

    return crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt,
        iterations: securityConfig.hashIterations,
        hash: 'SHA-256'
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt']
    );
  }

  public async getKey(password: string, salt: Uint8Array): Promise<CryptoKey> {
    const cacheKey = `${password}-${Array.from(salt).join(',')}`;
    
    // Check if we have a cached key
    const cachedKey = this.keyCache.get(cacheKey);
    if (cachedKey) {
      return cachedKey;
    }

    // Derive new key
    const key = await this.deriveKeyFromPassword(password, salt);
    
    // Cache the key
    this.keyCache.set(cacheKey, key);
    
    // Set up cleanup
    setTimeout(() => {
      this.keyCache.delete(cacheKey);
    }, this.keyLifetime);

    return key;
  }

  public clearCache(): void {
    this.keyCache.clear();
  }
} 