import ProfileIntro from "../Custom/ProfileIntro";
import SuggestedUserProfile from "../Custom/SuggestedUserProfile";
import CustomButton from "../CustomButton/CustomButton";
import { primaryColor } from "../GlobalStyle";
import { SuggesstionsModalStyle } from "./style";

type suggestionModalProps = {
  setIsShowSugesstions: React.Dispatch<React.SetStateAction<boolean>>;
};
const SuggestionsModal: React.FC<suggestionModalProps> = ({
  setIsShowSugesstions,
}) => {
  return (
    <SuggesstionsModalStyle>
      <div className="d-flex justify-content-between align-items-center mt-3">
        <SuggestedUserProfile />
        <CustomButton
          bgcolor={primaryColor}
          color="white"
          padding="4px"
          width="100px"
          type="submit"
          title="Follow"
          margin="auto"
          fontFamily="EnnVisionsMedium"
          fontSize="14px"
          clicked={() => {}}
        />
      </div>
    </SuggesstionsModalStyle>
  );
};

export default SuggestionsModal;
