import { IResolveParams, LoginSocialApple } from "reactjs-social-login";
import apple from "../../../assets/icons/ic_apple.svg";
import { OauthPropTypes } from "./constants";
import LoginButton from "./LoginButton";

const clientId = "com.martialapp.latestservice-id"; // need to change this
const AppleLogin = ({ usecase }: OauthPropTypes) => {
  const onResolve = (res: IResolveParams) => {
    console.log("apple res:", res);
  };
  const onReject = (err: any) => {
    console.log("apple error", err);
  };

  return (
    <LoginSocialApple
      client_id={clientId}
      onResolve={onResolve}
      onReject={onReject}
      scope={"name email"}
      // redirect_uri="http://localhost:3000/auth/callback/apple"
      redirect_uri="https://martialapp.com/auth/callback/apple "
    >
      <LoginButton type={apple} alt={"Apple"} />
    </LoginSocialApple>
  );
};

export default AppleLogin;
