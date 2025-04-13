import { characterSets, securityConfig } from '../config/security';

export interface PasswordValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export const validatePassword = (password: string): PasswordValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check minimum length
  if (password.length < securityConfig.minPasswordLength) {
    errors.push(`Password must be at least ${securityConfig.minPasswordLength} characters long`);
  }

  // Check character requirements
  const lowercaseCount = (password.match(/[a-z]/g) || []).length;
  const uppercaseCount = (password.match(/[A-Z]/g) || []).length;
  const numbersCount = (password.match(/[0-9]/g) || []).length;
  const specialCount = (password.match(/[^a-zA-Z0-9]/g) || []).length;

  if (lowercaseCount < securityConfig.passwordRequirements.minLowercase) {
    errors.push(`Password must contain at least ${securityConfig.passwordRequirements.minLowercase} lowercase letters`);
  }
  if (uppercaseCount < securityConfig.passwordRequirements.minUppercase) {
    errors.push(`Password must contain at least ${securityConfig.passwordRequirements.minUppercase} uppercase letters`);
  }
  if (numbersCount < securityConfig.passwordRequirements.minNumbers) {
    errors.push(`Password must contain at least ${securityConfig.passwordRequirements.minNumbers} numbers`);
  }
  if (specialCount < securityConfig.passwordRequirements.minSpecial) {
    errors.push(`Password must contain at least ${securityConfig.passwordRequirements.minSpecial} special characters`);
  }

  // Check for repeated characters
  const repeatedChars = password.match(/(.)\1+/g) || [];
  const maxRepeated = Math.max(...repeatedChars.map(s => s.length));
  if (maxRepeated > securityConfig.passwordRequirements.maxRepeatedChars) {
    errors.push(`Password contains too many repeated characters (maximum ${securityConfig.passwordRequirements.maxRepeatedChars} allowed)`);
  }

  // Check for sequential characters
  let maxSequential = 0;
  for (let i = 0; i < password.length - 1; i++) {
    const current = password[i];
    const next = password[i + 1];
    if (characterSets.sequential.includes(current) && characterSets.sequential.includes(next)) {
      const currentIndex = characterSets.sequential.indexOf(current);
      const nextIndex = characterSets.sequential.indexOf(next);
      if (Math.abs(currentIndex - nextIndex) === 1) {
        maxSequential = Math.max(maxSequential, 2);
        if (i < password.length - 2) {
          const nextNext = password[i + 2];
          if (characterSets.sequential.includes(nextNext)) {
            const nextNextIndex = characterSets.sequential.indexOf(nextNext);
            if (Math.abs(nextIndex - nextNextIndex) === 1) {
              maxSequential = Math.max(maxSequential, 3);
            }
          }
        }
      }
    }
  }
  if (maxSequential > securityConfig.passwordRequirements.maxSequentialChars) {
    errors.push(`Password contains too many sequential characters (maximum ${securityConfig.passwordRequirements.maxSequentialChars} allowed)`);
  }

  // Check for common patterns
  const commonPatterns = [
    /123456/,
    /password/,
    /qwerty/,
    /abc123/,
    /letmein/,
    /welcome/,
    /admin/,
  ];
  
  for (const pattern of commonPatterns) {
    if (pattern.test(password.toLowerCase())) {
      warnings.push('Password contains common patterns that may be easy to guess');
      break;
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}; 