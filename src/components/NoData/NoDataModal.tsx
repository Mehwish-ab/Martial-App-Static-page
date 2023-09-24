import no_data from "../../assets/icons/ic_data_not found.svg";
import { NoDataModalStyle } from "./style";

type noDataProps = {
  error: string;
};
const NoModalData = ({ error }: noDataProps) => {
  return (
    <NoDataModalStyle>
      <img src={no_data} alt="no data" />
      <h4 className="mt-2">{error}</h4>
    </NoDataModalStyle>
  );
};

export default NoModalData;
