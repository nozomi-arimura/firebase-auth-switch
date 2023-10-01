import { useTabUrl } from "../../hooks/useTabUrl.ts";
import { InitializeForm } from "./InitializeForm.tsx";
import { fetchWebConfig } from "../../libs/fetchWebConfig.ts";
import { useState } from "react";
import { Dialog, Typography } from "@material-ui/core";
import { useFirebaseSettings } from "../../atoms/FirebaseSettings.ts";
import { useOriginSettings } from "../../atoms/originSettings.ts";
const Page = () => {
  const { tabUrl } = useTabUrl();
  const [error, setError] = useState<string>();
  const { updateFirebaseSettings } = useFirebaseSettings();
  const { addFirebaseConfig } = useOriginSettings();
  if (!tabUrl) return null;
  return (
    <>
      <InitializeForm
        tabUrl={tabUrl}
        onSubmit={async ({
          matcher,
          firebaseApiKey,
          firebaseAppId,
          description,
        }) => {
          setError(undefined);
          const webConfig = await fetchWebConfig({
            firebaseApiKey,
            firebaseAppId,
          }).catch(() => {
            setError("プロジェクトが見つかりませんでした");
          });
          if (!webConfig) return;
          const setting = {
            ...webConfig,
            apiKey: firebaseApiKey,
            description: description || webConfig.projectId,
          };
          updateFirebaseSettings(setting);
          addFirebaseConfig(matcher, { ...setting, selected: true });
        }}
      />

      <Dialog open={false}>aaaa</Dialog>
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
