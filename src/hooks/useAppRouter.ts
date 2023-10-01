import { useLocation, useNavigate } from "react-router-dom";
import { useTabUrl } from "./useTabUrl.ts";
import { useMatchedOriginSetting } from "./useMatchedOriginSetting.ts";
import { useEffect } from "react";
import { pagePath } from "../constants/pagePath.ts";

export const useAppRouter = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { tabUrl } = useTabUrl();
  const { matchedOriginSettings } = useMatchedOriginSetting({ tabUrl });

  useEffect(() => {
    if (pathname === pagePath.index && tabUrl && !matchedOriginSettings)
      navigate(pagePath.initialize);
    if (pathname === pagePath.initialize && matchedOriginSettings)
      navigate(pagePath.index);
  }, [pathname, tabUrl, matchedOriginSettings, navigate]);
};
