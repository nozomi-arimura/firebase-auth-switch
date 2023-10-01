import { useCallback, useEffect, useState } from "react";
import { fetchCurrentTab } from "../utils/fetchCurrentTab.ts";
import { CustomError } from "../utils/CustomError.class.ts";

export const useTabUrl = () => {
  const [tabUrl, setTabUrl] = useState<string>();
  const [tab, setTab] = useState<chrome.tabs.Tab>();
  const [error, setError] = useState<string>();

  const fetch = useCallback(
    () =>
      fetchCurrentTab()
        .then((tab) => {
          if (!tab) return setError("現在のURLが取得出来ませんでした");
          setTabUrl(tab.url);
          setTab(tab);
        })
        .catch((error) => {
          CustomError.unknownError(error);
        }),
    []
  );

  useEffect(() => {
    fetch();
  }, [fetch]);

  return {
    refetch: fetch,
    tabUrl,
    tab,
    error,
  };
};
