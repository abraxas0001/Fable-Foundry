'use client';

import { useState, useCallback } from 'react';

interface RetryOptions {
  maxAttempts?: number;
  delay?: number;
  backoff?: boolean;
}

interface RetryState {
  isLoading: boolean;
  error: Error | null;
  attempt: number;
}

export function useRetry<T>(
  asyncFunction: () => Promise<T>,
  options: RetryOptions = {}
) {
  const { maxAttempts = 3, delay = 1000, backoff = true } = options;
  
  const [state, setState] = useState<RetryState>({
    isLoading: false,
    error: null,
    attempt: 0,
  });

  const execute = useCallback(async (): Promise<T | null> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        setState(prev => ({ ...prev, attempt }));
        const result = await asyncFunction();
        setState(prev => ({ ...prev, isLoading: false, error: null }));
        return result;
      } catch (error) {
        const isLastAttempt = attempt === maxAttempts;
        
        if (isLastAttempt) {
          setState(prev => ({
            ...prev,
            isLoading: false,
            error: error instanceof Error ? error : new Error('Unknown error'),
          }));
          return null;
        }

        // Wait before retrying
        const waitTime = backoff ? delay * Math.pow(2, attempt - 1) : delay;
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
    }

    return null;
  }, [asyncFunction, maxAttempts, delay, backoff]);

  const reset = useCallback(() => {
    setState({ isLoading: false, error: null, attempt: 0 });
  }, []);

  return {
    execute,
    reset,
    ...state,
  };
}