import { useEffect, useState } from "react";

// Helper to check if stores have been rehydrated
export function useHydration() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // This runs after first client render
    const timeout = setTimeout(() => {
      setHydrated(true);
    }, 150);

    return () => clearTimeout(timeout);
  }, []);

  return hydrated;
}
