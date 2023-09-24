import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Loader from "../../components/Loader/Loader";
import warningImg from "../../assets/images/warning.png";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import Head from "../../components/Head/Head";
import axios from "axios";
import { credit_cards__list_url } from "../../utils/api_urls";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../redux/store";

type creditCardTypes = {
  userId: number;
  userName: string;
  phoneNumber: string;
  brand: string;
  cardHolderName: string;
  cardNumber: string;
  expiryMonthYear: string;
  cvcNumber: string;
}[];

const CreditCards = () => {
  const creditCardsToastId = useRef<any>(null);
  const { creditCardId } = useParams();
  const deleteCardToastId = useRef<any>(null);
  const [cardsData, setCardsData] = useState("");
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const { data } = useAppSelector((state: RootState) => state.loginData);

  // credit cards promise
  const getCreditCardHandler = async () => {
    try {
      const { data: creditCardsData } = await axios.post(
        credit_cards__list_url,
        {
          userId: data?.userDetails.id,
        },
        {
          headers: {
            Authorization: `Bearer ${data?.jwtDetails.token}`,
          },
        }
      );
      setCardsData(creditCardsData);
      creditCardsToastId.current = toast("got data successfully", {
        type: "success",
      });
    } catch (error: any) {
      setError(error.responseMessage);
      creditCardsToastId.current = toast(error.responseMessage, {
        type: "error",
      });
    }
  };

  useEffect(() => {
    getCreditCardHandler();
  }, []);

  // delete credit card promise
  const deteleCreditCardHandler = async (id: number) => {
    creditCardsToastId.current = toast("deleting card...", {
      type: "warning",
    });
    const { data: response } = await axios(
      "user_credit_cards" + "/" + id + "/delete"
    );
    return response.data;
  };

  if (loading) return <Loader />;
  if (error)
    return (
      <article>
        <img src={warningImg} alt="error" />
        <p className="text-center fs-5 mt-2 fw-bold">something went wrong</p>
      </article>
    );

  return (
    <Container>
      <Head title="credit-cards" />
      {/* <CreditCardsStyle>
        <PrimaryHeading2>Credit Cards</PrimaryHeading2>
        {creditCardsData?.map(({ id, cartNumber, brand, holder_name }) => (
            <div
              key={id}
              className="d-flex justify-content-between align-items-center credit-card"
            >
              <Card
                brand={brand}
                holder_name={holder_name}
                cartNumber={cartNumber}
              />
              <DeleteOutlined
                className="fs-4 ms-2 mt-2 mb-3"
                onClick={() => {
                }}
              />
            </div>
          ))}
      </CreditCardsStyle> */}
    </Container>
  );
};

export default CreditCards;
