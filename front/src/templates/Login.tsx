import { FC, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { Box } from "@material-ui/core";
import { useForm, SubmitHandler } from "react-hook-form";
import { login } from "../features/user/userAPI";
import { EmailInput } from "../components/atoms/EmailInput";
import { PasswordInput } from "../components/atoms/PasswordInput";
import PrimaryButton from "../components/UIKit/PrimaryButton";
import { Inner } from "../components/inner";
import { showAuthErrorMsg } from "../common/functions";

interface LoginInfoType {
  email?: string;
  password?: string;
}

const Login: FC = () => {
  const [error, setError] = useState("");
  const history = useHistory();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginInfoType>({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const doLogin: SubmitHandler<LoginInfoType> = (data) => {
    login(data.email!, data.password!)
      .then(() => {
        history.push("/");
      })
      .catch((error) => {
        let errMsg = showAuthErrorMsg(error);
        setError(errMsg);
        reset({
          email: "",
          password: "",
        });
      });
  };
  return (
    <Inner>
      <Box mt={3} textAlign="center">
        <h2>ログイン</h2>
        {error !== "" && <span style={{ color: "red" }}>{error}</span>}
        <form onSubmit={handleSubmit(doLogin)}>
          <Box mt={3}>
            <EmailInput control={control} error={errors.email!} />
          </Box>
          <Box mt={3}>
            <PasswordInput control={control} error={errors.password!} />
          </Box>
          <Box mt={3}>
            <PrimaryButton label="ログイン" onClick={handleSubmit(doLogin)} />
          </Box>
        </form>
        <Box mt={3}>
          <Link to="/register">ユーザー登録はこちら</Link>
        </Box>
      </Box>
    </Inner>
  );
};

export default Login;
