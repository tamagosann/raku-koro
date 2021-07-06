import { Inner } from "../components/inner";
import { FC } from "react";
import { FormLayout } from "../components/organisms";
import { useParams } from "react-router-dom";
const ThreadInfo: FC = () => {
  const { thread_id }: { thread_id: string } = useParams();
  return (
    <Inner>
      <FormLayout type={"threadinfo"} id={thread_id} />
    </Inner>
  );
};
export default ThreadInfo;
