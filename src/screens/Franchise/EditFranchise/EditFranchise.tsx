import { CreateSchoolStyled } from "../../CreateSchool/styles";
import profileImg from "../../../../assets/images/create_school_user_profile.svg";
import banner from "../../../../assets/images/create_school_banner.svg";
import { ErrorMessage, Formik, useFormik, useFormikContext } from "formik";
import { Form } from "antd";

import { Col, Row } from "react-bootstrap";
import searchIcon from "../../../../assets/icons/ic_search.svg";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import useScreenTranslation from "../../../hooks/useScreenTranslation";
import { RootState } from "../../../redux/store";
import useCreateSchool from "../../../hooks/useCreateSchool";
import { useLocation, useParams } from "react-router-dom";
import {
  BELTS_SELECT_OPTIONS,
  SelectOptionsDataTypes,
} from "../../Home/constants";
import { validationFinder } from "../../../utils/utilities";
import { DataTypesWithIdAndMultipleLangLabel } from "../../../redux/features/types";
import AppLayout from "../../../components/Layout/Layout";
import OverlayImages from "../../Home/OverlayImages/OverlayImages";
import FormControl from "../../../components/FormControl";
import {
  fontFamilyMedium,
  lightBlue3,
  pureDark,
} from "../../../components/GlobalStyle";
import SearchGoogleLocation from "../../../components/Common/SearchGoogleLocation/SearchGoogleLocation";
import CustomPhoneInput from "../../../components/CustomPhoneInput/CustomPhoneInput";
import CheckboxesList from "../../../components/CustomCheckbox/CheckboxesList";
import PaymentInformation from "../../../components/Common/PaymentInformation/PaymentInformation";
import CustomButton from "../../../components/CustomButton/CustomButton";
import { CreateFranchiseInitialValues } from "../constant";
import { useEffect, useState } from "react";
import { BranchDataType } from "../../../redux/features/branch/branchSlice";
import useBranch from "../hooks/useFranchise";

