/**
 * Formats a large number of seconds into a human-readable string 
 * representing the approximate number of years.
 * 
 * @param seconds The total number of seconds.
 * @returns A human-readable string (e.g., "approx. 150 years", "less than a year").
 */
export const formatLargeTime = (seconds: number): string => {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return 'invalid time';
  }

  if (seconds < 1) {
    return 'less than a second';
  }
  
  if (seconds === Infinity) {
    return 'effectively forever';
  }

  const secondsPerYear = 31557600; // avg year (365.25 days)

  if (seconds < secondsPerYear) {
    // You could add more granularity here (months, days) if needed
    // but sticking to the request for simplicity:
    return 'less than a year'; 
  }

  const totalYears = Math.floor(seconds / secondsPerYear);

  // Format with commas for large numbers
  const formattedYears = totalYears.toLocaleString(); 

  return `approx. ${formattedYears} years`;
}; 