import { z } from "zod";

export const WebConfigSchema = z.object({
  appId: z.string(),
  authDomain: z.string(),
  messagingSenderId: z.string(),
  projectId: z.string(),
  storageBucket: z.string(),
});

export type WebConfig = z.infer<typeof WebConfigSchema>;
