import { ErrorMessage, Formik } from "formik";
import { Form } from "antd";

import { Col, Row } from "react-bootstrap";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import useScreenTranslation from "../../../hooks/useScreenTranslation";
import { RootState } from "../../../redux/store";
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
  maastrichtBlue,
  pureDark,
} from "../../../components/GlobalStyle";
import CustomPhoneInput from "../../../components/CustomPhoneInput/CustomPhoneInput";
import CheckboxesList from "../../../components/CustomCheckbox/CheckboxesList";
import PaymentInformation from "../../../components/Common/PaymentInformation/PaymentInformation";
import CustomButton from "../../../components/CustomButton/CustomButton";
import { CreateSchoolStyled } from "../../CreateSchool/styles";
import { CreateBranchInitialValues } from "../constant";
import useBranch from "../hooks/useBranch";
import PlacesAutoCompleteInput from "../../../maps/PlacesAutocomplete";
import CheckboxesSelect from "../../../components/CustomCheckbox/CheckboxesSelect";

const CreateBranch = () => {
  const { getLabelByKey } = useScreenTranslation("branchCreate");
  const {
    statusData: { activities, facilities },
    dropdowns: { currency, language, businessTypes }
  } = useSelector((state: RootState) => state.appData.data);

  const { loading, handleSubmit } = useBranch();
  const initialValues: CreateBranchInitialValues = {
    branchName: "",
    branchType: "",
    address: "",
    branchPhoneNumber: "",
    defaultLanguage: "",
    defaultCurrency: "",
    // belts: "",
    ranks: "",
    description: "",
    stripePublishableKey: "",
    stripeSecretKey: "",
    cardAccessToken: "",
    cardClientId: "",
    cardWebHook: "",
    cardClientSecret: "",
    selectedActivities: [],
    selectedFacilities: [],
    schoolStripeMethod: false,
    schoolGclMethod: false,
  };

  const { selectedLanguage } = useSelector(
    (state: RootState) => state.selectedLanguage
  );

  const branchName = validationFinder("BUSINESS_NAME")!;
  const branchNameReg = new RegExp(branchName.pattern);
  const address = validationFinder("ADDRESS")!;
  const addressReg = new RegExp(address.pattern);
  const branchPhoneNumber = validationFinder("PHONE_NUMBER")!;

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
      {/* <OverlayImages backgroundImg={""} overlayImg={""} isEditable={false} /> */}
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
                      fontFamily={fontFamilyRegular}
                      fontSize="16px"
                      max={6}
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
                      fontFamily={fontFamilyRegular}
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
                        name="defaultLanguage"
                        fontFamily={fontFamilyRegular}
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
                    <Col md="4" className="mt-20 d-inline-block px-3">
                      <FormControl
                        control="select"
                        type="text"
                        name="defaultCurrency"
                        fontFamily={fontFamilyRegular}
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
                    <Col md="4" className="mt-20 d-inline-block">
                      <FormControl
                        control="select"
                        type="text"
                        name="ranks"
                        fontFamily={fontFamilyRegular}
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
                  </Col>


                  <Col md="6">
                    <CheckboxesSelect
                      name="selectedActivities"
                      label="Activity"
                      list={activities}
                      showErrorMsgInList={false}
                    />
                  </Col>
                  <Col md="6">
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
                      fontFamily={fontFamilyRegular}
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

export default CreateBranch;
