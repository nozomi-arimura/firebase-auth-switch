import {
  Box,
  FormControl,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  Snackbar,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { SigninForm, SigninFormValues } from "../../components/SigninForm";
import { useMatchedOriginSetting } from "../../hooks/useMatchedOriginSetting.ts";
import { useTabUrl } from "../../hooks/useTabUrl.ts";
import { signin } from "../../libs/signin.ts";
import { useLoading } from "../../atoms/loading.ts";
import { useMemo, useState } from "react";
import { useAuthList } from "../../atoms/authList.ts";
import { AuthList } from "../../components/AuthList";
import { sendAuth } from "../../libs/sendAuth.ts";
import SettingsIcon from "@material-ui/icons/Settings";
import styles from "./index.module.css";
import { useNavigate } from "react-router-dom";
import { pagePath } from "../../constants/pagePath.ts";
import { useOriginSettings } from "../../atoms/originSettings.ts";

const Page = () => {
  const { startLoading } = useLoading();
  const navigate = useNavigate();
  const { tab } = useTabUrl();

  const { selectFirebaseConfig } = useOriginSettings();
  const { matchedOriginSettings } = useMatchedOriginSetting({
    tabUrl: tab?.url,
  });
  const { addAuth, authListMap } = useAuthList();
  const [error, setError] = useState<string>();
  const tabId = tab?.id;
  const selectedFirebaseSetting = useMemo(
    () =>
      matchedOriginSettings?.firebaseSettings.find(
        ({ selected }) => selected
      ) || matchedOriginSettings?.firebaseSettings[0],
    [matchedOriginSettings]
  );

  if (!matchedOriginSettings || !selectedFirebaseSetting || tabId === undefined)
    return null;
  const authList = authListMap[selectedFirebaseSetting.appId];

  const onSubmit = async ({ email, password }: SigninFormValues) => {
    const user = await signin({
      email,
      password,
      tabId,
      ...selectedFirebaseSetting,
    }).catch((reason) => {
      setError("サインアップに失敗しました");
      throw reason;
    });
    addAuth({
      email,
      firebaseAppId: selectedFirebaseSetting.appId,
      userJson: user.toJSON(),
      description: email,
    });
  };
  return (
    <Box className={styles.root}>
      <span className={styles.setting}>
        <IconButton size={"small"} onClick={() => navigate(pagePath.settings)}>
          <SettingsIcon />
        </IconButton>
      </span>
      <Snackbar
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={!!error}
        onClose={() => setError(undefined)}
        title={error}
      >
        <Alert severity={"error"} onClose={() => setError(undefined)}>
          {error}
        </Alert>
      </Snackbar>
      <Box style={{ display: "flex", gap: "0.25rem," }}></Box>
      <FormControl>
        <RadioGroup row>
          {Boolean(matchedOriginSettings.firebaseSettings.length) &&
            matchedOriginSettings.firebaseSettings.map(
              ({ appId, description }) => (
                <FormControlLabel
                  control={
                    <Radio
                      color={"primary"}
                      onClick={() => {
                        selectFirebaseConfig(
                          matchedOriginSettings.matcher,
                          appId
                        );
                      }}
                      checked={selectedFirebaseSetting.appId === appId}
                    />
                  }
                  label={description}
                  key={appId}
                />
              )
            )}
        </RadioGroup>
      </FormControl>
      {authList && (
        <AuthList
          authList={authList}
          onSignin={(auth) =>
            sendAuth({
              user: auth.userJson,
              tabId,
              firebaseSetting: selectedFirebaseSetting,
            }).finally(startLoading())
          }
        />
      )}
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
