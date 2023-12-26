import React, { useMemo, useState } from "react";
import { Formik, Form } from "formik";
import { Row, Col } from "react-bootstrap"; // Replace with your layout library
import CustomModal from "../../../../Modal/CustomModal";
import FormControl from "../../../../FormControl";
import { PaymentPop } from "../../../../../screens/CreateSchool/AddPaymentSchool/PaymentPop";
import {
  fontFamilyMedium,
  fontFamilyRegular,
  lightBlue3,
  pureDark2,
} from "../../../../GlobalStyle";
// import countryList from "react-select-country-list";

import CustomButton from "../../../../CustomButton/CustomButton";
import show_password_icon from "../../../assets/icons/ic_show_passcode.svg";
import { createPaymentInitialValues } from "../../constant";
import usePayment from "../../../../../hooks/usePayment";
import { AddPaymentMethod } from "../../../../../screens/Franchise/ViewFranchise/styles";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";
import { DataTypesWithIdAndMultipleLangLabel } from "../../../../../redux/features/types";
import { SelectOptionsDataTypes } from "../../../../../screens/Home/constants";
import PlacesAutoCompleteInput from "../../../../../maps/PlacesAutocomplete";
interface StripeKeysModalProps {
  open: boolean;
  onClose: (value: string) => void;
  id: any;
}

// const [value, setValue] = useState('')
// const options = useMemo(() => countryList().getData(), [])

// const changeHandler = (value:any) => {
//   setValue(value)

// }
const BankaccountSchoolKeysModal: React.FC<StripeKeysModalProps> = (props) => {
  const initialValues: createPaymentInitialValues = {
    businessUC: "",
    id: 0,
    publishableKey: "",
    secretKey: "",
    accountName: "",
    paymentMethod: "",
    isActive: false,
    countryName: "",
    accessToken: "",
    clientId: "",
    webhook: "",
    clientSecret: "",
    bankName: "",
    accountHolder: "",
    ibanNumber: "",
    accountNumber: "",
    sortCode: "",
    bic: "",
  };
  const { selectedLanguage } = useSelector(
    (state: RootState) => state.selectedLanguage
  );
  const createOptions = (list: DataTypesWithIdAndMultipleLangLabel[]) => {
    let options: SelectOptionsDataTypes[] = [];
    list?.forEach((item) => {
      let obj = {
        label: (item as any)[selectedLanguage],
        value: item.id,
      };

      options.push(obj);
    });

    return options;
  };

  const [iSModalVisible, setModelVisible] = useState(false);
  const { create_bankaccount, loading } = usePayment();
  const {
    statusData: { activities, facilities },
    dropdowns: { currency, language, businessTypes, countryName },
  } = useSelector((state: RootState) => state.appData.data);
  const handleCreateSubmit = async (values: any) => {
    const data = await create_bankaccount("SCHOOL", values, props.id);
    if (data) {
      window.location.reload();
      props.onClose("");
    }
  };
  const handleCancel = () => {
    setModelVisible(false);
  };

  return (
    <AddPaymentMethod>
      <CustomModal
        width="953px"
        onCancel={() => props.onClose("")}
        children={
          <PaymentPop>
            <h3>Bank Account</h3>
            <div>
              <Formik
                initialValues={initialValues}
                onSubmit={handleCreateSubmit}
              >
                {(formik) => {
                  return (
                    <Form name="basic" autoComplete="off">
                      <Row>
                        <Col md="12">
                          <Row>
                            <Col md="6" className="mt-20">
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
                            <Col md="6" className="mt-20">
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
                          </Row>
                        </Col>
                        <Col md="12">
                          <Row>
                            <Col md="6" className="mt-20">
                              <FormControl
                                control="input"
                                type="text"
                                name="bankName"
                                label="Bank Name"
                                fontSize="16px"
                                max={6}
                                placeholder="Enter Bank Name"
                              />
                            </Col>
                            <Col md="6" className="mt-20">
                              <FormControl
                                control="input"
                                type="text"
                                name="accountHolder"
                                label="Bank Account Holder"
                                fontSize="16px"
                                max={6}
                                placeholder="Enter Bank Account Holder"
                              />
                            </Col>
                          </Row>
                        </Col>
                        <Col md="12">
                          <Row>
                            <Col md="6" className="mt-20">
                              <FormControl
                                control="input"
                                type="text"
                                name="ibanNumber"
                                label="IBAN Number"
                                fontSize="16px"
                                max={6}
                                placeholder="Enter IBAN Number"
                              />
                            </Col>
                            <Col md="6" className="mt-20">
                              <FormControl
                                control="input"
                                type="text"
                                name="accountNumber"
                                label="Bank Account Number"
                                fontSize="16px"
                                max={6}
                                placeholder="Enter Bank Account Number"
                              />
                            </Col>
                          </Row>
                        </Col>
                        <Col md="12">
                          <Row>
                            <Col md="6" className="mt-20">
                              <FormControl
                                control="input"
                                type="text"
                                name="sortCode"
                                label="Sort Code"
                                fontSize="16px"
                                max={6}
                                placeholder="Enter Sort Code"
                              />
                            </Col>
                            <Col md="6" className="mt-20">
                              <FormControl
                                control="input"
                                type="text"
                                name="bic"
                                label="BIC"
                                fontSize="16px"
                                max={6}
                                placeholder="Enter BIC"
                              />
                            </Col>
                          </Row>
                        </Col>
                        <Col md="12">
                          <Row>
                            <Col md="6" className="mt-20"></Col>
                            <Col
                              md="6"
                              className="mt-20"
                              // onClick={() => props.onClose("")}
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

export default BankaccountSchoolKeysModal;
