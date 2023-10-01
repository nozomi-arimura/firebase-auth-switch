import { z } from "zod";
import { MESSAGE_TYPE } from "../../constants/message.ts";

export const MessageSchema = z.object({
  type: z.literal(MESSAGE_TYPE.SIGNIN),
  indexedDbValue: z.object({}), // firebase側が決める型であるため、変更の可能性を考え型を絞らない
});

export type Message = z.infer<typeof MessageSchema>;
