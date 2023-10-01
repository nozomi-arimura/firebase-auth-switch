import { atomWithStorage } from "jotai/utils";
import { jotaiKey } from "../constants/jotaiKey.ts";
import { WebConfig } from "../types/WebConfig.types.ts";
import { useAtom } from "jotai";
import { useCallback, useMemo } from "react";

export type FirebaseSetting = {
  apiKey: string;
  description: string;
  selected: boolean;
} & WebConfig;

const firebaseSettingAtom = atomWithStorage<{
  [apiKey: string]: FirebaseSetting | undefined;
}>(jotaiKey.firebaseSettings, {});

export const useFirebaseSettings = () => {
  const [firebaseSettings, setFirebaseSettings] = useAtom(firebaseSettingAtom);
  const updateFirebaseSettings = useCallback(
    (firebaseSetting: FirebaseSetting) => {
      setFirebaseSettings((prev) => ({
        ...prev,
        [firebaseSetting.apiKey]: firebaseSetting,
      }));
    },
    [setFirebaseSettings]
  );
  return useMemo(
    () => ({
      firebaseSettings,
      updateFirebaseSettings,
    }),
    [firebaseSettings, updateFirebaseSettings]
  );
};
