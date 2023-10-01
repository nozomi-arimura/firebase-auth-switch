import {
  Button,
  Dialog,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import styles from "./InitializeForm.module.css";
import AddIcon from "@material-ui/icons/Add";
import { useReducer, useState } from "react";
import {
  FirebaseSetting,
  useFirebaseSettings,
} from "../../atoms/FirebaseSettings.ts";
import { fetchWebConfig } from "../../libs/fetchWebConfig.ts";

export type FirebaseProjectFormValues = {
  matcher: string;
  firebaseAppId: string;
  firebaseApiKey: string;
  description: string;
};

export type FirebaseProjectFormProps = {
  tabUrl: string;
  onSubmit: (
    values: FirebaseSetting & { matcher: FirebaseProjectFormValues["matcher"] }
  ) => unknown;
  withMatchingPattern?: boolean;
};

export const FirebaseProjectForm = ({
  tabUrl,
  onSubmit,
  withMatchingPattern = true,
}: FirebaseProjectFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<FirebaseProjectFormValues>({
    mode: "onChange",
    defaultValues: {
      matcher: new URL(tabUrl).origin,
      firebaseApiKey: "",
      firebaseAppId: "",
      description: "",
    },
  });
  const { firebaseApiKey, firebaseAppId } = watch();
  const { firebaseSettings } = useFirebaseSettings();

  const [modalOpen, switchModalOpen] = useReducer((prev) => !prev, false);
  const [error, setError] = useState<string>();
  return (
    <form
      className={styles.root}
      onSubmit={handleSubmit(
        async ({ firebaseAppId, firebaseApiKey, matcher, description }) => {
          const webConfig = await fetchWebConfig({
            firebaseApiKey,
            firebaseAppId,
          }).catch(() => {
            setError("プロジェクトが見つかりませんでした");
          });
          if (!webConfig) return;
          return Promise.resolve(
            onSubmit({
              ...webConfig,
              description: description || webConfig.projectId,
              matcher: matcher,
              apiKey: firebaseApiKey,
            })
          );
        }
      )}
    >
      {withMatchingPattern && (
        <TextField
          fullWidth
          label={"この設定を適用するURLパターン"}
          error={Boolean(errors.matcher?.message)}
          helperText={
            errors.matcher?.message ||
            "例 https://dev.XXXX.example.com.com → dev.*.example.com"
          }
          {...register("matcher", {
            required: true,
            validate: (value) => {
              const errorMessage = "現在のOriginとマッチしません";
              try {
                return Boolean(tabUrl.match(value)?.length) || errorMessage;
              } catch {
                return errorMessage;
              }
            },
          })}
        />
      )}
      <TextField
        fullWidth
        InputLabelProps={{
          shrink: firebaseAppId ? true : undefined,
        }}
        label={"firebaseAppId"}
        placeholder={"0:000000000000:web:0a0a0a0a0a0a0a0a0a0a0a"}
        error={Boolean(errors.matcher?.message)}
        {...register("firebaseAppId", {
          required: true,
        })}
      />
      <TextField
        fullWidth
        InputLabelProps={{
          shrink: firebaseApiKey ? true : undefined,
        }}
        label={"firebaseApiKey"}
        placeholder={"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"}
        error={Boolean(errors.matcher?.message)}
        {...register("firebaseApiKey", {
          required: true,
        })}
      />
      {Boolean(firebaseSettings.length) && (
        <div>
          <Button
            onClick={switchModalOpen}
            color={"primary"}
            size={"small"}
            startIcon={<AddIcon />}
          >
            既存の設定から追加する
          </Button>
          <Dialog open={modalOpen} onClose={switchModalOpen}>
            <List component={"nav"}>
              {firebaseSettings.map(({ description, appId, apiKey }) => (
                <ListItem
                  style={{ minWidth: "12rem" }}
                  button
                  key={appId}
                  onClick={() => {
                    const setValueOption = {
                      shouldDirty: true,
                      shouldValidate: true,
                    };
                    setValue("firebaseApiKey", apiKey, setValueOption);
                    setValue("firebaseAppId", appId, setValueOption);
                    setValue("description", description, setValueOption);
                    switchModalOpen();
                  }}
                >
                  <ListItemText>{description}</ListItemText>
                </ListItem>
              ))}
            </List>
          </Dialog>
        </div>
      )}
      {error && <Typography color={"error"}>{error}</Typography>}
      <Button
        disabled={!isValid}
        variant={"outlined"}
        color={"primary"}
        type={"submit"}
      >
        保存
      </Button>
    </form>
  );
};
