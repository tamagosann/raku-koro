import { useEffect, FC } from "react";
import { useDispatch } from "react-redux";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { Container, Box } from "@material-ui/core";
import { UserNameInput } from "../atoms/UserNameInput";
import { PrefectureSelectBox } from "../atoms/PrefectureSelectBox";
import { UserDataType } from "../../features/user/userSlice";
import { PrimaryButton } from "../UIKit";
import { TextFieldInput } from "../atoms/TextFieldInput";
import { ThreadDataType } from "../../features/thread/threadSlice";
import { createThreadAsync } from "../../features/thread/threadSlice";
import { datetimeToString } from "../../common/functions";

interface Props {
  user: UserDataType | null;
  errorMsg: string | null;
}
const CreateCommentForm: FC<Props> = ({ user, errorMsg }) => {
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FieldValues>({
    mode: "onBlur",
    defaultValues: {
      _id: "",
      date: "",
      uid: "",
      username: "",
      prefecture: "",
      comment: "",
    },
  });

  useEffect(() => {
    if (user) {
      setValue("uid", user.uid);
      setValue("username", user.username);
      setValue("prefecture", user.prefecture);
    }
  }, [user, setValue]);

  const doCreate: SubmitHandler<ThreadDataType> = (data) => {
    let date = new Date();
    data.date = datetimeToString(date);
    dispatch(createThreadAsync(data));
    setValue("comment", "");
  };
  return (
    <Container maxWidth="sm" style={{ padding: "5px 0 25px 0" }}>
      <Box textAlign="center">
        {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
        <form onSubmit={handleSubmit(doCreate)}>
          <Box mt={3} textAlign="center">
            <UserNameInput control={control} error={errors.username!} />
          </Box>
          <Box mt={3} textAlign="center">
            <PrefectureSelectBox control={control} error={errors.prefecture!} />
          </Box>
          <Box mt={3} textAlign="center">
            <TextFieldInput control={control} error={errors.comment!} />
          </Box>
          <Box mt={1} textAlign="center">
            <PrimaryButton label={"投稿"} onClick={handleSubmit(doCreate)} />
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default CreateCommentForm;
