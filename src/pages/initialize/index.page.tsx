import { useTabUrl } from "../../hooks/useTabUrl.ts";
import { InitializeForm } from "./InitializeForm.tsx";
import { fetchWebConfig } from "../../libs/fetchWebConfig.ts";
import { useState } from "react";
import { Typography } from "@material-ui/core";
import { useFirebaseSettings } from "../../atoms/FirebaseSettings.ts";

const Page = () => {
  const { tabUrl } = useTabUrl();
  const [error, setError] = useState<string>();
  const { updateFirebaseSettings } = useFirebaseSettings();

  if (!tabUrl) return null;
  return (
    <>
      <InitializeForm
        tabUrl={tabUrl}
        onSubmit={async ({ firebaseApiKey, firebaseAppId }) => {
          setError(undefined);
          const webConfig = await fetchWebConfig({
            firebaseApiKey,
            firebaseAppId,
          }).catch(() => {
            setError("プロジェクトが見つかりませんでした");
          });
          if (!webConfig) return;
          updateFirebaseSettings({
            ...webConfig,
            apiKey: firebaseApiKey,
            description: webConfig.projectId,
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
