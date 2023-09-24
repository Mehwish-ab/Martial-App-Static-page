import PuffLoader from "react-spinners/PuffLoader";
import LoaderStyle from "./style";

const Loader = () => {
  return (
    <LoaderStyle>
      <PuffLoader color="rgb(138, 166, 161)" loading={true} />
    </LoaderStyle>
  );
};

export default Loader;
