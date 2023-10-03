import { ErrorMessage, Formik } from "formik";
import * as Yup from "yup";
import { Form } from "antd";
import FormControl from "../../../components/FormControl";
import CustomButton from "../../../components/CustomButton/CustomButton";
import CreateUserStyle from "./style";
import {
  fontFamilyMedium,
  fontFamilyRegular,
  lightBlue3,
  lightDark2,
  pureDark,
  whiteColor,
} from "../../../components/GlobalStyle";
import Head from "../../../components/Head/Head";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TermsAndConditions from "../../../components/TermsAndConditions/TermsAndConditions";
import OauthLogin from "../../../components/Common/OauthLogin/OauthLogin";
import EnnvisionModal from "../../../components/CustomModals/EnnvisionModal";
import CustomModal from "../../../components/Modal/CustomModal";
import profile_icon from "../../../assets/icons/ic_profile.svg";
import lock_icon from "../../../assets/icons/password.svg";
import email_icon from "../../../assets/icons/ic_email.svg";
import ic_building from "../../../assets/icons/ic_building.svg";
import { useAppSelector } from "../../../app/hooks";
import { validationFinder } from "../../../utils/utilities";
import { toast } from "react-toastify";
import axios from "axios";
import { signup_url } from "../../../utils/api_urls";
import CustomPhoneInput from "../../../components/CustomInputNumber/CustomPhoneInput";
import Errormsg from "../../../components/ErrorMessage";
import useScreenTranslation from "../../../hooks/useScreenTranslation";
import { SCREEN_LABEL_KEYS } from "./constant";
import { OAUTH_USECASES } from "../../../components/Common/OauthLogin/constants";
import Input, { getCountryCallingCode } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
// create user initial values types
type initialValuesType = {
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
  password: string;
  confirmPassword?: string;
};

