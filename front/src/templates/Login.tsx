import { FC,useEffect } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Box } from "@material-ui/core";
import { useForm, SubmitHandler } from "react-hook-form";
import { EmailInput } from "../components/atoms/EmailInput";
import { PasswordInput } from "../components/atoms/PasswordInput";
import PrimaryButton from "../components/UIKit/PrimaryButton";
import { Inner } from "../components/inner";
// import { showAuthErrorMsg } from "../common/functions";
import { useAppSelector } from "../app/hooks";
import { loginAsync, selectUserErrorMsg,selectUser } from "../features/user/userSlice";

interface LoginInfoType {
  email?: string;
  password?: string;
}

const Login: FC = () => {
  const errorMsg = useAppSelector(selectUserErrorMsg);
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useAppSelector(selectUser)
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInfoType>({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  useEffect(() => {
    if (user) {
      history.push("/")
    }
  }, [user, history])
  
  const doLogin: SubmitHandler<LoginInfoType> = (data) => {
    dispatch(loginAsync({ email: data.email!, password: data.password! }));
  };
  return (
    <Inner>
      <Box mt={3} textAlign="center">
        <h2>ログイン</h2>
        {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
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
