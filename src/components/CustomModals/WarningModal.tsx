import { Dispatch } from "react";
import { useParams } from "react-router-dom";
import logo from "../../assets/icons/ic_logo.svg";
import CustomButton from "../CustomButton/CustomButton";
import { primaryColor, secondaryDark3, tertiaryGrey13 } from "../GlobalStyle";
import { WarningModalStyle } from "./style";

type ennvisionModalProps = {
  setIsModalVisible: Dispatch<React.SetStateAction<boolean>>;
  title: string;
  description: string;
  isLoading: boolean;
  doTask: (userId: number) => void;
};

const EnnvisionWarningModal: React.FC<ennvisionModalProps> = ({
  setIsModalVisible,
  title,
  description,
  isLoading,
  doTask,
}) => {
  const { id } = useParams();
  return (
    <WarningModalStyle>
      <div className="inner-container">
        {/* <img src={logo} alt="logo" /> */}
        <h6 className="title mt-3">{title}</h6>
        <p className="description">{description}</p>
        <div className="mt-4 d-flex gap-2">
          <CustomButton
            bgcolor={tertiaryGrey13}
            color={secondaryDark3}
            padding="6px"
            width="100%"
            type="submit"
            title="No"
            disabled={isLoading}
            fontSize="16px"
            clicked={() => setIsModalVisible(false)}
          />
          <CustomButton
            bgcolor={primaryColor}
            color="white"
            padding="6px"
            width="100%"
            type="submit"
            title="YES!"
            fontSize="16px"
            loading={isLoading}
            clicked={() => doTask(+id!)}
          />
        </div>
      </div>
    </WarningModalStyle>
  );
};

export default EnnvisionWarningModal;
