import { CreateSchoolStyled } from "./styles";
import { ErrorMessage, Formik } from "formik";
import { Form } from "antd";

import { Col, Row } from "react-bootstrap";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import useScreenTranslation from "../../hooks/useScreenTranslation";
import { RootState } from "../../redux/store";
import useCreateSchool from "../../hooks/useCreateSchool";
// import { useParams } from "react-router-dom";
import {
  BELTS_SELECT_OPTIONS,
  CreateSchoolInitialValues,
  SelectOptionsDataTypes,
} from "../Home/constants";
import { validationFinder } from "../../utils/utilities";
import { DataTypesWithIdAndMultipleLangLabel } from "../../redux/features/types";
import FormControl from "../../components/FormControl";
import {
  fontFamilyMedium,
  fontFamilyRegular,
  lightBlue3,
  maastrichtBlue,
  pureDark,
} from "../../components/GlobalStyle";
import CustomPhoneInput from "../../components/CustomPhoneInput/CustomPhoneInput";
// import CheckboxesList from "../../components/CustomCheckbox/CheckboxesList";
// import PaymentInformation from "../../components/Common/PaymentInformation/PaymentInformation";
// import PaymentInfoTable from "../../components/Common/PaymentInformation/PaymentInfoTable";
// import CustomInputStyle from "../../components/CustomInput/style";
import CustomButton from "../../components/CustomButton/CustomButton";
import PlacesAutoCompleteInput from "../../maps/PlacesAutocomplete";
import CheckboxesSelect from "../../components/CustomCheckbox/CheckboxesSelect";
// import CustomInputStyle from "../../components/CustomInput/style";

