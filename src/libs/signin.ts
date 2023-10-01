import { FirebaseSetting } from "../atoms/FirebaseSettings.ts";

import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Message } from "./message/index.types.ts";
import { MESSAGE_TYPE } from "../constants/message.ts";

export type SigninProps = {
  email: string;
  password: string;
  tabId: Required<chrome.tabs.Tab>["id"];
} & FirebaseSetting;
export const signin = async ({
  email,
  password,
  tabId,
  ...firebaseSetting
}: SigninProps) => {
  const firebaseApp = initializeApp(firebaseSetting);
  const { user } = await signInWithEmailAndPassword(
    getAuth(firebaseApp),
    email,
    password
  );

  if (!user) return;
  const dbSavedValue = {
    fbase_key: `firebase:authUser:${firebaseSetting.apiKey}:[DEFAULT]`,
    value: user.toJSON(),
  };
  const message: Message = {
    type: MESSAGE_TYPE.SIGNIN,
    indexedDbValue: dbSavedValue,
  };
  await chrome.tabs.sendMessage(tabId, message);
};
