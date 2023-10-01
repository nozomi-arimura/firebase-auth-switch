import { useForm } from "react-hook-form";
import { Button, makeStyles, TextField } from "@material-ui/core";

export type SigninFormValues = {
  email: string;
  password: string;
};
export type SigninFormProps = {
  onSubmit: (values: SigninFormValues) => unknown;
};
const useStyles = makeStyles(() => ({
  root: {
    display: "grid",
    gap: "0.5rem",
  },
}));
export const SigninForm = ({ onSubmit }: SigninFormProps) => {
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<SigninFormValues>({
    mode: "onChange",
  });
  return (
    <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
      <TextField
        type={"email"}
        fullWidth
        label={"メールアドレス"}
        {...register("email", { required: true })}
      />
      <TextField
        type={"password"}
        fullWidth
        label={"パスワード"}
        {...register("password", { required: true })}
      />
      <Button type={"submit"} disabled={!isValid} variant={"outlined"}>
        ログイン
      </Button>
    </form>
  );
};
