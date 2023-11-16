import { useState } from "react";
import { ErrorMessage, Formik } from "formik";
import { Form } from "antd";

import { Col, Row } from "react-bootstrap";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import useScreenTranslation from "../../../hooks/useScreenTranslation";
import { RootState } from "../../../redux/store";
import {
  SelectOptionsDataTypes,
} from "../../Home/constants";
import { validationFinder } from "../../../utils/utilities";
import { DataTypesWithIdAndMultipleLangLabel } from "../../../redux/features/types";
import FormControl from "../../../components/FormControl";
import {
  fontFamilyMedium,
  lightBlue3,
  pureDark,
  pureDark2,
} from "../../../components/GlobalStyle";
import CustomPhoneInput from "../../../components/CustomPhoneInput/CustomPhoneInput";
import CustomButton from "../../../components/CustomButton/CustomButton";
import { CreateSchoolStyled } from "../../CreateSchool/styles";
import { CreateInstructorInitialValues } from "../constant";
import useBranch from "../../../../src/screens/Franchise/hooks/useFranchise";
import CheckboxesSelect from "../../../components/CustomCheckbox/CheckboxesSelect";
import PlacesAutoCompleteInput from "../../../maps/PlacesAutocomplete";
import TermsAndConditions from "../../../components/TermsAndConditions/TermsAndConditions";