const CreateSchool = () => {
  const { getLabelByKey } = useScreenTranslation("schoolCreate");
  const {
    statusData: { activities, facilities },
    dropdowns: { currency, language, businessTypes }
  } = useSelector((state: RootState) => state.appData.data);
  const { handleSubmit, loading } = useCreateSchool();

  const initialValues: CreateSchoolInitialValues = {
    businessName: "",
    businessType: "",
    address: "",
    businessPhoneNumber: "",
    belts: "",
    defaultLanguage: "",
    defaultCurrency: "",
    description: "",
    rank: true,
    defaultCurrencyId: 1,
    defaultLanguageId: 1,
    // ranks:"",
    // stripePublishableKey: "",
    // stripeSecretKey: "",
    // cardAccessToken: "",
    // cardClientId: "",
    // cardWebHook: "",
    // cardClientSecret: "",
    selectedActivities: [],
    selectedFacilities: [],
  };

  const { selectedLanguage } = useSelector(
    (state: RootState) => state.selectedLanguage
  );

  const businessName = validationFinder("BUSINESS_NAME")!;
  const businessNameReg = new RegExp(businessName.pattern);
  const address = validationFinder("ADDRESS")!;
  const addressReg = new RegExp(address.pattern);
  const businessPhoneNumber = validationFinder("PHONE_NUMBER")!;

  const validationSchema = Yup.object({
    businessName: Yup.string()
      .required(businessName.notBlankMsgEn)
      .matches(businessNameReg, businessName.patternMsgEn),
    address: Yup.string()
      .required(address.notBlankMsgEn)
      .matches(addressReg, address.patternMsgEn),

    businessType: Yup.string().required("Please select business type"),
    businessPhoneNumber: Yup.string().required(
      businessPhoneNumber.notBlankMsgEn
    ),
    belts: Yup.string().required("Please select belts"),
    defaultLanguage: Yup.string().required("Please select default language"),
    defaultCurrency: Yup.string().required("Please select default currency"),
    description: Yup.string().required("Please enter description"),
    // stripePublishableKey: Yup.string().required(
    //   "Please enter stipe publishable key"
    // ),
    // stripeSecretKey: Yup.string().required("Please enter stipe secret key"),
    // cardAccessToken: Yup.string().required("Please enter card access token"),
    // cardClientId: Yup.string().required("Please enter card client id"),
    // cardWebHook: Yup.string().required("Please enter card web hook"),
    // cardClientSecret: Yup.string().required("Please enter card client secret"),
    selectedActivities: Yup.array()
      .of(Yup.string().required("Select at least one activity"))
      .min(1, "Select at least one activity"),
    selectedFacilities: Yup.array()
      .of(Yup.string().required("Select at least one facility"))
      .min(1, "Select at least one facility"),
  });

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

  return (
    <CreateSchoolStyled>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => {
          return (
            <Form
              name="basic"
              onFinish={formik.handleSubmit}
              autoComplete="off"
            >
              <div className="bg-white form">
                <h3>School Information</h3>

                <Row>
                  <Col md="4" className="mt-20">
                    <FormControl
                      control="input"
                      type="text"
                      name="businessName"
                      label={getLabelByKey("businessName")}
                      fontSize="16px"
                      max={6}
                      placeholder={getLabelByKey("businessNamePlaceholder")}
                      className={
                        formik.errors.businessName &&
                          formik.touched.businessName
                          ? "is-invalid"
                          : "customInput"
                      }
                    />

                  </Col>
                  <Col md="4" className="mt-20">
                    <FormControl
                      control="select"
                      type="text"
                      name="businessType"
                      // prefix={<img src={lock_icon} alt="lock_icon" />}
                      label={getLabelByKey("businessType")}
                      placeholder={getLabelByKey("businessTypePlaceholder")}
                      className={
                        formik.errors.businessType &&
                          formik.touched.businessType
                          ? "is-invalid"
                          : "customInput"
                      }
                      options={createOptions(businessTypes)}
                    />
                  </Col>
                  <Col md="4" className="mt-20">
                    <CustomPhoneInput
                      label={getLabelByKey("businessPhoneNumber")}
                      name="businessPhoneNumber"
                      value={formik.values.businessPhoneNumber}
                      placeholder={getLabelByKey("businessPhoneNumber")}
                      limitMaxLength={true}
                      handleOnChange={(e: string) => {
                        formik.setFieldValue("businessPhoneNumber", e);
                      }}
                    />
                    <ErrorMessage name={"businessPhoneNumber"}>
                      {(msg) => (
                        <div
                          className="error-message is-invalid"
                          style={{
                            color: "red",
                            textAlign: "right",
                            marginLeft: "3px",
                            fontSize: "12px",
                            letterSpacing: "1px",
                            fontFamily: fontFamilyRegular,
                          }}
                        >
                          {msg}
                        </div>
                      )}
                    </ErrorMessage>
                  </Col>
                  <Col md="4" className="mt-20">
                    <PlacesAutoCompleteInput
                      label={getLabelByKey("address")}
                      placeholder={getLabelByKey("enterCompleteAddress")}
                      handleChange={(val: any) => {
                        formik.setFieldValue("address", val);
                      }}
                      className={
                        formik.errors.address && formik.touched.address
                          ? "is-invalid"
                          : "customInput"
                      }
                      formik={formik}
                      name="address"
                      value={formik.values.address}
                    />
                  </Col>
                  <Col md="8">
                    <Col md="4" className="mt-20 d-inline-block">
                      <FormControl
                        control="select"
                        type="text"
                        name="belts"
                        fontFamily={fontFamilyRegular}
                        // prefix={<img src={lock_icon} alt="lock_icon" />}
                        label={getLabelByKey("belts")}
                        placeholder={getLabelByKey("beltsPlaceholder")}
                        className={
                          formik.errors.belts && formik.touched.belts
                            ? "is-invalid"
                            : "customInput"
                        }
                        options={BELTS_SELECT_OPTIONS}
                      />
                    </Col>
                    <Col md="4" className="mt-20 d-inline-block px-3">
                      <FormControl
                        control="select"
                        type="text"
                        name="defaultLanguage"
                        fontFamily={fontFamilyRegular}
                        // prefix={<img src={lock_icon} alt="lock_icon" />}
                        label={getLabelByKey("defaultLanguage")}
                        placeholder={getLabelByKey("defaultLanguage")}
                        className={
                          formik.errors.defaultLanguage &&
                            formik.touched.defaultLanguage
                            ? "is-invalid"
                            : "customInput"
                        }
                        options={createOptions(language)}
                      />
                    </Col>
                    <Col md="4" className="mt-20 d-inline-block">
                      <FormControl
                        control="select"
                        type="text"
                        name="defaultCurrency"
                        fontFamily={fontFamilyRegular}
                        // prefix={<img src={lock_icon} alt="lock_icon" />}
                        label={getLabelByKey("defaultCurrency")}
                        placeholder={getLabelByKey("defaultCurrency")}
                        className={
                          formik.errors.defaultCurrency &&
                            formik.touched.defaultCurrency
                            ? "is-invalid"
                            : "customInput"
                        }
                        options={createOptions(currency)}
                      />
                    </Col>
                  </Col>
                  <Col md="6" className="">
                    <CheckboxesSelect
                      list={activities}
                      name="selectedActivities"
                      label={getLabelByKey("activity")}
                      showErrorMsgInList={false}
                    />
                  </Col>

                  <Col md="6" className="">
                    <CheckboxesSelect
                      name="selectedFacilities"
                      label={getLabelByKey("facilities")}
                      list={facilities}
                      showErrorMsgInList={false}
                    />
                  </Col>

                  <div className="mt-20">
                    <FormControl
                      control="textarea"
                      type="text"
                      name="description"
                      fontFamily={fontFamilyRegular}
                      // prefix={<img src={lock_icon} alt="lock_icon" />}
                      label={getLabelByKey("description")}
                      padding="10px"
                      placeholder={getLabelByKey("enterDescription")}
                      className={
                        formik.errors.description && formik.touched.description
                          ? "is-invalid"
                          : "customInput"
                      }
                      height="200px"
                    />
                  </div>
                </Row>
              </div>
              {/* <PaymentInformation formik={formik} /> */}
              {/* <PaymentInfoTable formik={formik} /> */}

              <div className="mt-20 d-flex justify-content-end">
                <CustomButton
                  bgcolor={lightBlue3}
                  textTransform="Captilize"
                  color={maastrichtBlue}
                  padding="14px 102.50px"
                  fontFamily={`${fontFamilyMedium}`}
                  width="fit-content"
                  type="submit"
                  title={getLabelByKey("primaryButton")}
                  fontSize="18px"
                  loading={loading}
                />
              </div>
            </Form>
          );
        }}
      </Formik>
    </CreateSchoolStyled>
  );
};

export default CreateSchool;
