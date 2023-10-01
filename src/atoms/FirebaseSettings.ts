import { atomWithStorage } from "jotai/utils";
import { jotaiKey } from "../constants/jotaiKey.ts";
import { WebConfig } from "../types/WebConfig.types.ts";
import { useAtom } from "jotai";
import { useCallback, useMemo } from "react";

export type FirebaseSetting = {
  apiKey: string;
  description: string;
} & WebConfig;

const firebaseSettingAtom = atomWithStorage<{
  [apiKey: string]: FirebaseSetting | undefined;
}>(jotaiKey.firebaseSettingMap, {});

export const useFirebaseSettings = () => {
  const [firebaseSettingMap, setFirebaseSettings] =
    useAtom(firebaseSettingAtom);
  const updateFirebaseSettings = useCallback(
    (firebaseSetting: FirebaseSetting) => {
      setFirebaseSettings((prev) => ({
        ...prev,
        [firebaseSetting.apiKey]: firebaseSetting,
      }));
    },
    [setFirebaseSettings]
  );
  const firebaseSettings = useMemo(
    () => Object.values(firebaseSettingMap).flatMap((val) => (val ? val : [])),
    [firebaseSettingMap]
  );
  return useMemo(
    () => ({
      firebaseSettingMap,
      firebaseSettings,
      updateFirebaseSettings,
    }),
    [firebaseSettings, firebaseSettingMap, updateFirebaseSettings]
  );
};
