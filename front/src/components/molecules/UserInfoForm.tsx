import { useDispatch } from "react-redux";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { Container, Box } from "@material-ui/core";
import { UserNameInput } from "../atoms/UserNameInput";
import { PrefectureSelectBox } from "../atoms/PrefectureSelectBox";
import {
  selectUserErrorMsg,
  UserDataType,
  selectUser,
  updateUserAsync,
} from "../../features/user/userSlice";
import { useAppSelector } from "../../app/hooks";
import { PrimaryButton } from "../UIKit";

const UserInfoForm = () => {
  const dispatch = useDispatch();
  const user = useAppSelector(selectUser);
  const errorMsg = useAppSelector(selectUserErrorMsg);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    mode: "onBlur",
    defaultValues: {
      _id: user?._id,
      uid: user?.uid,
      username: user?.username,
      prefecture: user?.prefecture,
    },
  });
  const doUpdate: SubmitHandler<UserDataType> = (data) => {
    dispatch(updateUserAsync(data));
  };
  return (
    <Container
      maxWidth="sm"
      style={{ padding: "5px 0 25px 0", marginBottom: 25 }}
    >
      {user !== null && (
        <Box mt={3} textAlign="center">
          <h2>ユーザー情報</h2>
          {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
          <form onSubmit={handleSubmit(doUpdate)}>
            <Box mt={3} textAlign="center">
              <UserNameInput control={control} error={errors.username!} />
            </Box>
            <Box mt={3} textAlign="center">
              <PrefectureSelectBox
                control={control}
                error={errors.prefecture!}
              />
            </Box>
            <Box mt={3} textAlign="center">
              <PrimaryButton label={"更新"} onClick={handleSubmit(doUpdate)} />
            </Box>
          </form>
        </Box>
      )}
    </Container>
  );
};

export default UserInfoForm;
