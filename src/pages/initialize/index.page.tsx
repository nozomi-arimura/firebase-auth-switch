import { useTabUrl } from "../../hooks/useTabUrl.ts";
import { InitializeForm } from "./InitializeForm.tsx";
import { fetchWebConfig } from "../../libs/fetchWebConfig.ts";
import { useState } from "react";
import { Typography } from "@material-ui/core";

const Page = () => {
  const { tabUrl } = useTabUrl();
  const [error, setError] = useState<string>();
  if (!tabUrl) return null;
  return (
    <>
      <InitializeForm
        tabUrl={tabUrl}
        onSubmit={async ({ firebaseApiKey, firebaseAppId }) => {
          setError(undefined);
          await fetchWebConfig({
            firebaseApiKey,
            firebaseAppId,
          }).catch(() => {
            setError("プロジェクトが見つかりませんでした");
          });
        }}
      />
      {error && <Typography color={"error"}>{error}</Typography>}
    </>
  );
};

export default Page;

/*
TODO アコーディオン
--------------------------------------
マッチャーを入力
--------------------------------------
下に入力欄
既存のAuthのリストが並ぶアコーディオン
--------------------------------------
決定ボタン
--------------------------------------
`;
*/
