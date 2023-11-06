import { SubscribeFranchiseStyled } from "./styles";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import CustomButton from "../../../components/CustomButton/CustomButton";
import {
  fontFamilyMedium,
  lightBlue3,
  pureDark,
} from "../../../components/GlobalStyle";

const SubscribeFranchise = () => {
  const CarouselItem = () => {
    return (
      <div className="plan">
        <div className="plan-heading">Basic Martial Arts Plan</div>
        <div className="plan-price">£30.00 PerMonth</div>
        <div className="plan-description">
          <div className="plan-description-heading">Description:</div>
          <div className="plan-description-para">
            This plan is designed for beginners and individuals looking to
            explore the world of martial arts. It offers access to fundamental
            martial arts classes and training.
          </div>
        </div>
        <div className="plan-features">
          <div className="plan-features-heading">Features:</div>
          <ul className="plan-features-list">
            <li className="plan-features-list-item">
              Access to basic martial arts classes, such as karate, taekwondo,
              or judo.
            </li>
            <li className="plan-features-list-item">
              Weekly group training sessions.
            </li>
            <li className="plan-features-list-item">
              Access to instructional videos and tutorials for fundamental
              techniques.
            </li>
            <li className="plan-features-list-item">
              Progress tracking and goal setting.
            </li>
            <li className="plan-features-list-item">
              Basic martial arts uniform (gi) included.
            </li>
            <li className="plan-features-list-item">
              Monthly belt testing and certification.
            </li>
          </ul>
        </div>
        <div className="plan-button">
          <CustomButton
            bgcolor={lightBlue3}
            textTransform="Captilize"
            color={pureDark}
            padding="12px 100px"
            fontFamily={`${fontFamilyMedium}`}
            width="100%"
            type="submit"
            title={"Subscribe"}
            fontSize="17px"
          />
        </div>
      </div>
    );
  };
  return (
    <SubscribeFranchiseStyled>
      <h3>Franchise Subscription Plans</h3>
      <div className="subscriptions">
        <CarouselItem />
        <CarouselItem />
        <CarouselItem />
        <CarouselItem />
        <CarouselItem />
      </div>
    </SubscribeFranchiseStyled>
  );
};

export default SubscribeFranchise;
