import { useState, useCallback, useRef, useEffect } from 'react';

export function useToast(duration = 1000) {
  const [toast, setToast] = useState(null);
  const timerRef = useRef(null);

  const showToast = useCallback((message, type = 'info') => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setToast({ message, type, id: Date.now() });
    timerRef.current = setTimeout(() => {
      setToast(null);
    }, duration);
  }, [duration]);

  const hideToast = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setToast(null);
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return { toast, showToast, hideToast };
}
