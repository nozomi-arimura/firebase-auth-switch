import { Box } from "@material-ui/core";
import { SigninForm } from "../../components/SigninForm";
import { useMatchedOriginSetting } from "../../hooks/useMatchedOriginSetting.ts";
import { useTabUrl } from "../../hooks/useTabUrl.ts";
import { signin } from "../../libs/signin.ts";

const Page = () => {
  const { tab } = useTabUrl();
  const { matchedOriginSetting } = useMatchedOriginSetting({
    tabUrl: tab?.url,
  });
  const tabId = tab?.id;
  if (!matchedOriginSetting || tabId === undefined) return null;
  return (
    <Box sizeWidth={"1000px"}>
      <SigninForm
        onSubmit={({ email, password }) => {
          signin({
            email,
            password,
            tabId,
            ...matchedOriginSetting.firebaseSettings[0],
          });
        }}
      />
    </Box>
  );
};
/*
 * 既存のauthを並べる
 * 選択してログイン
 * もしくは入力欄(signinForm)
 * */
export default Page;
