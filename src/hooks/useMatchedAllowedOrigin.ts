import { useMemo } from "react";
import { useOriginSettings } from "../atoms/originSettings.ts";

export type UseIsAllowedOriginProps = {
  tabUrl: string | undefined;
};
export const useMatchedAllowedOrigin = ({
  tabUrl,
}: UseIsAllowedOriginProps) => {
  const { originsSettings } = useOriginSettings();

  const isAllowed = useMemo(() => {
    if (!tabUrl) return;
    return originsSettings.find(({ matcher }) => {
      try {
        return Boolean(tabUrl.match(matcher));
      } catch {
        //
      }
    });
  }, [originsSettings, tabUrl]);
  return useMemo(() => ({ isAllowed }), [isAllowed]);
};
