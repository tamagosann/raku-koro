import { Container } from "@material-ui/core";
import { FC } from "react";
import { FormLayout } from "../components/organisms";
const ThreadInfo:FC = () => {
    return (
      <Container maxWidth="md">
        <FormLayout type={"threadinfo"} />
      </Container>
    );
};
export default ThreadInfo;
