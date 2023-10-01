import { useTabUrl } from "../../hooks/useTabUrl.ts";
import { FirebaseProjectForm } from "../../components/FirebaseProjectForm";
import { useFirebaseSettings } from "../../atoms/FirebaseSettings.ts";
import { useOriginSettings } from "../../atoms/originSettings.ts";

const Page = () => {
  const { tabUrl } = useTabUrl();
  const { updateFirebaseSettings } = useFirebaseSettings();
  const { addFirebaseConfig } = useOriginSettings();
  if (!tabUrl) return null;
  return (
    <>
      <FirebaseProjectForm
        tabUrl={tabUrl}
        onSubmit={({ matcher, ...firebaseConfig }) => {
          updateFirebaseSettings(firebaseConfig);
          addFirebaseConfig(matcher, { ...firebaseConfig, selected: true });
        }}
      />
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
