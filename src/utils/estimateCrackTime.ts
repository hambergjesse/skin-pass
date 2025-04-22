import zxcvbn, { ZXCVBNResult } from 'zxcvbn';

/**
 * Represents the result of the crack time estimation.
 */
export interface CrackTimeEstimate {
  score: number;
  crackTimeDisplay: string; // Original display string (e.g., "centuries")
  crackTimeSeconds: number; // Estimated crack time in seconds (can be Infinity)
}

/**
 * Estimates the time to crack a password using zxcvbn.
 * 
 * @param password The password string to evaluate.
 * @returns An object containing the zxcvbn score (0-4), a user-friendly
 *          display string, and the estimated crack time in seconds 
 *          under an offline, slow hashing scenario. 
 *          Returns null if the password is empty.
 */
export const estimateCrackTime = (password: string): CrackTimeEstimate | null => {
  if (!password) {
    return null;
  }

  // Ensure zxcvbn is loaded (it might load asynchronously in some setups)
  // Although in Vite/React, direct import usually handles this.
  if (typeof zxcvbn !== 'function') {
    console.error('zxcvbn function not available');
    return null; 
  }

  const result: ZXCVBNResult = zxcvbn(password);

  // Ensure crack_times_display exists and cast to string for safety
  const crackTimeDisplay = String(result.crack_times_display?.offline_slow_hashing_1e4_per_second ?? 'unknown');
  
  let crackTimeSeconds: number;
  const secondsRaw = result.crack_times_seconds?.offline_slow_hashing_1e4_per_second;

  if (typeof secondsRaw === 'string' && secondsRaw.toLowerCase() === 'infinity') {
    crackTimeSeconds = Infinity;
  } else if (typeof secondsRaw === 'number') {
    crackTimeSeconds = secondsRaw;
  } else {
    // Handle unexpected type or missing value
    console.warn('Could not determine crack time in seconds, defaulting to Infinity');
    crackTimeSeconds = Infinity; 
  }

  const score = result.score;

  return { score, crackTimeDisplay, crackTimeSeconds };
}; 