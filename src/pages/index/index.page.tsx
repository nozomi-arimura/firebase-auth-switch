import { Box } from "@material-ui/core";
import { SigninForm, SigninFormValues } from "../../components/SigninForm";
import { useMatchedOriginSetting } from "../../hooks/useMatchedOriginSetting.ts";
import { useTabUrl } from "../../hooks/useTabUrl.ts";
import { signin } from "../../libs/signin.ts";
import { useLoading } from "../../atoms/loading.ts";

const Page = () => {
  const { startLoading } = useLoading();
  const { tab } = useTabUrl();
  const { matchedOriginSetting } = useMatchedOriginSetting({
    tabUrl: tab?.url,
  });
  const tabId = tab?.id;
  if (!matchedOriginSetting || tabId === undefined) return null;
  const onSubmit = async ({ email, password }: SigninFormValues) => {
    await signin({
      email,
      password,
      tabId,
      ...matchedOriginSetting.firebaseSettings[0],
    });
  };
  return (
    <Box sizeWidth={"1000px"}>
      <SigninForm
        onSubmit={(props) => onSubmit(props).finally(startLoading())}
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
