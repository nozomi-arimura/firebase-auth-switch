import { Message } from "./message/index.types.ts";
import { MESSAGE_TYPE } from "../constants/message.ts";
import { FirebaseSetting } from "../atoms/FirebaseSettings.ts";

export const sendAuth = ({
  user,
  firebaseSetting,
  tabId,
}: {
  user: object;
  firebaseSetting: FirebaseSetting;
  tabId: Required<chrome.tabs.Tab>["id"];
}) => {
  const dbSavedValue = {
    fbase_key: `firebase:authUser:${firebaseSetting.apiKey}:[DEFAULT]`,
    value: user,
  };
  const message: Message = {
    type: MESSAGE_TYPE.SIGNIN,
    indexedDbValue: dbSavedValue,
  };
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(), 10 * 1000);
    chrome.tabs.sendMessage(tabId, message, () => {
      resolve(undefined);
    });
  });
};
