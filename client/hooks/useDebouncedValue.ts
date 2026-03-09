import { useState, useEffect } from "react";

/**
 * Debounce a value — returns the latest value only after `delay` ms of inactivity.
 * Useful for search inputs to avoid firing API requests on every keystroke.
 */
export function useDebouncedValue<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
