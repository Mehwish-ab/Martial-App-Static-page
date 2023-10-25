import { UpcomingBookingBoxStyled } from "./styesl";
import videoThumbnail from "../../assets/images/Event_Image.svg";
import actionMenuToggler from "../../assets/icons/ic_action_menu_toggler.svg";
import bookedIcon from "../../assets/icons/ic_booked.svg";
import detailsIcon from "../../assets/icons/ic_details.svg";

import {
  darkBlue,
  fontFamilyBold,
  lightBlue3,
  lightGrey14,
  pureDark,
  tertiaryGrey21,
} from "../GlobalStyle";
import CustomButton from "../CustomButton/CustomButton";
const SectionUpcomingBooking = () => {
  return (
    <div className="bg-white custom-card upcoming-booking-box px-0">
      <div
        className="d-flex justify-content-between"
        style={{ paddingLeft: 10, paddingRight: 10 }}
      >
        <h3>Upcoming Booking</h3>
        <div className="view-btn">
          <a href="#">View All</a>
        </div>
      </div>

      <UpcomingBookingBoxStyled>
        {[1, 2, 3, 4, 5].map((item) => {
          return (
            <div className="one-booking" key={item}>
              <div className="d-flex justify-content-between gap-2 one-booking-inner">
                <div className="one-booking-detail">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="one-booking-heading">Jiu Jitsu</span>
                    <span className="one-booking-numbers">
                      14/30
                      <img src={actionMenuToggler} alt="" />
                    </span>
                  </div>
                  <div
                    className="d-flex justify-content-between mb-2"
                    style={{ borderBottom: `1px solid ${tertiaryGrey21}` }}
                  >
                    <span className="one-booking-date">Mon 21 Aug 2023</span>
                    <span className="one-booking-time">
                      07:00 PM - 08:30 PM
                    </span>
                  </div>
                  <div className="d-flex gap-2 mt-2">
                    <CustomButton
                      bgcolor={lightGrey14}
                      textTransform="Captilize"
                      color={pureDark}
                      padding="8px"
                      fontFamily={fontFamilyBold}
                      width="100%"
                      type="submit"
                      title={"Details"}
                      fontSize="14px"
                      icon={<img src={detailsIcon} alt="details" />}
                    />
                    <CustomButton
                      bgcolor={lightBlue3}
                      textTransform="Captilize"
                      color={darkBlue}
                      padding="8px"
                      fontFamily={fontFamilyBold}
                      width="100%"
                      type="submit"
                      title={"Booked"}
                      fontSize="14px"
                      icon={<img src={bookedIcon} alt="booked" />}
                    />
                  </div>
                </div>
                <div className="video-thumbnail">
                  <img src={videoThumbnail} alt="" />
                </div>
              </div>
            </div>
          );
        })}
      </UpcomingBookingBoxStyled>
    </div>
  );
};

export default SectionUpcomingBooking;
