import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Box } from "@material-ui/core";
// import { login } from "../../app/store/user/userOperation";
// import { Email } from "../molecules/forms/Email";
// import { Password } from "../molecules/forms/Password";
// import { Btn } from "../atoms/Btn";
// import { useForm, SubmitHandler } from "react-hook-form";

interface LoginInfoType {
  email?: string;
  password?: string;
}

export const Login = () => {
  const dispatch = useDispatch();
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
    return () => {
      if (localStorage.ItemInfo) {
        localStorage.removeItem("ItemInfo");
      }
    };
  }, []);

  const doLogin: SubmitHandler<LoginInfoType> = (data) => {
    dispatch(login(data.email!, data.password!));
  };
  return (
    <Container maxWidth="sm">
      <Box mt={3} textAlign="center">
        <h2>ログイン</h2>
        <form onSubmit={handleSubmit(doLogin)}>
          <Email control={control} error={errors.email!} />
          <Password control={control} error={errors.password!} />
          <Box mt={3}>
            <Btn text="ログイン" onClk={handleSubmit(doLogin)} />
          </Box>
        </form>
        <Box mt={3}>
          <Link to="/register">ユーザー登録はこちら</Link>
        </Box>
      </Box>
    </Container>
  );
};