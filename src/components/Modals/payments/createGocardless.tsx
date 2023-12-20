import React, { useState } from "react";
import { Formik, Form } from "formik";
import { Row, Col } from "react-bootstrap"; // Replace with your layout library
import CustomModal from "../../../components/Modal/CustomModal";
import FormControl from "../../../components/FormControl";
import { PaymentPop } from "../../../screens/CreateSchool/AddPaymentSchool/PaymentPop";
import {
  fontFamilyMedium,
  fontFamilyRegular,
  lightBlue3,
  pureDark2,
} from "../../GlobalStyle";
import CustomButton from "../../CustomButton/CustomButton";
import show_password_icon from "../../../assets/icons/ic_show_passcode.svg";
import { createPaymentInitialValues } from "./constant";
import usePayment from "../../../hooks/usePayment";
import { AddPaymentMethod } from "../../../screens/Franchise/ViewFranchise/styles";
import { useParams } from "react-router-dom";
interface StripeKeysModalProps {
  open: boolean;
  onClose: (value: string) => void;
}
const GocardlessKeysModal: React.FC<StripeKeysModalProps> = (props) => {
  const initialValues: createPaymentInitialValues = {
    businessUC: "",
    id: 0,
    publishableKey: "",
    secretKey: "",
    accountName: "",
    paymentMethod: "",
    isActive: false,
    countryName: "",
    // accessToken: "",
    // clientId: "",
    // webhook: "",
    // clientSecret: "",
    // bankName: "",
    // accountHolder: "",
    // ibanNumber: "",
    // accountNumber: "",
    // sortCode: "",
    // bic: "",
  };
  const [iSModalVisible, setModelVisible] = useState(false);
  const { ID } = useParams();
  const { create_Stripe, loading } = usePayment();
  const handleCreateSubmit = async () => {
    await create_Stripe("SCHOOL", initialValues, ID);
  };

  return (
    <AddPaymentMethod>
      <CustomModal
        width="477px"
        children={
          <PaymentPop>
            <h3>Stripe keys</h3>
            <div>
              <Formik
                initialValues={initialValues}
                onSubmit={handleCreateSubmit}
              >
                {(formik) => {
                  return (
                    <Form name="basic" autoComplete="off">
                      <Row>
                        <Col md="12" className="mt-20">
                          <FormControl
                            control="input"
                            type="text"
                            name="accontTitle"
                            label="Account Title"
                            fontSize="16px"
                            max={6}
                            placeholder="Enter Account Title"
                          />
                        </Col>
                        <Col md="12" className="mt-20">
                          <FormControl
                            control="select"
                            type="select"
                            name="countryName"
                            label="Country Name"
                            fontSize="16px"
                            max={6}
                            placeholder="Select Country Name"
                          />
                        </Col>
                        <Col md="12" className="mt-20">
                          <FormControl
                            control="input"
                            type="text"
                            name="pulishableKey"
                            label="Publishable Key"
                            fontSize="16px"
                            max={6}
                            placeholder="Enter Publishable Key"
                          />
                        </Col>
                        <Col md="12" className="mt-20">
                          <FormControl
                            control="password"
                            type="text"
                            name="secretKey"
                            labelFamily={`${fontFamilyRegular}`}
                            labelMarginBottom="7px"
                            color={pureDark2}
                            label="Secret Key"
                            padding="10px"
                            placeholder="Enter Secret Key"
                            suffix={show_password_icon}
                            className="loginPassword"
                          />
                        </Col>
                        <Col
                          onClick={() => props.onClose("")}
                          md="12"
                          className="mt-20"
                        >
                          <CustomButton
                            bgcolor={lightBlue3}
                            textTransform="Captilize"
                            color={pureDark2}
                            padding="12.5px"
                            fontFamily={fontFamilyMedium}
                            width="100%"
                            type="submit"
                            title="Submit"
                            fontSize="16px"
                            loading={loading}
                          />
                        </Col>
                      </Row>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </PaymentPop>
        }
        isModalVisible={props.open}
        setIsModalVisible={setModelVisible}
      />
    </AddPaymentMethod>
  );
};

export default GocardlessKeysModal;
