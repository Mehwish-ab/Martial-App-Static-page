import { RightbarStyled } from "./styesl";
import arrowRight from "../../assets/icons/ic_arrow_right.svg";
import arrowLeft from "../../assets/icons/ic_arrow_left.svg";
import { Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setLanguage } from "../../redux/features/selectedLanguageSlice";
import rightMenu from "../../assets/images/Ic_right_menu.svg";
const Rightbar = () => {
  const dispatch = useDispatch();
  const handleChange = (value: string) => {
    dispatch(setLanguage(value));
  };
  const { selectedLanguage } = useSelector(
    (state: RootState) => state.selectedLanguage
  );
  return (
    <RightbarStyled>
      <img src={rightMenu} alt="" width={"100%"} />
      {/* <div className="custom-card pt-0 mt-0">
        <div className="bg-white profileimg">
          <img src="" alt="" />
        </div>
        <div className="language-select">
          <div className="language-select-inner">
            <Select
              defaultValue={selectedLanguage}
              style={{ width: 120 }}
              onChange={handleChange}
              options={[
                { value: "en", label: "English" },
                { value: "es", label: "Spanish (Español)" },
                { value: "pt", label: "Portuguese" },
                { value: "ar", label: "Arabic (العربية)" },
                { value: "ur", label: "Urdu (اردو)" },
              ]}
            />
          </div>
        </div>
      </div>
      <div className="row bg-white custom-card">
        <div className="col-md-6">
          <h3>Jiu Jitsu - Ranks</h3>
        </div>
        <div className="col-md-6 text-end">
          <img src={arrowLeft} alt="" />
          <a href="#">View All</a>
          <img src={arrowRight} alt="" />
        </div>
      </div>
      <div className="row bg-white custom-card">
        <div className="col-md-6">
          <h3>Upcoming Booking</h3>
        </div>
      </div>

      <div className="row bg-white custom-card">
        <div className="col-md-6">
          <h3>Videos</h3>
        </div>
        <div className="col-md-6 text-end">
          <img src={arrowLeft} alt="" />
          <a href="#">View All</a>
          <img src={arrowRight} alt="" />
        </div>
      </div> */}
    </RightbarStyled>
  );
};
export default Rightbar;
