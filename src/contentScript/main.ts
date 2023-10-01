import { isTypeOf } from "../utils/zod.ts";
import { MessageSchema } from "../libs/message/index.types.ts";
import { CustomError } from "../utils/CustomError.class.ts";
import { MESSAGE_TYPE } from "../constants/message.ts";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
  if (!isTypeOf(MessageSchema)(message)) return CustomError.typeError(message);

  if (message.type === MESSAGE_TYPE.SIGNIN) {
    const db = indexedDB.open("firebaseLocalStorageDb");
    db.onsuccess = () => {
      const tr = db.result.transaction("firebaseLocalStorage", "readwrite");
      const store = tr.objectStore("firebaseLocalStorage");
      store.put(message.indexedDbValue);
      sendResponse("signin!");
    };
    return true;
  }
});
