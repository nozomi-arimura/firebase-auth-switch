import { FirebaseSetting } from "../atoms/FirebaseSettings.ts";

import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { sendAuth } from "./sendAuth.ts";

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

  if (!user) throw new Error();
  await sendAuth({
    tabId,
    user: user.toJSON(),
    firebaseSetting,
  });
  return user;
};
