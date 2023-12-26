import { ErrorMessage, Formik } from "formik";
import * as Yup from "yup";
import { Form } from "antd";
import CustomButton from "../../components/CustomButton/CustomButton";
import {
  fontFamilyMedium,
  lightBlue3,
  pureDark2,
} from "../../components/GlobalStyle";
import ForgetPasswordStyle from "./style";
import Head from "../../components/Head/Head";
import { validationFinder } from "../../utils/utilities";
import Errormsg from "../../components/ErrorMessage";
import useGenerateOtp from "../../hooks/useGenerateOtp";
import Input from "react-phone-number-input";
import "react-phone-number-input/style.css";
import useScreenTranslation from "../../hooks/useScreenTranslation";
import { FORGOT_SCREEN_LABEL_KEYS } from "./constants";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import CloseBtn from "../../assets/icons/ic_back.svg"
import { useNavigate } from "react-router-dom";

// initial values types
export type forgetPasswordInitialTypes = {
  phoneNumber: string;
};


const ForgetPassword = () => {
  const { loading, handleSubmit, error } = useGenerateOtp();
  const { getLabelByKey } = useScreenTranslation("forgotPassword");
  const navigate = useNavigate();

  const { selectedLanguage } = useSelector(
    (state: RootState) => state.selectedLanguage
  );

  // initialValues
  const initialValues: forgetPasswordInitialTypes = {
    phoneNumber: "",
  };

  const phoneNumber = validationFinder("PHONE_NUMBER")!;
  const phoneNumberReg = new RegExp(phoneNumber.pattern);

  // validation schema
  const validationSchema = Yup.object({
    phoneNumber: Yup.string()
      .required(phoneNumber.notBlankMsgEn)
      .matches(phoneNumberReg, phoneNumber.patternMsgEn),
  });

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
  // const onFormSubmit =
  return (
    <>
      <Head title="forget-password" />

      <ForgetPasswordStyle>
        <div className="forget-password-container overflow-auto">
          <div className="forget-password-container-card">
            <div className="forget-password-container-card-inner position-relative ">
              <img src={CloseBtn} alt="" className="closeButtonIcon" onClick={() => navigate("/login")} />

              <h6 className="title text-center">
                {getLabelByKey(FORGOT_SCREEN_LABEL_KEYS.title)}
              </h6>
              <p className="text-center forget-password-text mt-10">
                {getLabelByKey(FORGOT_SCREEN_LABEL_KEYS.subtitle)}
              </p>
              <div className="forget-password-container-card-form w-100">
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
                        <div className="phone-input-fields mt-10 w-100">
                          <label
                            htmlFor="phoneNumber"
                          >
                            {getLabelByKey(
                              FORGOT_SCREEN_LABEL_KEYS.mobileFieldTitle
                            )}
                          </label>
                          <Input
                            defaultCountry="GB"
                            international
                            placeholder={getLabelByKey(
                              FORGOT_SCREEN_LABEL_KEYS.mobileFieldPlaceholder
                            )}
                            className={
                              formik.errors.phoneNumber &&
                                formik.touched.phoneNumber
                                ? "is-invalid_phone"
                                : "custom-phone-input-label"
                            }
                            name="phoneNumber"
                            value={formik.values.phoneNumber}
                            onChange={(e: any) => {
                              formik.setValues({ phoneNumber: e });
                            }}
                            withCountryCallingCode
                            countryCallingCodeEditable
                          />
                          <div className="mt-1">
                            <ErrorMessage
                              name="phoneNumber"
                              component={Errormsg}
                            />
                          </div>

                          <div className="mt-20">
                            <CustomButton
                              bgcolor={lightBlue3}
                              textTransform="Captilize"
                              color={pureDark2}
                              padding="14px"
                              fontFamily={`${fontFamilyMedium}`}
                              width="100%"
                              type="submit"
                              title={getLabelByKey(
                                FORGOT_SCREEN_LABEL_KEYS.sumbitButton
                              )}
                              fontSize="16px"
                              loading={loading}
                            />
                          </div>
                        </div>
                      </Form>
                    );
                  }}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </ForgetPasswordStyle>
    </>
  );
};

export default ForgetPassword;
