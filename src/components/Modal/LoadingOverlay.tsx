import Loader from "../Loader/Loader";
import { LoadingOverlayStyle } from "./style";

type loadingOverlayProps = {
  message: string;
};
const LoadingOverlay: React.FC<loadingOverlayProps> = ({ message }) => {
  return (
    <LoadingOverlayStyle
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div>
        <p className="message" style={{}}>
          {message}
        </p>
        <Loader />
      </div>
    </LoadingOverlayStyle>
  );
};

export default LoadingOverlay;
