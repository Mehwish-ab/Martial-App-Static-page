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
import CustomPhoneInput from "../../components/CustomInputNumber/CustomPhoneInput";
import { useAppSelector } from "../../app/hooks";
import { validationFinder } from "../../utils/utilities";
import Errormsg from "../../components/ErrorMessage";
import Otp from "./Otp/Otp";
import CreatePassword from "./CreatePassword/CreatePassword";
import useGenerateOtp from "../../hooks/useGenerateOtp";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import useScreenTranslation from "../../hooks/useScreenTranslation";
import { FORGOT_SCREEN_LABEL_KEYS } from "./constants";

// initial values types
export type forgetPasswordInitialTypes = {
  phoneNumber: string | number;
};

const ForgetPassword = () => {
  const { loading, handleSubmit, error } = useGenerateOtp();
  const { getLabelByKey } = useScreenTranslation("forgotPassword");

  // initialValues
  const initialValues = {
    phoneNumber: "",
  };

  const phoneNumber = validationFinder("CANADA_PHONE_NUMBER")!;
  const phoneNumberReg = new RegExp(phoneNumber.pattern);

  // validation schema
  const validationSchema = Yup.object({
    phoneNumber: Yup.string()
      .required(phoneNumber.notBlankMsgEn)
      .matches(phoneNumberReg, phoneNumber.patternMsgEn),
  });

  const {
    countryName: {
      results: {
        countryCode,
        countryFlagURL,
        examplePhoneNumber,
        name,
        phoneNumberLength,
      },
    },
  } = useAppSelector((state) => state.appData.data);

  // const onFormSubmit =
  return (
    <>
      <Head title="forget-password" />

      <ForgetPasswordStyle>
        <div className="forget-password-container overflow-auto">
          <div className="forget-password-container-card">
            <h6 className="title">
              {getLabelByKey(FORGOT_SCREEN_LABEL_KEYS.title)}
            </h6>
            <p className="text-center forget-password-text mt-20">
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
                      <div className="input-fields w-100 mt-20">
                        <CustomPhoneInput
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
                        />
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
                            fontSize="14px"
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
      </ForgetPasswordStyle>
    </>
  );
};

export default ForgetPassword;
