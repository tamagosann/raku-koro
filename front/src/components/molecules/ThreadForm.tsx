import { useEffect, useState, FC } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { Container, Box } from "@material-ui/core";
import { UserNameInput } from "../atoms/UserNameInput";
import { PrefectureSelectBox } from "../atoms/PrefectureSelectBox";
import { UserDataType } from "../../features/user/userSlice";
import { PrimaryButton } from "../UIKit";
import { TextFieldInput } from "../atoms/TextFieldInput";
import { ThreadDataType } from "../../features/thread/threadSlice";
import { updateThreadAsync } from "../../features/thread/threadSlice";
import { datetimeToString } from "../../common/functions";

interface Props {
  user: UserDataType | null;
  thread: ThreadDataType[] | null;
  errorMsg: string | null;
  threadId: string;
}

const ThreadForm: FC<Props> = ({ user, thread, errorMsg, threadId }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [disable, setDisable] = useState(true);

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
    if (thread) {
      thread.forEach((thr) => {
        if (thr._id === threadId) {
          setValue("_id", thr._id);
          setValue("uid", thr.uid);
          setValue("username", thr.username);
          setValue("prefecture", thr.prefecture);
          setValue("comment", thr.comment);
          if (user !== null && thr.uid === user.uid) {
            setDisable(false);
          } else {
            setDisable(true);
          }
        }
      });
    }
  }, [thread, user, threadId, setDisable, setValue]);

  const doUpdate: SubmitHandler<ThreadDataType> = (data) => {
    let date = new Date();
    data.date = datetimeToString(date);
    dispatch(updateThreadAsync(data));
    history.push("/threads");
  };
  return (
    <Container maxWidth="sm" style={{ padding: "5px 0 25px 0" }}>
      <Box mt={3} textAlign="center">
        <h2>投稿内容</h2>
        {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
        <form onSubmit={handleSubmit(doUpdate)}>
          <Box mt={3} textAlign="center">
            <UserNameInput
              control={control}
              error={errors.username!}
              disabled={disable}
            />
          </Box>
          <Box mt={3} textAlign="center">
            <PrefectureSelectBox
              control={control}
              error={errors.prefecture!}
              disabled={disable}
            />
          </Box>
          <Box mt={3} textAlign="center">
            <TextFieldInput
              control={control}
              error={errors.comment!}
              disabled={disable}
            />
          </Box>
          {!disable && (
            <Box mt={1} textAlign="center">
              <PrimaryButton
                label={"更新"}
                onClick={handleSubmit(doUpdate)}
                disabled={disable}
              />
            </Box>
          )}
        </form>
      </Box>
    </Container>
  );
};

export default ThreadForm;
