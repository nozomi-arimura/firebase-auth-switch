import axios from "axios";
import { isTypeOf } from "../utils/zod.ts";
import { WebConfigSchema } from "../types/WebConfig.types.ts";

export const fetchWebConfig = ({
  firebaseApiKey,
  firebaseAppId,
}: {
  firebaseApiKey: string;
  firebaseAppId: string;
}) =>
  axios
    .get(
      `https://firebase.googleapis.com/v1alpha/projects/-/apps/${firebaseAppId}/webConfig`,
      {
        headers: {
          "X-Goog-Api-Key": firebaseApiKey,
        },
      }
    )
    .then((res) => {
      if (isTypeOf(WebConfigSchema)(res.data)) return res.data;
      throw new Error(res.data);
    });
