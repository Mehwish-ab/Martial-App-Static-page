import { Field, Formik } from "formik";
import { Form } from "antd";

import { Col, Row } from "react-bootstrap";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import useScreenTranslation from "../../../hooks/useScreenTranslation";
import { RootState } from "../../../redux/store";

import { validationFinder } from "../../../utils/utilities";
import FormControl from "../../../components/FormControl";
import {
  fontFamilyMedium,
  lightBlue3,
  pureDark,
} from "../../../components/GlobalStyle";
import CustomPhoneInput from "../../../components/CustomPhoneInput/CustomPhoneInput";
import CustomButton from "../../../components/CustomButton/CustomButton";
import { CreateSchoolStyled } from "../../CreateSchool/styles";
import { CreateInstructorInitialValues } from "../constant";
import CheckboxesSelect from "../../../components/CustomCheckbox/CheckboxesSelect";
import PlacesAutoCompleteInput from "../../../maps/PlacesAutocomplete";

const CreateInstructor = () => {
  const { getLabelByKey } = useScreenTranslation("instructorUpdate");
  const {
    statusData: { activities, facilities },
  } = useSelector((state: RootState) => state.appData.data);

  const initialValues: CreateInstructorInitialValues = {
    instructorName: "",
    emailAddress: "",
    instructorPhoneNumber: "",
    address: "",
    yearsOfExperience: "",
    rankId: "",
    latestCertification: "",
    description: "",
    selectedActivities: [],
    selectedFacilities: [],
    termCondition: "",
    // ranks: ''
  };

  const franchiseName = validationFinder("BUSINESS_NAME")!;
  const franchiseNameReg = new RegExp(franchiseName.pattern);
  const address = validationFinder("ADDRESS")!;
  const addressReg = new RegExp(address.pattern);
  const emailAddress = validationFinder("EMAIL_ADDRESS")!;
  const emailAddressReg = new RegExp(emailAddress.pattern);

  const franchisePhoneNumber = validationFinder("PHONE_NUMBER")!;



  const validationSchema = Yup.object({
    franchiseName: Yup.string()
      .required(franchiseName.notBlankMsgEn)
      .matches(franchiseNameReg, franchiseName.patternMsgEn),
    // address: Yup.string()
    //   .required(address.notBlankMsgEn)
    //   .matches(addressReg, address.patternMsgEn),
    emailAddress: Yup.string()
      .required(emailAddress.notBlankMsgEn)
      .matches(emailAddressReg, emailAddress.patternMsgEn),
    franchisePhoneNumber: Yup.string().required(
      franchisePhoneNumber.notBlankMsgEn
    ),
    rankId: Yup.string().required("Please select belts"),
    description: Yup.string().required("Please enter description"),
    defaultLanguage: Yup.string().required("Please select default language"),
    defaultCurrency: Yup.string().required("Please select default currency"),
    selectedActivities: Yup.array()
      .of(Yup.string().required("Select an activity"))
      .min(1, "Select at least one activity"),
    selectedFacilities: Yup.array()
      .of(Yup.string().required("Select an activity"))
      .min(1, "Select at least one facility"),

  });



  return (
    <CreateSchoolStyled>
      <Formik
        initialValues={initialValues}
        // validationSchema={validationSchema}
        onSubmit={() => { }}
      >
        {(formik) => {
          return (
            <Form
              name="basic"
              onFinish={formik.handleSubmit}
              autoComplete="off"
            >
              <div className="bg-white form">
                <h3>{getLabelByKey("title")}</h3>
                <Row>
                  <Col md="4" className="mt-20">
                    <FormControl
                      control="input"
                      type="text"
                      name="instructorName"
                      label={getLabelByKey("instructorName")}
                      padding="10px"
                      fontFamily={fontFamilyMedium}
                      fontSize="16px"
                      max={6}
                      placeholder={getLabelByKey("instructorNamePlaceholder")}
                    />
                  </Col>
                  <Col md="4" className="mt-20">
                    <FormControl
                      control="input"
                      type="email"
                      name="emailAddress"
                      fontFamily={fontFamilyMedium}
                      label="Email Address"
                      padding="10px"
                      placeholder={getLabelByKey("emailAddressPlaceholder")}
                    />
                  </Col>
                  <Col md="4" className="mt-20">
                    <CustomPhoneInput
                      label={getLabelByKey("instructorMobileNumber")}
                      name="instructorMobileNumber"
                      value={formik.values.instructorPhoneNumber}
                      placeholder={getLabelByKey("instructorMobileNumber")}
                      limitMaxLength={true}
                      handleOnChange={(e: string) => {
                        formik.setFieldValue("franchisePhoneNumber", e);
                      }}
                    />
                  </Col>

                  <Col md="4" className="mt-20">
                    <PlacesAutoCompleteInput
                      label={getLabelByKey("completeAddress")}
                      placeholder={getLabelByKey("completeAddressPlaceholder")}
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
                    <Row>
                      <Col md="4" className="mt-20">
                        <FormControl
                          control="input"
                          type="number"
                          name="yearsOfExperience"
                          fontFamily={fontFamilyMedium}
                          label={getLabelByKey("yearsOfExperience")}
                          padding="10px"
                          placeholder={getLabelByKey("yearsOfExperiencePlaceholder")}
                        />
                      </Col>
                      <Col md="4" className="mt-20">
                        <FormControl
                          control="select"
                          type="text"
                          name="ranking"
                          fontFamily={fontFamilyMedium}
                          label={getLabelByKey("ranking")}
                          padding="10px"
                          placeholder={getLabelByKey("rankingPlaceholder")}
                        />
                      </Col>
                      <Col md="4" className="mt-20">
                        <FormControl
                          control="input"
                          type="upload"
                          name="latestCertification"
                          fontFamily={fontFamilyMedium}
                          label={getLabelByKey("latestCertification")}
                          padding="10px"
                          placeholder={getLabelByKey("latestCertificationPlaceholder")}
                        />
                      </Col>
                    </Row>
                  </Col>

                  <Col md="6">
                    <CheckboxesSelect
                      name="selectedFacilities"
                      label={getLabelByKey("specializations")}
                      list={facilities}
                      showErrorMsgInList={false}
                    />
                  </Col>

                  <Col md="6">
                    <CheckboxesSelect
                      name="selectedActivities"
                      label={getLabelByKey("activities")}
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
                      label={getLabelByKey("biographyOrIntroduction")}
                      padding="10px"
                      placeholder={getLabelByKey("biographyOrIntroductionPlace")}
                      height="200px"
                    />
                  </div>
                  <label htmlFor="termCondition">
                    <form className="mt-3 d-flex align-content-start justify-content-start">
                      <Field
                        control="checkbox"
                        type="checkbox"
                        name="termCondition"
                        id="termCondition"
                      />
                      <p className="ms-3 mb-0" id="termCondition">{getLabelByKey("termsAndConditions")}</p>
                    </form>
                  </label>
                  <label htmlFor="agreement">
                    <form className="mt-2 d-flex align-content-start justify-content-start">
                      <Field
                        control="checkbox"
                        type="checkbox"
                        name="agreement"
                        id="agreement"
                      />
                      <p className="ms-3 mb-0" id="agreement">{getLabelByKey("AgreementGuidelines")}</p>
                    </form>
                  </label>
                  <label htmlFor="liability">
                    <form className="mt-2 d-flex align-content-start justify-content-start">
                      <Field
                        control="checkbox"
                        type="checkbox"
                        name="liabilityWaivers"
                        id="liabilityWaivers"
                      />
                      <p className="ms-3 mb-0" id="liability">{getLabelByKey("liabilityWaivers")}</p>
                    </form>
                  </label>
                </Row>
              </div>

              <div className="mt-20 d-flex justify-content-end">
                <CustomButton
                  bgcolor={lightBlue3}
                  textTransform="Captilize"
                  color={pureDark}
                  padding="12px 100px"
                  margin="30px 0px"
                  fontFamily={`${fontFamilyMedium}`}
                  width="fit-content"
                  type="submit"
                  title="Update"
                  fontSize="18px"
                  loading={false}
                />
              </div>
            </Form>
          );
        }}
      </Formik >
    </CreateSchoolStyled >
  );
};

export default CreateInstructor;
