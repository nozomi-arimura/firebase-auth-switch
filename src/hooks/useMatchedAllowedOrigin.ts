import { useMemo } from "react";
import { useAllowOrigins } from "../atoms/AllowOrigins.ts";

export type UseIsAllowedOriginProps = {
  tabUrl: string | undefined;
};
export const useMatchedAllowedOrigin = ({
  tabUrl,
}: UseIsAllowedOriginProps) => {
  const { allowPages } = useAllowOrigins();

  const isAllowed = useMemo(() => {
    if (!tabUrl) return;
    return allowPages.find((page) => {
      try {
        return Boolean(tabUrl.match(page));
      } catch {
        //
      }
    });
  }, [allowPages, tabUrl]);
  return useMemo(() => ({ isAllowed }), [isAllowed]);
};
