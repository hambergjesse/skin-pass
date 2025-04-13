import { characterSets, securityConfig, memorySecurity, browserSecurity } from '../config/security';
import { InspectLink, PasswordResult, SecurityCheck } from '../types';

const calculateEntropy = (password: string): number => {
  // Calculate the size of the character set used in the password
  const charSetSize = 
    (password.match(/[a-z]/) ? characterSets.lowercase.length : 0) +
    (password.match(/[A-Z]/) ? characterSets.uppercase.length : 0) +
    (password.match(/[0-9]/) ? characterSets.numbers.length : 0) +
    (password.match(/[^a-zA-Z0-9]/) ? characterSets.special.length : 0);

  // Calculate entropy using the formula: log2(charSetSize) * passwordLength
  return Math.log2(charSetSize) * password.length;
};

const checkPasswordRequirements = (password: string): SecurityCheck[] => {
  const { passwordRequirements } = securityConfig;
  const checks: SecurityCheck[] = [];

  // Check minimum character requirements
  const lowercaseCount = (password.match(/[a-z]/g) || []).length;
  const uppercaseCount = (password.match(/[A-Z]/g) || []).length;
  const numbersCount = (password.match(/[0-9]/g) || []).length;
  const specialCount = (password.match(/[^a-zA-Z0-9]/g) || []).length;

  checks.push({
    name: 'Lowercase Characters',
    passed: lowercaseCount >= passwordRequirements.minLowercase,
    details: `Found ${lowercaseCount} lowercase characters (minimum: ${passwordRequirements.minLowercase})`,
  });

  checks.push({
    name: 'Uppercase Characters',
    passed: uppercaseCount >= passwordRequirements.minUppercase,
    details: `Found ${uppercaseCount} uppercase characters (minimum: ${passwordRequirements.minUppercase})`,
  });

  checks.push({
    name: 'Numbers',
    passed: numbersCount >= passwordRequirements.minNumbers,
    details: `Found ${numbersCount} numbers (minimum: ${passwordRequirements.minNumbers})`,
  });

  checks.push({
    name: 'Special Characters',
    passed: specialCount >= passwordRequirements.minSpecial,
    details: `Found ${specialCount} special characters (minimum: ${passwordRequirements.minSpecial})`,
  });

  // Check for repeated characters
  const repeatedChars = password.match(/(.)\1+/g) || [];
  const maxRepeated = Math.max(...repeatedChars.map(s => s.length));
  checks.push({
    name: 'Repeated Characters',
    passed: maxRepeated <= passwordRequirements.maxRepeatedChars,
    details: `Maximum repeated characters: ${maxRepeated} (maximum allowed: ${passwordRequirements.maxRepeatedChars})`,
  });

  // Check for sequential characters using the actual character sets
  let maxSequential = 0;
  for (let i = 0; i < password.length - 1; i++) {
    const current = password[i];
    const next = password[i + 1];
    
    // Check sequential characters in each character set
    const checkSequential = (set: string) => {
      const currentIndex = set.indexOf(current);
      const nextIndex = set.indexOf(next);
      if (currentIndex !== -1 && nextIndex !== -1 && Math.abs(currentIndex - nextIndex) === 1) {
        maxSequential = Math.max(maxSequential, 2);
        if (i < password.length - 2) {
          const nextNext = password[i + 2];
          const nextNextIndex = set.indexOf(nextNext);
          if (nextNextIndex !== -1 && Math.abs(nextIndex - nextNextIndex) === 1) {
            maxSequential = Math.max(maxSequential, 3);
          }
        }
      }
    };

    checkSequential(characterSets.lowercase);
    checkSequential(characterSets.uppercase);
    checkSequential(characterSets.numbers);
  }

  checks.push({
    name: 'Sequential Characters',
    passed: maxSequential <= passwordRequirements.maxSequentialChars,
    details: `Maximum sequential characters: ${maxSequential} (maximum allowed: ${passwordRequirements.maxSequentialChars})`,
  });

  return checks;
};

const performSecurityChecks = (password: string): SecurityCheck[] => {
  const basicChecks: SecurityCheck[] = [
    {
      name: 'Length Check',
      passed: password.length >= securityConfig.minPasswordLength,
      details: `Password length: ${password.length} (minimum: ${securityConfig.minPasswordLength})`,
    },
    {
      name: 'Entropy Check',
      passed: calculateEntropy(password) >= securityConfig.minEntropy,
      details: `Password entropy: ${calculateEntropy(password).toFixed(2)} (minimum: ${securityConfig.minEntropy})`,
    },
    {
      name: 'Character Diversity',
      passed: new Set(password).size >= Math.min(password.length, 8),
      details: `Unique characters: ${new Set(password).size}`,
    },
  ];

  const requirementChecks = checkPasswordRequirements(password);
  return [...basicChecks, ...requirementChecks];
};

const normalizeUrl = (url: string): string => {
  try {
    const normalized = new URL(url);
    return normalized.toString();
  } catch {
    return url;
  }
};

const extractUniqueId = (url: string): string => {
  // Match the pattern for CS2 skin inspect links
  // Example: steam://rungame/730/76561202255233023/+csgo_econ_action_preview%20S76561198144091202A40446467891D5630817826245312529
  const match = url.match(/S(\d+)A(\d+)D(\d+)/);
  if (match) {
    // Combine the matched groups to form a unique identifier
    return `${match[1]}-${match[2]}-${match[3]}`;
  }
  return '';
};

