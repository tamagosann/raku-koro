import { Inner } from "../components/inner";
import { FC } from "react";
import { FormLayout } from "../components/organisms";
const ThreadInfo:FC = () => {
    return (
      <Inner>
        <FormLayout type={"threadinfo"} />
      </Inner>
    );
};
export default ThreadInfo;
