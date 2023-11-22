import { ErrorMessage, Formik } from "formik";
import * as Yup from "yup";
import { Form } from "antd";
import CustomButton from "../../components/CustomButton/CustomButton";
import {
  fontFamilyMedium,
  lightBlue3,
  pureDark,
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

// initial values types
export type forgetPasswordInitialTypes = {
  phoneNumber: string;
};

const ForgetPassword = () => {
  const { loading, handleSubmit, error } = useGenerateOtp();
  const { getLabelByKey } = useScreenTranslation("forgotPassword");
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
            <div className="forget-password-container-card-inner">
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
                        <div className="phone-input-fields w-100">
                          <label
                            className="custom-phone-input-label"
                            htmlFor="phoneNumber"
                          >
                            {/* {getLabelByKey(
                              FORGOT_SCREEN_LABEL_KEYS.mobileFieldTitle
                            )} */}
                            Phone
                          </label>
                          <Input
                            defaultCountry="US"
                            international
                            placeholder={getLabelByKey(
                              FORGOT_SCREEN_LABEL_KEYS.mobileFieldPlaceholder
                            )}
                            name="phoneNumber"
                            value={formik.values.phoneNumber}
                            onChange={(e: any) => {
                              formik.setValues({ phoneNumber: e });
                            }}
                            withCountryCallingCode
                            countryCallingCodeEditable
                          />
                          {/* <CustomPhoneInput
                            countryNumber={countryCode}
                            placeholder={getLabelByKey(
                              FORGOT_SCREEN_LABEL_KEYS.mobileFieldPlaceholder
                            )}
                            phoneLength={phoneNumberLength}
                            countryFlag={countryFlagURL}
                            phoneValueHandler={(value: number | string) =>
                              formik.setFieldValue("phoneNumber", value)
                            }
                            label={getLabelByKey(
                              FORGOT_SCREEN_LABEL_KEYS.mobileFieldTitle
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

                          <div className="mt-20">
                            <CustomButton
                              bgcolor={lightBlue3}
                              textTransform="Captilize"
                              color={pureDark}
                              padding="8px"
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
