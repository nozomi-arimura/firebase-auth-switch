import { z } from "zod";
import { MESSAGE_TYPE } from "../../constants/message.ts";

export const MessageSchema = z.object({
  type: z.literal(MESSAGE_TYPE.API_KEY_SEARCH),
});

export type Message = z.infer<typeof MessageSchema>;