const RegisterUser = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [terms, setTerms] = useState(false);
  const [showTermsError, setShowTermsError] = useState(false);
  const { getLabelByKey } = useScreenTranslation("registerScreen");

  const scrollViewRef = useRef<any>();
  const navigate = useNavigate();
  const { selectedLanguage } = useSelector(
    (state: RootState) => state.selectedLanguage
  );
  const initialValues: initialValuesType = {
    firstName: "",
    lastName: "",
    emailAddress: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  };

  const { result: userLocation } = useAppSelector(
    (state) => state.userLocation
  );
  // get Validations from redux appData
  const {
    countryName: {
      results: { countryCode, name },
    },
  } = useAppSelector((state) => state.appData.data);
  // create user initial values
  useEffect(() => {
    const countrySelect = document.querySelector(
      ".PhoneInput .PhoneInputCountry"
    );
    const phoneNumberInput = document.querySelector(".PhoneInput input");

    if (countrySelect) {
      if (selectedLanguage === "ur" || selectedLanguage === "ar") {
        countrySelect.classList.remove("country-left-to-right-border-radius");
        countrySelect.classList.add("country-right-to-left-border-radius");
      } else {
        countrySelect.classList.add("country-left-to-right-border-radius");
        countrySelect.classList.remove("country-right-to-left-border-radius");
      }
    }
    if (phoneNumberInput) {
      if (selectedLanguage === "ur" || selectedLanguage === "ar") {
        phoneNumberInput.classList.add(
          "phone-number-right-to-left-border-radius"
        );
        phoneNumberInput.classList.remove(
          "phone-number-left-to-right-border-radius"
        );
      } else {
        phoneNumberInput.classList.add(
          "phone-number-left-to-right-border-radius"
        );
        phoneNumberInput.classList.remove(
          "phone-number-right-to-left-border-radius"
        );
      }
    }
  }, [selectedLanguage]);
  // user validations
  const firstName = validationFinder("USER_FIRSTNAME")!;
  const lastName = validationFinder("USER_LASTNAME")!;
  const emailAddress = validationFinder("EMAIL_ADDRESS")!;
  const phoneNumber = validationFinder("CANADA_PHONE_NUMBER")!;
  const password = validationFinder("PASSWORD")!;
  // user regExpressions
  const firstNameReg = new RegExp(firstName.pattern);
  const lastNameReg = new RegExp(lastName.pattern);
  const emailAddressReg = new RegExp(emailAddress.pattern);
  const phoneNumberReg = new RegExp(phoneNumber.pattern);
  const passwordReg = new RegExp(password.pattern);

  // create user validation schema
  const validationSchema = Yup.object({
    firstName: Yup.string()
      .required(firstName.notBlankMsgEn)
      .matches(firstNameReg, firstName.patternMsgEn),
    lastName: Yup.string()
      .required(lastName.notBlankMsgEn)
      .matches(lastNameReg, lastName.patternMsgEn),
    emailAddress: Yup.string()
      .required(emailAddress.notBlankMsgEn)
      .matches(emailAddressReg, emailAddress.patternMsgEn),
    phoneNumber: Yup.string()
      .required(phoneNumber.notBlankMsgEn)
      .matches(phoneNumberReg, phoneNumber.patternMsgEn),
    password: Yup.string()
      .required(password.notBlankMsgEn)
      .matches(passwordReg, password.patternMsgEn),
    confirmPassword: Yup.string()
      .required("confirm password is required!")
      .oneOf([Yup.ref("password")], "passwords must match"),
  });
  // create user data submit
  const onSubmit = async (values: initialValuesType) => {
    if (!terms) {
      setShowTermsError(true);
      setTimeout(() => {
        setShowTermsError(false);
      }, 2000);
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd({ animated: true });
      }
      return;
    }
    // get all values other than confirm password
    const allValues = {
      ...values,
    };
    delete allValues.confirmPassword;
    const registerUserValues = {
      ...allValues,
      phoneNumber: values.phoneNumber.toString(),
      countryName: name,
      countryCode: countryCode,
    };
    const userData = {
      ...registerUserValues,
      roleId: 1,
      channel: "Web",
      address: userLocation?.address,
      city: userLocation?.city,
      state: userLocation?.state,
    };
    try {
      setIsLoading(true);
      await axios.post(signup_url, userData);
      setIsShowModal(true);
      setTimeout(() => {
        setIsShowModal(false);
        navigate("/login");
      }, 2000);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      toast(error.response.data.responseMessage, {
        type: "error",
        autoClose: 1000,
      });
    }
  };

  return (
    <>
      <Head title="register" />
      <CustomModal
        isModalVisible={isShowModal}
        setIsModalVisible={setIsShowModal}
        showCloseBtn={false}
      >
        <EnnvisionModal
          doTask={() => {
            navigate("/login");
            setIsShowModal(false);
          }}
          title="Account Created Successfully!"
          description="Thank You For Joining Us And We're Excited To Have You On Board"
        />
      </CustomModal>
      <CreateUserStyle>
        <div className="inner-container">
          <div className="inner-container-card">
            <div className="inner-container-card-inner">
              <h6 className="title mb-0 text-center">
                {getLabelByKey(SCREEN_LABEL_KEYS.title)}
              </h6>
              {/* <p className="text-center message mt-20">
              {getLabelByKey(SCREEN_LABEL_KEYS.subtitle)}
            </p> */}
              <div className="inner-container-card-form">
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={onSubmit}
                >
                  {(formik) => {
                    return (
                      <Form
                        name="basic"
                        onFinish={formik.handleSubmit}
                        autoComplete="off"
                      >
                        {/* <div className="role-section mt-20">
                        <h6 className="mb-0">Select Your Role</h6>
                        <div className="d-flex gap-2 roles mt-20">
                          <CustomButton
                            bgcolor={whiteColor}
                            textTransform="Captilize"
                            color={lightDark2}
                            padding="8px"
                            width="100%"
                            icon={
                              <img
                                className="me-1 mb-1"
                                src={ic_building}
                                alt="buiding_icon"
                              />
                            }
                            type="submit"
                            title=" School"
                            fontSize="16px"
                            loading={isLoading}
                            fontFamily={fontFamilyRegular}
                          />
                          <CustomButton
                            bgcolor={whiteColor}
                            textTransform="Captilize"
                            color={lightDark2}
                            icon={
                              <img
                                className="me-1 mb-1"
                                src={profile_icon}
                                alt="profile_icon"
                              />
                            }
                            padding="8px"
                            width="100%"
                            type="submit"
                            title="Student"
                            fontSize="16px"
                            loading={isLoading}
                            fontFamily={fontFamilyRegular}
                          />
                        </div>
                      </div> */}
                        <div className="register-input-fields">
                          <div className="mt-20">
                            <FormControl
                              control="input"
                              type="text"
                              name="firstName"
                              label={getLabelByKey(
                                SCREEN_LABEL_KEYS.firstNameFieldTitle
                              )}
                              fontSize="14px"
                              border="none"
                              placeholder={getLabelByKey(
                                SCREEN_LABEL_KEYS.firstNameFieldPlaceholder
                              )}
                              padding="10px"
                              // prefix={
                              //   <img src={profile_icon} alt="profile_icon" />
                              // }
                              labelFamily={fontFamilyMedium}
                              className={
                                formik.errors.firstName &&
                                formik.touched.firstName
                                  ? "is-invalid"
                                  : "customInput"
                              }
                            />
                          </div>
                          <div className="mt-20">
                            <FormControl
                              control="input"
                              type="text"
                              name="lastName"
                              fontSize="14px"
                              label={getLabelByKey(
                                SCREEN_LABEL_KEYS.surNameFieldTitle
                              )}
                              border="none"
                              labelFamily={fontFamilyMedium}
                              padding="10px"
                              // prefix={
                              //   <img src={profile_icon} alt="profile_icon" />
                              // }
                              placeholder={getLabelByKey(
                                SCREEN_LABEL_KEYS.surNameFieldPlaceholder
                              )}
                              className={
                                formik.errors.lastName &&
                                formik.touched.lastName
                                  ? "is-invalid"
                                  : "customInput"
                              }
                            />
                          </div>
                          <div className="mt-20">
                            <FormControl
                              control="input"
                              type="email"
                              fontSize="14px"
                              name="emailAddress"
                              border="none"
                              padding="10px"
                              label={getLabelByKey(
                                SCREEN_LABEL_KEYS.emailFieldTitle
                              )}
                              // prefix={<img src={email_icon} alt="email_icon" />}
                              labelFamily={fontFamilyMedium}
                              placeholder={getLabelByKey(
                                SCREEN_LABEL_KEYS.emailFieldPlaceholder
                              )}
                              className={
                                formik.errors.emailAddress &&
                                formik.touched.emailAddress
                                  ? "is-invalid"
                                  : "customInput"
                              }
                            />
                          </div>
                          <div className="mt-20">
                            <label
                              htmlFor="phoneNumber"
                              className="custom-phone-input-label"
                            >
                              {getLabelByKey(
                                SCREEN_LABEL_KEYS.mobileFieldTitle
                              )}
                            </label>
                            <Input
                              defaultCountry="US"
                              international
                              placeholder={getLabelByKey(
                                SCREEN_LABEL_KEYS.mobileFieldPlaceholder
                              )}
                              value={formik.values.phoneNumber}
                              onChange={(e: string) => {
                                formik.setValues({
                                  ...formik.values,
                                  phoneNumber: e,
                                });
                              }}
                              withCountryCallingCode
                              countryCallingCodeEditable
                            />
                            {/* <CustomPhoneInput
                            countryNumber={countryCode}
                            placeholder={getLabelByKey(
                              SCREEN_LABEL_KEYS.mobileFieldPlaceholder
                            )}
                            phoneLength={phoneNumberLength}
                            countryFlag={countryFlagURL}
                            phoneValueHandler={(value: number | string) =>
                              formik.setFieldValue("phoneNumber", value)
                            }
                            label={getLabelByKey(
                              SCREEN_LABEL_KEYS.mobileFieldTitle
                            )}
                            value={formik.values.phoneNumber}
                            name="phoneNumber"
                            countryName={name}
                          /> */}
                            <div className="mt-3">
                              <ErrorMessage
                                name="phoneNumber"
                                component={Errormsg}
                              />
                            </div>
                          </div>
                          <div className="mt-20">
                            <FormControl
                              control="password"
                              type="text"
                              name="password"
                              label={getLabelByKey(
                                SCREEN_LABEL_KEYS.passcodeFieldTitle
                              )}
                              padding="10px"
                              fontFamily={fontFamilyMedium}
                              // prefix={<img src={lock_icon} alt="lock_icon" />}
                              max={6}
                              border="none"
                              placeholder={getLabelByKey(
                                SCREEN_LABEL_KEYS.passcodeFieldPlaceholder
                              )}
                              className={
                                formik.errors.password &&
                                formik.touched.password
                                  ? "is-invalid"
                                  : "customPasswordInput"
                              }
                            />
                          </div>
                          <div className="mt-20">
                            <FormControl
                              control="password"
                              type="text"
                              name="confirmPassword"
                              fontFamily={fontFamilyMedium}
                              // prefix={<img src={lock_icon} alt="lock_icon" />}
                              border="none"
                              label={getLabelByKey(
                                SCREEN_LABEL_KEYS.confrimPasscodeFieldTitle
                              )}
                              padding="10px"
                              placeholder={getLabelByKey(
                                SCREEN_LABEL_KEYS.confrimPasscodeFieldPlaceholder
                              )}
                              className={
                                formik.errors.confirmPassword &&
                                formik.touched.confirmPassword
                                  ? "is-invalid"
                                  : "customPasswordInput"
                              }
                            />
                          </div>
                          <div className="mt-20 d-flex align-items-center gap-2">
                            <FormControl
                              control="checkbox"
                              type="checkbox"
                              id="rememberMe"
                              name="rememberMe"
                            />
                            <p className="mb-0 text-14">
                              {getLabelByKey(SCREEN_LABEL_KEYS.rememberMe)}
                            </p>
                          </div>

                          <div className="mt-20">
                            <CustomButton
                              bgcolor={lightBlue3}
                              textTransform="Captilize"
                              color={pureDark}
                              padding="11px 8px"
                              width="100%"
                              type="submit"
                              title={getLabelByKey(
                                SCREEN_LABEL_KEYS.registerButton
                              )}
                              fontSize="16px"
                              border=""
                              loading={isLoading}
                            />
                          </div>
                          {/* <div className="d-flex or-line mt-4 align-items-center">
                          <div className="line" />
                          <p>{getLabelByKey(SCREEN_LABEL_KEYS.or)}</p>
                          <div className="line" />
                        </div> */}
                          <OauthLogin usecase={OAUTH_USECASES.register} />
                        </div>
                      </Form>
                    );
                  }}
                </Formik>
              </div>
              <TermsAndConditions
                terms={terms}
                setTerms={setTerms}
                showTermsError={showTermsError}
                screen="registerScreen"
              />
              <div className="signup-text mt-3">
                <p>{getLabelByKey(SCREEN_LABEL_KEYS.login)}</p>
                <h6 className="me-1 ms-1 mb-0">
                  <Link to="/login">
                    {getLabelByKey(SCREEN_LABEL_KEYS.loginAccount)}
                  </Link>
                </h6>
              </div>
            </div>
          </div>
        </div>
      </CreateUserStyle>
    </>
  );
};

export default RegisterUser;
