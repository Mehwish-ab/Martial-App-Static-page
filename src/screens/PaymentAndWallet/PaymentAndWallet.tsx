import { Col, Container, Row } from "react-bootstrap";
import {
  TertiraryHeading,
  primaryColor,
} from "../../components/GlobalStyle";
import PaymentAndWalletStyle from "./style";
import CustomButton from "../../components/CustomButton/CustomButton";
import { useNavigate } from "react-router-dom";
import placeholder from "../../assets/icons/ic_data_not found.svg";
import { useEffect, useRef, useState } from "react";
import visa from "../../assets/icons/visa_card_icon.svg";
import master from "../../assets/icons/master_card_icon.svg";
import axios from "axios";
import {
  authorizationToken,
  credit_cards__list_url,
  delete_credit_card_url,
  mark_credit_card_default_url,
} from "../../utils/api_urls";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../redux/store";
import { toast } from "react-toastify";
import unselectIcon from "../../assets/icons/ic_select_gry.svg";
import selectIcon from "../../assets/icons/ic_select_red.svg";
import deleteIcon from "../../assets/icons/ic_delete.svg";
import CreditCardSkeleton from "../../components/Skeletons/CreditCards";
import NoDataFound from "../../components/NoData/NoDataFound";

export type creditCardTypes = {
  id: number;
  brand: string;
  cardNumber: string;
  cardHolderName: string;
  expiryMonth: string;
  expiryYear: string;
  cvcNumber: string;
  stripeCardId: string;
  isDefault: boolean;
};

