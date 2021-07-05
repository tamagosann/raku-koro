import { useAppSelector } from "../../app/hooks";
import { Redirect } from "react-router";
import { selectUid } from "../../features/user/userSlice";
const Auth = ({ children }: { children: any }) => {
  const uid = useAppSelector(selectUid);
  if (uid) {
    return children;
  } else {
    return <Redirect to={"/login"} />;
  }
};

export default Auth;
