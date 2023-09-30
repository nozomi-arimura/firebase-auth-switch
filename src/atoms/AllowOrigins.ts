import { atomWithStorage } from "jotai/utils";
import { jotaiKey } from "../constants/jotaiKey.ts";
import { useAtom } from "jotai";
import { useCallback, useMemo } from "react";

export type AllowOrigins = string[];
export const allowOriginsAtom = atomWithStorage<AllowOrigins>(
  jotaiKey.allowPages,
  []
);

export const useAllowOrigins = () => {
  const [allowPages, setAllowPagesAtom] = useAtom(allowOriginsAtom);
  const addAllowOrigin = useCallback(
    (origin: string) => {
      setAllowPagesAtom((prev) => {
        return Array.from(new Set([...prev, origin])); // 重複しないように
      });
    },
    [setAllowPagesAtom]
  );

  const deleteAllowedOrigin = useCallback(
    (origin: string) => {
      setAllowPagesAtom((prev) => {
        return prev.filter((cur) => cur !== origin);
      });
    },
    [setAllowPagesAtom]
  );
  return useMemo(
    () => ({
      addAllowOrigin,
      deleteAllowedOrigin,
      allowPages,
    }),
    [addAllowOrigin, allowPages, deleteAllowedOrigin]
  );
};
