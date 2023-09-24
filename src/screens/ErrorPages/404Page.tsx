import { NavLink } from "react-router-dom";
import ErrorImg from "../../assets/images/error.svg";
import { Button } from "../../components/styles/Button";
import ErrorPage404Style from "./style";

const ErrorPage404 = () => {
  return (
    <ErrorPage404Style>
      <img src={ErrorImg} alt="error-404-pic" />
      <NavLink to="/">
        <Button className="btn">Go Back</Button>
      </NavLink>
    </ErrorPage404Style>
  );
};

export default ErrorPage404;
