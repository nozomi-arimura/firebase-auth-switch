import { atom, useAtom } from "jotai";
import { useCallback, useMemo } from "react";

const loadingIdsAtom = atom<string[]>([]);

export const useLoading = () => {
  const [loadingIds, setLoadingIds] = useAtom(loadingIdsAtom);
  const isLoading = Boolean(loadingIds.length);
  const startLoading = useCallback(() => {
    const uuid = crypto.randomUUID();
    setLoadingIds((prev) => [...prev, uuid]);
    return () => setLoadingIds((prev) => prev.filter((id) => id !== uuid));
  }, [setLoadingIds]);

  return useMemo(
    () => ({
      isLoading,
      startLoading,
    }),
    [isLoading, startLoading]
  );
};
