import { useNavigate } from "react-router-dom";
import logo from "../../assets/icons/ic_logo.svg";
import CustomButton from "../../components/CustomButton/CustomButton";
import { fontFamilyMedium, primaryColor } from "../../components/GlobalStyle";
import { EnnvisionModalStyle } from "./style";

type ennvisionsModalProps = {
  title?: string;
  description?: string;
  doTask: () => void;
  closeText?: string;
  bgBtn?: string;
  color?: string;
};
const EnnvisionModal: React.FC<ennvisionsModalProps> = ({
  title,
  description,
  doTask,
  closeText = "DISMISS",
  bgBtn = "transparent",
  color = primaryColor,
}) => {
  return (
    <EnnvisionModalStyle>
      <div className="inner-container">
        {/* <img src={logo} alt="logo" /> */}
        {title && <h6 className="title my-2">{title}</h6>}
        {description && <p className="description">{description}</p>}
        <div className="border-top"></div>
        <div className="my-1 mb-2">
          <CustomButton
            bgcolor={bgBtn}
            color={color}
            padding="4px"
            width="100%"
            type="submit"
            title={closeText}
            margin="auto"
            fontFamily={fontFamilyMedium}
            fontSize="18px"
            clicked={doTask}
          />
        </div>
      </div>
    </EnnvisionModalStyle>
  );
};

export default EnnvisionModal;
