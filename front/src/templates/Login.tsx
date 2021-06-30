import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { Container, Box } from "@material-ui/core";
import { useForm, SubmitHandler } from "react-hook-form";
import { login } from "../features/user/userAPI";
import { EmailInput } from "../components/atoms/EmailInput";
import { PasswordInput } from "../components/atoms/PasswordInput";
import PrimaryButton from "../components/UIKit/PrimaryButton";

interface LoginInfoType {
  email?: string;
  password?: string;
}

const Login = () => {
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
        setError(error);
        reset({
          email: "",
          password: "",
        });
      });
  };
  return (
    <Container maxWidth="sm">
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
    </Container>
  );
};

export default Login;
