import {
  Button,
  Dialog,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import styles from "./InitializeForm.module.css";
import AddIcon from "@material-ui/icons/Add";
import { useReducer } from "react";
import { useFirebaseSettings } from "../../atoms/FirebaseSettings.ts";

export type InitializeFormValues = {
  matcher: string;
  firebaseAppId: string;
  firebaseApiKey: string;
  description: string;
};

export type InitializeFormProps = {
  tabUrl: string;
  onSubmit: (values: InitializeFormValues) => unknown;
};

export const InitializeForm = ({ tabUrl, onSubmit }: InitializeFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<InitializeFormValues>({
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

  return (
    <form className={styles.root} onSubmit={handleSubmit(onSubmit)}>
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
