import { useEffect, useState } from "react";
import { UseBoundStore } from "zustand";

// A React Custom Hook for Zustand state management library to simplify hydration handling.
// https://github.com/codebayu/use-hydration-zustand

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useHydrationZustand = (store: UseBoundStore<any>) => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const unsubHydrate = store.persist.onHydrate(() => setHydrated(false));

    const unsubFinishHydration = store.persist.onFinishHydration(() =>
      setHydrated(true)
    );

    setHydrated(store.persist.hasHydrated());

    return () => {
      unsubHydrate();
      unsubFinishHydration();
    };
  }, []);

  return hydrated;
};
