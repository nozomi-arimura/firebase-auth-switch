import { isTypeOf } from "../utils/zod.ts";
import { MessageSchema } from "../libs/message/index.types.ts";
import { CustomError } from "../utils/CustomError.class.ts";

chrome.runtime.onMessage.addListener((message) => {
  if (!isTypeOf(MessageSchema)(message)) return CustomError.typeError(message);
});