const PaymentAndWallet = () => {
  const navigate = useNavigate();
  const [cardsData, setCardsData] = useState([] as creditCardTypes[]);
  const [error, setError] = useState(null as any);
  const [loading, setLoading] = useState(false);
  const { data: loginData } = useAppSelector(
    (state: RootState) => state.loginData
  );
  const deleteCardToastId = useRef<any>(null);
  const cardDefaultToastId = useRef<any>(null);

  // credit card brands
  const cardBrands: any = {
    VisaCard: visa,
    Mastercard: master,
  };

  // credit card toggler
  const togglePayment = (index: number) => {
    // const data = [...payments];
    // const unSelectData = data.map((paymentData) => {
    //   return paymentData.select === true
    //     ? { ...paymentData, select: false }
    //     : paymentData;
    // });
    // unSelectData[index].select = !data[index].select;
    // setPayments(unSelectData);
  };

  // make card default promise
  const makeCardDefaultPromise = async (cardId: number, isDefault: boolean) => {
    // if card is already default then do nothing
    if (isDefault) return;
    try {
      const { data } = await axios.post(
        mark_credit_card_default_url,
        {
          cardId,
        },
        {
          headers: {
            ...authorizationToken(loginData!),
          },
        }
      );
      const defaultCardsData = cardsData.map((cardData) => ({
        ...cardData,
        isDefault: false,
      }));
      const updatedCardsData = defaultCardsData.map((cardData) =>
        cardData.id === cardId ? { ...cardData, isDefault: true } : cardData
      );
      setCardsData(updatedCardsData);
      cardDefaultToastId.current = toast("card default successfully...", {
        type: "success",
      });

      console.log({ data });
    } catch (error) {
      console.log({ error });
      cardDefaultToastId.current = toast("something went wrong ", {
        type: "error",
      });
    }
  };

  // delete credit card
  type deleteCardTypes = {
    cardId: number;
    stripeCardId: string;
    userId: number;
  };
  const deleteCreditCard = async ({
    cardId,
    stripeCardId,
    userId,
  }: deleteCardTypes) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        delete_credit_card_url,
        {
          cardId,
          stripeCardId,
          userId,
        },
        {
          headers: {
            ...authorizationToken(loginData!),
            "Content-Type": "application/json",
          },
        }
      );
      setCardsData(data.results);
      setLoading(false);
      deleteCardToastId.current = toast("card deleted successfully...", {
        type: "success",
      });
      console.log(data);
      creditCardListHandler();
    } catch (error: any) {
      const { data } = error.response;
      deleteCardToastId.current = toast(error.responseMessage, {
        type: "success",
      });
      setError(data);
      console.log({ error });
      setLoading(false);
    }
  };

  // handle credit cards list
  const creditCardListHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        credit_cards__list_url,
        {
          userId: loginData?.userDetails.id,
        },
        {
          headers: {
            ...authorizationToken(loginData!),
            "Content-Type": "application/json",
          },
        }
      );
      setCardsData(data.results);
      setLoading(false);
      console.log(data);
    } catch (error: any) {
      const { data } = error.response;
      if (data.responseCode === "400") {
        setCardsData([]);
      }
      setError(data);
      console.log({ error });
      setLoading(false);
    }
  };
  useEffect(() => {
    creditCardListHandler();
  }, []);

  return (
    <Container>
      <PaymentAndWalletStyle>
        <Row>
          <Col sm={0} md={1} lg={2} />
          <Col sm={6} md={5} lg={4}>
            <div className="left-side">
              <span>
                <h6 className="heading">Credit Card Info</h6>
              </span>
              <div className="left-side-inner-section">
                <div className="credit-card-side mt-4 mt-md-0">
                  {loading ? (
                    <CreditCardSkeleton />
                  ) : error ? (
                    <div className="no-cards-found">
                      <NoDataFound />
                    </div>
                  ) : (
                    <div className="payments">
                      <div className="cards-section">
                        {cardsData?.map(
                          ({
                            id,
                            brand,
                            cardHolderName,
                            cardNumber,
                            isDefault,
                            stripeCardId,
                          }) => (
                            <div
                              onClick={() => togglePayment(id)}
                              key={id}
                              className="payments-type d-flex align-items-center"
                            >
                              <img
                                onClick={() =>
                                  makeCardDefaultPromise(id, isDefault)
                                }
                                src={isDefault ? selectIcon : unselectIcon}
                                alt={`${isDefault ? "select-icon" : "unselect-icon"
                                  }`}
                                className="select me-3"
                              />
                              <img
                                src={cardBrands[brand]}
                                className="cursor-pointer"
                                alt="plus"
                              />
                              <div className="ms-3 d-flex justify-content-between w-100 align-items-center cursor-pointer cards-section">
                                <div>
                                  <h6 className="step-title mb-2">
                                    {cardHolderName}
                                  </h6>
                                  <p className="step-subtitle mb-0">
                                    {cardNumber.padStart(16, "*")}
                                  </p>
                                </div>
                              </div>
                              <img
                                src={deleteIcon}
                                className="fs-4 ms-auto mt-2 mb-3 delete-icon"
                                onClick={() =>
                                  deleteCreditCard({
                                    cardId: id,
                                    stripeCardId,
                                    userId: loginData?.userDetails.id!,
                                  })
                                }
                                alt="delete-icon"
                              />
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="my-2 d-flex justify-content-center">
              <CustomButton
                bgcolor={primaryColor}
                color="white"
                padding="8px"
                width="92%"
                type="submit"
                title="Add New Card"
                margin="auto"
                fontFamily="EnnVisionsMedium"
                fontSize="16px"
                clicked={() => navigate("/add-credit-card")}
              />
            </div>
          </Col>
          <Col sm={6} md={5} lg={4}>
            <div className="right-side">
              <TertiraryHeading className="heading">
                Bank Account Info
              </TertiraryHeading>
              <div className="inner-section">
                <div className="center-section">
                  <img
                    src={placeholder}
                    className="right-side-placeholder"
                    alt="placeholder"
                  />
                  <h6 className="comming-soon-text">Comming Soon</h6>
                </div>
              </div>
            </div>
          </Col>
          <Col sm={0} md={1} lg={2} />
        </Row>

        {/* <div className="credit-section">
          <p className="text-center title">Add & Withdraw Cerdit</p>
          <div className="d-flex justify-content-between gap-2">
            <CustomButton
              bgcolor={primaryColor}
              color="white"
              padding="8px 8px"
              border={`1px solid ${lightGrey2}`}
              width="100%"
              type="submit"
              title="Add Cerdit"
              margin="auto"
              fontFamily="EnnVisionsMedium"
              fontSize="16px"
            />
            <CustomButton
              bgcolor={primaryColor}
              color="white"
              padding="8px 8px"
              border={`1px solid ${lightGrey2}`}
              width="100%"
              type="submit"
              title="Withdraw Cerdit"
              margin="auto"
              fontFamily="EnnVisionsMedium"
              fontSize="16px"
            />
          </div>
        </div>
        <div className="d-flex justify-content-center gap-2 mt-3">
          <div className="add-card-section">
            <p className="title">Credit Cards</p>
            <p className="sub-title">
              Add a card to enjoy a seamless payments experience
            </p>
            <div className="d-flex justify-content-center">
              <CustomButton
                bgcolor={primaryColor}
                color="white"
                padding="8px 8px"
                width="100%"
                type="submit"
                title="Add Card"
                margin="auto"
                fontFamily="EnnVisionsMedium"
                fontSize="16px"
                clicked={() => navigate("/add-credit-card")}
              />
            </div>
          </div>
          <div className="add-bank-section">
            <p className="title">Bank Info</p>
            <p className="sub-title">
              Add a Bank info to enjoy a seamless payments experience
            </p>
            <div className="d-flex justify-content-center">
              <CustomButton
                bgcolor={primaryColor}
                color="white"
                padding="8px 8px"
                width="100%"
                type="submit"
                title="Add Bank"
                margin="auto"
                fontFamily="EnnVisionsMedium"
                fontSize="16px"
                clicked={() => navigate("/add-bank-account")}
              />
            </div>
          </div>
        </div> */}
      </PaymentAndWalletStyle>
    </Container>
  );
};

export default PaymentAndWallet;
