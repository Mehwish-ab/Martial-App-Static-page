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
const SchoolGocardlessKeysModal: React.FC<StripeKeysModalProps> = (props) => {
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
  const { create_gocardless, loading } = usePayment();
  const {
    statusData: { activities, facilities },
    dropdowns: { currency, language, businessTypes, countryName },
  } = useSelector((state: RootState) => state.appData.data);
  const handleCreateSubmit = async (values: any) => {
    console.log("initial", values);

    // Ensure that values.publishableKey is not null before submitting
    if (values.publishableKey !== null) {
      const data = await create_gocardless("SCHOOL", values, props.id);
      if (data) props.onClose("");
    } else {
      // Handle the case where publishableKey is null
      console.error("Publishable key is null");
    }
  };
  return (
    <AddPaymentMethod>
      <CustomModal
        width="953px"
        onCancel={() => props.onClose("")}
        children={
          <PaymentPop>
            <h3>GoCardLess</h3>
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
                              <PlacesAutoCompleteInput
                                label="Country Name"
                                placeholder="Select Country Name"
                                handleChange={(val: any) => {
                                  formik.setFieldValue("countryName", val);
                                }}
                                className={
                                  formik.errors.countryName &&
                                  formik.touched.countryName
                                    ? "is-invalid"
                                    : "customInput"
                                }
                                formik={formik}
                                name="countryName"
                                value={formik.values.countryName}
                              />
                              {/* <FormControl
                                control="select"
                                type="text"
                                name="countryName"
                                label="Country Name"
                                fontSize="16px"
                                max={6}
                                placeholder="Select Country Name"
                                className={
                                  formik.errors.countryName &&
                                  formik.touched.countryName
                                    ? "is-invalid"
                                    : "customInput"
                                }
                                // options={options}
                                // value={value}
                                // onChange={changeHandler}
                              /> */}
                            </Col>
                          </Row>
                        </Col>
                        <Col md="12">
                          <Row>
                            <Col md="6" className="mt-20">
                              <FormControl
                                control="input"
                                type="text"
                                name="accessToken"
                                label="Access Token"
                                fontSize="16px"
                                max={6}
                                placeholder="Enter Access Token"
                              />
                            </Col>
                            <Col md="6" className="mt-20">
                              <FormControl
                                control="input"
                                type="text"
                                name="clientId"
                                label="Client Id"
                                fontSize="16px"
                                max={6}
                                placeholder="Enter Client Id"
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
                                name="webhook"
                                label="Webhook"
                                fontSize="16px"
                                max={6}
                                placeholder="Enter Webhook"
                              />
                            </Col>
                            <Col md="6" className="mt-20">
                              <FormControl
                                control="input"
                                type="text"
                                name="clientSecret"
                                label="Client Secret"
                                fontSize="16px"
                                max={6}
                                placeholder="Enter Client Secret"
                              />
                            </Col>
                          </Row>
                        </Col>
                        <Col md="12">
                          <Row>
                            <Col md="6" className="mt-20"></Col>
                            <Col md="6" className="mt-20">
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

export default SchoolGocardlessKeysModal;
