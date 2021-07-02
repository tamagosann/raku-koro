import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { Container, Box } from "@material-ui/core";
import { UserNameInput } from "../atoms/UserNameInput";
import { PrefectureSelectBox } from "../atoms/PrefectureSelectBox";
import { selectUser } from "../../features/user/userSlice";
import { useAppSelector } from "../../app/hooks";
import { PrimaryButton } from "../UIKit";
import { TextFieldInput } from "../atoms/TextFieldInput";
import {
  selectThread,
  ThreadDataType,
} from "../../features/thread/threadSlice";
import { updateThreadAsync } from "../../features/thread/threadSlice";
import { datetimeToString } from "../../common/functions";

const ThreadForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useAppSelector(selectUser);
  const thread = useAppSelector(selectThread);
  const [disable, setDisable] = useState(true);
  const { thread_id }: { thread_id: string } = useParams();

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
        if (thr._id === thread_id) {
          setValue("_id", thr._id);
          setValue("uid", thr.uid);
          setValue("username", thr.username);
          setValue("prefecture", thr.prefecture);
          setValue("comment", thr.comment);
          if (user !== null && thr.uid === user.uid) {
            setDisable(false);
          }
        }
      });
    }
  }, [thread, user]);

  const doUpdate: SubmitHandler<ThreadDataType> = (data) => {
    let date = new Date();
    data.date = datetimeToString(date);
    dispatch(updateThreadAsync(data));
    history.push("/threads");
  };
  return (
    <Container maxWidth="sm">
      <Box mt={3} textAlign="center">
        <h2>投稿内容</h2>
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
          <Box mt={1} textAlign="center">
            <PrimaryButton
              label={"更新"}
              onClick={handleSubmit(doUpdate)}
              disabled={disable}
            />
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default ThreadForm;