const EditFranchise = () => {
  const { getLabelByKey } = useScreenTranslation("franchiseUpdate");
  const {
    statusData: { activities, facilities, businessTypes },
  } = useSelector((state: RootState) => state.appData.data);
  const { data: branchData } = useSelector(
    (state: RootState) => state.branchData.branchData
  );
  const { loading, handleSubmit } = useBranch();
  const { branchId } = useParams();
  const location = useLocation();
  const branchToEdit: BranchDataType = location.state.branchToEdit;
  // const [branchToEdit, setBranchToEdit] = useState({});
  // const handleSubmit = () => {};
  const { selectedLanguage } = useSelector(
    (state: RootState) => state.selectedLanguage
  );

  const franchiseName = validationFinder("BUSINESS_NAME")!;
  const franchiseNameReg = new RegExp(franchiseName.pattern);
  const address = validationFinder("ADDRESS")!;
  const addressReg = new RegExp(address.pattern);
  const franchisePhoneNumber = validationFinder("PHONE_NUMBER")!;

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

  const initialValues: CreateFranchiseInitialValues = {
    franchiseName: "",
    franchiseType: "",
    address: branchToEdit ? branchToEdit.address : "",
    franchisePhoneNumber: branchToEdit ? branchToEdit.phoneNumber : "",
    belts: branchToEdit ? (branchToEdit.belts ? 1 : 2) : "",
    description: branchToEdit ? branchToEdit.description : "",
    stripePublishableKey: branchToEdit ? branchToEdit.stripePublicKey : "",
    stripeSecretKey: branchToEdit ? branchToEdit.stripeSecretKey : "",
    cardAccessToken: branchToEdit ? branchToEdit.gclAccessToken : "",
    cardClientId: branchToEdit ? branchToEdit.gclClientId : "",
    cardWebHook: branchToEdit ? branchToEdit.gclWebHook : "",
    cardClientSecret: branchToEdit ? branchToEdit.gclClientSecret : "",
    selectedActivities: branchToEdit
      ? branchToEdit.activities.split(",").map(String)
      : [],
    selectedFacilities: branchToEdit
      ? branchToEdit.facilities.split(",").map(String)
      : [],
    schoolStripeMethod: branchToEdit
      ? branchToEdit.schoolStripeMethod || false
      : false,
    schoolGclMethod: branchToEdit
      ? branchToEdit.schoolGclMethod || false
      : false,
  };
  const validationSchema = Yup.object({
    branchName: Yup.string()
      .required(franchiseName.notBlankMsgEn)
      .matches(franchiseNameReg, franchiseName.patternMsgEn),
    address: Yup.string()
      .required(address.notBlankMsgEn)
      .matches(addressReg, address.patternMsgEn),
    branchType: Yup.string().required("Please select franchise type"),
    branchPhoneNumber: Yup.string().required(
      franchisePhoneNumber.notBlankMsgEn
    ),
    belts: Yup.string().required("Please select belts"),
    description: Yup.string().required("Please enter description"),
    stripePublishableKey: Yup.string().when("schoolStripeMethod", {
      is: false,
      then: Yup.string().required("Please enter stripe publishable key"),
      otherwise: Yup.string().notRequired(),
    }),
    stripeSecretKey: Yup.string().when("schoolStripeMethod", {
      is: false,
      then: Yup.string().required("Please enter stripe secret key"),
      otherwise: Yup.string().notRequired(),
    }),
    cardAccessToken: Yup.string().when("schoolGclMethod", {
      is: false,
      then: Yup.string().required("Please enter card access token"),
      otherwise: Yup.string().notRequired(),
    }),
    cardClientId: Yup.string().when("schoolGclMethod", {
      is: false,
      then: Yup.string().required("Please enter card client id"),
      otherwise: Yup.string().notRequired(),
    }),
    cardWebHook: Yup.string().when("schoolGclMethod", {
      is: false,
      then: Yup.string().required("Please enter card web hook"),
      otherwise: Yup.string().notRequired(),
    }),
    cardClientSecret: Yup.string().when("schoolGclMethod", {
      is: false,
      then: Yup.string().required("Please enter card client secret"),
      otherwise: Yup.string().notRequired(),
    }),
    selectedActivities: Yup.array()
      .of(Yup.string().required("Select an activity"))
      .min(1, "Select at least one activity"),
    selectedFacilities: Yup.array()
      .of(Yup.string().required("Select an activity"))
      .min(1, "Select at least one facility"),

    schoolStripeMethod: Yup.boolean(),
    schoolGclMethod: Yup.boolean(),
  });

  return (
    <CreateSchoolStyled>
      <OverlayImages
        backgroundImg={branchToEdit?.bannerPicture || ""}
        overlayImg={branchToEdit?.profilePicture || ""}
        isEditable={true}
      />
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
                <h3>Branch Information</h3>

                <div className="mt-20">
                  <Row>
                    <Col md="6">
                      <FormControl
                        control="input"
                        type="text"
                        name="franchiseName"
                        label={getLabelByKey("franchiseName")}
                        padding="10px"
                        fontFamily={fontFamilyMedium}
                        fontSize="16px"
                        // prefix={<img src={lock_icon} alt="lock_icon" />}
                        max={6}
                        // border="none"
                        placeholder={getLabelByKey("franchiseName")}
                        className={
                          formik.errors.franchiseName &&
                          formik.touched.franchiseName
                            ? "is-invalid"
                            : "customInput"
                        }
                      />
                    </Col>
                    <Col md="6">
                      <FormControl
                        control="select"
                        type="text"
                        name="franchiseType"
                        fontFamily={fontFamilyMedium}
                        // prefix={<img src={lock_icon} alt="lock_icon" />}
                        label={getLabelByKey("franchiseType")}
                        padding="10px"
                        placeholder={getLabelByKey("franchiseType")}
                        className={
                          formik.errors.franchiseType &&
                          formik.touched.franchiseType
                            ? "is-invalid"
                            : "customInput"
                        }
                        options={createOptions(businessTypes)}
                        defaultValue={
                          branchId
                            ? createOptions(businessTypes).find(
                                (item) =>
                                  item.value === initialValues.franchiseType
                              )?.label
                            : undefined
                        }
                      />
                    </Col>
                  </Row>
                </div>
                <div className="mt-20">
                  <Row>
                    <Col md="12">
                      <SearchGoogleLocation
                        name="address"
                        value={formik.values.address}
                        label={getLabelByKey("address")}
                        placeholder={getLabelByKey("address")}
                        className={
                          formik.errors.address && formik.touched.address
                            ? "is-invalid"
                            : "customInput"
                        }
                        setFieldValue={(val: any) => {
                          formik.setFieldValue("address", val);
                        }}
                      />
                    </Col>
                  </Row>
                </div>
                <div className="mt-20">
                  <Row>
                    <Col md="6">
                      <CustomPhoneInput
                        label={getLabelByKey("franchisePhoneNumber")}
                        name="franchisePhoneNumber"
                        value={formik.values.franchisePhoneNumber}
                        placeholder={getLabelByKey("franchisePhoneNumber")}
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
                    <Col md="6">
                      <FormControl
                        control="select"
                        type="text"
                        name="belts"
                        fontFamily={fontFamilyMedium}
                        // prefix={<img src={lock_icon} alt="lock_icon" />}
                        label={getLabelByKey("belts")}
                        padding="10px"
                        placeholder={getLabelByKey("belts")}
                        className={
                          formik.errors.belts && formik.touched.belts
                            ? "is-invalid"
                            : "customInput"
                        }
                        options={BELTS_SELECT_OPTIONS}
                        defaultValue={
                          branchId
                            ? BELTS_SELECT_OPTIONS.find(
                                (item) => item.value === initialValues.belts
                              )?.label
                            : undefined
                        }
                      />
                    </Col>
                  </Row>
                </div>

                <CheckboxesList
                  name="selectedActivities"
                  label="Activity"
                  showErrorMsgInList={false}
                  list={activities}
                />

                <CheckboxesList
                  name="selectedFacilities"
                  label="Facility"
                  list={facilities}
                  showErrorMsgInList={false}
                />
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

                <PaymentInformation formik={formik} showPaymentMethods={true} />
              </div>
              {Object.keys(formik.errors).map((error) => {
                return <li>{error}</li>;
              })}
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
                  disabled={!formik.isValid}
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

export default EditFranchise;
