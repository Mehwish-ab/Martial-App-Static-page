import styled from "styled-components";
import in_person from "../../assets/icons/ic_professional_meet_peron.svg";
import virtual from "../../assets/icons/ic_professional_meet_virtual.svg";
import { useNavigate } from "react-router-dom";
import {
  fontFamilyMedium,
  primaryColor,
  secondaryDark4,
} from "../../components/GlobalStyle";

type requestTourProps = {
  newsFeedId: number;
};

const RequestTour: React.FC<requestTourProps> = ({ newsFeedId }) => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <h6 className="heading">Request a Home Tour</h6>
      <div className="inner-section">
        <article className="tours d-flex">
          <button className="d-flex justify-content-center align-items-center gap-1 tour-btn1 btn w-100">
            <span>
              <img src={in_person} alt="person" />
            </span>
            <span
              className="mt-1 ms-2"
              onClick={() =>
                navigate("/in-person", {
                  state: {
                    newsFeedId,
                    visitType: "IN_PERSON",
                  },
                })
              }
            >
              In Person
            </span>
          </button>
          <button
            className="d-flex justify-content-center align-items-center gap-1 tour-btn2 btn w-100"
            onClick={() => navigate("/virtual")}
          >
            <span>
              <img src={virtual} alt="virtual" />
            </span>
            <span className="mt-1 ms-2">Virtual</span>
          </button>
        </article>
        {/* <Row>
          <Col md={6}>
            <CustomDate date={date} setDate={setDate} />
            {date && <p>Selected date: {date.format("DD MMM YYYY")}</p>}
          </Col>
          <Col md={6}>
            <CustomTime time={selectedTime} setTime={setSelectedTime} />
          </Col>
        </Row> */}
        <div className="mt-3">
          {/* <CustomButton
            bgcolor={primaryColor}
            color="white"
            padding="8px"
            width="100%"
            type="submit"
            title="Request for tour"
            margin="auto"
          /> */}
          <p className="cancal-payment">
            its free no obligation -cancel anytime
          </p>
        </div>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  .heading {
    font-family: ${fontFamilyMedium};
  }
  @media screen and (max-width: 1390px) {
    width: 100%;
  }
  .inner-section {
    border-radius: 10px;
    transition: all 0.4s;
    background-color: white;
    padding: 10px;
    padding-bottom: 0;
    border: 1px solid #e9e9e9;
    @media screen and (max-width: 1390px) {
      width: 440px;
    }
    @media screen and (max-width: 480px) {
      width: 100%;
    }
    .ant-input-textarea {
      margin-bottom: 24px;
      height: 230px;
    }

    input {
      padding: 6px;
    }
    .cancal-payment {
      margin-top: 7px;
    }
    .tours {
      padding: 10px;
      border-radius: inherit;
      display: grid;
      grid-gap: 10px;
      grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
      /* padding-bottom: 20px; */
      width: 400px;

      @media screen and (max-width: 480px) {
        width: 100%;
        grid-template-columns: 100%;
      }
    }
    .btn {
      text-transform: capitalize;
      outline: 1px solid #e6e4e4;
      border: 1px solid #ffffffb2;
      border-radius: 4px;
      padding: 5px;
      background-color: white;
      transition: all 0.4s;
    }
    .tour-btn1 {
      background-color: transparent;
      color: #0e0000;
      &:hover,
      :focus {
        background-color: #fff;
        color: #000;
      }
      &:active {
        color: #00000047;
        background-color: #07000024;
      }
    }
    .btn:hover {
      border: 1px solid ${primaryColor};
      background-color: #cbd2d638;
    }
    .tour-btn2 {
      /* &:is(:hover, :focus) {
      background-color: ${primaryColor};
      color: #ffffff;
    }
    &:active {
      color: #ffffff8f;
      background-color: #07000024;
    } */
    }
    .request-btn {
      width: 100%;
      background: ${primaryColor};

      font-size: 16px;
      text-transform: uppercase;
      letter-spacing: 0px;
      color: #ffffff;
      padding: 10px;
      /* &:is(:hover, :focus) {
      background-color: #790617;
      color: #d8d2d246;
    }
    &:active {
      background-color: #03020222;
      color: #ffffff8f;
    } */
    }
    p {
      text-align: center;
      letter-spacing: 0px;
      color: ${secondaryDark4};
    }
  }
`;
export default RequestTour;
