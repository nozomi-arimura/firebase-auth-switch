import { atomWithStorage } from "jotai/utils";
import { jotaiKey } from "../constants/jotaiKey.ts";
import { useAtom } from "jotai";
import { useCallback, useMemo } from "react";
import { FirebaseSetting } from "./FirebaseSettings.ts";
import { uniqueObjectArray } from "../utils/uniqueObjectArray.ts";
export type OriginSetting = {
  matcher: string;
  firebaseSettings: (FirebaseSetting & { selected: boolean })[];
};

const originsSettingsAtom = atomWithStorage<OriginSetting[]>(
  jotaiKey.originSetting,
  []
);

export const useOriginSettings = () => {
  const [originsSettings, setOriginsSettings] = useAtom(originsSettingsAtom);
  const addFirebaseConfig = useCallback(
    (
      matcher: OriginSetting["matcher"],
      setting: FirebaseSetting & { selected: boolean }
    ) => {
      setOriginsSettings((prev) => {
        const exists = prev.find((curr) => curr.matcher === matcher);
        if (exists)
          // 既に既存設定があれば、追加する
          return prev.map((cur) =>
            cur.matcher !== exists.matcher
              ? cur
              : {
                  ...exists,
                  firebaseSettings: uniqueObjectArray(
                    [...exists.firebaseSettings, setting],
                    "apiKey"
                  ),
                }
          );
        return [...prev, { matcher, firebaseSettings: [setting] }];
      });
    },
    [setOriginsSettings]
  );
  const selectFirebaseConfig = useCallback(
    (
      matcher: OriginSetting["matcher"],
      selectedAppId: FirebaseSetting["appId"]
    ) => {
      setOriginsSettings((prev) =>
        prev.map((cur) =>
          cur.matcher !== matcher
            ? cur
            : {
                ...cur,
                firebaseSettings: cur.firebaseSettings.map((cur) => ({
                  ...cur,
                  selected: cur.appId === selectedAppId,
                })),
              }
        )
      );
    },
    [setOriginsSettings]
  );
  return useMemo(
    () => ({
      addFirebaseConfig,
      originsSettings,
      selectFirebaseConfig,
    }),
    [addFirebaseConfig, originsSettings, selectFirebaseConfig]
  );
};
