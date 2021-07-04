import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Container, Box } from "@material-ui/core";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { UserNameInput } from "../components/atoms/UserNameInput";
import { EmailInput } from "../components/atoms/EmailInput";
import { PasswordInput } from "../components/atoms/PasswordInput";
import { PrimaryButton } from "../components/UIKit";
import {
  registerAsync,
  selectUid,
  selectUserErrorMsg,
  unSetUserErrorMsg,
} from "../features/user/userSlice";
import { RegisterType } from "../features/user/userSlice";
import { PrefectureSelectBox } from "../components/atoms/PrefectureSelectBox";
import { FC, useEffect } from "react";
import { Inner } from "../components/inner";
import { useAppSelector } from "../app/hooks";

const Register: FC = () => {
  const dispatch = useDispatch();
  const errorMsg = useAppSelector(selectUserErrorMsg);
  const uid = useAppSelector(selectUid);
  const history = useHistory();
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

  useEffect(() => {
    if (uid) {
      history.push("/");
    }
    return () => {
      dispatch(unSetUserErrorMsg());
    };
  }, [uid, history, dispatch]);
  const doRegister: SubmitHandler<RegisterType> = (data) => {
    dispatch(registerAsync(data));
  };
  return (
    <Inner>
      <Box mt={3} textAlign="center">
        <h2>新規登録</h2>
        {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
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
    </Inner>
  );
};

export default Register;
