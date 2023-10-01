import { useLocation, useNavigate } from "react-router-dom";
import { useTabUrl } from "./useTabUrl.ts";
import { useMatchedOriginSetting } from "./useMatchedOriginSetting.ts";
import { useEffect } from "react";
import { pagePath } from "../constants/pagePath.ts";

export const useAppRouter = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { tabUrl } = useTabUrl();
  const { matchedOriginSetting } = useMatchedOriginSetting({ tabUrl });

  useEffect(() => {
    console.log(matchedOriginSetting);
    if (pathname === pagePath.index && tabUrl && !matchedOriginSetting)
      navigate(pagePath.initialize);
    if (pathname === pagePath.initialize && matchedOriginSetting)
      navigate(pagePath.index);
  }, [pathname, tabUrl, matchedOriginSetting, navigate]);
};
