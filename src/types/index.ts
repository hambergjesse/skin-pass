export enum ErrorCategory {
  VALIDATION = 'VALIDATION',
  CONVERSION = 'CONVERSION',
  SECURITY = 'SECURITY',
  NETWORK = 'NETWORK',
  UNKNOWN = 'UNKNOWN'
}

export interface InspectLink {
  url: string;
  isValid: boolean;
  uniqueId: string;
  normalizedUrl: string;
  validationErrors: string[];
}

export interface PasswordResult {
  password: string;
  strength: number;
  entropy: number;
  isDeterministic: boolean;
  securityChecks: SecurityCheck[];
  warnings: string[];
}

export interface SecurityCheck {
  name: string;
  passed: boolean;
  details: string;
}

export interface PasswordOptions {
  minLength: number;
  requireSpecialChars: boolean;
  minEntropy: number;
  deterministic: boolean;
  salt: string;
  iterations: number;
}

export interface SecurityConfig {
  minPasswordLength: number;
  minEntropy: number;
  requiredSpecialChars: boolean;
  hashIterations: number;
  saltLength: number;
  maxUrlLength: number;
  allowedProtocols: string[];
  allowedDomains: string[];
  rateLimit: {
    maxAttempts: number;
    timeWindow: number;
  };
  passwordRequirements: {
    minLowercase: number;
    minUppercase: number;
    minNumbers: number;
    minSpecial: number;
    maxRepeatedChars: number;
    maxSequentialChars: number;
  };
  memorySecurity: {
    clearInterval: number;
    wipeMemory: boolean;
    secureAllocation: boolean;
    memoryProtection: boolean;
  };
  browserSecurity: {
    preventExtensions: boolean;
    secureClipboard: boolean;
    domProtection: boolean;
  };
}

export interface MemorySecurity {
  clearSensitiveData: (data: string) => void;
  secureClear: (array: Uint8Array) => void;
  clearAfterTimeout: (data: string, timeout: number) => void;
}

export enum ErrorType {
  INVALID_INPUT = 'INVALID_INPUT',
  ENCRYPTION_ERROR = 'ENCRYPTION_ERROR',
  DECRYPTION_ERROR = 'DECRYPTION_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  RATE_LIMIT = 'RATE_LIMIT',
  UNKNOWN = 'UNKNOWN'
} 