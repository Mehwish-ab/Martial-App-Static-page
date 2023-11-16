import { useState } from "react";

import { ErrorMessage, Field, Formik } from "formik";
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
  pureDark2,
} from "../../../components/GlobalStyle";
import CustomPhoneInput from "../../../components/CustomPhoneInput/CustomPhoneInput";
import CustomButton from "../../../components/CustomButton/CustomButton";
import { CreateSchoolStyled } from "../../CreateSchool/styles";
import { CreateInstructorInitialValues } from "../constant";
import useBranch from "../../../../src/screens/Franchise/hooks/useFranchise";
import CheckboxesSelect from "../../../components/CustomCheckbox/CheckboxesSelect";
import PlacesAutoCompleteInput from "../../../maps/PlacesAutocomplete";

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
                <h3 style={{ color: pureDark2 }}>Instructor Information</h3>
                <Row>
                  <Col md="4" className="mt-20">
                    <FormControl
                      control="input"
                      type="text"
                      name="instructorName"
                      label="Instructor Name"
                      padding="10px"
                      fontFamily={fontFamilyMedium}
                      fontSize="16px"
                      max={6}
                      placeholder="Instructor Name"
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
                      placeholder="Email address"
                    />
                  </Col>
                  <Col md="4" className="mt-20">
                    <CustomPhoneInput
                      label="Instructor Phone Number"
                      name="instructorPhoneNumber"
                      value={formik.values.instructorPhoneNumber}
                      placeholder={getLabelByKey("instructorPhoneNumber")}
                      limitMaxLength={true}
                      handleOnChange={(e: string) => {
                        formik.setFieldValue("franchisePhoneNumber", e);
                      }}
                    />
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
                        type="number"
                        name="yearsOfExperience"
                        fontFamily={fontFamilyMedium}
                        label="Years Of Experience"
                        padding="10px"
                        placeholder="Years Of Experience"
                      />
                    </Col>
                    <Col md="4" className="mt-20 d-inline-block ps-3">
                      <FormControl
                        control="select"
                        type="text"
                        name="ranks"
                        fontFamily={fontFamilyMedium}
                        label="Ranking"
                        padding="10px"
                        placeholder="English"
                      />
                    </Col>
                    <Col md="4" className="mt-20 d-inline-block ps-3">
                      <FormControl
                        control="input"
                        type="upload"
                        name="latestCertification"
                        fontFamily={fontFamilyMedium}
                        label="Latest Certification"
                        padding="10px"
                        placeholder="Pound"
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
                      label={getLabelByKey("description")}
                      padding="10px"
                      placeholder={getLabelByKey("description")}
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
                      <p className="ms-3 mb-0" id="termCondition">Terms and conditions</p>
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
                      <p className="ms-3 mb-0" id="agreement">Agreement to follow the app's guidelines and policies</p>
                    </form>
                  </label>
                  <label htmlFor="liability">
                    <form className="mt-2 d-flex align-content-start justify-content-start">
                      <Field
                        control="checkbox"
                        type="checkbox"
                        name="liability"
                        id="liability"
                      />
                      <p className="ms-3 mb-0" id="liability">Liability waivers</p>
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
                  title={getLabelByKey("primaryButton")}
                  fontSize="18px"
                  loading={loading}
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
