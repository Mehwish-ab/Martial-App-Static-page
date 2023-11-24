import { CreateSchoolStyled } from "../../CreateSchool/styles";
import { ErrorMessage, Formik } from "formik";
import { Form } from "antd";

import { Col, Row } from "react-bootstrap";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import useScreenTranslation from "../../../hooks/useScreenTranslation";
import { RootState } from "../../../redux/store";
import { useLocation, useParams } from "react-router-dom";
import {
  BELTS_SELECT_OPTIONS,
  SelectOptionsDataTypes,
} from "../../Home/constants";
import { validationFinder } from "../../../utils/utilities";
import { DataTypesWithIdAndMultipleLangLabel } from "../../../redux/features/types";
import OverlayImages from "../../Home/OverlayImages/OverlayImages";
import FormControl from "../../../components/FormControl";
import {
  fontFamilyMedium,
  fontFamilyRegular,
  lightBlue3,
  pureDark,
} from "../../../components/GlobalStyle";
import CustomPhoneInput from "../../../components/CustomPhoneInput/CustomPhoneInput";
import CustomButton from "../../../components/CustomButton/CustomButton";
import { CreateBranchInitialValues } from "../constant";
import { BranchDataType } from "../../../redux/features/branch/branchSlice";
import useBranch from "../hooks/useBranch";
import PlacesAutoCompleteInput from "../../../maps/PlacesAutocomplete";
import CheckboxesSelect from "../../../components/CustomCheckbox/CheckboxesSelect";

