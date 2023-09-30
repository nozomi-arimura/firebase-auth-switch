import { Button, TextField } from "@material-ui/core";
import { useForm } from "react-hook-form";
import styles from "./InitializeForm.module.css";

export type InitializeFormProps = {
  tabUrl: string;
  onSubmit: (values: InitializeFormValues) => unknown;
};
export type InitializeFormValues = {
  matcher: string;
  firebaseAppId: string;
  firebaseApiKey: string;
};
export const InitializeForm = ({ tabUrl, onSubmit }: InitializeFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<InitializeFormValues>({
    mode: "onChange",
    defaultValues: {
      matcher: new URL(tabUrl).origin,
    },
  });
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
        label={"FirebaseAppId"}
        placeholder={"0:000000000000:web:0a0a0a0a0a0a0a0a0a0a0a"}
        error={Boolean(errors.matcher?.message)}
        {...register("firebaseAppId", {
          required: true,
        })}
      />
      <TextField
        fullWidth
        label={"firebaseApiKey"}
        placeholder={"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"}
        error={Boolean(errors.matcher?.message)}
        {...register("firebaseApiKey", {
          required: true,
        })}
      />

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
