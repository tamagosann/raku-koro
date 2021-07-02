import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Container, Box } from "@material-ui/core";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { UserNameInput } from "../components/atoms/UserNameInput";
import { EmailInput } from "../components/atoms/EmailInput";
import { PasswordInput } from "../components/atoms/PasswordInput";
import { PrimaryButton } from "../components/UIKit";
import { registerAsync } from "../features/user/userSlice";
import { RegisterType } from "../features/user/userSlice";
import { PrefectureSelectBox } from "../components/atoms/PrefectureSelectBox";
import { FC } from "react";

const Register:FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    mode: "onBlur",
    defaultValues: {
      email: "",
      username: "",
      password: "",
      prefecture: "東京都",
    },
  });
  const doRegister: SubmitHandler<RegisterType> = (data) => {
    dispatch(registerAsync(data));
    history.push("/");
  };
  return (
    <Container maxWidth="sm">
      <Box mt={3} textAlign="center">
        <h2>新規登録</h2>
        <form onSubmit={handleSubmit(doRegister)}>
          <Box mt={3} textAlign="center">
            <UserNameInput control={control} error={errors.username!} />
          </Box>
          <Box mt={3} textAlign="center">
            <EmailInput control={control} error={errors.email!} />
          </Box>
          <Box mt={3} textAlign="center">
            <PasswordInput control={control} error={errors.password!} />
          </Box>
          <Box mt={3} textAlign="center">
            <PrefectureSelectBox control={control} error={errors.prefecture!} />
          </Box>
          <Box mt={3} textAlign="center">
            <PrimaryButton label={"登録"} onClick={handleSubmit(doRegister)} />
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default Register;
