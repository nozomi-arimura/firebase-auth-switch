import { isTypeOf } from "../utils/zod.ts";
import { MessageSchema } from "../libs/message/index.types.ts";
import { CustomError } from "../utils/CustomError.class.ts";
import { MESSAGE_TYPE } from "../constants/message.ts";

chrome.runtime.onMessage.addListener((message) => {
  if (!isTypeOf(MessageSchema)(message)) return CustomError.typeError(message);

  if (message.type === MESSAGE_TYPE.SIGNIN) {
    const db = indexedDB.open("firebaseLocalStorageDb");
    db.onsuccess = () => {
      const tr = db.result.transaction("firebaseLocalStorage", "readwrite");
      const store = tr.objectStore("firebaseLocalStorage");
      store.put(message.indexedDbValue);
    };
  }
});
