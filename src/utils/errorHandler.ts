import { ErrorCategory } from '../types';

export interface ErrorDetails {
  message: string;
  category: ErrorCategory;
  timestamp: number;
  stack?: string;
  context?: Record<string, unknown>;
}

export class AppError extends Error {
  public readonly category: ErrorCategory;
  public readonly timestamp: number;
  public readonly context?: Record<string, unknown>;

  constructor(message: string, category: ErrorCategory, context?: Record<string, unknown>) {
    super(message);
    this.name = 'AppError';
    this.category = category;
    this.timestamp = Date.now();
    this.context = context;
    // @ts-expect-error - captureStackTrace is available in most environments
    Error.captureStackTrace(this, this.constructor);
  }
}

export const getSecureErrorMessage = (error: unknown): string => {
  if (error instanceof AppError) {
    return error.message;
  }
  
  if (error instanceof Error) {
    // For security, we don't expose internal error details to users
    return 'An unexpected error occurred. Please try again.';
  }
  
  return 'An unknown error occurred. Please try again.';
};

export const logError = (error: unknown, category: ErrorCategory, context?: Record<string, unknown>): void => {
  const errorDetails: ErrorDetails = {
    message: error instanceof Error ? error.message : 'Unknown error',
    category,
    timestamp: Date.now(),
    context,
  };

  if (error instanceof Error && error.stack) {
    errorDetails.stack = error.stack;
  }

  // In a production environment, this would be sent to an error tracking service
  console.error('Error Details:', errorDetails);
};

export const handleError = (error: unknown, category: ErrorCategory, context?: Record<string, unknown>): AppError => {
  if (error instanceof AppError) {
    return error;
  }

  const message = error instanceof Error ? error.message : 'An unknown error occurred';
  const appError = new AppError(message, category, context);
  logError(appError, category, context);
  return appError;
}; 