const EditBranch = () => {
  const { getLabelByKey } = useScreenTranslation("branchCreate");
  const {
    statusData: { activities, facilities },
    dropdowns:  { currency, language, businessTypes }
  } = useSelector((state: RootState) => state.appData.data);

  const { loading, handleSubmit } = useBranch();
  const { branchId } = useParams();
  const location = useLocation();
  const branchToEdit: BranchDataType = location.state?.branchToEdit;
  const { selectedLanguage } = useSelector(
    (state: RootState) => state.selectedLanguage
  );

  const branchName = validationFinder("BUSINESS_NAME")!;
  const branchNameReg = new RegExp(branchName.pattern);
  const address = validationFinder("ADDRESS")!;
  const addressReg = new RegExp(address.pattern);
  const branchPhoneNumber = validationFinder("PHONE_NUMBER")!;

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

  const initialValues: CreateBranchInitialValues = {
    branchName: branchToEdit.branchName,
    branchType: branchToEdit.branchType,
    address: branchToEdit.address,
    branchPhoneNumber: branchToEdit.phoneNumber,
    // belts: branchToEdit.belts ? 1 : 2,
    defaultLanguage: branchToEdit.defaultLanguageId,
    defaultCurrency: branchToEdit.defaultCurrencyId,
    ranks: branchToEdit.ranks ? 1 : 2,
    description: branchToEdit.description,
    stripePublishableKey: branchToEdit.stripePublicKey,
    stripeSecretKey: branchToEdit.stripeSecretKey,
    cardAccessToken: branchToEdit.gclAccessToken,
    cardClientId: branchToEdit.gclClientId,
    cardWebHook: branchToEdit.gclWebHook,
    cardClientSecret: branchToEdit.gclClientSecret,
    selectedActivities: branchToEdit
      ? branchToEdit.activities?.split(",").map(String)
      : [],
    selectedFacilities: branchToEdit
      ? branchToEdit.facilities?.split(",").map(String)
      : [],
    schoolStripeMethod: branchToEdit.schoolStripeMethod || false,
    schoolGclMethod: branchToEdit.schoolGclMethod || false,
  };
  const validationSchema = Yup.object({
    branchName: Yup.string()
      .required(branchName.notBlankMsgEn)
      .matches(branchNameReg, branchName.patternMsgEn),
    address: Yup.string()
      .required(address.notBlankMsgEn)
      .matches(addressReg, address.patternMsgEn),
    branchType: Yup.string().required("Please select branch type"),
    branchPhoneNumber: Yup.string().required(branchPhoneNumber.notBlankMsgEn),
    defaultLanguage: Yup.string().required("Please select default language"),
    defaultCurrency: Yup.string().required("Please select default currency"),
    // belts: Yup.string().required("Please select belts"),
    ranks: Yup.string().required("Please select ranks"),
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

                <Row>
                  <Col md="4" className="mt-20">
                    <FormControl
                      control="input"
                      type="text"
                      name="branchName"
                      label={getLabelByKey("branchName")}
                      padding="10px"
                      fontFamily={fontFamilyMedium}
                      fontSize="16px"
                      // prefix={<img src={lock_icon} alt="lock_icon" />}
                      max={6}
                      // border="none"
                      placeholder={getLabelByKey("branchName")}
                      className={
                        formik.errors.branchName && formik.touched.branchName
                          ? "is-invalid"
                          : "customInput"
                      }
                    />
                  </Col>
                  <Col md="4" className="mt-20">
                    <FormControl
                      control="select"
                      type="text"
                      name="branchType"
                      fontFamily={fontFamilyMedium}
                      // prefix={<img src={lock_icon} alt="lock_icon" />}
                      label={getLabelByKey("branchType")}
                      padding="10px"
                      placeholder={getLabelByKey("branchType")}
                      className={
                        formik.errors.branchType && formik.touched.branchType
                          ? "is-invalid"
                          : "customInput"
                      }
                      options={createOptions(businessTypes)}
                      defaultValue={
                        branchId
                          ? createOptions(businessTypes).find(
                              (item) => item.value === initialValues.branchType
                            )?.label
                          : undefined
                      }
                    />
                  </Col>

                  <Col md="4" className="mt-20">
                    <CustomPhoneInput
                      label={getLabelByKey("branchPhoneNumber")}
                      name="branchPhoneNumber"
                      value={formik.values.branchPhoneNumber}
                      placeholder={getLabelByKey("branchPhoneNumber")}
                      limitMaxLength={true}
                      handleOnChange={(e: string) => {
                        formik.setFieldValue("branchPhoneNumber", e);
                      }}
                    />
                    <ErrorMessage name={"branchPhoneNumber"}>
                      {(msg) => (
                        <div
                          className="error-message is-invalid"
                          style={{
                            color: "red",
                            textAlign: "start",
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
                  <Col md="4" className="mt-20">
                    <FormControl
                      control="select"
                      type="text"
                      name="defaultLanguage"
                      fontFamily={fontFamilyMedium}
                      // prefix={<img src={lock_icon} alt="lock_icon" />}
                      label={getLabelByKey("defaultLanguage")}
                      padding="10px"
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
                  <Col md="4" className="mt-20">
                    <FormControl
                      control="select"
                      type="text"
                      name="defaultCurrency"
                      fontFamily={fontFamilyMedium}
                      // prefix={<img src={lock_icon} alt="lock_icon" />}
                      label={getLabelByKey("defaultCurrency")}
                      padding="10px"
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
                  <Col md="4" className="mt-20">
                    <FormControl
                      control="select"
                      type="text"
                      name="ranks"
                      fontFamily={fontFamilyMedium}
                      // prefix={<img src={lock_icon} alt="lock_icon" />}
                      label={getLabelByKey("belts")}
                      padding="10px"
                      placeholder={getLabelByKey("belts")}
                      className={
                        formik.errors.ranks && formik.touched.ranks
                          ? "is-invalid"
                          : "customInput"
                      }
                      options={BELTS_SELECT_OPTIONS}
                    />
                  </Col>
                  <Col md="4">
                    <CheckboxesSelect
                      name="selectedActivities"
                      label="Activity"
                      list={activities}
                      showErrorMsgInList={false}
                    />
                  </Col>

                  <Col md="4">
                    <CheckboxesSelect
                      name="selectedFacilities"
                      label="Facility"
                      list={facilities}
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

                  {/* <PaymentInformation formik={formik} showPaymentMethods={true} /> */}
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

export default EditBranch;