const CreateInstructor = () => {
  const { getLabelByKey } = useScreenTranslation("instructorCreate");
  const {
    statusData: { activities, facilities, businessTypes },
  } = useSelector((state: RootState) => state.appData.data);

  const { loading, handleSubmit } = useBranch();

  const initialValues: CreateInstructorInitialValues = {
    instructorName: "",
    emailAddress: "",
    instructorPhoneNumber: "",
    address: "",
    yearsOfExperience: "",
    ranking: "",
    latestCertification: "",
    description: "",
    selectedActivities: [],
    selectedFacilities: [],
    termCondition: "",
    ranks: ""
  };

  const { selectedLanguage } = useSelector(
    (state: RootState) => state.selectedLanguage
  );

  const franchiseName = validationFinder("BUSINESS_NAME")!;
  const franchiseNameReg = new RegExp(franchiseName.pattern);
  const address = validationFinder("ADDRESS")!;
  const addressReg = new RegExp(address.pattern);
  const emailAddress = validationFinder("EMAIL_ADDRESS")!;
  const emailAddressReg = new RegExp(emailAddress.pattern);

  const franchisePhoneNumber = validationFinder("PHONE_NUMBER")!;
  const [terms, setTerms] = useState(false);
  const [showTermsError] = useState(false);

  const validationSchema = Yup.object({
    franchiseName: Yup.string()
      .required(franchiseName.notBlankMsgEn)
      .matches(franchiseNameReg, franchiseName.patternMsgEn),
    address: Yup.string()
      .required(address.notBlankMsgEn)
      .matches(addressReg, address.patternMsgEn),
    emailAddress: Yup.string()
      .required(emailAddress.notBlankMsgEn)
      .matches(emailAddressReg, emailAddress.patternMsgEn),
    franchisePhoneNumber: Yup.string().required(
      franchisePhoneNumber.notBlankMsgEn
    ),
    belts: Yup.string().required("Please select belts"),
    description: Yup.string().required("Please enter description"),
    defaultLanguage: Yup.string().required("Please select default language"),
    defaultCurrency: Yup.string().required("Please select default currency"),
    selectedActivities: Yup.array()
      .of(Yup.string().required("Select an activity"))
      .min(1, "Select at least one activity"),
    selectedFacilities: Yup.array()
      .of(Yup.string().required("Select an activity"))
      .min(1, "Select at least one facility"),
    // stripePublishableKey: Yup.string().when("schoolStripeMethod", {
    //   is: false,
    //   then: Yup.string().required("Please enter stripe publishable key"),
    //   otherwise: Yup.string().notRequired(),
    // }),
    // stripeSecretKey: Yup.string().when("schoolStripeMethod", {
    //   is: false,
    //   then: Yup.string().required("Please enter stripe secret key"),
    //   otherwise: Yup.string().notRequired(),
    // }),
    // cardAccessToken: Yup.string().when("schoolGclMethod", {
    //   is: false,
    //   then: Yup.string().required("Please enter card access token"),
    //   otherwise: Yup.string().notRequired(),
    // }),
    // cardClientId: Yup.string().when("schoolGclMethod", {
    //   is: false,
    //   then: Yup.string().required("Please enter card client id"),
    //   otherwise: Yup.string().notRequired(),
    // }),
    // cardWebHook: Yup.string().when("schoolGclMethod", {
    //   is: false,
    //   then: Yup.string().required("Please enter card web hook"),
    //   otherwise: Yup.string().notRequired(),
    // }),
    // cardClientSecret: Yup.string().when("schoolGclMethod", {
    //   is: false,
    //   then: Yup.string().required("Please enter card client secret"),
    //   otherwise: Yup.string().notRequired(),
    // }),
    // schoolStripeMethod: Yup.boolean(),
    // schoolGclMethod: Yup.boolean(),
  });

  const createOptions = (list: DataTypesWithIdAndMultipleLangLabel[]) => {
    let options: SelectOptionsDataTypes[] = [];
    list.forEach((item) => {
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
        // validationSchema={validationSchema}
        onSubmit={() => {}}
      >
        {(formik) => {
          return (
            <Form
              name="basic"
              onFinish={formik.handleSubmit}
              autoComplete="off"
            >
              <div className="bg-white form">
                <h3 style={{ color: pureDark2 }}>Instructor Information</h3>

                <Row>
                  <Col md="4" className="mt-20">
                    <FormControl
                      control="input"
                      type="text"
                      name="instructorName"
                      // label={getLabelByKey("instructorName")}
                      label="Instructor Name"
                      padding="10px"
                      fontFamily={fontFamilyMedium}
                      fontSize="16px"
                      max={6}
                      // placeholder={getLabelByKey("instructorName")}
                      placeholder="Instructor Name"
                      className={
                        formik.errors.instructorName &&
                        formik.touched.instructorName
                          ? "is-invalid"
                          : "customInput"
                      }
                    />
                  </Col>
                  <Col md="4" className="mt-20">
                    <FormControl
                      control="input"
                      type="email"
                      name="emailAddress"
                      fontFamily={fontFamilyMedium}
                      // label={getLabelByKey("emailAddress")}
                      label="Email Address"
                      padding="10px"
                      // placeholder={getLabelByKey("emailAddress")}
                      placeholder="Email address"
                      className={
                        formik.errors.emailAddress &&
                        formik.touched.emailAddress
                          ? "is-invalid"
                          : "customInput"
                      }
                      options={createOptions(businessTypes)}
                    />
                  </Col>
                  <Col md="4" className="mt-20">
                    <CustomPhoneInput
                      // label={getLabelByKey("instructorPhoneNumber")}
                      label="Instructor Phone Number"
                      name="instructorPhoneNumber"
                      value={formik.values.instructorPhoneNumber}
                      placeholder={getLabelByKey("instructorPhoneNumber")}
                      limitMaxLength={true}
                      handleOnChange={(e: string) => {
                        formik.setFieldValue("franchisePhoneNumber", e);
                      }}
                    />
                    <ErrorMessage name={"franchisePhoneNumber"}>
                      {(msg) => (
                        <div className="error-message is-invalid">{msg}</div>
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
                        control="input"
                        type="date"
                        name="yearsOfExperience"
                        fontFamily={fontFamilyMedium}
                        // label={getLabelByKey("yearsOfExperience")}
                        // suffix={<img src={IC_Calendar} alt="IC_Calendar" />}
                        // suffix={IC_Calendar}
                        label="Years Of Experience"
                        padding="10px"
                        // placeholder={getLabelByKey("yearsOfExperience")}
                        placeholder="Years Of Experience"
                        className={
                          formik.errors.yearsOfExperience &&
                          formik.touched.yearsOfExperience
                            ? "is-invalid"
                            : "customInput"
                        }
                      />
                    </Col>
                    <Col md="4" className="mt-20 d-inline-block ps-3">
                      <FormControl
                        control="select"
                        type="text"
                        name="ranks"
                        fontFamily={fontFamilyMedium}
                        // label={getLabelByKey("ranking")}
                        label="Ranking"
                        padding="10px"
                        // placeholder={getLabelByKey("ranking")}
                        placeholder="English"
                        className={
                          formik.errors.ranks && formik.touched.ranks
                            ? "is-invalid"
                            : "customInput"
                        }
                      />
                    </Col>
                    <Col md="4" className="mt-20 d-inline-block ps-3">
                      <FormControl
                        control="input"
                        type="upload"
                        name="latestCertification"
                        fontFamily={fontFamilyMedium}
                        // label={getLabelByKey("latestCertification")}
                        label="Latest Certification"
                        padding="10px"A
                        // placeholder={getLabelByKey("latestCertification")}
                        placeholder="Pound"
                        className={
                          formik.errors.latestCertification &&
                          formik.touched.latestCertification
                            ? "is-invalid"
                            : "customInput"
                        }
                      />
                    </Col>
                  </Col>

                  <Col md="6">
                    <CheckboxesSelect
                      name="selectedFacilities"
                      label="Specializations"
                      list={facilities}
                      showErrorMsgInList={false}
                    />
                  </Col>

                  <Col md="6">
                    <CheckboxesSelect
                      name="selectedActivities"
                      label="Activities"
                      list={activities}
                      showErrorMsgInList={false}
                    />
                  </Col>

                  <div className="mt-20">
                    <FormControl
                      control="textarea"
                      type="text"
                      name="description"
                      fontFamily={fontFamilyMedium}
                      // prefix={<img src={lock_icon} alt="lock_icon" />}
                      label={getLabelByKey("description")}
                      padding="10px"
                      placeholder={getLabelByKey("description")}
                      className={
                        formik.errors.description && formik.touched.description
                          ? "is-invalid"
                          : "customInput"
                      }
                      height="200px"
                    />
                  </div>

                  <div className="mt-14 d-flex align-content-start justify-content-start">
                    <TermsAndConditions
                      setTerms={setTerms}
                      showTermsError={showTermsError}
                      terms={terms}
                      screen={"franchiseCreate"}
                    />
                    <div className="signup-text mt-3">
                      <p className="mb-0" id="terms">
                        {getLabelByKey("termCondition")}
                        Terms and conditions
                      </p>
                    </div>
                  </div>
                  <div className="mt-14 d-flex align-content-start justify-content-start">
                    <TermsAndConditions
                      setTerms={setTerms}
                      showTermsError={showTermsError}
                      terms={terms}
                      screen={"franchiseCreate"}
                    />
                    <div className="signup-text mt-3">
                      <p className="mb-0" id="terms">
                        {getLabelByKey("termCondition")}
                        Agreement to follow the app's guidelines and policies
                      </p>
                    </div>
                  </div>
                  <div className="mt-14 d-flex align-content-start justify-content-start">
                    <TermsAndConditions
                      setTerms={setTerms}
                      showTermsError={showTermsError}
                      terms={terms}
                      screen={"franchiseCreate"}
                    />
                    <div className="signup-text mt-3">
                      <p className="mb-0" id="terms">
                        {getLabelByKey("termCondition")}
                        Liability waivers
                      </p>
                    </div>
                  </div>

                </Row>
              </div>

              <div className="mt-20 d-flex justify-content-end">
                <CustomButton
                  bgcolor={lightBlue3}
                  textTransform="Captilize"
                  color={pureDark}
                  padding="12px 100px"
                  fontFamily={`${fontFamilyMedium}`}
                  width="fit-content"
                  type="submit"
                  title={getLabelByKey("primaryButton")}
                  fontSize="17px"
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

export default CreateInstructor;