const validateInspectLink = (url: string): InspectLink => {
  if (typeof url !== 'string') {
    return {
      url: '',
      isValid: false,
      uniqueId: '',
      normalizedUrl: '',
      validationErrors: ['URL must be a string'],
    };
  }

  const normalizedUrl = normalizeUrl(url);
  const uniqueId = extractUniqueId(normalizedUrl);
  const validationErrors: string[] = [];

  if (url.length > securityConfig.maxUrlLength) {
    validationErrors.push(`URL exceeds maximum length of ${securityConfig.maxUrlLength} characters`);
  }

  if (!normalizedUrl.startsWith('steam:')) {
    validationErrors.push('URL must start with steam: protocol');
  }

  if (!normalizedUrl.includes('csgo_econ_action_preview')) {
    validationErrors.push('URL must be a CS2 skin inspect link');
  }

  if (!uniqueId) {
    validationErrors.push('Could not extract unique identifier from URL. Please ensure you are using a valid CS2 skin inspect link.');
  }

  // Sanitize input
  const sanitizedUrl = normalizedUrl.replace(/[^\w\s\-.:/]/g, '');

  return {
    url: sanitizedUrl,
    isValid: validationErrors.length === 0,
    uniqueId,
    normalizedUrl: sanitizedUrl,
    validationErrors,
  };
};

const generatePassword = async (link: InspectLink): Promise<PasswordResult> => {
  if (!link.isValid) {
    throw new Error('Invalid inspect link');
  }

  // Check browser security
  let securityWarnings: string[] = [];
  if (securityConfig.browserSecurity.preventExtensions && !browserSecurity.preventExtensionAccess()) {
    securityWarnings.push('Browser extensions detected. For maximum security, please consider using a private/incognito window or temporarily disabling extensions.');
  }

  // Protect DOM
  if (securityConfig.browserSecurity.domProtection) {
    browserSecurity.protectDOM();
  }

  // Create deterministic hash from the link only
  const encoder = new TextEncoder();
  const linkHash = await crypto.subtle.digest(
    'SHA-256',
    encoder.encode(link.normalizedUrl)
  );
  const hashArray = Array.from(new Uint8Array(linkHash));

  // Initialize character pools with only common characters
  const pools = {
    lowercase: characterSets.lowercase,
    uppercase: characterSets.uppercase,
    numbers: characterSets.numbers,
    special: characterSets.special,
  };

  // Calculate minimum required characters for each type
  const minLength = Math.max(16, securityConfig.minPasswordLength);
  const minLowercase = Math.max(4, Math.floor(minLength * 0.3));
  const minUppercase = Math.max(4, Math.floor(minLength * 0.3));
  const minNumbers = Math.max(3, Math.floor(minLength * 0.2));
  const minSpecial = Math.max(2, Math.floor(minLength * 0.2));
  
  // Create an array of required characters
  const requiredChars: string[] = [];
  
  // Generate required characters for each type
  const generateChars = (pool: string, count: number, offset: number) => {
    for (let i = 0; i < count; i++) {
      const index = hashArray[i + offset] % pool.length;
      requiredChars.push(pool[index]);
    }
  };

  // Generate all required characters
  generateChars(pools.lowercase, minLowercase, 0);
  generateChars(pools.uppercase, minUppercase, minLowercase);
  generateChars(pools.numbers, minNumbers, minLowercase + minUppercase);
  generateChars(pools.special, minSpecial, minLowercase + minUppercase + minNumbers);
  
  // Fill remaining positions with random character types
  const remainingLength = minLength - requiredChars.length;
  for (let i = 0; i < remainingLength; i++) {
    const charType = hashArray[i + minLength] % 4;
    let pool: string;
    switch (charType) {
      case 0: pool = pools.lowercase; break;
      case 1: pool = pools.uppercase; break;
      case 2: pool = pools.numbers; break;
      case 3: pool = pools.special; break;
      default: pool = pools.lowercase;
    }
    const index = hashArray[i] % pool.length;
    requiredChars.push(pool[index]);
  }

  // Shuffle the characters using Fisher-Yates algorithm
  for (let i = requiredChars.length - 1; i > 0; i--) {
    const j = hashArray[i] % (i + 1);
    [requiredChars[i], requiredChars[j]] = [requiredChars[j], requiredChars[i]];
  }

  let finalPassword = requiredChars.join('');

  // Ensure password meets all requirements
  const securityChecks = performSecurityChecks(finalPassword);
  const entropy = calculateEntropy(finalPassword);
  const strength = securityChecks.filter(check => check.passed).length / securityChecks.length;

  // Clear sensitive data from memory
  if (securityConfig.memorySecurity.wipeMemory) {
    memorySecurity.secureClear(new Uint8Array(hashArray));
    memorySecurity.clearAfterTimeout(finalPassword, securityConfig.memorySecurity.clearInterval);
  }

  // Protect memory
  if (securityConfig.memorySecurity.memoryProtection) {
    finalPassword = memorySecurity.protectMemory(finalPassword);
  }

  return {
    password: finalPassword,
    strength,
    entropy,
    isDeterministic: true,
    securityChecks,
    warnings: [
      ...securityWarnings,
      ...securityChecks
        .filter(check => !check.passed)
        .map(check => `${check.name}: ${check.details}`)
    ],
  };
};

export {
  validateInspectLink,
  generatePassword,
  calculateEntropy,
  performSecurityChecks,
}; 