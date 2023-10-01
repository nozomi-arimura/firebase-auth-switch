import { atomWithStorage } from "jotai/utils";
import { jotaiKey } from "../constants/jotaiKey.ts";
import { useAtom } from "jotai";
import { useCallback, useMemo } from "react";
import { uniqueObjectArray } from "../utils/uniqueObjectArray.ts";

export type Auth = {
  userJson: object; // firebaseUser から得られるtoJSONの結果を格納
  email: string;
  firebaseAppId: string;
  description: string;
};

const authListMapAtom = atomWithStorage<{
  [firebaseAppId: string]: Auth[] | undefined;
}>(jotaiKey.authList, {});

export const useAuthList = () => {
  const [authListMap, setAuthListMap] = useAtom(authListMapAtom);
  const addAuth = useCallback(
    (auth: Auth) =>
      setAuthListMap((prev) => {
        console.log(prev);
        const oldAuthList = prev[auth.firebaseAppId] || [];
        console.log(oldAuthList);
        const newAuthList = uniqueObjectArray([...oldAuthList, auth], "email");
        return { ...prev, [auth.firebaseAppId]: newAuthList };
      }),
    [setAuthListMap]
  );

  const removeAuth = useCallback(
    ({
      firebaseAppId,
      email,
    }: {
      firebaseAppId: Auth["firebaseAppId"];
      email: Auth["email"];
    }) => {
      setAuthListMap((prev) => {
        const oldAuthList = prev[firebaseAppId] || [];
        return {
          ...prev,
          [firebaseAppId]: oldAuthList.filter(
            ({ email: cur }) => cur !== email
          ),
        };
      });
    },
    [setAuthListMap]
  );

  return useMemo(
    () => ({
      authListMap,
      addAuth,
      removeAuth,
    }),
    [authListMap, addAuth, removeAuth]
  );
};
